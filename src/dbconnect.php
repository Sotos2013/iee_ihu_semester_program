<?php

// Σύνδεση με τη βάση δεδομένων
$host = 'localhost';
$db = 'program_db';
require_once "db_upass.php";

$user = $DB_USER;
$pass = $DB_PASS;

if (gethostname() == 'users.iee.ihu.gr') {
    $mysqli = new mysqli($host, $user, $pass, $db, null, '/home/student/iee/2019/iee2019187/mysql/run/mysql.sock');
} else {
    $mysqli = new mysqli($host, $user, $pass, $db);
}

if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

// Ερώτημα για ανάκτηση δεδομένων από τον πίνακα course_occurrences
$sql = "SELECT courses.name AS course_name, course_occurrences.day, course_occurrences.time, courses.semester FROM course_occurrences INNER JOIN courses ON course_occurrences.course_id = courses.id";

$result = $mysqli->query($sql);

// Δημιουργία πίνακα για την αποθήκευση των δεδομένων
$data = array();

if ($result) {
    // Αποθήκευση δεδομένων στον πίνακα
    while ($row = $result->fetch_assoc()) {
        $days = explode(", ", $row["day"]); // Διαχωρισμός ημερών
        $times = explode(", ", $row["time"]); // Διαχωρισμός χρόνων
        $occurrences = array(); // Αρχικοποίηση του πίνακα occurrences

        // Δημιουργία αντικειμένων για κάθε ημέρα και ώρα
        foreach ($days as $key => $day) {
            $occurrences[] = array(
                "day" => $day,
                "time" => $times[$key]
            );
        }

        // Αποθήκευση μαθήματος με το πεδίο "semester"
        $data[] = array(
            "semester" => $row["semester"],
            "name" => $row["course_name"],
            "occurrences" => $occurrences
        );
    }
    // Απελευθέρωση αποτελεσμάτων
    $result->free();
} else {
    echo "Error executing query: " . $mysqli->error;
    error_log("Error executing query: " . $mysqli->error);
    exit; // Τερματίστε την εκτέλεση του script σε περίπτωση σφάλματος εκτέλεσης ερωτήματος
}

// Κλείσιμο σύνδεσης
$mysqli->close();

// Εγγραφή των δεδομένων σε ένα JSON αρχείο
$file = '../data.json';
if (file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE))) {
    echo "JSON file has been created successfully.";
} else {
    echo "Error writing JSON file.";
    error_log("Error writing JSON file.");
}

?>