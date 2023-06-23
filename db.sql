SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

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

CREATE TABLE `c_dynamic` (
  `owner` varchar(200) NOT NULL,
  `dateStart` int(11) NOT NULL,
  `dateEnd` int(11) DEFAULT NULL,
  `monthStart` int(11) NOT NULL,
  `monthEnd` int(11) DEFAULT NULL,
  `yearStart` int(11) NOT NULL,
  `yearEnd` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `c_fixed` (
  `owner` varchar(200) NOT NULL,
  `dateStart` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateEnd` timestamp NOT NULL DEFAULT current_timestamp(),
  `type` varchar(100) NOT NULL,
  `override` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `user` (
  `email` varchar(200) NOT NULL,
  `acc_type` int(11) NOT NULL,
  `password` varchar(100) NOT NULL,
  `pkey` varchar(100) NOT NULL,
  `quota` text NOT NULL,
  `valid_until` datetime NOT NULL DEFAULT current_timestamp(),
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
ALTER TABLE `account_type`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `c_dynamic`
  ADD KEY `user_on_c_dynamic` (`owner`);

ALTER TABLE `c_fixed`
  ADD KEY `user_on_c_fixed` (`owner`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`email`),
  ADD KEY `acc_type_on_user` (`acc_type`);


ALTER TABLE `account_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `c_dynamic`
  ADD CONSTRAINT `user_on_c_dynamic` FOREIGN KEY (`owner`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `c_fixed`
  ADD CONSTRAINT `user_on_c_fixed` FOREIGN KEY (`owner`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `user`
  ADD CONSTRAINT `acc_type_on_user` FOREIGN KEY (`acc_type`) REFERENCES `account_type` (`id`);