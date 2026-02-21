<?php
// db_to_json.php
require_once "db_upass.php"; // Βεβαιώσου ότι εδώ έχεις τα σωστά $DB_USER, $DB_PASS

$host = 'sql7.freesqldatabase.com';
$db   = 'sql7817711y';
$user = $DB_USER;
$pass = $DB_PASS;

// Σύνδεση Cloud: Ποτέ μην βάζεις socket ή localhost για εξωτερική βάση
$mysqli = new mysqli($host, $user, $pass, $db);

// Πολύ σημαντικό για να μην είναι κενά τα ελληνικά ονόματα
$mysqli->set_charset("utf8mb4");

if ($mysqli->connect_error) {
    die("Σφάλμα Σύνδεσης: " . $mysqli->connect_error);
}

// Το query σου
$sql = "SELECT courses.name AS course_name, course_occurrences.day, course_occurrences.time, courses.semester 
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

// Εγγραφή - Χρησιμοποίησε JSON_PRETTY_PRINT για να δεις αν γράφτηκε κάτι
$json_string = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

if (empty($data)) {
    die("Σφάλμα: Η βάση επέστρεψε 0 αποτελέσματα. Ελέγξτε αν οι πίνακες έχουν δεδομένα.");
}

$file = 'data.json';
if (file_put_contents($file, $json_string)) {
    echo "Επιτυχία! Το αρχείο data.json δημιουργήθηκε με " . count($data) . " μαθήματα.\n";
} else {
    echo "Σφάλμα εγγραφής αρχείου. Δοκίμασε: chmod 777 " . getcwd() . "\n";
}
?>