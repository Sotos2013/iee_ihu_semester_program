<?php

// Σύνδεση με τη βάση δεδομένων
$host='localhost';
$db ='courses_db';
require_once 'db_user_pass.php';
$user=$DB_USER;
$pass=$DB_PASS;

if(gethostname()=='users.iee.ihu.gr') {
$conn = new mysqli($servername, $username, $password, $database,'/home/student/iee/2019/iee2019187/mysql/run/mysql.sock');
} else {
        $conn = new mysqli($host, $user, $pass, $db);
}
if ($conn->connect_errno) {
    echo " to MySQL: (" . 
    $conn->connect_errno . ") " . $conn->connect_error;
}

// Ερώτημα για ανάκτηση δεδομένων από τον πίνακα course_occurrences
$sql = "SELECT courses.name AS course_name, course_occurrences.day, course_occurrences.time, courses.semester FROM course_occurrences INNER JOIN courses ON course_occurrences.course_id = courses.id";

$result = $conn->query($sql);

// Δημιουργία πίνακα για την αποθήκευση των δεδομένων
$data = array();

if ($result->num_rows > 0) {
  // Αποθήκευση δεδομένων στον πίνακα
  while($row = $result->fetch_assoc()) {
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
}

// Απελευθέρωση αποτελεσμάτων και κλείσιμο σύνδεσης
$result->free_result();
$conn->close();

// Εγγραφή των δεδομένων σε ένα JSON αρχείο
$file = 'data.json';
file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE));

echo "JSON file has been created successfully.";

?>
