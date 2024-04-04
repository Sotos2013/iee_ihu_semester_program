-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Εξυπηρετητής: 127.0.0.1
-- Χρόνος δημιουργίας: 05 Απρ 2024 στις 00:47:33
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
(1201, 'Μαθηματικά ΙΙ', 2),
(1202, 'Μετρήσεις και Κυκλώματα Εναλλασσόμενου Ρεύματος', 2),
(1203, 'Τεχνική Συγγραφή, Παρουσίαση και Ορολογία Ξένης Γλώσσας', 2),
(1204, 'Σχεδίαση Ψηφιακών Συστημάτων', 2),
(1205, 'Αντικειμενοστρεφής Προγραμματισμός', 2),
(1304, 'Οργάνωση και Αρχιτεκτονική Υπολογιστικών Συστημάτων', 4),
(1401, 'Συστήματα Διαχείρισης Βάσεων Δεδομένων', 4),
(1402, 'Τηλεπικοινωνιακά Συστήματα', 4),
(1403, 'Εισαγωγή στα Λειτουργικά Συστήματα', 4),
(1404, 'Ηλεκτρονικά Κυκλώματα', 4),
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
(1948, 'Ανάπτυξη Ολοκληρωμένων Πληροφοριακών Συστημάτων', 9);

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
(1202, 'Tuesday, Friday', '9:00-11:00, 14:00-16:00'),
(1203, 'Wednesday, Thursday', '9:00-11:00, 16:00-18:00'),
(1204, 'Thursday, Monday', '14:00-16:00'),
(1205, 'Friday, Tuesday', '11:00-13:00, 14:00-16:00'),
(1304, 'Monday, Thursday', '11:00-13:00, 14:00-16:00'),
(1401, 'Tuesday, Friday', '18:00-20:00, 14:00-16:00'),
(1402, 'Wednesday, Saturday', '11:00-13:00, 14:00-16:00'),
(1403, 'Thursday, Monday', '11:00-13:00, 14:00-16:00'),
(1404, 'Friday, Tuesday', '9:00-11:00, 14:00-16:00'),
(1601, 'Monday, Wednesday', '11:00-13:00, 14:00-16:00'),
(1602, 'Tuesday, Thursday', '14:00-16:00'),
(1611, 'Wednesday, Friday', '10:00-12:00, 14:00-16:00'),
(1612, 'Thursday, Saturday', '10:00-12:00, 14:00-16:00'),
(1613, 'Friday, Monday', '10:00-12:00, 14:00-16:00'),
(1641, 'Wednesday, Saturday', '10:00-12:00, 14:00-16:00'),
(1642, 'Thursday, Monday', '10:00-12:00, 14:00-16:00'),
(1643, 'Friday, Tuesday', '10:00-12:00, 14:00-16:00'),
(1671, 'Saturday, Wednesday', '10:00-12:00, 14:00-16:00'),
(1672, 'Monday, Thursday', '10:00-12:00, 14:00-16:00'),
(1673, 'Tuesday, Friday', '10:00-12:00, 14:00-16:00'),
(1801, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1802, 'Tuesday, Thursday', '10:00-12:00, 14:00-16:00'),
(1803, 'Wednesday, Friday', '9:00-11:00, 13:00-15:00'),
(1811, 'Thursday, Saturday', '10:00-12:00, 14:00-16:00'),
(1812, 'Friday, Monday', '9:00-11:00, 14:00-16:00'),
(1839, 'Saturday, Wednesday', '10:00-12:00, 14:00-16:00'),
(1841, 'Monday, Wednesday', '10:00-12:00, 14:00-16:00'),
(1842, 'Monday, Thursday', '9:00-11:00, 13:00-15:00'),
(1871, 'Monday, Thursday', '9:00-11:00, 13:00-15:00'),
(1872, 'Tuesday, Friday', '10:00-12:00, 14:00-16:00'),
(1873, 'Wednesday, Saturday', '9:00-11:00, 13:00-15:00'),
(1874, 'Thursday, Monday', '10:00-12:00, 14:00-16:00'),
(1898, 'Friday, Tuesday', '9:00-11:00, 13:00-15:00'),
(1948, 'Tuesday, Friday', '10:00-12:00, 14:00-16:00');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1949;

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
