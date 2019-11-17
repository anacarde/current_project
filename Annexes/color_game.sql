-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  jeu. 27 juin 2019 à 08:47
-- Version du serveur :  5.7.21
-- Version de PHP :  7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `color_game`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin_info`
--

DROP TABLE IF EXISTS `admin_info`;
CREATE TABLE IF NOT EXISTS `admin_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(255) NOT NULL,
  `hash_password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `admin_info`
--

INSERT INTO `admin_info` (`id`, `pseudo`, `hash_password`) VALUES
(1, 'lazare', '$2y$10$sPkaY.pJlZ4dUGuaafN1x.d4BZvRaP.pRNsIsXv3n1IuCB3OLlmA6');

-- --------------------------------------------------------

--
-- Structure de la table `color_grp`
--

DROP TABLE IF EXISTS `color_grp`;
CREATE TABLE IF NOT EXISTS `color_grp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fr_color_grp` varchar(255) NOT NULL,
  `en_color_grp` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `color_grp`
--

INSERT INTO `color_grp` (`id`, `fr_color_grp`, `en_color_grp`) VALUES
(1, 'vert', 'green'),
(2, 'rouge', 'red'),
(3, 'orange', 'orange'),
(4, 'jaune', 'yellow'),
(5, 'bleu', 'blue'),
(6, 'violet', 'violet'),
(7, 'rose', 'pink');

-- --------------------------------------------------------

--
-- Structure de la table `color_ls`
--

DROP TABLE IF EXISTS `color_ls`;
CREATE TABLE IF NOT EXISTS `color_ls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `color_name` varchar(255) NOT NULL,
  `color_hex_code` varchar(255) NOT NULL,
  `color_group` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=274 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `color_ls`
--

