CREATE TABLE IF NOT EXISTS automigrate (
  directory varchar(255) NOT NULL,
  last_file varchar(255) NOT NULL,
  updatedAt date NOT NULL,
  PRIMARY KEY (directory)
);
