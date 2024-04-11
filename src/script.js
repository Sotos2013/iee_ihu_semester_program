clearCheckboxState();

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Εδώ μπορείτε να επεξεργαστείτε τα δεδομένα όπως επιθυμείτε
        console.log(data);
    })
    .catch(error => console.error('Error fetching data:', error));

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
    var tableContent = document.getElementById('allDays').innerHTML;
    var semesterContent = document.getElementById('academicYearAndSemester').innerHTML;
    var hours = document.getElementById('hours').innerHTML; // Προσθέστε αυτήν τη γραμμή για να πάρετε το περιεχόμενο του στοιχείου με το id 'hours'
    var ECTS = document.getElementById('ECTS').innerHTML;
    var labHours = document.getElementById('lab').innerHTML;

    var style = "<style>";
    style += "@media print {";
    style += "table {width: 100%;font: 17px Calibri;}";
    style += "table, tr, th, td {border: solid 1px #DDD; border-collapse: collapse; text-align: center;}";
    style += "padding: 2px 3px;}";
    style += "</style>";

    var newWindow = window.open('', '', 'height=700,width=700');

    newWindow.document.write('<html><head>');
    newWindow.document.write('<center>');
    newWindow.document.write(style);
    newWindow.document.write('</head>');
    newWindow.document.write('<body>');
    newWindow.document.write(semesterContent);
    newWindow.document.write('<table id="printedTable">');
    newWindow.document.write(tableContent);
    newWindow.document.write('</table>');
    newWindow.document.write('<br>');
    newWindow.document.write('<p id="printedHours">' + hours + '</p>'); // Προσθέστε αυτήν τη γραμμή για να εμφανίσετε το συνολικό φορτίο εργασίας
    newWindow.document.write('<p id="printedECTS">' + ECTS + '</p>'); // Προσθέστε αυτήν τη γραμμή για να εμφανίσετε το συνολικά ECTS
    newWindow.document.write('<p id="printedLabHours">' + labHours + '</p>'); // Προσθέστε αυτήν τη γραμμή για να εμφανίσετε το συνολικά ECTS
    newWindow.document.write('</body></html>');
    newWindow.document.close();

    // Sort events by start time before printing
    var printedTable = newWindow.document.getElementById('printedTable');
    var rows = printedTable.getElementsByTagName('tr');
    var sortedRows = Array.from(rows).slice(1); // Exclude header row from sorting
    sortedRows.sort(function(a, b) {
        var timeA = a.cells[0].textContent.split('-')[0].trim();
        var timeB = b.cells[0].textContent.split('-')[0].trim();
        return timeA.localeCompare(timeB);
    });
    sortedRows.forEach(function(row) {
        printedTable.appendChild(row);
    });

    newWindow.print();
}


