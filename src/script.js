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
    var hours = document.getElementById('hours');

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
        if (button.value === 'Εξαγωγή' || button.value === 'Επιλογή μαθημάτων') {
            button.style.display = 'block';

        }
    });

}

function generateCourseCheckboxes() {
    // Clear any existing content in the courseListContainer
    const courseListContainer = document.getElementById('courseList');
    courseListContainer.innerHTML = '';

    // Load data from JSON file using fetch
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Group courses by semester
            const coursesBySemester = groupCoursesBySemester(data);
            // Generate checkboxes for each semester
            Object.keys(coursesBySemester).forEach(semester => {
                generateCheckBoxes(coursesBySemester[semester], courseListContainer, semester);
            });
        })
        .catch(error => console.error('Error loading JSON file:', error));
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

function generateCheckBoxes(courses, courseListContainer, semester) {
    // Create semester header
    const semesterHeader = document.createElement('h2');
    semesterHeader.textContent = `Εξάμηνο ${semester}`;
    courseListContainer.appendChild(semesterHeader);

    // Add courses to the list
    courses.forEach(course => {
        const courseItem = document.createElement('li');
        const courseName = document.createTextNode(course.name);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        courseItem.appendChild(checkbox);
        courseItem.appendChild(courseName);
        courseListContainer.appendChild(courseItem);

        // Set checkbox state based on current month
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        if (course.occurrences.some(occurrence => new Date(occurrence.day).getMonth() === currentMonth)) {
            checkbox.checked = true;
        }
    });
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false; // Αρχικά όλα τα checkboxes είναι απενεργοποιημένα
    
        checkbox.addEventListener('change', function () {
            const labelText = this.nextElementSibling.textContent; // Παίρνουμε το κείμενο του επόμενου αδερφού στο DOM (το label)
            // Αποθήκευση της κατάστασης του checkbox στην τοπική αποθήκη
            localStorage.setItem(this.id, this.checked);
    
            // Φόρτωση δεδομένων από το data.json
            fetch('data.json')
                .then(response => response.json())
                .then(data => {
                    // Έλεγχος αν το checkbox είναι επιλεγμένο
                    if (this.checked) {
                        // Εάν είναι επιλεγμένο, βρίσκουμε το αντίστοιχο μάθημα ανά εξάμηνο και το προσθέτουμε στο πρόγραμμα
                        data.forEach(semester => {
                            const selectedCourse = semester.courses.find(course => course.name === labelText);
                            if (selectedCourse) {
                                selectedCourse.occurrences.forEach(courseOccurrence => {
                                    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                                    days.forEach(day => {
                                        const dayEvents = document.getElementById(day + 'Events');
                                        if (dayEvents && courseOccurrence.day.toLowerCase() === day) {
                                            const [startTime, endTime] = courseOccurrence.time.split('-').map(time => time.trim());
                                            const startHour = parseInt(startTime.split(':')[0], 10);
                                            const endHour = parseInt(endTime.split(':')[0], 10);
                                            const startClass = 'start-' + startHour.toString().padStart(2, '0');
                                            const endClass = 'end-' + endHour.toString().padStart(2, '0');
    
                                            let existingEvent = null;
                                            Array.from(dayEvents.children).forEach(event => {
                                                if (event.classList.contains(startClass) && event.classList.contains(endClass)) {
                                                    existingEvent = event;
                                                }
                                            });
    
                                            if (existingEvent) {
                                                if (!existingEvent.textContent.includes(selectedCourse.name)) {
                                                    existingEvent.textContent += `, ${selectedCourse.name}`;
                                                }
                                            } else {
                                                const courseEvent = document.createElement('div');
                                                courseEvent.textContent = `${startTime}-${endTime} ${selectedCourse.name}`;
                                                courseEvent.classList.add(startClass, endClass, 'box2');
                                                dayEvents.appendChild(courseEvent);
                                            }
                                        }
                                    });
                                });
                            }
                        });
                    } else {
                        // Εάν δεν είναι επιλεγμένο, αφαιρούμε το μάθημα από το πρόγραμμα
                        const events = document.querySelectorAll('.box2');
                        events.forEach(event => {
                            if (event.textContent.includes(labelText)) {
                                event.parentNode.removeChild(event);
                            }
                        });
                    }
                })
                .catch(error => console.error('Error loading data.json:', error));
        });
    });
    
}


function clearCheckboxState() {
    // Clear localStorage
    localStorage.clear();
    
    // Uncheck all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
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