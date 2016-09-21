CREATE TABLE IF NOT EXISTS `automigrate` (
  `directory` varchar(255) NOT NULL,
  `last_file` varchar(255) NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`directory`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