function generateImage() {
    var tableContent = document.getElementById('allDays');
    var semesterContent = document.getElementById('academicYearAndSemester');
    var hours = document.getElementById('hours');
    var ECTS = document.getElementById('ECTS');

    var style = "<style>";
    style += "@media print {";
    style += "table {width: 100%;font: 17px Calibri;}";
    style += "table, tr, th, td {border: solid 1px #DDD; border-collapse: collapse; text-align: center;}";
    style += "padding: 2px 3px;}";
    style += "</style>";

    var newWindow = window.open('', '', 'height=700,width=700');

    newWindow.document.write('<html><head>');
    newWindow.document.write('<center>');
    newWindow.document.write(style);
    newWindow.document.write('</head>');
    newWindow.document.write('<body>');
    newWindow.document.write(semesterContent.outerHTML);
    newWindow.document.write('</body></html>');

    newWindow.document.close();

    // Use html2canvas to capture the calendar content as an image
    html2canvas(tableContent).then(function (canvas) {
        var calendarImageContainer = newWindow.document.getElementById('academicYearAndSemester');
        calendarImageContainer.appendChild(canvas);

        // Convert canvas to PNG image data
        var image = canvas.toDataURL("image/png");

        // Create a link element to download the PNG image
        var link = document.createElement('a');
        link.href = image;
        link.download = 'page.png';
        link.click();
    });

    // Append hours and ECTS information
    const totalWorkloadMessage = hours ? hours.textContent : '';
    const totalECTSMessage = ECTS ? ECTS.textContent : '';
    newWindow.document.body.insertAdjacentHTML('beforeend', `<p id='hours'>${totalWorkloadMessage}</p>`);
    newWindow.document.body.insertAdjacentHTML('beforeend', `<p id='ECTS'>${totalECTSMessage}</p>`);
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
        if (button.value === 'Εξαγωγή' || button.value === 'Επιλογή μαθημάτων' || button.value === 'Εξαγωγή ως Εικόνα' || button.value === 'Εξαγωγή ως PDF') {
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
    // Create the new button
    const clearButton = document.createElement('input');
    clearButton.setAttribute('type', 'button');
    clearButton.setAttribute('value', 'Clear Checkbox State');
    clearButton.setAttribute('id', 'clearButton');
    clearButton.classList.add('button', 'btn', 'btn-primary');
    clearButton.addEventListener('click', function () {
        clearCheckboxState();
    });
    // 6. Append the new button to a container (assuming there's a container with id 'buttonsContainer')
    const buttonContainer = document.getElementById('buttonsContainer');
    buttonContainer.style.textAlign = 'center';
    buttonContainer.style.marginLeft = 'auto';
    buttonContainer.style.marginRight = 'auto';
    // Replace existing button if it exists
    const existingButton = document.getElementById('newButton');
    const existButtonClear = document.getElementById('clearButton');
    if (existingButton) {
        buttonContainer.replaceChild(newButton, existingButton);
    } else {
        buttonContainer.appendChild(newButton);
    }
    if (existButtonClear) {
        buttonContainer.replaceChild(clearButton, existingButton);
    } else {
        buttonContainer.appendChild(clearButton);
    }

    //createClearCheckboxButton();
}




function showCalendar() {
    const programContainer = document.getElementById('program');
    const courseListContainer = document.getElementById('courseList');
    courseListContainer.style.display = 'none';
    programContainer.style.display = 'block';
    const newButton = document.getElementById('newButton');

    if (newButton) {
        newButton.style.display = 'none';

    }

    const buttonsToHide = document.querySelectorAll('.buttons input');
    buttonsToHide.forEach(button => {
        if (button.value === 'Εξαγωγή' || button.value === 'Επιλογή μαθημάτων' || button.value === 'Εξαγωγή ως Εικόνα' || button.value === 'Εξαγωγή ως PDF' || button.value === 'Clear Checkbox State') {
            button.style.display = 'block';

        }
    });

}
function groupCoursesBySemester(data) {
    const coursesBySemester = {};
    data.forEach(course => {
        const semester = course.semester.toString(); // Convert semester to string
        if (!coursesBySemester[semester]) {
            coursesBySemester[semester] = [];
        }
        coursesBySemester[semester].push(course);
    });
    return coursesBySemester;
}
const availableHours = [
    { start: '9:00', end: '11:00' },
    { start: '11:00', end: '13:00' },
    { start: '14:00', end: '16:00' },
    { start: '16:00', end: '18:00' },
    { start: '18:00', end: '20:00' }
];

// Ορίζουμε τις διαθέσιμες ημέρες
const availableDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

function addCustomCourse() {
    const customCourseName = prompt('Εισάγετε το όνομα του μαθήματος:');
    if (customCourseName) {
        const selectedHour = prompt('Επιλέξτε μια από τις διαθέσιμες ώρες:\n\n' +
            '1. 9:00 - 11:00\n' +
            '2. 11:00 - 13:00\n' +
            '3. 14:00 - 16:00\n' +
            '4. 16:00 - 18:00\n' +
            '5. 18:00 - 20:00');
        const selectedDayIndex = prompt('Επιλέξτε μια από τις διαθέσιμες ημέρες:\n\n' +
            '1. Δευτέρα\n' +
            '2. Τρίτη\n' +
            '3. Τετάρτη\n' +
            '4. Πέμπτη\n' +
            '5. Παρασκευή');

        if (selectedHour && selectedDayIndex) {
            const index = parseInt(selectedHour) - 1;
            const dayIndex = parseInt(selectedDayIndex) - 1;
            if (index >= 0 && index < availableHours.length && dayIndex >= 0 && dayIndex < availableDays.length) {
                const selectedTime = availableHours[index];
                const selectedDay = availableDays[dayIndex];
                const courseDetails = {
                    name: customCourseName,
                    time: `${selectedTime.start}-${selectedTime.end}`,
                    day: selectedDay
                };
                const customCourseCheckbox = generateCheckbox(courseDetails.name);
                addToSchedule(courseDetails.name, courseDetails.time, courseDetails.day); // Προσθήκη του μαθήματος στο πρόγραμμα
                saveCourseToJSON(courseDetails); // Αποθήκευση του μαθήματος στο JSON αρχείο
                addCourseCheckbox(courseDetails); // Προσθήκη του νέου checkbox στη λίστα μαθημάτων
            } else {
                alert('Μη έγκυρη επιλογή ώρας ή ημέρας.');
            }
        }
    }
}

// Συνάρτηση για την αποθήκευση μαθήματος στο JSON αρχείο
function saveCourseToJSON(courseDetails) {
    // Μετατροπή των δεδομένων σε JSON
    const jsonCourseDetails = {
        semester: "2",
        name: courseDetails.name,
        occurrences: [{ day: courseDetails.day, time: courseDetails.time }]
    };

    // Αποθήκευση του JSON στο αρχείο
    fetch('data.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonCourseDetails)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Αποτυχία αποθήκευσης του μαθήματος.');
            }
            console.log('Το μάθημα αποθηκεύτηκε με επιτυχία.');
        })
        .catch(error => {
            console.error('Σφάλμα κατά την αποθήκευση του μαθήματος στο αρχείο data.json:', error);
        });
}


