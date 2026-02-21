<?php
// db_connect.php
require_once 'db_config.php';

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

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

// Εγγραφή των δεδομένων σε ένα JSON αρχείο
$file = 'data.json';
if (file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE))) {
    echo "JSON file has been created successfully.";
} else {
    echo "Error writing JSON file.";
    error_log("Error writing JSON file.");
}
?>