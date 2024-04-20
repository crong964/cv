-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 03, 2023 lúc 04:26 AM
-- Phiên bản máy phục vụ: 10.4.22-MariaDB
-- Phiên bản PHP: 7.3.33 ssssssss

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `store`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `accountemployee`
--

CREATE TABLE `accountemployee` (
  `account` varchar(30) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `password` varchar(30) COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `accountemployee`
--

INSERT INTO `accountemployee` (`account`, `password`) VALUES
('admin', 'admin');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `accountuser`
--

CREATE TABLE `accountuser` (
  `account` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `idUser` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `accountuser`
--

INSERT INTO `accountuser` (`account`, `password`, `idUser`) VALUES
('huy91027@gmail.com', '123456789', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bigcategory`
--

CREATE TABLE `bigcategory` (
  `idBigCategory` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `bigcategory`
--

INSERT INTO `bigcategory` (`idBigCategory`, `name`) VALUES
(1, 'điện thoại ');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `childproduct`
--

CREATE TABLE `childproduct` (
  `idChildProduct` varchar(30) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `idProduct` int(11) NOT NULL,
  `nameChildProduct` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `importPrice` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `amount` int(150) NOT NULL DEFAULT 0,
  `image` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `childproduct`
--

INSERT INTO `childproduct` (`idChildProduct`, `idProduct`, `nameChildProduct`, `importPrice`, `price`, `amount`, `image`) VALUES
('22-0-0', 22, 'iphone 13 promax 518GB vàng', 20000000, 20000000, 99, 'childimage-1685113874535-553286424iphone13promax.jpg'),
('22-0-1', 22, 'iphone 13 promax 256GB vàng', 20000000, 20000000, 0, 'childimage-1685113874535-553286424iphone13promax.jpg'),
('22-0-2', 22, 'iphone 13 promax 128GB vàng', 20000000, 20000000, 0, 'childimage-1685113874535-553286424iphone13promax.jpg'),
('22-1-0', 22, 'iphone 13 promax 518GB xanh', 20000000, 20000000, 95, 'childimage-1685113874535-678852390600_iphone-13-pro-256gb-xanh-la_4.jpg'),
('22-1-1', 22, 'iphone 13 promax 256GB xanh', 20000000, 20000000, 0, 'childimage-1685113874535-678852390600_iphone-13-pro-256gb-xanh-la_4.jpg'),
('22-1-2', 22, 'iphone 13 promax 128GB xanh', 20000000, 20000000, 0, 'childimage-1685113874535-678852390600_iphone-13-pro-256gb-xanh-la_4.jpg'),
('22-2-0', 22, 'iphone 13 promax 518GB trắng', 20000000, 20000000, 100, 'childimage-1685113874535-716839861tr_ng_1_5.jpg'),
('22-2-1', 22, 'iphone 13 promax 256GB trắng', 20000000, 20000000, 3, 'childimage-1685113874535-716839861tr_ng_1_5.jpg'),
('22-2-2', 22, 'iphone 13 promax 128GB trắng', 20000000, 20000000, 2, 'childimage-1685113874535-716839861tr_ng_1_5.jpg'),
('5', 2, 'Samsung Galaxy S22 Ultra (8GB - 128GB) Đen', 19999999, 21900000, 0, 'sm-s908_galaxys22ultra_front_phantomblack_211119_1.jpg'),
('6', 2, 'Samsung Galaxy S22 Ultra (8GB - 128GB) Trắng', 19999999, 21900000, 0, 'sm-s908_galaxys22ultra_front_phantomwhite_211119_1.jpg'),
('7', 2, 'Samsung Galaxy S22 Ultra (8GB - 128GB) Đỏ', 19999999, 21900000, 0, 'sm-s908_galaxys22ultra_front_burgundy_211119_1.jpg'),
('8', 2, 'Samsung Galaxy S22 Ultra (8GB - 128GB) Xanh', 19999999, 21900000, 0, 'sm-s908_galaxys22ultra_front_green_211119_1.jpg');

--
-- Bẫy `childproduct`
--
DELIMITER $$
CREATE TRIGGER `ckeck_update_amount_childProduct` BEFORE UPDATE ON `childproduct` FOR EACH ROW IF new.amount < 0 THEN SET new.amount=old.amount; 
SIGNAL SQLSTATE '45008'
SET MESSAGE_TEXT = 'An error occurred'; END IF
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `containimportbill`
--

CREATE TABLE `containimportbill` (
  `idImportBill` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `idChildProduct` varchar(30) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `amount` int(11) NOT NULL,
  `importPrice` int(11) NOT NULL,
  `importedAmount` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `containimportbill`
--

INSERT INTO `containimportbill` (`idImportBill`, `idChildProduct`, `amount`, `importPrice`, `importedAmount`) VALUES
('1690431079186', '22-2-0', 100, 20000000, 100),
('1690431261204', '22-0-0', 100, 20000000, 100),
('1690431496622', '22-1-0', 100, 20000000, 100),
('1690948672055', '22-2-2', 20, 20000000, 2),
('1690948672055', '22-2-1', 20, 20000000, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `containimportedbill`
--

CREATE TABLE `containimportedbill` (
  `idImportedBill` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `idChildProduct` varchar(30) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `importedAmount` int(11) NOT NULL,
  `importPrice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `containimportedbill`
--

INSERT INTO `containimportedbill` (`idImportedBill`, `idChildProduct`, `importedAmount`, `importPrice`) VALUES
('1690431090625', '22-2-0', 50, 20000000),
('1690431113641', '22-2-0', 50, 20000000),
('1690431270408', '22-0-0', 100, 20000000),
('1690431506136', '22-1-0', 100, 20000000),
('1690949366977', '22-2-2', 1, 20000000),
('1690949366977', '22-2-1', 1, 20000000),
('1690949601040', '22-2-2', 1, 20000000),
('1690949601040', '22-2-1', 2, 20000000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `importbill`
--

CREATE TABLE `importbill` (
  `idImportBill` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `createdDay` datetime NOT NULL DEFAULT current_timestamp(),
  `idForUser` int(11) NOT NULL,
  `status` int(2) NOT NULL DEFAULT 0,
  `finishDay` datetime NOT NULL DEFAULT current_timestamp(),
  `supplier` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL DEFAULT 'nhà cung cấp 1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `importbill`
--

INSERT INTO `importbill` (`idImportBill`, `createdDay`, `idForUser`, `status`, `finishDay`, `supplier`) VALUES
('1690431079186', '2023-07-27 00:00:00', 1, 0, '2023-07-27 00:00:00', 'nhà cung cấp lỗi'),
('1690431261204', '2023-07-27 00:00:00', 1, 0, '2023-07-27 00:00:00', 'nhà cung cấp lỗi'),
('1690431496622', '2023-07-27 00:00:00', 1, 0, '2023-07-27 00:00:00', 'nhà cung cấp lỗi'),
('1690948672055', '2023-08-02 00:00:00', 1, 0, '2023-08-02 00:00:00', 'nhà cung cấp lỗi');

--
-- Bẫy `importbill`
--
DELIMITER $$
CREATE TRIGGER `deleteD` BEFORE DELETE ON `importbill` FOR EACH ROW DELETE FROM 
containimportbill WHERE idImportBill=old.idImportBill
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `importedbill`
--

CREATE TABLE `importedbill` (
  `idImportedBill` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `createdDay` datetime NOT NULL DEFAULT current_timestamp(),
  `idForUser` int(11) NOT NULL,
  `idImportBill` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `status` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL DEFAULT 'chưa thanh toán',
  `paymentDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `importedbill`
--

INSERT INTO `importedbill` (`idImportedBill`, `createdDay`, `idForUser`, `idImportBill`, `status`, `paymentDate`) VALUES
('1690431090625', '2023-07-27 11:11:39', 1, '1690431079186', 'hoàn thành', '2023-08-02 10:43:00'),
('1690431113641', '2023-07-27 11:11:59', 1, '1690431079186', 'hoàn thành', '2023-08-02 10:47:00'),
('1690431270408', '2023-07-27 11:14:35', 1, '1690431261204', 'hoàn thành', '2023-08-02 10:55:00'),
('1690431506136', '2023-07-27 11:18:31', 1, '1690431496622', 'hoàn thành', '2023-08-02 10:56:00'),
('1690949366977', '2023-08-02 11:09:32', 1, '1690948672055', 'hoàn thành', '2023-08-02 11:09:00'),
('1690949601040', '2023-08-02 11:13:30', 1, '1690948672055', 'chưa thanh toán', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `inforemployee`
--

CREATE TABLE `inforemployee` (
  `account` varchar(30) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `idInforUser` int(11) NOT NULL,
  `nameUser` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `phoneNumber` varchar(10) COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `inforemployee`
--

INSERT INTO `inforemployee` (`account`, `idInforUser`, `nameUser`, `phoneNumber`) VALUES
('admin', 1, 'huy', '0347893322');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `inforuser`
--

CREATE TABLE `inforuser` (
  `id` int(30) NOT NULL,
  `address` varchar(150) NOT NULL,
  `numberPhone` varchar(11) NOT NULL,
  `name` varchar(30) NOT NULL DEFAULT 'người dùng'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `inforuser`
--

INSERT INTO `inforuser` (`id`, `address`, `numberPhone`, `name`) VALUES
(1, 'HCM', '0348281129', 'người dùng');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orderbill`
--

CREATE TABLE `orderbill` (
  `id` int(30) NOT NULL,
  `createday` datetime NOT NULL DEFAULT current_timestamp(),
  `pay` int(2) NOT NULL DEFAULT 0,
  `ship` int(2) NOT NULL DEFAULT 0,
  `address` text NOT NULL,
  `totolmoney` int(100) NOT NULL,
  `numberphone` varchar(20) NOT NULL,
  `userid` int(30) NOT NULL,
  `del` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `orderbill`
--

INSERT INTO `orderbill` (`id`, `createday`, `pay`, `ship`, `address`, `totolmoney`, `numberphone`, `userid`, `del`) VALUES
(29, '2023-08-01 11:14:48', 0, 0, 'HCM', 20000000, '0348281129', 1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orderdetail`
--

CREATE TABLE `orderdetail` (
  `idChildProduct` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `idorder` int(30) NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `orderdetail`
--

INSERT INTO `orderdetail` (`idChildProduct`, `idorder`, `price`, `quantity`) VALUES
('22-0-0', 29, 20000000, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `idProduct` int(11) NOT NULL,
  `namePro` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `idSmallCategory` int(11) NOT NULL,
  `idBigCategory` int(11) NOT NULL,
  `image` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `importPrices` int(11) NOT NULL,
  `Price` int(11) NOT NULL,
  `amount` int(100) NOT NULL DEFAULT 0,
  `bt` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '{}' CHECK (json_valid(`bt`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`idProduct`, `namePro`, `idSmallCategory`, `idBigCategory`, `image`, `importPrices`, `Price`, `amount`, `bt`) VALUES
(2, 'Samsung Galaxy S22 Ultra (8GB - 128GB)', 2, 1, 'sm-s908_galaxys22ultra_front_phantomblack_211119_1.jpg', 19999999, 21000000, 0, '{}'),
(22, 'iphone 13 promax', 1, 1, 'image-1685113874534-716877965iphone13promax.jpg', 15000000, 20000000, 299, '{\"bt1\":\"màu\",\"bt2\":\"dung lượng \",\"dsbt1\":[\"vàng\",\"xanh\",\"trắng\"],\"dsbt2\":[\"518GB\",\"256GB\",\"128GB\"],\"listFile\":[\"childimage-1685113874535-553286424iphone13promax.jpg\",\"childimage-1685113874535-678852390600_iphone-13-pro-256gb-xanh-la_4.jpg\",\"childimage-1685113874535-716839861tr_ng_1_5.jpg\"]}');

--
-- Bẫy `product`
--
DELIMITER $$
CREATE TRIGGER `ckeck_update_amount` BEFORE UPDATE ON `product` FOR EACH ROW IF (new.amount < 0) THEN
	set new.amount=old.amount;
	SIGNAL sqlstate '45001' set message_text = "No way ! You cannot do this !";
END IF
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `remove_product` BEFORE DELETE ON `product` FOR EACH ROW DELETE FROM childproduct WHERE childproduct.idProduct= old.idProduct
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `refreshtokenuser`
--

CREATE TABLE `refreshtokenuser` (
  `idUser` int(30) NOT NULL,
  `refreshtoken` varchar(100) NOT NULL,
  `createtime` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `refreshtokenuser`
--

INSERT INTO `refreshtokenuser` (`idUser`, `refreshtoken`, `createtime`) VALUES
(1, 'D7HayfWgtFAwDA', '2023-07-12'),
(1, 'xLmkCFfJfbf45g', '2023-07-19'),
(1, '0gUbrjISGxGxxg', '2023-07-20'),
(1, 'PDtOgmpE0zSnFQ', '2023-07-24'),
(1, 'ZeZBsJg1PoUXHQ', '2023-08-03');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shoppingcart`
--

CREATE TABLE `shoppingcart` (
  `idUser` int(30) NOT NULL,
  `idChildProduct` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `smallcategory`
--

CREATE TABLE `smallcategory` (
  `idSmallCategory` int(11) NOT NULL,
  `nameSmallCategory` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `smallcategory`
--

INSERT INTO `smallcategory` (`idSmallCategory`, `nameSmallCategory`) VALUES
(1, 'iphone'),
(2, 'samsung');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tempcart`
--

CREATE TABLE `tempcart` (
  `idInforUser` int(11) NOT NULL,
  `idChildProduct` varchar(30) COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `accountemployee`
--
ALTER TABLE `accountemployee`
  ADD PRIMARY KEY (`account`);

--
-- Chỉ mục cho bảng `bigcategory`
--
ALTER TABLE `bigcategory`
  ADD PRIMARY KEY (`idBigCategory`);

--
-- Chỉ mục cho bảng `childproduct`
--
ALTER TABLE `childproduct`
  ADD PRIMARY KEY (`idChildProduct`),
  ADD KEY `idProduct` (`idProduct`);

--
-- Chỉ mục cho bảng `containimportbill`
--
ALTER TABLE `containimportbill`
  ADD KEY `idImportBill` (`idImportBill`),
  ADD KEY `idChildProduct` (`idChildProduct`);

--
-- Chỉ mục cho bảng `containimportedbill`
--
ALTER TABLE `containimportedbill`
  ADD KEY `idChildProduct` (`idChildProduct`);

--
-- Chỉ mục cho bảng `importbill`
--
ALTER TABLE `importbill`
  ADD PRIMARY KEY (`idImportBill`),
  ADD KEY `idForUser` (`idForUser`);

--
-- Chỉ mục cho bảng `importedbill`
--
ALTER TABLE `importedbill`
  ADD PRIMARY KEY (`idImportedBill`);

--
-- Chỉ mục cho bảng `inforemployee`
--
ALTER TABLE `inforemployee`
  ADD PRIMARY KEY (`idInforUser`),
  ADD KEY `account` (`account`);

--
-- Chỉ mục cho bảng `inforuser`
--
ALTER TABLE `inforuser`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orderbill`
--
ALTER TABLE `orderbill`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`idProduct`),
  ADD KEY `idBigCategory` (`idBigCategory`),
  ADD KEY `idSmallCategory` (`idSmallCategory`);

--
-- Chỉ mục cho bảng `refreshtokenuser`
--
ALTER TABLE `refreshtokenuser`
  ADD KEY `idUser` (`idUser`);

--
-- Chỉ mục cho bảng `shoppingcart`
--
ALTER TABLE `shoppingcart`
  ADD KEY `idUser` (`idUser`),
  ADD KEY `idChildProduct` (`idChildProduct`);

--
-- Chỉ mục cho bảng `smallcategory`
--
ALTER TABLE `smallcategory`
  ADD PRIMARY KEY (`idSmallCategory`);

--
-- Chỉ mục cho bảng `tempcart`
--
ALTER TABLE `tempcart`
  ADD KEY `idInforUser` (`idInforUser`),
  ADD KEY `idChildProduct` (`idChildProduct`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bigcategory`
--
ALTER TABLE `bigcategory`
  MODIFY `idBigCategory` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `inforemployee`
--
ALTER TABLE `inforemployee`
  MODIFY `idInforUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `inforuser`
--
ALTER TABLE `inforuser`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `orderbill`
--
ALTER TABLE `orderbill`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `idProduct` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT cho bảng `smallcategory`
--
ALTER TABLE `smallcategory`
  MODIFY `idSmallCategory` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `childproduct`
--
ALTER TABLE `childproduct`
  ADD CONSTRAINT `childproduct_ibfk_1` FOREIGN KEY (`idProduct`) REFERENCES `product` (`idProduct`);

--
-- Các ràng buộc cho bảng `containimportbill`
--
ALTER TABLE `containimportbill`
  ADD CONSTRAINT `containimportbill_ibfk_2` FOREIGN KEY (`idImportBill`) REFERENCES `importbill` (`idImportBill`),
  ADD CONSTRAINT `containimportbill_ibfk_3` FOREIGN KEY (`idChildProduct`) REFERENCES `childproduct` (`idChildProduct`);

--
-- Các ràng buộc cho bảng `containimportedbill`
--
ALTER TABLE `containimportedbill`
  ADD CONSTRAINT `containimportedbill_ibfk_1` FOREIGN KEY (`idChildProduct`) REFERENCES `childproduct` (`idChildProduct`);

--
-- Các ràng buộc cho bảng `importbill`
--
ALTER TABLE `importbill`
  ADD CONSTRAINT `importbill_ibfk_1` FOREIGN KEY (`idForUser`) REFERENCES `inforemployee` (`idInforUser`);

--
-- Các ràng buộc cho bảng `inforemployee`
--
ALTER TABLE `inforemployee`
  ADD CONSTRAINT `inforemployee_ibfk_1` FOREIGN KEY (`account`) REFERENCES `accountemployee` (`account`);

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`idBigCategory`) REFERENCES `bigcategory` (`idBigCategory`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`idSmallCategory`) REFERENCES `smallcategory` (`idSmallCategory`);

--
-- Các ràng buộc cho bảng `refreshtokenuser`
--
ALTER TABLE `refreshtokenuser`
  ADD CONSTRAINT `refreshtokenuser_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `inforuser` (`id`);

--
-- Các ràng buộc cho bảng `shoppingcart`
--
ALTER TABLE `shoppingcart`
  ADD CONSTRAINT `shoppingcart_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `inforuser` (`id`),
  ADD CONSTRAINT `shoppingcart_ibfk_2` FOREIGN KEY (`idChildProduct`) REFERENCES `childproduct` (`idChildProduct`);

--
-- Các ràng buộc cho bảng `tempcart`
--
ALTER TABLE `tempcart`
  ADD CONSTRAINT `tempcart_ibfk_2` FOREIGN KEY (`idInforUser`) REFERENCES `inforemployee` (`idInforUser`),
  ADD CONSTRAINT `tempcart_ibfk_3` FOREIGN KEY (`idChildProduct`) REFERENCES `childproduct` (`idChildProduct`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
