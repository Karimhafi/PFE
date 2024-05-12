-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 12 mai 2024 à 00:26
-- Version du serveur : 8.3.0
-- Version de PHP : 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `movie`
--

-- --------------------------------------------------------

--
-- Structure de la table `cinemas`
--

DROP TABLE IF EXISTS `cinemas`;
CREATE TABLE IF NOT EXISTS `cinemas` (
  `cinema_id` int NOT NULL AUTO_INCREMENT,
  `cinema_name` varchar(255) NOT NULL,
  `cinema_address` text,
  PRIMARY KEY (`cinema_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `listmovie`
--

DROP TABLE IF EXISTS `listmovie`;
CREATE TABLE IF NOT EXISTS `listmovie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `movie_id` int NOT NULL,
  `movie_title` varchar(50) NOT NULL,
  `added_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `movie_id` (`movie_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `listmovie`
--

INSERT INTO `listmovie` (`id`, `user_id`, `movie_id`, `movie_title`, `added_on`) VALUES
(1, 6, 823464, 'Godzilla x Kong: The New Empire', '2024-04-28 18:07:08'),
(2, 8, 823464, 'Godzilla x Kong: The New Empire', '2024-04-29 20:56:11'),
(3, 8, 359410, 'Road House', '2024-04-29 20:56:29'),
(4, 8, 1022690, 'Ricky Stanicky', '2024-04-29 20:56:33'),
(5, 8, 29140, 'The 4th Man', '2024-04-29 20:56:37'),
(6, 8, 1096197, 'No Way Up', '2024-04-29 20:56:46');

-- --------------------------------------------------------

--
-- Structure de la table `listtv`
--

DROP TABLE IF EXISTS `listtv`;
CREATE TABLE IF NOT EXISTS `listtv` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `tv_id` int NOT NULL,
  `tv_title` varchar(50) NOT NULL,
  `added_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `tv_id` (`tv_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `listtv`
--

INSERT INTO `listtv` (`id`, `user_id`, `tv_id`, `tv_title`, `added_on`) VALUES
(1, 6, 8590, 'Plus belle la vie', '2024-04-28 18:07:04'),
(2, 8, 22980, 'Watch What Happens Live with Andy Cohen', '2024-04-29 20:57:10');

-- --------------------------------------------------------

--
-- Structure de la table `movies`
--

DROP TABLE IF EXISTS `movies`;
CREATE TABLE IF NOT EXISTS `movies` (
  `movie_id` int NOT NULL,
  `title` varchar(20) NOT NULL,
  `genre` varchar(20) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `director` varchar(20) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`movie_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `seats`
--

DROP TABLE IF EXISTS `seats`;
CREATE TABLE IF NOT EXISTS `seats` (
  `seat_id` int NOT NULL AUTO_INCREMENT,
  `showtime_id` int DEFAULT NULL,
  `seat_number` int DEFAULT NULL,
  `is_booked` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`seat_id`),
  KEY `showtime_id` (`showtime_id`)
) ENGINE=MyISAM AUTO_INCREMENT=701 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `seats`
--

INSERT INTO `seats` (`seat_id`, `showtime_id`, `seat_number`, `is_booked`) VALUES
(401, 10, 1, 1),
(402, 10, 2, 0),
(403, 10, 3, 0),
(404, 10, 4, 0),
(405, 10, 5, 0),
(406, 10, 6, 0),
(407, 10, 7, 0),
(408, 10, 8, 0),
(409, 10, 9, 0),
(410, 10, 10, 0),
(411, 10, 11, 0),
(412, 10, 12, 0),
(413, 10, 13, 0),
(414, 10, 14, 0),
(415, 10, 15, 0),
(416, 10, 16, 0),
(417, 10, 17, 0),
(418, 10, 18, 0),
(419, 10, 19, 0),
(420, 10, 20, 0),
(421, 10, 21, 0),
(422, 10, 22, 0),
(423, 10, 23, 0),
(424, 10, 24, 0),
(425, 10, 25, 0),
(426, 10, 26, 0),
(427, 10, 27, 0),
(428, 10, 28, 0),
(429, 10, 29, 0),
(430, 10, 30, 0),
(431, 10, 31, 0),
(432, 10, 32, 0),
(433, 10, 33, 0),
(434, 10, 34, 0),
(435, 10, 35, 0),
(436, 10, 36, 0),
(437, 10, 37, 0),
(438, 10, 38, 0),
(439, 10, 39, 0),
(440, 10, 40, 0),
(441, 10, 41, 0),
(442, 10, 42, 0),
(443, 10, 43, 0),
(444, 10, 44, 0),
(445, 10, 45, 0),
(446, 10, 46, 0),
(447, 10, 47, 0),
(448, 10, 48, 0),
(449, 10, 49, 0),
(450, 10, 50, 0),
(451, 10, 51, 0),
(452, 10, 52, 0),
(453, 10, 53, 0),
(454, 10, 54, 0),
(455, 10, 55, 0),
(456, 10, 56, 0),
(457, 10, 57, 0),
(458, 10, 58, 0),
(459, 10, 59, 0),
(460, 10, 60, 0),
(461, 10, 61, 0),
(462, 10, 62, 0),
(463, 10, 63, 0),
(464, 10, 64, 0),
(465, 10, 65, 0),
(466, 10, 66, 0),
(467, 10, 67, 0),
(468, 10, 68, 0),
(469, 10, 69, 0),
(470, 10, 70, 0),
(471, 10, 71, 0),
(472, 10, 72, 0),
(473, 10, 73, 0),
(474, 10, 74, 0),
(475, 10, 75, 0),
(476, 10, 76, 0),
(477, 10, 77, 0),
(478, 10, 78, 0),
(479, 10, 79, 0),
(480, 10, 80, 0),
(481, 10, 81, 0),
(482, 10, 82, 0),
(483, 10, 83, 0),
(484, 10, 84, 0),
(485, 10, 85, 0),
(486, 10, 86, 0),
(487, 10, 87, 0),
(488, 10, 88, 0),
(489, 10, 89, 0),
(490, 10, 90, 0),
(491, 10, 91, 0),
(492, 10, 92, 0),
(493, 10, 93, 0),
(494, 10, 94, 0),
(495, 10, 95, 0),
(496, 10, 96, 0),
(497, 10, 97, 0),
(498, 10, 98, 0),
(499, 10, 99, 0),
(500, 10, 100, 0),
(501, 11, 1, 0),
(502, 11, 2, 1),
(503, 11, 3, 0),
(504, 11, 4, 0),
(505, 11, 5, 0),
(506, 11, 6, 0),
(507, 11, 7, 0),
(508, 11, 8, 0),
(509, 11, 9, 0),
(510, 11, 10, 0),
(511, 11, 11, 0),
(512, 11, 12, 0),
(513, 11, 13, 0),
(514, 11, 14, 0),
(515, 11, 15, 0),
(516, 11, 16, 0),
(517, 11, 17, 0),
(518, 11, 18, 0),
(519, 11, 19, 0),
(520, 11, 20, 0),
(521, 11, 21, 0),
(522, 11, 22, 0),
(523, 11, 23, 0),
(524, 11, 24, 0),
(525, 11, 25, 0),
(526, 11, 26, 0),
(527, 11, 27, 0),
(528, 11, 28, 0),
(529, 11, 29, 0),
(530, 11, 30, 0),
(531, 11, 31, 0),
(532, 11, 32, 0),
(533, 11, 33, 0),
(534, 11, 34, 0),
(535, 11, 35, 0),
(536, 11, 36, 0),
(537, 11, 37, 0),
(538, 11, 38, 0),
(539, 11, 39, 0),
(540, 11, 40, 0),
(541, 11, 41, 0),
(542, 11, 42, 0),
(543, 11, 43, 0),
(544, 11, 44, 0),
(545, 11, 45, 0),
(546, 11, 46, 0),
(547, 11, 47, 0),
(548, 11, 48, 0),
(549, 11, 49, 0),
(550, 11, 50, 0),
(551, 11, 51, 0),
(552, 11, 52, 0),
(553, 11, 53, 0),
(554, 11, 54, 0),
(555, 11, 55, 0),
(556, 11, 56, 0),
(557, 11, 57, 0),
(558, 11, 58, 0),
(559, 11, 59, 0),
(560, 11, 60, 0),
(561, 11, 61, 0),
(562, 11, 62, 0),
(563, 11, 63, 0),
(564, 11, 64, 0),
(565, 11, 65, 0),
(566, 11, 66, 0),
(567, 11, 67, 0),
(568, 11, 68, 0),
(569, 11, 69, 0),
(570, 11, 70, 0),
(571, 11, 71, 0),
(572, 11, 72, 0),
(573, 11, 73, 0),
(574, 11, 74, 0),
(575, 11, 75, 0),
(576, 11, 76, 0),
(577, 11, 77, 0),
(578, 11, 78, 0),
(579, 11, 79, 0),
(580, 11, 80, 0),
(581, 11, 81, 0),
(582, 11, 82, 0),
(583, 11, 83, 0),
(584, 11, 84, 0),
(585, 11, 85, 0),
(586, 11, 86, 0),
(587, 11, 87, 0),
(588, 11, 88, 0),
(589, 11, 89, 0),
(590, 11, 90, 0),
(591, 11, 91, 0),
(592, 11, 92, 0),
(593, 11, 93, 0),
(594, 11, 94, 0),
(595, 11, 95, 0),
(596, 11, 96, 0),
(597, 11, 97, 0),
(598, 11, 98, 0),
(599, 11, 99, 0),
(600, 11, 100, 0),
(601, 12, 1, 0),
(602, 12, 2, 0),
(603, 12, 3, 0),
(604, 12, 4, 0),
(605, 12, 5, 0),
(606, 12, 6, 0),
(607, 12, 7, 0),
(608, 12, 8, 0),
(609, 12, 9, 0),
(610, 12, 10, 0),
(611, 12, 11, 0),
(612, 12, 12, 0),
(613, 12, 13, 0),
(614, 12, 14, 0),
(615, 12, 15, 0),
(616, 12, 16, 0),
(617, 12, 17, 0),
(618, 12, 18, 0),
(619, 12, 19, 0),
(620, 12, 20, 0),
(621, 12, 21, 0),
(622, 12, 22, 0),
(623, 12, 23, 0),
(624, 12, 24, 0),
(625, 12, 25, 0),
(626, 12, 26, 0),
(627, 12, 27, 0),
(628, 12, 28, 0),
(629, 12, 29, 0),
(630, 12, 30, 0),
(631, 12, 31, 0),
(632, 12, 32, 0),
(633, 12, 33, 0),
(634, 12, 34, 0),
(635, 12, 35, 0),
(636, 12, 36, 0),
(637, 12, 37, 0),
(638, 12, 38, 0),
(639, 12, 39, 0),
(640, 12, 40, 0),
(641, 12, 41, 0),
(642, 12, 42, 0),
(643, 12, 43, 0),
(644, 12, 44, 0),
(645, 12, 45, 0),
(646, 12, 46, 0),
(647, 12, 47, 0),
(648, 12, 48, 0),
(649, 12, 49, 0),
(650, 12, 50, 0),
(651, 12, 51, 0),
(652, 12, 52, 0),
(653, 12, 53, 0),
(654, 12, 54, 0),
(655, 12, 55, 0),
(656, 12, 56, 0),
(657, 12, 57, 0),
(658, 12, 58, 0),
(659, 12, 59, 0),
(660, 12, 60, 0),
(661, 12, 61, 0),
(662, 12, 62, 0),
(663, 12, 63, 0),
(664, 12, 64, 0),
(665, 12, 65, 0),
(666, 12, 66, 0),
(667, 12, 67, 0),
(668, 12, 68, 0),
(669, 12, 69, 0),
(670, 12, 70, 0),
(671, 12, 71, 0),
(672, 12, 72, 0),
(673, 12, 73, 0),
(674, 12, 74, 0),
(675, 12, 75, 0),
(676, 12, 76, 0),
(677, 12, 77, 0),
(678, 12, 78, 0),
(679, 12, 79, 0),
(680, 12, 80, 0),
(681, 12, 81, 0),
(682, 12, 82, 0),
(683, 12, 83, 0),
(684, 12, 84, 0),
(685, 12, 85, 0),
(686, 12, 86, 0),
(687, 12, 87, 0),
(688, 12, 88, 0),
(689, 12, 89, 0),
(690, 12, 90, 0),
(691, 12, 91, 0),
(692, 12, 92, 0),
(693, 12, 93, 0),
(694, 12, 94, 0),
(695, 12, 95, 0),
(696, 12, 96, 0),
(697, 12, 97, 0),
(698, 12, 98, 0),
(699, 12, 99, 0),
(700, 12, 100, 0);

-- --------------------------------------------------------

--
-- Structure de la table `showtimes`
--

DROP TABLE IF EXISTS `showtimes`;
CREATE TABLE IF NOT EXISTS `showtimes` (
  `showtime_id` int NOT NULL AUTO_INCREMENT,
  `movie_id` int DEFAULT NULL,
  `show_datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`showtime_id`),
  KEY `movie_id` (`movie_id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `showtimes`
--

INSERT INTO `showtimes` (`showtime_id`, `movie_id`, `show_datetime`) VALUES
(10, 1094844, '2024-05-04 22:52:00'),
(11, 823464, '2024-05-05 22:52:00'),
(12, 821937, '2024-05-05 15:05:00');

-- --------------------------------------------------------

--
-- Structure de la table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
CREATE TABLE IF NOT EXISTS `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `movie_id` int DEFAULT NULL,
  `cinema_name` varchar(255) DEFAULT NULL,
  `cinema_address` varchar(255) DEFAULT NULL,
  `seat_number` varchar(10) DEFAULT NULL,
  `showtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `tickets`
--

INSERT INTO `tickets` (`id`, `user_id`, `movie_id`, `cinema_name`, `cinema_address`, `seat_number`, `showtime`) VALUES
(47, 6, 1094844, 'Pathe', 'Tunisia', '401', '2024-05-04 21:52:00'),
(48, 6, 1094844, 'Pathe', 'Tunisia', '401', '2024-05-04 21:52:00'),
(49, 6, 1094844, 'Pathe', 'Tunisia', '404', '2024-05-04 21:52:00'),
(50, 6, 823464, 'Pathe', 'Tunisia', '598', '2024-05-05 21:52:00'),
(51, 6, 1094844, 'Pathe', 'Tunisia', '438', '2024-05-04 21:52:00'),
(52, 6, 823464, 'Pathe', 'Tunisia', '559', '2024-05-05 21:52:00'),
(53, 6, 1094844, 'Pathe', 'Tunisia', '437', '2024-05-04 21:52:00'),
(54, 6, 1094844, 'Pathe', 'Tunisia', '401', '2024-05-04 21:52:00'),
(55, 6, 1094844, 'Pathe', 'Tunisia', '427', '2024-05-04 21:52:00'),
(56, 6, 1094844, 'Pathe', 'Tunisia', '401', '2024-05-04 21:52:00'),
(57, 6, 1094844, 'Pathe', 'Tunisia', '401', '2024-05-04 21:52:00'),
(58, 6, 823464, 'Pathe', 'Tunisia', '502', '2024-05-05 21:52:00');

-- --------------------------------------------------------

--
-- Structure de la table `tv_shows`
--

DROP TABLE IF EXISTS `tv_shows`;
CREATE TABLE IF NOT EXISTS `tv_shows` (
  `tv_id` int NOT NULL,
  `title` varchar(50) NOT NULL,
  `genre` varchar(20) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `creator` varchar(255) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`tv_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `role` varchar(50) DEFAULT 'user',
  `phone_number` varchar(20) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `phone_number`, `country`) VALUES
(9, 'chaima2', 'chaima', 'Admin', '123456', 'tunisia'),
(8, 'Chaima', 'Chaima', 'user', '12122', 'qsdqsd'),
(10, 'Test', 'Test', 'user', NULL, NULL),
(11, 'admin', 'admin', 'Admin', '123456789', 'Tunisia'),
(6, 'tt', 'tt', 'user', NULL, NULL),
(7, 'xx', 'xx', 'Admin', NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
