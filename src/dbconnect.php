<?php
// db_connect.php (Λειτουργεί πλέον ως Generator)
require_once('db_config.php');

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Ορισμός charset σε utf8mb4 για να εμφανίζονται σωστά τα Ελληνικά
$mysqli->set_charset("utf8mb4");

if ($mysqli->connect_errno) {
    die("Αποτυχία σύνδεσης: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error);
}

// Ερώτημα SQL
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

// --- Η ΑΛΛΑΓΗ ΕΙΝΑΙ ΕΔΩ ---

// Μετατροπή του πίνακα σε JSON string με "όμορφη" μορφή (PRETTY_PRINT)
$json_content = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

// Όνομα του αρχείου που θα δημιουργηθεί
$filename = 'data.json';

// Εγγραφή στο αρχείο
if (file_put_contents($filename, $json_content)) {
    echo "Επιτυχία! Το αρχείο " . $filename . " δημιουργήθηκε/ενημερώθηκε.";
} else {
    echo "Σφάλμα: Δεν ήταν δυνατή η εγγραφή στο αρχείο. Ελέγξτε τα δικαιώματα φακέλου (permissions).";
}
?>