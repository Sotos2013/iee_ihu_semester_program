function handleDropdowns() {
    var dropdownTriggers = document.querySelectorAll('.nav-js .dropdown a');
    var dropdownMenus = document.querySelectorAll('.dropdown-menu');

    dropdownTriggers.forEach(function (trigger) {
        trigger.addEventListener('click', function (e) {
            var targetMenu = this.nextElementSibling;
            if (targetMenu !== null) {
                toggleVisibility(targetMenu);

                // Εναλλαγή του χαρακτηριστικού aria-expanded
                toggleAriaExpanded(this);

                // Κλικ εκτός του αναπτυσσόμενου μενού για να κλείνει επίσης
                hideMenuOnClickOutside(this);
                e.preventDefault();
            }
        });
    });

    function hideMenuOnClickOutside(trigger) {
        var outsideClickListener = function (event) {
            if (!trigger.contains(event.target)) {
                if (!!trigger && !!(trigger.offsetWidth || trigger.offsetHeight || trigger.getClientRects().length)) {
                    trigger.nextElementSibling.classList.toggle('hidden');
                    removeOutsideClickListener();
                }
            }
        };

        var removeOutsideClickListener = function () {
            document.removeEventListener('click', outsideClickListener);
        };

        document.addEventListener('click', outsideClickListener);
    }

    function toggleAriaExpanded(element) {
        var ariaExpandedValue = element.getAttribute('aria-expanded');
        element.setAttribute('aria-expanded', ariaExpandedValue === 'false' ? 'true' : 'false');
    }

    function toggleVisibility(element) {
        element.classList.toggle('hidden');
    }
}

handleDropdowns();

function handleNavToggles() {
    var toggleTriggers = document.querySelectorAll('[data-toggle=toggle]');

    toggleTriggers.forEach(function (trigger) {
        var targetMenuId = trigger.dataset.target;
        var targetMenu = document.querySelector(targetMenuId);

        trigger.addEventListener('click', function () {
            toggleVisibility(targetMenu);
        });
    });
}

handleNavToggles();

function generatePDF() {
    var tableContent = document.getElementById('program').innerHTML;
    var semesterContent = document.getElementById('academicYearAndSemester').innerHTML;

    /*var style = "<style>";
    style += "table {width: 100%;font: 17px Calibri;}";
    style += "table, tr, th, td {border: solid 1px #DDD; border-collapse: collapse; text-align: center;}";
    style += "padding: 2px 3px;}";
    style += "</style>";*/

    var linkcss = "<link rel='stylesheet' href='style.css'>";

    var newWindow = window.open('', '', 'height=700,width=700');

    newWindow.document.write('<html><head>');
    newWindow.document.write(linkcss);
    newWindow.document.write(semesterContent);
    newWindow.document.write('</head>');
    newWindow.document.write('<body>');
    newWindow.document.write(tableContent);
    newWindow.document.write('</body></html>');

    newWindow.document.close();

    newWindow.print();
}

function myFunction(element) {
    const step = element.dataset.step;
    const steps = document.getElementsByClassName(`function${step}_steps`);

    for (let i = 0; i < steps.length; i++) {
        if (element.checked) {
            steps[i].style.display = "block";
        } else {
            steps[i].style.display = "none";
        }
    }
}

function academic() {
    // Get the current date
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth(); // Months are zero-based

    // Determine the semester based on the current month
    var semester;
    if (currentMonth >= 1 && currentMonth <= 6) { // February to August (spring semester)
        semester = 'Εαρινού';
    } else { // October to January (winter semester)
        semester = 'Χειμερινού';
    }

    // Calculate previous and current academic years
    var previousYearStart = new Date(currentYear - 1, 8); // September is month 8 (0-indexed)
    var previousYearEnd = new Date(currentYear, 7); // August is month 7 (0-indexed)
    var currentYearStart = new Date(currentYear, 8); // September is month 8 (0-indexed)
    var currentYearEnd = new Date(currentYear + 1, 7); // August is month 7 (0-indexed)

    // Format the academic years
    var previousAcademicYear = previousYearStart.getFullYear() + ' - ' + previousYearEnd.getFullYear();
    var currentAcademicYear = currentYearStart.getFullYear() + ' - ' + currentYearEnd.getFullYear();

    // Get the semester element and set its text content to include the academic years and semester
    var semesterElement = document.getElementById('academicYearAndSemester');
    semesterElement.textContent = 'Πρόγραμμα ' + semester + ' Εξαμήνου ' + previousAcademicYear;
}

function displayCoursesBySemester() {
    // 1. Hide the existing program/calendar container
    const programContainer = document.getElementById('program');
    programContainer.style.display = 'none';

    // 2. Show the container for the list of courses
    const courseListContainer = document.getElementById('courseList');
    courseListContainer.style.display = 'block';

    // 3. Generate and display the list of courses checkboxes
    generateCourseCheckboxes();
}


