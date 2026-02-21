import pdfplumber
import re

def update_sql_from_pdf(pdf_path, sql_input_path, sql_output_path):
    # Χάρτης ημερών (Καλύπτει Ελληνικά και Λατινικά Unicode)
    days_map = {
        'ΔΕ': 'Monday',
        'ΤΡ': 'Tuesday', 'TP': 'Tuesday',
        'ΤΕ': 'Wednesday', 'TE': 'Wednesday',
        'ΠΕ': 'Thursday',
        'ΠΑ': 'Friday'
    }

    course_data = {}

    print("--- 1. Ανάλυση PDF (Εξαγωγή Θεωριών) ---")
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            table = page.extract_table()
            if not table: continue
            
            # Καθαρισμός επικεφαλίδων
            headers = [str(h).replace('\n', '').strip() if h else "" for h in table[0]]
            
            for row in table[1:]:
                c_id = row[1] # Κωδικός μαθήματος
                # Ελέγχουμε αν υπάρχει ID και αν η γραμμή αφορά Θεωρία (ΘΕ > 0)
                if not c_id or not str(c_id).isdigit(): continue
                
                found_days = []
                found_times = []
                
                # Έλεγχος στηλών ΔΕ (4) έως ΠΑ (8)
                for i in range(4, 9):
                    cell = row[i]
                    if cell and any(char.isdigit() for char in cell):
                        # Regex για την ώρα (π.χ. 14-16)
                        time_match = re.search(r'(\d{1,2})-(\d{1,2})', cell)
                        if time_match:
                            t_start = f"{int(time_match.group(1)):02d}:00"
                            t_end = f"{int(time_match.group(2)):02d}:00"
                            
                            h_val = headers[i]
                            if h_val in days_map:
                                found_days.append(days_map[h_val])
                                found_times.append(f"{t_start}-{t_end}")

                if found_days:
                    course_data[str(c_id)] = {
                        'days': ", ".join(found_days),
                        'times': ", ".join(found_times)
                    }

    print("--- 2. Ενημέρωση SQL (Πίνακας course_occurrences) ---")
    with open(sql_input_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    in_occurrences_table = False

    for line in lines:
        # Εντοπισμός αν είμαστε στο σημείο που γεμίζει ο πίνακας των ωρών
        if "INSERT INTO `course_occurrences`" in line:
            in_occurrences_table = True
            new_lines.append(line)
            continue
        
        updated = False
        if in_occurrences_table and line.strip().startswith("("):
            # Εξαγωγή του ID από την αρχή: (1201, ...
            match_id = re.match(r'\((\d+),', line.strip())
            if match_id:
                sql_id = match_id.group(1)
                if sql_id in course_data:
                    info = course_data[sql_id]
                    # Κατασκευή της γραμμής με τη σωστή σειρά: (ID, 'Μέρες', 'Ώρες')
                    # Ελέγχουμε αν η γραμμή τελειώνει σε κόμμα ή ερωτηματικό
                    suffix = "," if line.strip().endswith(",") else ";"
                    new_line = f"({sql_id}, '{info['days']}', '{info['times']}'){suffix}\n"
                    new_lines.append(new_line)
                    print(f"Ενημερώθηκε το ID {sql_id}: {info['days']} | {info['times']}")
                    updated = True
        
        if not updated:
            # Αν τελειώσουν τα inserts, σταματάμε να ψάχνουμε για IDs
            if in_occurrences_table and ";" in line and not line.strip().startswith("("):
                in_occurrences_table = False
            new_lines.append(line)

    with open(sql_output_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    
    print(f"\nΕπιτυχία! Το αρχείο '{sql_output_path}' είναι έτοιμο.")

# Εκτέλεση
update_sql_from_pdf(
    'ΠΡΟΓΡΑΜΜΑ-ΜΑΘΗΜΑΤΩΝ-2025-26-εαρινό-v1.2.pdf', 
    'courses_db.sql', 
    'updated_courses_db.sql'
)
