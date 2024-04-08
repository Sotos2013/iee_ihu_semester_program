-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Εξυπηρετητής: 127.0.0.1
-- Χρόνος δημιουργίας: 08 Απρ 2024 στις 10:12:01
-- Έκδοση διακομιστή: 10.4.32-MariaDB
-- Έκδοση PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `courses_db`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `semester` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Άδειασμα δεδομένων του πίνακα `courses`
--

INSERT INTO `courses` (`id`, `name`, `semester`) VALUES
(1101, 'Μαθηματικά Ι', 1),
(1102, 'Δομημένος Προγραμματισμός', 1),
(1103, 'Εισαγωγή στην Επιστήμη των Υπολογιστών', 1),
(1104, 'Ηλεκτρονική Φυσική', 1),
(1105, 'Κυκλώματα Συνεχούς Ρεύματος', 1),
(1201, 'Μαθηματικά ΙΙ', 2),
(1202, 'Μετρήσεις και Κυκλώματα Εναλλασσόμενου Ρεύματος', 2),
(1203, 'Τεχνική Συγγραφή, Παρουσίαση και Ορολογία Ξένης Γλώσσας', 2),
(1204, 'Σχεδίαση Ψηφιακών Συστημάτων', 2),
(1205, 'Αντικειμενοστρεφής Προγραμματισμός', 2),
(1301, 'Θεωρία Πιθανοτήτων και Στατιστική', 3),
(1302, 'Μαθηματικά ΙΙΙ', 3),
(1303, 'Επεξεργασία Σήματος', 3),
(1304, 'Οργάνωση και Αρχιτεκτονική Υπολογιστικών Συστημάτων', 4),
(1305, 'Δομές Δεδομένων και Ανάλυση Αλγορίθμων', 3),
(1401, 'Συστήματα Διαχείρισης Βάσεων Δεδομένων', 4),
(1402, 'Τηλεπικοινωνιακά Συστήματα', 4),
(1403, 'Εισαγωγή στα Λειτουργικά Συστήματα', 4),
(1404, 'Ηλεκτρονικά Κυκλώματα', 4),
(1405, 'Γλώσσες και Τεχνολογίες Ιστού', 3),
(1501, 'Ασύρματες Επικοινωνίες', 5),
(1502, 'Μικροελεγκτές', 5),
(1503, 'Σχεδίαση Λειτουργικών Συστημάτων', 5),
(1504, 'Ηλεκτρονικές Διατάξεις', 5),
(1505, 'Αλληλεπίδραση Ανθρώπου-Μηχανής', 5),
(1601, 'Τεχνητή Νοημοσύνη', 6),
(1602, 'Ενσωματωμένα Συστήματα', 6),
(1611, 'Σύνθεση Ηλεκτρονικών Κυκλωμάτων', 6),
(1612, 'Κβαντική Υπολογιστική', 6),
(1613, 'Μεθοδολογίες Σχεδιασμού Μικροηλεκτρονικών Κυκλωμάτων', 6),
(1641, 'Αριθμητικές Μέθοδοι', 6),
(1642, 'Προηγμένα Θέματα Αλληλεπίδρασης (Προγραμματισμός Κινητών Συσκευών)', 6),
(1643, 'Διοίκηση Έργων', 6),
(1671, 'Μικροκυματική Τεχνολογία και Τηλεπισκόπηση', 6),
(1672, 'Οπτοηλεκτρονική και Οπτικές Επικοινωνίες', 6),
(1673, 'Συστήματα Μέσων Μαζικής Επικοινωνίας', 6),
(1701, 'Δίκτυα Υπολογιστών', 7),
(1702, 'Ηλεκτρονικά Ισχύος', 7),
(1711, 'Συστήματα Αυτομάτου Ελέγχου', 7),
(1712, 'Αισθητήρια και Επεξεργασία Μετρήσεων', 7),
(1713, 'Προγραμματιζόμενοι Λογικοί Ελεγκτές', 7),
(1714, 'Σχεδίαση Επαναπροσδιοριζόμενων Ψηφιακών Συστημάτων (FPGA)', 7),
(1741, 'Εισαγωγή στην Αναλυτική των Δεδομένων', 7),
(1742, 'Μηχανική Λογισμικού', 7),
(1743, 'Τεχνολογία Βάσεων Δεδομένων', 7),
(1744, 'Προηγμένες Αρχιτεκτονικές Υπολογιστών και Προγραμματισμός Παράλληλων Συστημάτων', 7),
(1771, 'Τεχνολογίες Ήχου και Εικόνας', 7),
(1801, 'Ασφάλεια Πληροφοριακών Συστημάτων', 8),
(1802, 'Αρχές και Μέθοδοι Μηχανικής Μάθησης', 8),
(1803, 'Διαδίκτυο των Πραγμάτων', 8),
(1811, 'Εφαρμογές Συστημάτων Αυτομάτου Ελέγχου', 8),
(1812, 'Μετατροπείς Ισχύος', 8),
(1839, 'Ηλεκτροκίνηση και Ευφυή Δίκτυα', 8),
(1841, 'Οργάνωση Δεδομένων και Εξόρυξη Πληροφορίας', 8),
(1842, 'Διαδικτυακές Υπηρεσίες Προστιθέμενης Αξίας', 8),
(1871, 'Ασύρματα Δίκτυα', 8),
(1872, 'Ειδικά Θέματα Δικτύων (CCNA) 1', 8),
(1873, 'Προηγμένα Θέματα Δικτύων', 8),
(1874, 'Συστήματα Κινητών Επικοινωνιών', 8),
(1898, 'Ελεύθερη Επιλογή Β', 8),
(1911, 'Εφαρμογές Ενσωματωμένων Συστημάτων', 9),
(1912, 'Ρομποτική', 9),
(1913, 'ΑΠΕ και Ευφυή Ηλεκτρικά Δίκτυα', 9),
(1914, 'Απτικές Διεπαφές', 9),
(1915, 'Βιοϊατρική Τεχνολογία', 9),
(1916, 'Συστήματα Μετρήσεων Υποβοηθούμενων από Η/Υ', 9),
(1941, 'Ανάπτυξη Διαδικτυακών Συστημάτων και Εφαρμογών', 9),
(1942, 'Επιχειρησιακή Έρευνα', 9),
(1943, 'Ανάκτηση Πληροφοριών – Μηχανές Αναζήτησης', 9),
(1944, 'Διαχείριση Συστήματος και Υπηρεσιών DBMS', 9),
(1945, 'Ευφυή Συστήματα', 9),
(1946, 'Προηγμένα Θέματα Τεχνητής Νοημοσύνης', 9),
(1947, 'Προηγμένη Μηχανική Μάθηση', 9),
(1948, 'Ανάπτυξη Ολοκληρωμένων Πληροφοριακών Συστημάτων', 8),
(1949, 'Κατανεμημένα Συστήματα', 9),
(1950, 'Σημασιολογικός Ιστός', 9),
(1969, 'Γραφικά Υπολογιστών', 9),
(1971, 'Ασφάλεια Δικτύων και Επικοινωνιών', 9),
(1972, 'Δικτύωση Καθορισμένη από Λογισμικό', 9),
(1973, 'Ειδικά Θέματα Δικτύων (CCNA) 2', 9),
(1974, 'Δορυφορικές Επικοινωνίες', 9),
(1975, 'Τεχνολογία Πολυμέσων', 9),
(1998, 'Ελεύθερη Επιλογή Α', 7);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `course_occurrences`
--

