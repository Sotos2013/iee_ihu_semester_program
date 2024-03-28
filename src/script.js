function handleDropdowns() {
    var dropdownTriggers = document.querySelectorAll('.nav-js .dropdown a');
    var dropdownMenus = document.querySelectorAll('.dropdown-menu');
  
    dropdownTriggers.forEach(function(trigger) {
        trigger.addEventListener('click', function(e) {
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
        var outsideClickListener = function(event) {
            if (!trigger.contains(event.target)) {
                if (!!trigger && !!(trigger.offsetWidth || trigger.offsetHeight || trigger.getClientRects().length)) {
                    trigger.nextElementSibling.classList.toggle('hidden');
                    removeOutsideClickListener();
                }
            }
        };
  
        var removeOutsideClickListener = function() {
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
  
    toggleTriggers.forEach(function(trigger) {
        var targetMenuId = trigger.dataset.target;
        var targetMenu = document.querySelector(targetMenuId);
  
        trigger.addEventListener('click', function() {
            toggleVisibility(targetMenu);
        });
    });
}

handleNavToggles();

function generatePDF() {
    var tableContent = document.getElementById('program').innerHTML;
    var semesterContent = document.getElementById('semester').innerHTML;

    /*var style = "<style>";
    style += "table {width: 100%;font: 17px Calibri;}";
    style += "table, tr, th, td {border: solid 1px #DDD; border-collapse: collapse; text-align: center;}";
    style += "padding: 2px 3px;}";
    style += "</style>";*/

    var linkcss="<link rel='stylesheet' href='style.css'>";

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
