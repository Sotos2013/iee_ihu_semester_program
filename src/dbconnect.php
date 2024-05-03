<?php

// Σύνδεση με τη βάση δεδομένων
$host = 'localhost';
$db = 'program_db';

// Φορτώστε τις πληροφορίες χρήστη από το αρχείο db_upass.php
require_once 'db_upass.php';

// Αποθηκεύστε τις πληροφορίες χρήστη σε μεταβλητές
$user = $DB_USER;
$pass = $DB_PASS;

// Καθορίστε τη σύνδεση με τη βάση δεδομένων
$conn = new mysqli($host, $user, $pass, $db);

// Έλεγχος για σφάλματα σύνδεσης
if ($conn->connect_errno) {
    echo "FAILED to MySQL: (" . $conn->connect_errno . ") " . $conn->connect_error;
    error_log("FAILED to MySQL: (" . $conn->connect_errno . ") " . $conn->connect_error);
    exit; // Τερματίστε την εκτέλεση του script σε περίπτωση σφάλματος σύνδεσης
}

// Ερώτημα για ανάκτηση δεδομένων από τον πίνακα course_occurrences
$sql = "SELECT courses.name AS course_name, course_occurrences.day, course_occurrences.time, courses.semester FROM course_occurrences INNER JOIN courses ON course_occurrences.course_id = courses.id";

$result = $conn->query($sql);

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
    echo "Error executing query: " . $conn->error;
    error_log("Error executing query: " . $conn->error);
    exit; // Τερματίστε την εκτέλεση του script σε περίπτωση σφάλματος εκτέλεσης ερωτήματος
}

// Κλείσιμο σύνδεσης
$conn->close();

// Εγγραφή των δεδομένων σε ένα JSON αρχείο
$file = '../data.json';
if (file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE))) {
    echo "JSON file has been created successfully.";
} else {
    echo "Error writing JSON file.";
    error_log("Error writing JSON file.");
}

?>