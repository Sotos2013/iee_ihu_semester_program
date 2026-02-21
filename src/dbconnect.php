<?php
// db_to_json.php
require_once "db_config.php";

// Απενεργοποιούμε την εμφάνιση σφαλμάτων στην οθόνη για να μη χαλάνε το JSON
error_reporting(0);
ini_set('display_errors', 0);

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
$mysqli->set_charset("utf8mb4");

if ($mysqli->connect_errno) {
    // Αν αποτύχει, στείλε JSON σφάλμα, όχι HTML
    header('Content-Type: application/json');
    die(json_encode(["error" => "Connection failed"]));
}

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
            $occurrences[] = [
                "day" => $day,
                "time" => isset($times[$key]) ? $times[$key] : ""
            ];
        }
        $data[] = [
            "semester" => $row["semester"],
            "name" => $row["course_name"],
            "occurrences" => $occurrences
        ];
    }
}

$mysqli->close();

// Γράφουμε το αρχείο
$json_final = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
file_put_contents('data.json', $json_final);

// ΣΗΜΑΝΤΙΚΟ: Στέλνουμε το JSON και στον browser για το fetch
header('Content-Type: application/json; charset=utf-8');
echo $json_final;
?>