CREATE TABLE `course_occurrences` (
  `course_id` int(11) NOT NULL,
  `day` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Άδειασμα δεδομένων του πίνακα `course_occurrences`
--

INSERT INTO `course_occurrences` (`course_id`, `day`, `time`) VALUES
(1101, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1102, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1103, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1104, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1105, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1201, 'Monday, Wednesday', '11:00-13:00, 14:00-16:00'),
(1202, 'Tuesday, Friday', '9:00-11:00, 14:00-16:00'),
(1203, 'Monday, Wednesday', '11:00-13:00, 14:00-16:00'),
(1204, 'Tuesday, Thursday', '11:00-13:00, 14:00-16:00'),
(1205, 'Monday, Wednesday', '11:00-13:00, 14:00-16:00'),
(1301, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1302, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1303, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1304, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1305, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1401, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1402, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1403, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1404, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1405, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1501, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1502, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1503, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1504, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1505, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1601, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1602, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1611, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1612, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1613, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1641, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1642, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1643, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1671, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1672, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1673, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1701, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1702, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1711, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1712, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1713, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1714, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1741, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1742, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1743, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1744, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1771, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1801, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1802, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1803, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1811, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1812, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1839, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1841, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1842, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1871, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1872, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1873, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1874, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1898, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1911, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1912, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1913, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1914, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1915, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1916, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1941, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1942, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1943, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1944, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1945, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1946, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1947, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1948, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1949, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1950, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1969, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1971, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1972, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1973, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1974, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1975, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1998, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00');

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Ευρετήρια για πίνακα `course_occurrences`
--
ALTER TABLE `course_occurrences`
  ADD PRIMARY KEY (`course_id`);

--
-- AUTO_INCREMENT για άχρηστους πίνακες
--

--
-- AUTO_INCREMENT για πίνακα `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1999;

--
-- Περιορισμοί για άχρηστους πίνακες
--

--
-- Περιορισμοί για πίνακα `course_occurrences`
--
ALTER TABLE `course_occurrences`
  ADD CONSTRAINT `course_occurrences_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