// Συνάρτηση για την προσθήκη μαθήματος στο πρόγραμμα
// Υπολογισμός συνολικών ωρών εργαστηρίου
function calculateLabHours() {
    const totalCustomCourses = document.querySelectorAll('input[type="checkbox"][name^="course"]:checked').length;
    return totalCustomCourses * 2; // Κάθε custom μάθημα διαρκεί 2 ώρες
}

function addToSchedule(courseName, courseTime, courseDay) {
    const dayEvents = document.getElementById(courseDay.toLowerCase() + 'Events'); // Προσαρμογή για μικρά γράμματα
    if (dayEvents) {
        const [startTime, endTime] = courseTime.split('-');
        const [startHour, endHour] = [parseInt(startTime.split(':')[0], 10), parseInt(endTime.split(':')[0], 10)];

        const startClass = 'start-' + startHour.toString().padStart(2, '0'); // Προσαρμογή για προσθήκη μηδενικών στην αρχή
        const endClass = 'end-' + endHour.toString().padStart(2, '0'); // Προσαρμογή για προσθήκη μηδενικών στην αρχή

        const courseEvent = document.createElement('div');
        courseEvent.textContent = `${startTime}-${endTime} ${courseName}`;
        courseEvent.classList.add(startClass, endClass, 'box2');

        // Ελέγχουμε αν υπάρχει ήδη άλλο μάθημα στην ίδια ώρα
        let existingEventFound = false;
        Array.from(dayEvents.children).forEach(event => {
            const eventTime = event.textContent.split(' ')[0]; // Παίρνουμε το χρονικό διάστημα από το κείμενο του event
            if (eventTime === `${startTime}-${endTime}`) {
                // Αν υπάρχει ήδη μάθημα την ίδια ώρα, προσθέτουμε το νέο μάθημα δίπλα του με κόμμα
                event.textContent += `, ${courseName}`;
                existingEventFound = true;
            }
        });

        // Αν δεν βρέθηκε άλλο μάθημα την ίδια ώρα, προσθέτουμε το νέο μάθημα κανονικά
        if (!existingEventFound) {
            dayEvents.appendChild(courseEvent);
        }

        // Ενημέρωση του συνολικού φορτίου εργασίας
        const totalWorkloadHours = calculateLabHours();
        const totalWorkloadMessage = `Συνολικές ώρες Εργαστηρίου: ${totalWorkloadHours}`;
        const existingWorkloadElement = document.getElementById('lab');
        if (existingWorkloadElement) {
            existingWorkloadElement.textContent = totalWorkloadMessage;
        } else {
            document.body.insertAdjacentHTML('beforeend', `<p id='lab'>${totalWorkloadMessage}</p>`);
        }
    } else {
        console.log('Το στοιχείο δεν βρέθηκε');
    }
}





