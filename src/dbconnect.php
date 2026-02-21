<?php
// Στοιχεία σύνδεσης από το FreeSQLDatabase email
$host = 'sql7.freesqldatabase.com'; // Αντικατάστησε το X με τον αριθμό που σου έδωσαν
$db   = 'sql7817711';               // Το όνομα της βάσης δεδομένων
$user = 'sql7817711';               // Το όνομα χρήστη
$pass = '4g3XGcUAZN';              // Ο κωδικός πρόσβασης

// Σύνδεση με τη βάση δεδομένων
$mysqli = new mysqli($host, $user, $pass, $db);

// Ορισμός charset σε utf8mb4 για να εμφανίζονται σωστά τα Ελληνικά
$mysqli->set_charset("utf8mb4");

if ($mysqli->connect_errno) {
    die("Αποτυχία σύνδεσης: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error);
}

// Ερώτημα SQL (Inner Join για να πάρουμε όνομα, εξάμηνο και ώρες)
$sql = "SELECT courses.name AS course_name, 
               course_occurrences.day, 
               course_occurrences.time, 
               courses.semester 
        FROM course_occurrences 
        INNER JOIN courses ON course_occurrences.course_id = courses.id";

$result = $mysqli->query($sql);
$data = array();

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $days = explode(", ", $row["day"]);
        $times = explode(", ", $row["time"]);
        $occurrences = array();

        foreach ($days as $key => $day) {
            $occurrences[] = array(
                "day" => $day,
                "time" => isset($times[$key]) ? $times[$key] : ""
            );
        }

        $data[] = array(
            "semester" => $row["semester"],
            "name" => $row["course_name"],
            "occurrences" => $occurrences
        );
    }
    $result->free();
}

$mysqli->close();

// Επιστροφή των δεδομένων απευθείας σε JSON μορφή για το script.js
header('Content-Type: application/json; charset=utf-8');
echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>