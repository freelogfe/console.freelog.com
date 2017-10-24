CREATE TABLE `db_freelog`.`t_resource` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `FresourcePath` TEXT NOT NULL COMMENT '资源存放路径',
  `Fmimetype` VARCHAR(64) NOT NULL,
  `FcreateTime` DATETIME NULL,
  `FupdateTime` DATETIME NULL,
  `Fauthor` VARCHAR(128) NOT NULL COMMENT '资源作者',
  `FmetaInfo` TEXT NOT NULL COMMENT '资源元信息如encoding',
  PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT charset=utf8;