// Συνάρτηση για την αφαίρεση μαθήματος από το πρόγραμμα
function removeFromSchedule(courseName, courseTime, courseDay) {
    const dayEvents = document.getElementById(courseDay + 'Events');
    if (dayEvents) {
        Array.from(dayEvents.children).forEach(event => {
            if (event.textContent.includes(courseName)) {
                event.remove();
            }
        });
    }
}

function addCourseCheckbox(courseDetails) {
    // Assuming there's a function to generate a checkbox for a single course
    // You can implement this function according to your needs
    const customCourseCheckbox = generateCheckbox(courseDetails.name);
    // Add the time and day information as data attributes to the checkbox
    customCourseCheckbox.dataset.time = courseDetails.time;
    customCourseCheckbox.dataset.day = courseDetails.day;
    const courseListContainer = document.getElementById('courseList');
    courseListContainer.appendChild(customCourseCheckbox);
    customCourseCheckbox.addEventListener('change', function () {
        if (this.checked) {
            const courseName = this.value;
            const courseTime = this.dataset.time;
            const courseDay = this.dataset.day;
            addToSchedule(courseName, courseTime, courseDay); // Προσθήκη του μαθήματος στο πρόγραμμα
        } else {
            // Υποθέτουμε ότι υπάρχει μια συνάρτηση για την αφαίρεση του μαθήματος από το πρόγραμμα
            const courseName = this.value;
            const courseTime = this.dataset.time;
            const courseDay = this.dataset.day;
            removeFromSchedule(courseName, courseTime, courseDay); // Αφαίρεση του μαθήματος από το πρόγραμμα
        }
        const totalWorkloadHours = calculateLabHours();
        const totalWorkloadMessage = `Συνολικές ώρες Εργαστηρίου: ${totalWorkloadHours}`;
        const existingHoursElement = document.getElementById('lab');
        if (existingHoursElement) {
            existingHoursElement.textContent = totalWorkloadMessage;
        } else {
            document.body.insertAdjacentHTML('beforeend', `<p id='lab'>${totalWorkloadMessage}</p>`);
        }
    });
}



function generateCheckbox(courseName) {
    // Create semester header
    const semesterHeader = document.createElement('h2');
    semesterHeader.textContent = `Εργαστηριακά Μαθήματα`;

    // Create list item (li) element
    const courseItem = document.createElement('li');

    // Create checkbox input element
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'course';
    checkbox.value = courseName;
    checkbox.id = courseName.replace(/\s+/g, '-'); // Convert spaces to dashes for ID

    // Create label element for the checkbox
    const label = document.createElement('label');
    label.textContent = courseName;
    label.htmlFor = checkbox.id;

    // Append checkbox and label to list item
    courseItem.appendChild(checkbox);
    courseItem.appendChild(label);

    // Create container div for the list item and header
    const container = document.createElement('div');
    container.appendChild(semesterHeader);
    container.appendChild(courseItem);

    return container;
}

function generateBlockedCheckbox(course, container, semesterNumber) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.disabled = true; // Μπλοκάρει το checkbox
    // Εδώ μπορείς να προσθέσεις το όνομα του μαθήματος ή άλλες πληροφορίες
    checkbox.textContent = course.name;
    // Προσθέτει το checkbox στον κατάλληλο container
    container.appendChild(checkbox);
}

