-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2023 at 03:00 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db`
--
CREATE DATABASE IF NOT EXISTS `db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `db`;

-- --------------------------------------------------------

--
-- Table structure for table `account_type`
--

CREATE TABLE `account_type` (
  `id` int(11) NOT NULL,
  `c_fixed` int(11) NOT NULL,
  `c_dynamic` int(11) NOT NULL,
  `c_override` int(11) NOT NULL,
  `c_perm` text NOT NULL DEFAULT '{}',
  `q_nation_cap` int(11) NOT NULL,
  `q_year_limit` int(11) NOT NULL,
  `q_deviation_limit` int(11) NOT NULL,
  `q_range_limit` int(11) NOT NULL,
  `q_perm` text NOT NULL DEFAULT '{}'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account_type`
--

INSERT INTO `account_type` (`id`, `c_fixed`, `c_dynamic`, `c_override`, `c_perm`, `q_nation_cap`, `q_year_limit`, `q_deviation_limit`, `q_range_limit`, `q_perm`) VALUES
(1, 1, 1, 1, '{dd}', 1, 1, 1, 1, '{dd}'),
(2, 2, 2, 2, '{ee}', 2, 2, 2, 2, '{2}');

-- --------------------------------------------------------

--
-- Table structure for table `calendardynamic`
--

CREATE TABLE `calendardynamic` (
  `id` int(11) NOT NULL,
  `owner` int(11) NOT NULL,
  `dateStart` datetime NOT NULL,
  `dateEnd` datetime NOT NULL,
  `type` varchar(255) NOT NULL,
  `information` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `calendardynamic`
--

INSERT INTO `calendardynamic` (`id`, `owner`, `dateStart`, `dateEnd`, `type`, `information`, `createdAt`, `updatedAt`) VALUES
(3, 1, '2023-06-01 07:00:00', '2023-06-30 07:00:00', 'KERJA', 'Informasi mengenai KERJA', '2023-06-24 05:24:17', '2023-06-24 06:01:26');

-- --------------------------------------------------------

--
-- Table structure for table `calendarfixed`
--

CREATE TABLE `calendarfixed` (
  `id` int(11) NOT NULL,
  `owner` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `type` varchar(255) NOT NULL,
  `information` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `calendarfixed`
--

INSERT INTO `calendarfixed` (`id`, `owner`, `date`, `type`, `information`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2023-06-29 07:00:00', 'LIBUR', 'Informasi mengenai libur', '2023-06-24 06:36:38', '2023-06-24 06:36:38'),
(3, 1, '2023-07-29 07:00:00', 'KERJA', 'Informasi mengenai KERJA', '2023-06-24 07:18:09', '2023-06-24 07:18:09'),
(4, 1, '2023-07-29 07:00:00', 'KERJA', 'Informasi mengenai KERJA', '2023-06-24 07:25:13', '2023-06-24 07:25:13'),
(5, 1, '2023-07-29 07:00:00', 'KERJA', 'Informasi mengenai KERJA', '2023-06-24 07:31:13', '2023-06-24 07:31:13');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `acc_type` int(11) NOT NULL,
  `password` varchar(100) NOT NULL,
  `saldo` int(25) DEFAULT NULL,
  `pkey` varchar(100) DEFAULT NULL,
  `quota` int(11) DEFAULT NULL,
  `valid_until` datetime NOT NULL DEFAULT current_timestamp(),
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `acc_type`, `password`, `saldo`, `pkey`, `quota`, `valid_until`, `createdAt`, `updatedAt`) VALUES
(1, 'example1@example.com', 2, '123', 100, 'd1', 95, '2023-06-23 23:03:06', '2023-06-23 23:03:06', '2023-06-24 07:33:31'),
(2, 'example2@example.com', 1, '123', NULL, NULL, NULL, '2023-06-24 06:57:21', '2023-06-24 06:57:21', '2023-06-24 06:57:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_type`
--
ALTER TABLE `account_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `calendardynamic`
--
ALTER TABLE `calendardynamic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner` (`owner`);

--
-- Indexes for table `calendarfixed`
--
ALTER TABLE `calendarfixed`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner` (`owner`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `acc_type_on_user` (`acc_type`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account_type`
--
ALTER TABLE `account_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `calendardynamic`
--
ALTER TABLE `calendardynamic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `calendarfixed`
--
ALTER TABLE `calendarfixed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `calendardynamic`
--
ALTER TABLE `calendardynamic`
  ADD CONSTRAINT `calendardynamic_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `user` (`id`);

--
-- Constraints for table `calendarfixed`
--
ALTER TABLE `calendarfixed`
  ADD CONSTRAINT `calendarfixed_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `user` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `acc_type_on_user` FOREIGN KEY (`acc_type`) REFERENCES `account_type` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
