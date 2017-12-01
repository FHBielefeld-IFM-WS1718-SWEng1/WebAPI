CREATE TABLE `APIKey` (
  `ID` int(11) NOT NULL,
  `ApiKey` varchar(50) NOT NULL,
  `User_ID` int(11) NOT NULL
);

CREATE TABLE `Party` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Description` text,
  `StartDate` datetime NOT NULL,
  `EndDate` datetime DEFAULT NULL,
  `CreatedAt` datetime NOT NULL,
  `ChangedAt` datetime NOT NULL,
  `DeletedAt` datetime DEFAULT NULL,
  `User_ID` int(11) NOT NULL
);

CREATE TABLE `User` (
  `ID` int(11) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Birthdate` date DEFAULT NULL,
  `Gender` varchar(5) DEFAULT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `Profilepicture` varchar(100) DEFAULT NULL,
  `LoginAt` datetime DEFAULT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ChangedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DeletedAt` datetime DEFAULT NULL
);
