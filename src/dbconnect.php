<?php
// Συμπερίληψη ρυθμίσεων
require_once "db_config.php";

// Σύνδεση με τη νέα απομακρυσμένη βάση δεδομένων
$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Ορισμός charset σε utf8mb4 για τα Ελληνικά (Πολύ σημαντικό για τη νέα βάση!)
$mysqli->set_charset("utf8mb4");

if ($mysqli->connect_errno) {
    die("Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error);
}

// Ερώτημα για ανάκτηση δεδομένων (το ίδιο με πριν)
$sql = "SELECT courses.name AS course_name, 
               course_occurrences.day, 
               course_occurrences.time, 
               courses.semester 
        FROM course_occurrences 
        INNER JOIN courses ON course_occurrences.course_id = courses.id";

$result = $mysqli->query($sql);

// Δημιουργία πίνακα για την αποθήκευση των δεδομένων
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
} else {
    die("Error executing query: " . $mysqli->error);
}

// Κλείσιμο σύνδεσης
$mysqli->close();

// Εγγραφή των δεδομένων στο αρχείο data.json
$file = 'data.json';
// Χρησιμοποιούμε JSON_PRETTY_PRINT για να είναι ευανάγνωστο και JSON_UNESCAPED_UNICODE για τα ελληνικά
if (file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT))) {
    echo "Το αρχείο data.json δημιουργήθηκε επιτυχώς από τη νέα βάση!";
} else {
    echo "Σφάλμα κατά την εγγραφή του αρχείου.";
}
?>