INSERT INTO `color_ls` (`id`, `color_name`, `color_hex_code`, `color_group`) VALUES
(1, 'vert absinthe', '#7fdd4c', 'vert'),
(2, 'vert amande', '#82C46C', 'vert'),
(3, 'vert anglais', '#34A040', 'vert'),
(4, 'anis', '#9FE855', 'vert'),
(5, 'asperge', '#7BA05B', 'vert'),
(6, 'avocat', '#568203', 'vert'),
(7, 'bleu-vert', '#009CAB', 'vert'),
(8, 'vert bouteille', '#096A09', 'vert'),
(9, 'vert céladon', '#83A697', 'vert'),
(10, 'chartreuse', '#C2F732', 'vert'),
(11, 'vert de chrome', '#18391E', 'vert'),
(12, 'vert citron', '#00FF00', 'vert'),
(13, 'vert d\'eau', '#B0F2B6', 'vert'),
(14, 'vert émeraude', '#01D758', 'vert'),
(15, 'épinard', '#175732', 'vert'),
(16, 'gazon', '#3A9D23', 'vert'),
(17, 'glauque', '#90B078', 'vert'),
(18, 'vert de hooker', '#1B4F08', 'vert'),
(19, 'vert impérial', '#1B4F08', 'vert'),
(20, 'jade', '#87E990', 'vert'),
(21, 'vert lichen', '#85C17E', 'vert'),
(22, 'lime', '#9EFD38', 'vert'),
(23, 'malachite', '#1FA055', 'vert'),
(24, 'menthe', '#16B84E', 'vert'),
(25, 'vert militaire', '#596643', 'vert'),
(26, 'mousse', '#679F5A', 'vert'),
(27, 'olive', '#708D23', 'vert'),
(28, 'perroquet', '#3AF24B', 'vert'),
(29, 'pin', '#01796F', 'vert'),
(30, 'pistache', '#BEF574', 'vert'),
(31, 'poireau', '#4CA66B', 'vert'),
(32, 'vert pomme', '#34C924', 'vert'),
(33, 'prairie', '#57D53B', 'vert'),
(34, 'prasin', '#4CA66B', 'vert'),
(35, 'printemps', '#00FF7F', 'vert'),
(36, 'sapin', '#095228', 'vert'),
(37, 'sauge', '#689D71', 'vert'),
(38, 'smaragdin', '#01D758', 'vert'),
(39, 'tilleul', '#A5D152', 'vert'),
(40, 'vert véronèse', '#00A25D', 'vert'),
(41, 'vert', '#00894D', 'vert'),
(42, 'vert-de-gris', '#95A595', 'vert'),
(43, 'vert-jaune', '#C8FF00', 'vert'),
(44, 'vert de vessie', '#22780F', 'vert'),
(45, 'viride', '#40826D', 'vert'),
(46, 'alizarine', '#D90115', 'rouge'),
(47, 'amaranthe', '#91283B', 'rouge'),
(48, 'rouge d\'andrinople', '#A91101', 'rouge'),
(49, 'rouge anglais', '#F7230C', 'rouge'),
(50, 'bordeaux', '#800000', 'rouge'),
(51, 'rouge brique', '#842E1B', 'rouge'),
(52, 'capucine', '#FF5E4D', 'rouge'),
(53, 'rouge cardinal', '#B82010', 'rouge'),
(54, 'rouge carmin', '#960018', 'rouge'),
(55, 'cerise', '#D20F45', 'rouge'),
(56, 'cinabre', '#DB1702', 'rouge'),
(57, 'coquelicot', '#C60800', 'rouge'),
(58, 'corail', '#E73E01', 'rouge'),
(59, 'cramoisi', '#DC143C', 'rouge'),
(60, 'rouge écarlate', '#FF2400', 'rouge'),
(61, 'rouge de falun', '#801818', 'rouge'),
(62, 'feu', '#FE1B00', 'rouge'),
(63, 'fraise', '#BF3030', 'rouge'),
(64, 'fraise écrasée', '#A42424', 'rouge'),
(65, 'framboise', '#C72C48', 'rouge'),
(66, 'garance', '#EE1010', 'rouge'),
(67, 'grenadine', '#E9383F', 'rouge'),
(68, 'grenat', '#6E0B14', 'rouge'),
(69, 'groseille', '#CF0A1D', 'rouge'),
(70, 'incarnat', '#FF6F7D', 'rouge'),
(71, 'magenta', '#FF00FF', 'rouge'),
(72, 'mars', '#F7230C', 'rouge'),
(73, 'nacarat', '#FC5D5D', 'rouge'),
(74, 'passe-velours', '#91283B', 'rouge'),
(75, 'ponceau', '#C60800', 'rouge'),
(76, 'pourpre', '#9E0E40', 'rouge'),
(77, 'rosso corsa', '#D40000', 'rouge'),
(78, 'rouge', '#E10343', 'rouge'),
(79, 'rouge-orange', '#FF4500', 'rouge'),
(80, 'rouge tomate', '#DE2916', 'rouge'),
(81, 'rouille', '#B7410E', 'rouge'),
(82, 'rubis', '#D20F45', 'rouge'),
(83, 'sang de boeuf', '#730800', 'rouge'),
(84, 'tomette', '#AE4A34', 'rouge'),
(85, 'turc', '#A91101', 'rouge'),
(86, 'vermeil', '#FF0921', 'rouge'),
(87, 'vermillon', '#E34234', 'rouge'),
(88, 'abricot', '#E67E30', 'orange'),
(89, 'aurore', '#FFCB60', 'orange'),
(90, 'carotte', '#F4661B', 'orange'),
(91, 'citrouille', '#DF6D14', 'orange'),
(92, 'corail', '#E73E01', 'orange'),
(93, 'cuivre', '#B36700', 'orange'),
(94, 'gomme-gutte', '#EF9B0F', 'orange'),
(95, 'jaune-orange', '#FFDF00', 'orange'),
(96, 'mandarine', '#FEA347', 'orange'),
(97, 'melon', '#DE9816', 'orange'),
(98, 'orange', '#ED7F10', 'orange'),
(99, 'orange brûlé', '#CC5500', 'orange'),
(100, 'rouge-orange', '#FF4500', 'orange'),
(101, 'roux', '#B7410E', 'orange'),
(102, 'saumon', '#F88E55', 'orange'),
(103, 'safran', '#F4C430', 'orange'),
(104, 'tangerine', '#FF7F00', 'orange'),
(105, 'ambre', '#F0C300', 'jaune'),
(106, 'auréolin', '#EFD242', 'jaune'),
(107, 'aurore', '#FFCB60', 'jaune'),
(108, 'banane', '#D1B606', 'jaune'),
(109, 'beurre', '#F0E36B', 'jaune'),
(110, 'beurre frais', '#FFF48D', 'jaune'),
(111, 'blé', '#E8D630', 'jaune'),
(112, 'blond', '#E2BD74', 'jaune'),
(113, 'blond vénitien', '#E7A854', 'jaune'),
(114, 'bouton d\'or', '#F6DC12', 'jaune'),
(115, 'caca d\'oie', '#CDCD0D', 'jaune'),
(116, 'canari', '#E7F00D', 'jaune'),
(117, 'chamois', '#D0C07A', 'jaune'),
(118, 'chartreuse', '#DFFF00', 'jaune'),
(119, 'chrome', '#FFFF05', 'jaune'),
(120, 'flave', '#E6E697', 'jaune'),
(121, 'jaune', '#FFFF00', 'jaune'),
(122, 'jaune citron', '#F7FF3C', 'jaune'),
(123, 'jaune de cobalt', '#FDEE00', 'jaune'),
(124, 'jaune de mars', '#EED153', 'jaune'),
(125, 'jaune de naples', '#FADA5E', 'jaune'),
(126, 'jaune impérial', '#FFE436', 'jaune'),
(127, 'jaune indien', '#E89845', 'jaune'),
(128, 'maïs', '#E29000', 'jaune'),
(129, 'mastic', '#B3B191', 'jaune'),
(130, 'miel', '#CB8E00', 'jaune'),
(131, 'mimosa', '#FEF86C', 'jaune'),
(132, 'moutarde', '#FFDB58', 'jaune'),
(133, 'nankin', '#F7E269', 'jaune'),
(134, 'ocre jaune', '#DFAF2C', 'jaune'),
(135, 'olive', '#808000', 'jaune'),
(136, 'or', '#FFD700', 'jaune'),
(137, 'orpiment', '#FCD21C', 'jaune'),
(138, 'paille', '#FEE347', 'jaune'),
(139, 'poil de chameau', '#B67823', 'jaune'),
(140, 'poussin', '#F7E35F', 'jaune'),
(141, 'sable', '#E0CDA9', 'jaune'),
(142, 'soufre', '#FFFF6B', 'jaune'),
(143, 'topaze', '#FAEA73', 'jaune'),
(144, 'vert-jaune', '#C8FF00', 'jaune'),
(145, 'acier', '#1A2B3C', 'bleu'),
(146, 'aigue-marine', '#79F8F8', 'bleu'),
(147, 'azur', '#007FFF', 'bleu'),
(148, 'azuré', '#F0FFFF', 'bleu'),
(149, 'barbeau', '#5472AE', 'bleu'),
(150, 'bleu', '#0040D0', 'bleu'),
(151, 'bleu-vert', '#0098BF', 'bleu'),
(152, 'bleu-violet', '#4B0082', 'bleu'),
(153, 'bleuet', '#5472AE', 'bleu'),
(154, 'bleu céleste', '#007BA7', 'bleu'),
(155, 'canard', '#048B9A', 'bleu'),
(156, 'céleste', '#26C4EC', 'bleu'),
(157, 'charrette', '#8EA2C6', 'bleu'),
(158, 'ciel', '#007CB0', 'bleu'),
(159, 'cobalt', '#22427C', 'bleu'),
(160, 'cyan', '#00FFFF', 'bleu'),
(161, 'denim', '#1560BD', 'bleu'),
(162, 'bleu dragée', '#DFF2FF', 'bleu'),
(163, 'égyptien', '#1034A6', 'bleu'),
(164, 'électrique', '#2C75FF', 'bleu'),
(165, 'bleu de france', '#318CE7', 'bleu'),
(166, 'bleu fumé', '#BBD2E1', 'bleu'),
(167, 'givré', '#80D0D0', 'bleu'),
(168, 'bleu horizon', '#7F8FA6', 'bleu'),
(169, 'indigo', '#23446B', 'bleu'),
(170, 'bleu majorelle', '#6050DC', 'bleu'),
(171, 'bleu marine', '#000080', 'bleu'),
(172, 'bleu maya', '#73C2FB', 'bleu'),
(173, 'bleu minéral', '#24445C', 'bleu'),
(174, 'bleu de minuit', '#003366', 'bleu'),
(175, 'bleu nuit', '#0F056B', 'bleu'),
(176, 'bleu outremer', '#1B019B', 'bleu'),
(177, 'bleu paon', '#067790', 'bleu'),
(178, 'bleu pastel', '#56739A', 'bleu'),
(179, 'bleu persan', '#458E9D', 'bleu'),
(180, 'bleu pervenche', '#CCCCFF', 'bleu'),
(181, 'bleu pétrole', '#006374', 'bleu'),
(182, 'bleu de prusse', '#24445C', 'bleu'),
(183, 'bleu roi', '#002366', 'bleu'),
(184, 'bleu safre', '#0131B4', 'bleu'),
(185, 'bleu saphir', '#0131B4', 'bleu'),
(186, 'bleu sarcelle', '#008080', 'bleu'),
(187, 'bleu smalt', '#003399', 'bleu'),
(188, 'bleu tiffany', '#0ABAB5', 'bleu'),
(189, 'bleu turquin', '#425B8A', 'bleu'),
(190, 'turquoise', '#25FDE9', 'bleu'),
(191, 'améthyste', '#884DA7', 'violet'),
(192, 'aubergine', '#370028', 'violet'),
(193, 'glycine', '#C9A0DC', 'violet'),
(194, 'indigo', '#4B0082', 'violet'),
(195, 'lavande', '#9683EC', 'violet'),
(196, 'lilas', '#B666D2', 'violet'),
(197, 'mauve', '#D473D4', 'violet'),
(198, 'orchidée', '#DA70D6', 'violet'),
(199, 'parme', '#CFA0E9', 'violet'),
(200, 'prune', '#811453', 'violet'),
(201, 'violet d\'évêque', '#723E64', 'violet'),
(202, 'violet minéral', '#8A55A3', 'violet'),
(203, 'zinzolin', '#6C0277', 'violet'),
(204, 'bisque', '#FFE4C4', 'rose'),
(205, 'chair', '#FEC3AC', 'rose'),
(206, 'cherry', '#EC3B83', 'rose'),
(207, 'coquille d\'oeuf', '#FDE9E0', 'rose'),
(208, 'cuisse de nymphe', '#FEE7F0', 'rose'),
(209, 'fuchsia', '#FD3F92', 'rose'),
(210, 'incarnat', '#FF6F7D', 'rose'),
(211, 'hollywood', '#F400A1', 'rose'),
(212, 'misty rose', '#FFE4E1', 'rose'),
(213, 'pelure d\'oignon', '#D58490', 'rose'),
(214, 'rose', '#FD6C9E', 'rose'),
(215, 'rose bonbon', '#F9429E', 'rose'),
(216, 'rose dragée', '#FEBFD2', 'rose'),
(217, 'rose mountbatten', '#997A8D', 'rose'),
(218, 'rose persan', '#F77FBE', 'rose'),
(219, 'rose shocking', '#FC0FC0', 'rose'),
(220, 'rose vif', '#F682A6', 'rose');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