function generateCourseCheckboxes() {
    // Clear any existing content in the courseListContainer
    const courseListContainer = document.getElementById('courseList');
    courseListContainer.innerHTML = '';
    // Get the current date
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Months are zero-indexed

    // Determine the semester based on the month
    let semester;
    let semesterNumbers;

    if (currentMonth === 0 || currentMonth === 1 || currentMonth === 9 || currentMonth === 10 || currentMonth === 11) {
        semester = 'Χειμερινό Εξάμηνο'; // Winter semester for months October to December
        semesterNumbers = ["1", "3", "5", "7", "9"]; // Semesters to display for winter semester
    } else {
        semester = 'Εαρινό Εξάμηνο'; // Spring semester for months March to June
        semesterNumbers = ["2", "4", "6", "8"]; // Semesters to display for spring semester
    }

    // Fetch data only if it's for the current semester
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Group courses by semester
            const coursesBySemester = groupCoursesBySemester(data);
            // Generate checkboxes for the current semester
            semesterNumbers.forEach(semesterNumber => {
                generateCheckBoxes(coursesBySemester[semesterNumber], courseListContainer, semesterNumber);
            });
        })
        .catch(error => console.error('Error loading JSON file:', error));

    // Add a button for adding a custom course
    const addButton = document.createElement('button');
    addButton.textContent = 'Προσθήκη Εργαστηριακού Μαθήματος';
    addButton.setAttribute('id', 'labButton'); // Προσθήκη ID
    addButton.classList.add('btn', 'btn-primary');
    addButton.addEventListener('click', function () {
        // Assuming there's a function to handle adding a custom course
        // You can implement this function according to your needs
        addCustomCourse();
    });
    courseListContainer.appendChild(addButton);
}

