-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Εξυπηρετητής: 127.0.0.1
-- Χρόνος δημιουργίας: 12 Απρ 2024 στις 15:33:16
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
(1106, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1107, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1108, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1109, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1110, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1201, 'Thursday, Friday', '14:00-16:00, 9:00-11:00'),
(1202, 'Monday, Wednesday', '9:00-11:00, 9:00-11:00'),
(1203, 'Friday', '14:00-16:00'),
(1204, 'Monday, Wednesday ', '11:00-13:00, 11:00-13:00'),
(1205, 'Tuesday, Friday', '9:00-11:00, 11:00-13:00'),
(1206, 'Thursday, Friday', '16:00-18:00, 11:00-13:00'),
(1207, 'Monday, Wednesday', '11:00-13:00, 11:00-13:00'),
(1208, 'Monday', '14:00-16:00'),
(1209, 'Monday, Wednesday', '9:00-11:00, 9:00-11:00'),
(1210, 'Tuesday, Friday', '11:00-13:00, 9:00-11:00'),
(1301, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1302, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1303, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1304, 'Monday, Thursday', '14:00-16:00, 9:00-11:00'),
(1305, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1401, 'Wednesday, Friday', '11:00-13:00, 14:00-16:00'),
(1402, 'Monday, Tuesday', '16:00-18:00, 14:00-16:00'),
(1403, 'Monday, Wednesday', '9:00-11:00, 9:00-11:00'),
(1404, 'Monday, Friday', '11:00-13:00, 11:00-13:00'),
(1405, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1501, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1502, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1503, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1504, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1505, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1601, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1602, 'Monday, Wednesday', '11:00-13:00, 9:00-11:00'),
(1611, 'Tuesday, Friday', '9:00-11:00, 9:00-11:00'),
(1612, 'Tuesday, Friday', '11:00-13:00, 11:00-13:00'),
(1613, 'Thursday, Friday', '16:00-18:00, 16:00-18:00'),
(1641, 'Monday, Wednesday ', '14:00-16:00, 11:00-13:00'),
(1642, 'Tuesday, Thursday', '11:00-13:00, 9:00-11:00'),
(1643, 'Tuesday, Wednesday', '9:00-11:00, 11:00-13:00'),
(1671, 'Tuesday, Wednesday', '16:00-18:00, 11:00-13:00'),
(1672, 'Monday', '14:00-16:00'),
(1673, 'Friday', '11:00-13:00'),
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
(1801, 'Monday, Wednesday', '9:00-11:00, 9:00-11:00'),
(1802, 'Tuesday, Thursday', '16:00-18:00, 14:00-16:00'),
(1803, 'Wednesday, Friday', '14:00-16:00, 9:00-11:00'),
(1811, '', ''),
(1812, 'Monday', '11:00-13:00'),
(1839, '', ''),
(1841, '', ''),
(1842, 'Monday, Wednesday', '11:00-13:00, 11:00-13:00'),
(1871, 'Monday, Tuesday', '14:00-16:00, 9:00-11:00'),
(1872, '', ''),
(1873, 'Monday, Tuesday', '16:00-18:00, 11:00-13:00'),
(1874, 'Monday, Tuesday', '11:00-13:00, 11:00-13:00'),
(1898, 'Wednesday', '13:00-16:00'),
(1911, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1912, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1913, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1914, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1915, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00'),
(1916, 'Wednesday', '16:00-18:00'),
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
(1972, 'Monday, Thursday', '14:00-16:00, 9:00-11:00'),
(1973, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1974, 'Monday, Thursday', '16:00-18:00, 11:00-13:00'),
(1975, 'Monday, Wednesday', '9:00-11:00, 14:00-16:00'),
(1998, 'Tuesday, Thursday', '9:00-11:00, 14:00-16:00');

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `course_occurrences`
--
ALTER TABLE `course_occurrences`
  ADD PRIMARY KEY (`course_id`);

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