function generateCourseCheckboxes() {
    // Clear any existing content in the courseListContainer
    const courseListContainer = document.getElementById('courseList');
    courseListContainer.innerHTML = '';

    // Get the current date
    const currentDate = new Date();
    //currentDate.setMonth(0); // Test if winter semester works or not :(
    const currentMonth = currentDate.getMonth(); // Months are zero-indexed

    // Determine the semester based on the month
    let semester;
    let courses;
    let numColumns;
    let columnWidth;

    if (currentMonth === 0 || currentMonth === 1 || currentMonth === 9 || currentMonth === 10 || currentMonth === 11) {
        semester = 'Χειμερινό Εξάμηνο'; // Winter semester for months October to December

        numColumns = 5; // Adjust the number of columns as needed

        columnWidth = 100 / numColumns; // Calculate column width in percentage
    } else {
        semester = 'Εαρινό Εξάμηνο'; // Spring semester for months March to June
        numColumns = 4; // Adjust the number of columns as needed
        columnWidth = 100 / numColumns; // Calculate column width in percentage
    }

    if (semester === 'Χειμερινό Εξάμηνο') {
        courses = [
            [
                '1101-Θ. Μαθηματικά Ι',
                '1102-Θ. Δομημένος Προγραμματισμός',
                '1103-Θ. Εισαγωγή στην Επιστήμη των Υπολογιστών',
                '1104-Θ. Ηλεκτρονική Φυσική',
                '1105-Θ. Κυκλώματα Συνεχούς Ρεύματος'
            ],
            [
                '1301-Θ. Θεωρία Πιθανοτήτων και Στατιστική',
                '1302-Θ. Μαθηματικά ΙΙΙ',
                '1303-Θ. Επεξεργασία Σήματος',
                '1305-Θ. Δομές Δεδομένων και Ανάλυση Αλγορίθμων',
                '1405-Θ. Γλώσσες και Τεχνολογίες Ιστού'
            ],
            [
                '1501-Θ. Ασύρματες Επικοινωνίες',
                '1502-Θ. Μικροελεγκτές',
                '1503-Θ. Σχεδίαση Λειτουργικών Συστημάτων',
                '1504-Θ. Ηλεκτρονικές Διατάξεις',
                '1505-Θ. Αλληλεπίδραση Ανθρώπου-Μηχανής'
            ],
            [
                '1701-Θ. Δίκτυα Υπολογιστών',
                '1702-Θ. Ηλεκτρονικά Ισχύος',
                '1711-Θ. Συστήματα Αυτομάτου Ελέγχου',
                '1712-Θ. Αισθητήρια και Επεξεργασία Μετρήσεων',
                '1713-Θ. Προγραμματιζόμενοι Λογικοί Ελεγκτές',
                '1714-Θ. Σχεδίαση Επαναπροσδιοριζόμενων Ψηφιακών Συστημάτων (FPGA)',
                '1741-Θ. Εισαγωγή στην Αναλυτική των Δεδομένων',
                '1742-Θ. Μηχανική Λογισμικού',
                '1743-Θ. Τεχνολογία Βάσεων Δεδομένων',
                '1744-Θ. Προηγμένες Αρχιτεκτονικές Υπολογιστών και Προγραμματισμός Παράλληλων Συστημάτων',
                '1771-Θ. Τεχνολογίες Ήχου και Εικόνας',
                '1998-Θ. Ελεύθερη Επιλογή Α'
            ],
            [
                '1911-Θ. Εφαρμογές Ενσωματωμένων Συστημάτων',
                '1912-Θ. Ρομποτική',
                '1913-Θ. ΑΠΕ και Ευφυή Ηλεκτρικά Δίκτυα',
                '1914-Θ. Απτικές Διεπαφές',
                '1915-Θ. Βιοϊατρική Τεχνολογία',
                '1916-Θ. Συστήματα Μετρήσεων Υποβοηθούμενων από Η/Υ',
                '1971-Θ. Ασφάλεια Δικτύων και Επικοινωνιών',
                '1972-Θ. Δικτύωση Καθορισμένη από Λογισμικό',
                '1973-Θ. Ειδικά Θέματα Δικτύων (CCNA) 2',
                '1974-Θ. Δορυφορικές Επικοινωνίες',
                '1975-Θ. Τεχνολογία Πολυμέσων',
                '1941-Θ. Ανάπτυξη Διαδικτυακών Συστημάτων και Εφαρμογών',
                '1942-Θ. Επιχειρησιακή Έρευνα',
                '1943-Θ. Ανάκτηση Πληροφοριών – Μηχανές Αναζήτησης',
                '1944-Θ. Διαχείριση Συστήματος και Υπηρεσιών DBMS',
                '1945-Θ. Ευφυή Συστήματα',
                '1946-Θ. Προηγμένα Θέματα Τεχνητής Νοημοσύνης',
                '1947-Θ. Προηγμένη Μηχανική Μάθηση',
                '1949-Θ. Κατανεμημένα Συστήματα',
                '1950-Θ. Σημασιολογικός Ιστός',
                '1969-Θ. Γραφικά Υπολογιστών'
            ]
        ];


    } else {
        courses = [
            [
                '1201-Θ Μαθηματικά ΙΙ',
                '1202-Θ Μετρήσεις και Κυκλώματα Εναλλασσόμενου Ρεύματος',
                '1203-Θ Τεχνική Συγγραφή, Παρουσίαση και Ορολογία Ξένης Γλώσσας',
                '1204-Θ Σχεδίαση Ψηφιακών Συστημάτων',
                '1205-Θ Αντικειμενοστρεφής Προγραμματισμός'
            ],

            [
                '1304-Θ Οργάνωση και Αρχιτεκτονική Υπολογιστικών Συστημάτων',
                '1401-Θ Συστήματα Διαχείρισης Βάσεων Δεδομένων',
                '1402-Θ Τηλεπικοινωνιακά Συστήματα',
                '1403-Θ Εισαγωγή στα Λειτουργικά Συστήματα',
                '1404-Θ Ηλεκτρονικά Κυκλώματα'
            ],
            [
                '1601-Θ Τεχνητή Νοημοσύνη',
                '1602-Θ Ενσωματωμένα Συστήματα',
                '1611-Θ Σύνθεση Ηλεκτρονικών Κυκλωμάτων',
                '1612-Θ Κβαντική Υπολογιστική',
                '1613-Θ Μεθοδολογίες Σχεδιασμού Μικροηλεκτρονικών Κυκλωμάτων',
                '1671-Θ Μικροκυματική Τεχνολογία και Τηλεπισκόπηση',
                '1672-Θ Οπτοηλεκτρονική και Οπτικές Επικοινωνίες',
                '1673-Θ Συστήματα Μέσων Μαζικής Επικοινωνίας',
                '1641-Θ Αριθμητικές Μέθοδοι',
                '1642-Θ Προηγμένα Θέματα Αλληλεπίδρασης (Προγραμματισμός Κινητών Συσκευών)',
                '1643-Θ Διοίκηση Έργων'
            ],

            [
                '1801-Θ Ασφάλεια Πληροφοριακών Συστημάτων',
                '1802-Θ Αρχές και Μέθοδοι Μηχανικής Μάθησης',
                '1803-Θ Διαδίκτυο των Πραγμάτων',
                '1811-Θ Εφαρμογές Συστημάτων Αυτομάτου Ελέγχου',
                '1812-Θ Μετατροπείς Ισχύος',
                '1839-Θ Ηλεκτροκίνηση και Ευφυή Δίκτυα',
                '1871-Θ Ασύρματα Δίκτυα',
                '1872-Θ Ειδικά Θέματα Δικτύων (CCNA) 1',
                '1873-Θ Προηγμένα Θέματα Δικτύων',
                '1874-Θ Συστήματα Κινητών Επικοινωνιών',
                '1898-Θ Ελεύθερη Επιλογή Β',
                '1841-Θ Οργάνωση Δεδομένων και Εξόρυξη Πληροφορίας',
                '1842-Θ Διαδικτυακές Υπηρεσίες Προστιθέμενης Αξίας',
                '1948-Θ Ανάπτυξη Ολοκληρωμένων Πληροφοριακών Συστημάτων'
            ],
        ];
    }

    // Loop to create columns and checkboxes
    for (let i = 1; i <= numColumns; i++) {
        // Create a column div
        const columnDiv = document.createElement('div');
        columnDiv.classList.add('column');
        columnDiv.style.width = `${columnWidth}%`;

        // Determine the semester title based on the column index
        let semesterTitleIndex;
        if (currentMonth === 0 || currentMonth === 1 || currentMonth === 9 || currentMonth === 10 || currentMonth === 11) {
            semesterTitleIndex = (i * 2) - 1;
        } else {
            semesterTitleIndex = i * 2;
        }
        const semesterTitleText = `Εξάμηνο ${semesterTitleIndex}`;

        // Create and append the semester title
        const titleElement = document.createElement('h3');
        titleElement.textContent = semesterTitleText;
        columnDiv.appendChild(titleElement);

        // Get the courses for the current semester and column
        const semesterCourses = courses[i - 1] || []; // Subtract 1 to adjust for zero-based indexing

        // Create checkboxes for the courses
        semesterCourses.forEach(course => {
            const listItem = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('id', course); // Set unique ID for each checkbox
            const label = document.createElement('label');
            label.setAttribute('for', course); // Match label with checkbox ID
            label.textContent = course; // Set label text to course name
            listItem.appendChild(checkbox);
            listItem.appendChild(label);
            columnDiv.appendChild(listItem);
        });

        // Append the column to the course list container
        courseListContainer.appendChild(columnDiv);
    }
}