function generateCheckBoxes(courses, courseListContainer, semester) {
    // Create semester header
    const semesterHeader = document.createElement('h2');
    semesterHeader.textContent = `Εξάμηνο ${semester}`;
    courseListContainer.appendChild(semesterHeader);

    // Load selected courses from localStorage
    const selectedCourses = Object.keys(localStorage)
        .filter(key => localStorage.getItem(key) === 'true');

    courses.forEach(course => {
        // Έλεγχος για το αν το μάθημα έχει καθορισμένες occurrences
        if (course.occurrences && course.occurrences.length > 0) {
            const courseItem = document.createElement('li');
            const courseName = document.createTextNode(course.name);
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = course.name;
            checkbox.name = course.name;
            checkbox.value = course.name;
    
            // Check if the course is selected
            checkbox.checked = selectedCourses.includes(course.name);
    
            // Disable the checkbox if the course doesn't have occurrences
            checkbox.disabled = !course.occurrences || course.occurrences.length === 0;
    
            courseItem.appendChild(checkbox);
            courseItem.appendChild(courseName);
            courseListContainer.appendChild(courseItem);

            if (!course.occurrences || course.occurrences.some(occurrence => occurrence.day === '' || occurrence.time === '')) {
                checkbox.disabled = true;
            }

            checkbox.addEventListener('change', function () {
                console.log("Αλλαγή κατάστασης checkbox");
                const isChecked = this.checked;
                const labelText = course.name; // Get the course name
                localStorage.setItem(labelText, isChecked);
                // Υπολογίζουμε τον αριθμό των επιλεγμένων checkboxes
                const selectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
                const selectedCount = selectedCheckboxes.length;
                console.log("Επιλεγμένα checkboxes:", selectedCount);
    
                // Αν έχουν επιλεγεί 7 μαθήματα, απενεργοποιούμε τα υπόλοιπα checkboxes
                if (selectedCount >= 7) {
                    const allCheckboxes = document.querySelectorAll('input[type="checkbox"][name^="custom"]:not(:checked)');
                    allCheckboxes.forEach(cb => {
                        cb.disabled = true;
                    });
                } else {
                    // Αν ο αριθμός των επιλεγμένων είναι λιγότερος από 7, ενεργοποιούμε όλα τα checkboxes
                    const allCheckboxes = document.querySelectorAll('input[type="checkbox"][name^="custom"]');
                    allCheckboxes.forEach(cb => {
                        cb.disabled = false;
                    });
                }
                console.log("Επιλεγμένα checkboxes:", selectedCount);
                const allCheckboxes = document.querySelectorAll('input[type="checkbox"][name^="custom"]:not(:checked)');
                console.log("Όλα τα checkboxes:", allCheckboxes);
    
                const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                days.forEach(day => {
                    const dayEvents = document.getElementById(day + 'Events');
                    if (dayEvents) {
                        // Clear existing events for the current day
                        //dayEvents.innerHTML = '';
                        // Generate events for selected course
                        courses.forEach(selectedCourse => {
                            if (localStorage.getItem(selectedCourse.name) === 'true') {
                                selectedCourse.occurrences.forEach(occurrence => {
                                    // Split the time range to get start and end time
                                    if (occurrence.day.toLowerCase() === day.toLowerCase()) {
                                        const [startTime, endTime] = occurrence.time.split('-').map(time => time.trim());
                                        const startHour = parseInt(startTime.split(':')[0], 10);
                                        const endHour = parseInt(endTime.split(':')[0], 10);
    
                                        const startClass = 'start-' + startHour.toString().padStart(1, '0');
                                        const endClass = 'end-' + endHour.toString().padStart(2, '0');
    
                                        // Check if there's an existing event for the same time range
                                        const existingEvent = Array.from(dayEvents.children).find(event =>
                                            event.classList.contains(startClass) && event.classList.contains(endClass)
                                        );
    
                                        if (existingEvent) {
                                            // Append course name to existing event with comma if it's not already there
                                            if (!existingEvent.textContent.includes(selectedCourse.name)) {
                                                existingEvent.textContent += `, ${selectedCourse.name}`;
                                            }
                                        } else {
                                            // Create a new event
                                            const courseEvent = document.createElement('div');
                                            courseEvent.textContent = `${startTime}-${endTime} ${selectedCourse.name}`;
                                            courseEvent.classList.add(startClass, endClass, 'box2');
                                            dayEvents.appendChild(courseEvent);
                                        }
                                    }
                                });
                            }
                        });
    
                    }
                });
    
                const totalWorkloadHours = calculateWorkloadHours();
                const totalECTS = calculateECTS();
                const totalWorkloadMessage = `Συνολικές ώρες φόρτου εργασίας: ${totalWorkloadHours}`;
                const totalECTSMessage = `Συνολικά ECTS: ${totalECTS}`;
                const existingHoursElement = document.getElementById('hours');
                if (existingHoursElement) {
                    existingHoursElement.textContent = totalWorkloadMessage;
                } else {
                    document.body.insertAdjacentHTML('beforeend', `<p id='hours'>${totalWorkloadMessage}</p>`);
                }
                const existingECTSElement = document.getElementById('ECTS');
                if (existingECTSElement) {
                    existingECTSElement.textContent = totalECTSMessage;
                } else {
                    document.body.insertAdjacentHTML('beforeend', `<p id='ECTS'>${totalECTSMessage}</p>`);
                }
            });
        }
    });
}

function calculateWorkloadHours() {
    const selectedCourses = Object.keys(localStorage).filter(key => localStorage.getItem(key) === 'true');
    const workloadPerCourse = 180; // Φορτίο εργασίας ανά μάθημα σε ώρες

    const totalWorkloadHours = selectedCourses.length * workloadPerCourse;

    return totalWorkloadHours;
}

function calculateECTS() {
    const selectedCourses = Object.keys(localStorage).filter(key => localStorage.getItem(key) === 'true');
    const ECTS = 6; // Φορτίο εργασίας ανά μάθημα σε ώρες

    const totalECTS = selectedCourses.length * ECTS;

    return totalECTS;
}


function clearCheckboxState() {
    // Clear localStorage
    localStorage.clear();

    // Uncheck all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Remove specific elements by their IDs
    const elementsToReset = ['hours', 'ECTS', 'lab']; // IDs of the elements to reset
    elementsToReset.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.innerText = ''; // Reset the content if the element exists
        }
    });

    // Remove all dynamically created divs and clear day events containers
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    days.forEach(day => {
        const dayEventsContainers = document.querySelectorAll(`.${day}Events`);
        dayEventsContainers.forEach(container => {
            container.innerHTML = '';
        });
    });
}



//σχολιο 