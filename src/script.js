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
    //currentDate.setMonth(1); test if winter semester works or not :(
    const currentMonth = currentDate.getMonth(); // Months are zero-indexed

    // Determine the semester based on the month
    let semester;
    if ((currentMonth + 1) % 2 === 0) {
        semester = 'Χειμερινό Εξάμηνο'; // Odd months (1, 3, 5, 7) are spring semester
    } else {
        semester = 'Εαρινό Εξάμηνο'; // Even months (2, 4, 6, 8) are winter semester
    }

    // Create and append the semester title
    const semesterTitle = document.createElement('h2');
    

    // Determine the courses based on the semester
    let courses;
    if (semester === 'Χειμερινό Εξάμηνο') {
        courses = ['Winter Course X', 'Winter Course Y', 'Winter Course Z'];
        // Create columns to display semester titles
        const numColumns = 7; // Adjust the number of columns as needed
        const columnWidth = 100 / numColumns; // Calculate column width in percentage
        for (let i = 1; i <= numColumns; i++) {
            // Create a column div
            const columnDiv = document.createElement('div');
            columnDiv.classList.add('column');
            columnDiv.style.width = `${columnWidth}%`;

            // Determine the semester title based on the column index
            const semesterTitle = i ;
            if(semesterTitle % 2 === 1 ){
            const semesterTitleText = `Εξάμηνο ${semesterTitle}`;

            // Create and append the semester title
            const titleElement = document.createElement('h3');
            titleElement.textContent = semesterTitleText;
            columnDiv.appendChild(titleElement);

            // Create checkboxes for the courses
            courses.forEach(course => {
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
        }}
    } else {
    courses = ['Spring Course A', 'Spring Course B', 'Spring Course C'];
    // Create columns to display semester titles
    const numColumns = 4; // Adjust the number of columns as needed
    const columnWidth = 100 / numColumns; // Calculate column width in percentage
    for (let i = 1; i <= numColumns; i++) {
        // Create a column div
        const columnDiv = document.createElement('div');
        columnDiv.classList.add('column');
        columnDiv.style.width = `${columnWidth}%`;

        // Determine the semester title based on the column index
        const semesterTitle = i * 2;
        const semesterTitleText = `Εξάμηνο ${semesterTitle}`;

        // Create and append the semester title
        const titleElement = document.createElement('h3');
        titleElement.textContent = semesterTitleText;
        columnDiv.appendChild(titleElement);

        // Create checkboxes for the courses
        courses.forEach(course => {
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

   

    

}
