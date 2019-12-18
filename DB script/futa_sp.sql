GO
create proc sp_importThisMonthTour 
AS
BEGIN
	SELECT 1
END

/*
	FLOW CHINH:
		1. Them tour: NVQly co 2 cach de them tour
		1.1: Them tour chay 1 lan
			NVQly nhap:
				ngay gio, dia diem di
				ngay gio, dia diem den
				gia ve
				xe chay
			He thong check co tour trung hay khong
			Add vao he thong

		1.2: Them tour chay nhieu lan
		NVQly nhap:
				Gio, dia diem di
				Gio, dia diem den
				gia ve
				xe chay
				Ngay bat dau
				Tan suat hoat dong (0 - daily, 1 - weekly, 2-monthly)
				Trang thai hoat dong( 0 - chua hoat dong, 1- hoat dong ngay)
		He thong check xem co tour trung khong
		Neu trang thai hoat dong = 1: 
		He thong tu dong them vao bang activeTourInfo nhung chuyen se hoat dong ngay trong thang
*/
GO
create proc sp_addRepeatTour @vehID int,
	@departPlace int,
	@destPlace int,
	@departTime smalldatetime,
	@destTime smalldatetime,
	@defaultnumOfSeats int,
	@startDay smalldatetime,
	@activated bit,
	@repeatFreq smallint,
	@ticketPrice money
AS
BEGIN
	SELECT 1
END 
