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

    // 4. Hide buttons with values "Εξαγωγή" and "Επιλογή μαθημάτων"
    const buttonsToHide = document.querySelectorAll('.buttons input');
    buttonsToHide.forEach(button => {
        if (button.value === 'Εξαγωγή' || button.value === 'Επιλογή μαθημάτων') {
            button.style.display = 'none';
        }
    });

    // 5. Create a new button
    const newButton = document.createElement('input');
    newButton.setAttribute('type', 'button');
    newButton.setAttribute('value', 'Δημιουργία');
    newButton.setAttribute('id', 'newButton');
    newButton.classList.add('button', 'btn', 'btn-primary');
    newButton.addEventListener('click', function () {
        showCalendar();
    });

    // 6. Append the new button to a container (assuming there's a container with id 'buttonsContainer')
    const buttonContainer = document.getElementById('buttonsContainer');
    // Replace existing button if it exists
    const existingButton = document.getElementById('newButton');
    if (existingButton) {
        buttonContainer.replaceChild(newButton, existingButton);
    } else {
        buttonContainer.appendChild(newButton);
    }
}



function showCalendar() {
    const programContainer = document.getElementById('program');
    const courseListContainer = document.getElementById('courseList');
    const timeline = document.getElementById('timeline');
    courseListContainer.style.display = 'none';
    programContainer.style.display = 'block';
    const newButton = document.getElementById('newButton');

    if (newButton) {
        newButton.style.display = 'none';
    }

    const buttonsToHide = document.querySelectorAll('.buttons input');
    buttonsToHide.forEach(button => {
        if (button.value === 'Εξαγωγή' || button.value === 'Επιλογή μαθημάτων') {
            button.style.display = 'block';

        }
    });

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
                { name: '1101-Θ Μαθηματικά Ι', day: '', time: '' },
                { name: '1102-Θ Δομημένος Προγραμματισμός', day: '', time: '' },
                { name: '1103-Θ Εισαγωγή στην Επιστήμη των Υπολογιστών', day: '', time: '' },
                { name: '1104-Θ Ηλεκτρονική Φυσική', day: '', time: '' },
                { name: '1105-Θ Κυκλώματα Συνεχούς Ρεύματος', day: '', time: '' }
            ]
            ,
            [
                { name: '1301-Θ Θεωρία Πιθανοτήτων και Στατιστική', day: '', time: '' },
                { name: '1302-Θ Μαθηματικά ΙΙΙ', day: '', time: '' },
                { name: '1303-Θ Επεξεργασία Σήματος', day: '', time: '' },
                { name: '1305-Θ Δομές Δεδομένων και Ανάλυση Αλγορίθμων', day: '', time: '' },
                { name: '1405-Θ Γλώσσες και Τεχνολογίες Ιστού', day: '', time: '' }
            ]
            ,
            [
                { name: '1501-Θ Ασύρματες Επικοινωνίες', day: '', time: '' },
                { name: '1502-Θ Μικροελεγκτές', day: '', time: '' },
                { name: '1503-Θ Σχεδίαση Λειτουργικών Συστημάτων', day: '', time: '' },
                { name: '1504-Θ Ηλεκτρονικές Διατάξεις', day: '', time: '' },
                { name: '1505-Θ Αλληλεπίδραση Ανθρώπου-Μηχανής', day: '', time: '' }
            ]
            ,
            [
                { name: '1701-Θ Δίκτυα Υπολογιστών', day: '', time: '' },
                { name: '1702-Θ Ηλεκτρονικά Ισχύος', day: '', time: '' },
                { name: '1711-Θ Συστήματα Αυτομάτου Ελέγχου', day: '', time: '' },
                { name: '1712-Θ Αισθητήρια και Επεξεργασία Μετρήσεων', day: '', time: '' },
                { name: '1713-Θ Προγραμματιζόμενοι Λογικοί Ελεγκτές', day: '', time: '' },
                { name: '1714-Θ Σχεδίαση Επαναπροσδιοριζόμενων Ψηφιακών Συστημάτων (FPGA)', day: '', time: '' },
                { name: '1741-Θ Εισαγωγή στην Αναλυτική των Δεδομένων', day: '', time: '' },
                { name: '1742-Θ Μηχανική Λογισμικού', day: '', time: '' },
                { name: '1743-Θ Τεχνολογία Βάσεων Δεδομένων', day: '', time: '' },
                { name: '1744-Θ Προηγμένες Αρχιτεκτονικές Υπολογιστών και Προγραμματισμός Παράλληλων Συστημάτων', day: '', time: '' },
                { name: '1771-Θ Τεχνολογίες Ήχου και Εικόνας', day: '', time: '' },
                { name: '1998-Θ Ελεύθερη Επιλογή Α\'', day: '', time: '' }
            ]
            ,
            [
                { name: '1911-Θ Εφαρμογές Ενσωματωμένων Συστημάτων', day: '', time: '' },
                { name: '1912-Θ Ρομποτική', day: '', time: '' },
                { name: '1913-Θ ΑΠΕ και Ευφυή Ηλεκτρικά Δίκτυα', day: '', time: '' },
                { name: '1914-Θ Απτικές Διεπαφές', day: '', time: '' },
                { name: '1915-Θ Βιοϊατρική Τεχνολογία', day: '', time: '' },
                { name: '1916-Θ Συστήματα Μετρήσεων Υποβοηθούμενων από Η/Υ', day: '', time: '' },
                { name: '1971-Θ Ασφάλεια Δικτύων και Επικοινωνιών', day: '', time: '' },
                { name: '1972-Θ Δικτύωση Καθορισμένη από Λογισμικό', day: '', time: '' },
                { name: '1973-Θ Ειδικά Θέματα Δικτύων (CCNA) 2', day: '', time: '' },
                { name: '1974-Θ Δορυφορικές Επικοινωνίες', day: '', time: '' },
                { name: '1975-Θ Τεχνολογία Πολυμέσων', day: '', time: '' },
                { name: '1941-Θ Ανάπτυξη Διαδικτυακών Συστημάτων και Εφαρμογών', day: '', time: '' },
                { name: '1942-Θ Επιχειρησιακή Έρευνα', day: '', time: '' },
                { name: '1943-Θ Ανάκτηση Πληροφοριών – Μηχανές Αναζήτησης', day: '', time: '' },
                { name: '1944-Θ Διαχείριση Συστήματος και Υπηρεσιών DBMS', day: '', time: '' },
                { name: '1945-Θ Ευφυή Συστήματα', day: '', time: '' },
                { name: '1946-Θ Προηγμένα Θέματα Τεχνητής Νοημοσύνης', day: '', time: '' },
                { name: '1947-Θ Προηγμένη Μηχανική Μάθηση', day: '', time: '' },
                { name: '1949-Θ Κατανεμημένα Συστήματα', day: '', time: '' },
                { name: '1950-Θ Σημασιολογικός Ιστός', day: '', time: '' },
                { name: '1969-Θ Γραφικά Υπολογιστών', day: '', time: '' }
            ]

        ];


    } else {
        courses = [
            [
                {
                    name: '1201-Θ Μαθηματικά ΙΙ',
                    occurrences: [
                        { day: 'Monday', time: '10:00-12:00' },
                        { day: 'Thursday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1202-Θ Μετρήσεις και Κυκλώματα Εναλλασσόμενου Ρεύματος',
                    occurrences: [
                        { day: 'Tuesday', time: '10:00-12:00' },
                        { day: 'Friday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1203-Θ Τεχνική Συγγραφή, Παρουσίαση και Ορολογία Ξένης Γλώσσας',
                    occurrences: [
                        { day: 'Wednesday', time: '10:00-12:00' },
                        { day: 'Saturday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1204-Θ Σχεδίαση Ψηφιακών Συστημάτων',
                    occurrences: [
                        { day: 'Thursday', time: '10:00-12:00' },
                        { day: 'Monday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1205-Θ Αντικειμενοστρεφής Προγραμματισμός',
                    occurrences: [
                        { day: 'Friday', time: '10:00-12:00' },
                        { day: 'Tuesday', time: '14:00-16:00' }
                    ]
                }
            ]
            ,

            [
                {
                    name: '1304-Θ Οργάνωση και Αρχιτεκτονική Υπολογιστικών Συστημάτων',
                    occurrences: [
                        { day: 'Monday', time: '10:00-12:00' },
                        { day: 'Thursday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1401-Θ Συστήματα Διαχείρισης Βάσεων Δεδομένων',
                    occurrences: [
                        { day: 'Tuesday', time: '10:00-12:00' },
                        { day: 'Friday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1402-Θ Τηλεπικοινωνιακά Συστήματα',
                    occurrences: [
                        { day: 'Wednesday', time: '10:00-12:00' },
                        { day: 'Saturday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1403-Θ Εισαγωγή στα Λειτουργικά Συστήματα',
                    occurrences: [
                        { day: 'Thursday', time: '10:00-12:00' },
                        { day: 'Monday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1404-Θ Ηλεκτρονικά Κυκλώματα',
                    occurrences: [
                        { day: 'Friday', time: '10:00-12:00' },
                        { day: 'Tuesday', time: '14:00-16:00' }
                    ]
                }

            ]
            ,
            [
                {
                    name: '1601-Θ Τεχνητή Νοημοσύνη',
                    occurrences: [
                        { day: 'Monday', time: '10:00-12:00' },
                        { day: 'Wednesday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1602-Θ Ενσωματωμένα Συστήματα',
                    occurrences: [
                        { day: 'Tuesday', time: '10:00-12:00' },
                        { day: 'Thursday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1611-Θ Σύνθεση Ηλεκτρονικών Κυκλωμάτων',
                    occurrences: [
                        { day: 'Wednesday', time: '10:00-12:00' },
                        { day: 'Friday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1612-Θ Κβαντική Υπολογιστική',
                    occurrences: [
                        { day: 'Thursday', time: '10:00-12:00' },
                        { day: 'Saturday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1613-Θ Μεθοδολογίες Σχεδιασμού Μικροηλεκτρονικών Κυκλωμάτων',
                    occurrences: [
                        { day: 'Friday', time: '10:00-12:00' },
                        { day: 'Monday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1671-Θ Μικροκυματική Τεχνολογία και Τηλεπισκόπηση',
                    occurrences: [
                        { day: 'Saturday', time: '10:00-12:00' },
                        { day: 'Wednesday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1672-Θ Οπτοηλεκτρονική και Οπτικές Επικοινωνίες',
                    occurrences: [
                        { day: 'Monday', time: '10:00-12:00' },
                        { day: 'Thursday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1673-Θ Συστήματα Μέσων Μαζικής Επικοινωνίας',
                    occurrences: [
                        { day: 'Tuesday', time: '10:00-12:00' },
                        { day: 'Friday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1641-Θ Αριθμητικές Μέθοδοι',
                    occurrences: [
                        { day: 'Wednesday', time: '10:00-12:00' },
                        { day: 'Saturday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1642-Θ Προηγμένα Θέματα Αλληλεπίδρασης (Προγραμματισμός Κινητών Συσκευών)',
                    occurrences: [
                        { day: 'Thursday', time: '10:00-12:00' },
                        { day: 'Monday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1643-Θ Διοίκηση Έργων',
                    occurrences: [
                        { day: 'Friday', time: '10:00-12:00' },
                        { day: 'Tuesday', time: '14:00-16:00' }
                    ]
                }

            ]
            ,

            [
                {
                    name: '1801-Θ Ασφάλεια Πληροφοριακών Συστημάτων', occurrences: [
                        { day: 'Monday', time: '9:00-11:00' },
                        { day: 'Wednesday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1802-Θ Αρχές και Μέθοδοι Μηχανικής Μάθησης', occurrences: [
                        { day: 'Tuesday', time: '10:00-12:00' },
                        { day: 'Thursday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1803-Θ Διαδίκτυο των Πραγμάτων', occurrences: [
                        { day: 'Wednesday', time: '9:00-11:00' },
                        { day: 'Friday', time: '13:00-15:00' }
                    ]
                },
                {
                    name: '1811-Θ Εφαρμογές Συστημάτων Αυτομάτου Ελέγχου', occurrences: [
                        { day: 'Thursday', time: '10:00-12:00' },
                        { day: 'Saturday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1812-Θ Μετατροπείς Ισχύος', occurrences: [
                        { day: 'Friday', time: '9:00-11:00' },
                        { day: 'Monday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1839-Θ Ηλεκτροκίνηση και Ευφυή Δίκτυα', occurrences: [
                        { day: 'Saturday', time: '10:00-12:00' },
                        { day: 'Wednesday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1871-Θ Ασύρματα Δίκτυα', occurrences: [
                        { day: 'Monday', time: '9:00-11:00' },
                        { day: 'Thursday', time: '13:00-15:00' }
                    ]
                },
                {
                    name: '1872-Θ Ειδικά Θέματα Δικτύων (CCNA) 1', occurrences: [
                        { day: 'Tuesday', time: '10:00-12:00' },
                        { day: 'Friday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1873-Θ Προηγμένα Θέματα Δικτύων', occurrences: [
                        { day: 'Wednesday', time: '9:00-11:00' },
                        { day: 'Saturday', time: '13:00-15:00' }
                    ]
                },
                {
                    name: '1874-Θ Συστήματα Κινητών Επικοινωνιών', occurrences: [
                        { day: 'Thursday', time: '10:00-12:00' },
                        { day: 'Monday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1898-Θ Ελεύθερη Επιλογή Β', occurrences: [
                        { day: 'Friday', time: '9:00-11:00' },
                        { day: 'Tuesday', time: '13:00-15:00' }
                    ]
                },
                {
                    name: '1841-Θ Οργάνωση Δεδομένων και Εξόρυξη Πληροφορίας', occurrences: [
                        { day: 'monday', time: '10:00-12:00' },
                        { day: 'wednesday', time: '14:00-16:00' }
                    ]
                },
                {
                    name: '1842-Θ Διαδικτυακές Υπηρεσίες Προστιθέμενης Αξίας', occurrences: [
                        { day: 'Monday', time: '9:00-11:00' },
                        { day: 'Thursday', time: '13:00-15:00' }
                    ]
                },
                {
                    name: '1948-Θ Ανάπτυξη Ολοκληρωμένων Πληροφοριακών Συστημάτων', occurrences: [
                        { day: 'Tuesday', time: '10:00-12:00' },
                        { day: 'Friday', time: '14:00-16:00' }
                    ]
                }
            ]

        ];
    }

    // Loop to create columns and checkboxes
    // Loop through each semester column
for (let i = 1; i <= numColumns; i++) {
    // Create a column div
    const columnDiv = document.createElement('div');
    columnDiv.classList.add('column');
    columnDiv.style.width = `${columnWidth}%`;

    // Determine the semester title based on the column index
    const semesterTitleIndex = (currentMonth === 0 || currentMonth === 1 || currentMonth === 9 || currentMonth === 10 || currentMonth === 11) ?
        (i * 2) - 1 :
        i * 2;
    const semesterTitleText = `Εξάμηνο ${semesterTitleIndex}`;

    // Create and append the semester title
    const titleElement = document.createElement('h3');
    titleElement.textContent = semesterTitleText;
    columnDiv.appendChild(titleElement);

    // Get the courses for the current semester and column
    const semesterCourses = courses[i - 1] || []; // Subtract 1 to adjust for zero-based indexing

    // Iterate over courses and create checkboxes and labels
    semesterCourses.forEach(course => {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', course.name.replace(/\s+/g, '')); // Set unique ID for each checkbox
        const label = document.createElement('label');
        label.setAttribute('for', course.name.replace(/\s+/g, '')); // Match label with checkbox ID
        label.textContent = course.name; // Set label text to course name
        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        columnDiv.appendChild(listItem);
    });

    // Append the column to the course list container
    courseListContainer.appendChild(columnDiv);
}

// Add an event listener to all checkboxes
// Add an event listener to all checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const labelText = this.nextElementSibling.textContent; // Get the label text (course title)

        // Find the corresponding day and time for the selected course
        const selectedCourse = courses.flat().find(course => course.name === labelText); // Use flat() to flatten the nested arrays

        if (selectedCourse) {
            if (this.checked) {
                // If checkbox is checked, add the course to the schedule
                const courseTime = selectedCourse.occurrences.time;
                if (selectedCourse && selectedCourse.occurrences.day) {
                    const courseDay = selectedCourse.occurrences.day;

                    // Find the corresponding day's events container
                    const courseDayEvents = document.getElementById(courseDay + 'Events');

                    if (courseTime && courseDayEvents) {
                        const courseEvent = document.createElement('div');
                        const startHour = parseInt(selectedCourse.occurrences.time.split('-')[0].trim().split(':')[0], 10); // Extract start hour and parse as integer
                        const endHour = parseInt(selectedCourse.occurrences.time.split('-')[1].trim().split(':')[0], 10); // Extract end hour and parse as integer
                        const startClass = 'start-' + startHour.toString().replace(/^0+/, ''); // Remove leading zeros from start hour
                        const endClass = 'end-' + endHour.toString().replace(/^0+/, ''); // Remove leading zeros from end hour
                        courseEvent.textContent = labelText;
                        courseEvent.classList.add(startClass, endClass, 'box2'); // Add the classes for start, end, and box
                        courseDayEvents.appendChild(courseEvent);
                    }
                }
                else{
                    console.error('Η ημέρα του μαθήματος δεν ορίζεται σωστά.');
                } 
            }
            else {
                // If checkbox is unchecked, remove the course from the schedule
                // Find the corresponding day's events container
                const courseDayEvents = document.getElementById(selectedCourse.occurrences.day.toLowerCase() + 'Events');

                // Find and remove the corresponding event element
                if (courseDayEvents) {
                    const courseEventToRemove = courseDayEvents.querySelector('div:contains("' + labelText + '")');
                    if (courseEventToRemove) {
                        courseEventToRemove.remove();
                    }
                }
            }
        }
    });
});

}


//σχολιο 