-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 02, 2024 lúc 07:34 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
-- START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `studio_photo`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `album_concept`
--

CREATE TABLE `album_concept` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `price` float NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `album_concept`
--

INSERT INTO `album_concept` (`id`, `name`, `content`, `price`, `type`) VALUES
(3, 'Chụp ảnh profile cá nhân', 'Dịch vụ “Chụp ảnh profile cá nhân” mang đến cho bạn cơ hội tạo dựng hình ảnh chuyên nghiệp và ấn tượng. Với đội ngũ nhiếp ảnh gia giàu kinh nghiệm và trang thiết bị hiện đại, chúng tôi cam kết mang đến những bức ảnh chất lượng cao, phản ánh đúng phong cách và cá tính của bạn.', 0, 0),
(24, 'Chụp ảnh ngoại cảnh', 'Dịch vụ “Chụp ảnh ngoại cảnh” mang đến cho bạn cơ hội lưu giữ những khoảnh khắc đẹp nhất trong không gian tự nhiên. Với đội ngũ nhiếp ảnh gia chuyên nghiệp và giàu kinh nghiệm, chúng tôi cam kết mang đến những bức ảnh chất lượng cao, phản ánh chân thực và sống động nhất.', 0, 0),
(25, 'Chụp ảnh cưới', 'Dịch vụ “Chụp ảnh cưới” của chúng tôi mang đến cho bạn cơ hội lưu giữ những khoảnh khắc đẹp nhất trong ngày trọng đại. Với đội ngũ nhiếp ảnh gia chuyên nghiệp và trang thiết bị hiện đại, chúng tôi cam kết mang đến những bức ảnh cưới chất lượng cao, sắc nét và đầy cảm xúc.', 0, 0),
(26, 'Chụp ảnh sản phẩm', 'Dịch vụ “Chụp ảnh sản phẩm” của chúng tôi mang đến giải pháp hoàn hảo để nâng cao hình ảnh thương hiệu và thúc đẩy doanh số bán hàng. Với đội ngũ nhiếp ảnh gia chuyên nghiệp và trang thiết bị hiện đại, chúng tôi cam kết mang đến những bức ảnh sản phẩm chất lượng cao, sắc nét và hấp dẫn.', 0, 0),
(27, 'Hỗ trợ cho thuê không gian chụp ảnh', 'Chúng tôi cung cấp dịch vụ cho thuê không gian chụp ảnh chuyên nghiệp, đáp ứng mọi nhu cầu của bạn từ chụp ảnh sản phẩm, chân dung, thời trang, đến quay phim quảng cáo và sự kiện. Với không gian rộng rãi, trang thiết bị hiện đại và đội ngũ hỗ trợ tận tâm, chúng tôi cam kết mang đến cho bạn trải nghiệm chụp ảnh tuyệt vời nhất.', 0, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `carts_products`
--

CREATE TABLE `carts_products` (
  `id` int(11) NOT NULL,
  `cart_id` bigint(20) NOT NULL,
  `UID` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `received` date NOT NULL,
  `end` date NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment_album`
--

CREATE TABLE `comment_album` (
  `id` bigint(20) NOT NULL,
  `UID` int(11) NOT NULL,
  `id_album` int(11) NOT NULL,
  `content` text NOT NULL,
  `likes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `path_image` varchar(255) NOT NULL,
  `album_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `gallery`
--

INSERT INTO `gallery` (`id`, `path_image`, `album_id`) VALUES
(1, 'bg_Home_9.jpg', 3),
(6, 'bg_Home_10.jpg', 24),
(7, 'bg_Home_11.jpg', 25),
(25, 'bg_Home_6.jpg', 26),
(26, 'bg_Home_2.jpg', 27);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `type` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `items`
--

INSERT INTO `items` (`id`, `name`, `image`, `description`, `price`, `type`) VALUES
(2, 'Canon 750D', 'I750D.webp', 'Thiết bị cho thuê', 300000, 1),
(8, 'Canon 6D', 'icanon6D.jpg', 'Thiết bị cho thuê', 300000, 1),
(9, 'Canon EOS M50', 'canonm50.jpg', 'Thiết bị cho thuê', 300000, 1),
(13, 'Canon 6D Mark II', 'canon6Dmarkii.jpg', 'Thiết bị cho thuê', 300000, 1),
(14, 'Go Pro Hero 7', 'goprohero7.jpg', 'Thiết bị cho thuê', 300000, 1),
(15, 'Sony FX3 Full-Frame Cinema Camera\r\n', 'sonyfx3.jpg', 'Thiết bị cho thuê', 300000, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `items_type`
--

CREATE TABLE `items_type` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `items_type`
--

INSERT INTO `items_type` (`id`, `type`) VALUES
(1, 'Máy ảnh'),
(2, 'Đèn'),
(4, 'Phụ kiện'),
(5, 'MIC'),
(6, 'Lens'),
(7, 'Chân máy');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reply_comment`
--

CREATE TABLE `reply_comment` (
  `id` bigint(20) NOT NULL,
  `UID` int(11) NOT NULL,
  `id_comment` bigint(20) NOT NULL,
  `content` text NOT NULL,
  `likes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `UID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `avt` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` int(1) NOT NULL,
  `birthday` date NOT NULL,
  `phone` int(11) NOT NULL,
  `password` varchar(64) NOT NULL,
  `token` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `cart_id` bigint(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`UID`, `name`, `avt`, `email`, `gender`, `birthday`, `phone`, `password`, `token`, `role`, `cart_id`) VALUES
(66, 'Đỗ Hùng Hảo', 'default.png', 'dohunghao.work@gmail.com', 0, '2002-11-18', 2147483647, '97c73d0b269027ece9e2d246cf8f4e465904b775a0786912529e7a8d5f9f77da', '', 'USER', 1722282224892);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_booking`
--

CREATE TABLE `user_booking` (
  `id` bigint(20) NOT NULL,
  `UID` int(11) NOT NULL,
  `id_album_concep` int(11) NOT NULL,
  `note` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `album_concept`
--
-- ALTER TABLE `album_concept`
--   ADD PRIMARY KEY (`id`);

-- --
-- -- Chỉ mục cho bảng `carts_products`
-- --
-- ALTER TABLE `carts_products`
--   ADD PRIMARY KEY (`id`),
--   ADD UNIQUE KEY `cart_id` (`cart_id`,`UID`,`id_item`,`received`,`end`),
--   ADD KEY `cart_id_2` (`cart_id`),
--   ADD KEY `id_item` (`id_item`),
--   ADD KEY `UID` (`UID`) USING BTREE;

-- --
-- -- Chỉ mục cho bảng `comment_album`
-- --
-- ALTER TABLE `comment_album`
--   ADD PRIMARY KEY (`id`),
--   ADD UNIQUE KEY `id` (`id`,`id_album`),
--   ADD KEY `UID` (`UID`),
--   ADD KEY `id_album` (`id_album`);

-- --
-- -- Chỉ mục cho bảng `gallery`
-- --
-- ALTER TABLE `gallery`
--   ADD PRIMARY KEY (`id`),
--   ADD KEY `gallery_ibfk_1` (`album_id`);

-- --
-- -- Chỉ mục cho bảng `items`
-- --
-- ALTER TABLE `items`
--   ADD PRIMARY KEY (`id`),
--   ADD KEY `type` (`type`);

-- --
-- -- Chỉ mục cho bảng `items_type`
-- --
-- ALTER TABLE `items_type`
--   ADD PRIMARY KEY (`id`);

-- --
-- -- Chỉ mục cho bảng `reply_comment`
-- --
-- ALTER TABLE `reply_comment`
--   ADD PRIMARY KEY (`id`),
--   ADD UNIQUE KEY `id` (`id`,`id_comment`),
--   ADD KEY `id_comment` (`id_comment`),
--   ADD KEY `UID` (`UID`);

-- --
-- -- Chỉ mục cho bảng `users`
-- --
-- ALTER TABLE `users`
--   ADD PRIMARY KEY (`UID`),
--   ADD UNIQUE KEY `cart_id` (`cart_id`) USING BTREE;

-- --
-- -- Chỉ mục cho bảng `user_booking`
-- --
-- ALTER TABLE `user_booking`
--   ADD PRIMARY KEY (`id`),
--   ADD KEY `id_album_concep` (`id_album_concep`),
--   ADD KEY `UID` (`UID`);

-- --
-- -- AUTO_INCREMENT cho các bảng đã đổ
-- --

-- --
-- -- AUTO_INCREMENT cho bảng `album_concept`
-- --
-- ALTER TABLE `album_concept`
--   MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

-- --
-- -- AUTO_INCREMENT cho bảng `carts_products`
-- --
-- ALTER TABLE `carts_products`
--   MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

-- --
-- -- AUTO_INCREMENT cho bảng `gallery`
-- --
-- ALTER TABLE `gallery`
--   MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

-- --
-- -- AUTO_INCREMENT cho bảng `items`
-- --
-- ALTER TABLE `items`
--   MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

-- --
-- -- AUTO_INCREMENT cho bảng `items_type`
-- --
-- ALTER TABLE `items_type`
--   MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

-- --
-- -- AUTO_INCREMENT cho bảng `users`
-- --
-- ALTER TABLE `users`
--   MODIFY `UID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

-- --
-- -- Các ràng buộc cho các bảng đã đổ
-- --

-- --
-- -- Các ràng buộc cho bảng `carts_products`
-- --
-- ALTER TABLE `carts_products`
--   ADD CONSTRAINT `carts_products_ibfk_2` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`) ON DELETE CASCADE ON UPDATE CASCADE,
--   ADD CONSTRAINT `carts_products_ibfk_3` FOREIGN KEY (`cart_id`) REFERENCES `users` (`cart_id`) ON DELETE CASCADE ON UPDATE CASCADE,
--   ADD CONSTRAINT `carts_products_ibfk_4` FOREIGN KEY (`id_item`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- --
-- -- Các ràng buộc cho bảng `comment_album`
-- --
-- ALTER TABLE `comment_album`
--   ADD CONSTRAINT `comment_album_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`),
--   ADD CONSTRAINT `comment_album_ibfk_2` FOREIGN KEY (`id_album`) REFERENCES `album_concept` (`id`);

-- --
-- -- Các ràng buộc cho bảng `gallery`
-- --
-- ALTER TABLE `gallery`
--   ADD CONSTRAINT `gallery_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `album_concept` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- --
-- -- Các ràng buộc cho bảng `items`
-- --
-- ALTER TABLE `items`
--   ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`type`) REFERENCES `items_type` (`id`);

-- --
-- -- Các ràng buộc cho bảng `reply_comment`
-- --
-- ALTER TABLE `reply_comment`
--   ADD CONSTRAINT `reply_comment_ibfk_1` FOREIGN KEY (`id_comment`) REFERENCES `comment_album` (`id`),
--   ADD CONSTRAINT `reply_comment_ibfk_2` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`);

-- --
-- -- Các ràng buộc cho bảng `user_booking`
-- --
-- ALTER TABLE `user_booking`
--   ADD CONSTRAINT `user_booking_ibfk_1` FOREIGN KEY (`id_album_concep`) REFERENCES `album_concept` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
--   ADD CONSTRAINT `user_booking_ibfk_2` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`) ON DELETE CASCADE ON UPDATE CASCADE;
-- COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
