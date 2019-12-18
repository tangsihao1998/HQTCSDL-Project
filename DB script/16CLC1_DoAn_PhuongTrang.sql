use master;
DROP DATABASE futaTicket;

GO
CREATE DATABASE futaTicket;
GO
use futaTicket;

CREATE TABLE userInfo(
	UUID int NOT NULL IDENTITY(1,1) PRIMARY KEY,

	fullName nvarchar(108),
	email nvarchar(108),
	phoneNumber nvarchar(10),
	username nvarchar(50),

	CONSTRAINT uniq_email UNIQUE (email),
	CONSTRAINT uniq_phone UNIQUE (phoneNumber),
);


CREATE TABLE vehicleInfo(
	ID int NOT NULL IDENTITY(1,1) PRIMARY KEY,

	vehName nvarchar(20) NOT NULL,
	plateNumber int NOT NULL,
	numOfSeat int NOT NULL,
	hasWC bit,
	hasBed bit,
	imgLink nvarchar(200),

	CONSTRAINT uniq_plateNumber UNIQUE (plateNumber),
);

CREATE TABLE destInfo(
	ID nvarchar(5) PRIMARY KEY,
	details nvarchar(50) NOT NULL,
);

CREATE TABLE repeatTourInfo(
	ID int NOT NULL IDENTITY(1,1) PRIMARY KEY,

	vehID int NOT NULL,
	departPlace int NOT NULL,
	destPlace int NOT NULL,
	departTime smalldatetime NOT NULL,
	duration smallint NOT NULL,
	defaultnumOfSeats int NOT NULL,
	startDay smalldatetime NOT NULL,
	activated bit DEFAULT 0,
	repeatFreq tinyint NOT NULL, -- 0 = daily, 1 = weekly
	ticketPrice money NOT NULL,

	CONSTRAINT fk_depart_place FOREIGN KEY (departPlace) REFERENCES destInfo(ID),
	CONSTRAINT fk_dest_place FOREIGN KEY (destPlace) REFERENCES destInfo(ID),
	CONSTRAINT fk_vehInfo FOREIGN KEY (vehID) REFERENCES vehicleInfo(ID), 
	CONSTRAINT ck_validDuration CHECK(duration > 0),

	CONSTRAINT uniq_tour UNIQUE(vehID,departTime),
);

CREATE TABLE activeTourInfo(
	ID int NOT NULL IDENTITY(1,1) PRIMARY KEY,

	vehID int NOT NULL,
	departPlace int NOT NULL,
	destPlace int NOT NULL,
	departDate smalldatetime NOT NULL,
	duration smallint not null,
	numOfSeats int NOT NULL,
	ticketPrice money NOT NULL,
	refTourInfo int default NULL,

	CONSTRAINT fk_active_depart_place FOREIGN KEY (departPlace) REFERENCES destInfo(ID),
	CONSTRAINT fk_active_dest_place FOREIGN KEY (destPlace) REFERENCES destInfo(ID),
	CONSTRAINT fk_active_vehInfo FOREIGN KEY (vehID) REFERENCES vehicleInfo(ID),
	CONSTRAINT fk_repeatTour FOREIGN KEY (refTourInfo) REFERENCES repeatTourInfo(ID) ON DELETE SET NULL,  
	CONSTRAINT ck_active_validDuration CHECK(duration > 0),
	CONSTRAINT uniq_active_tour UNIQUE(vehID,departDate),
);

CREATE TABLE bookingHistory(
	userID int NOT NULL,
	activeTourID int NOT NULL,
	departPlace int NOT NULL,
	departDate smalldatetime NOT NULL,
	price int NOT NULL,
	seatID int NOT NULL,
	timePlaced smalldatetime,
	bookingStatus tinyint NOT NULL default 0, -- 0 = pending, 1 = paid, 2= completed, 255 = canceled
	
	CONSTRAINT fk_userID FOREIGN KEY (userID) REFERENCES userInfo(UUID),
	CONSTRAINT fk_tourID FOREIGN KEY (activetourID) REFERENCES activeTourInfo(ID),
	CONSTRAINT pk_seat PRIMARY KEY (activeTourID,seatID)
);

GO
CREATE VIEW curUserInfo AS
SELECT * 
FROM userInfo
WHERE CURRENT_USER = username
