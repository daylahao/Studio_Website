-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 23, 2024 lúc 11:25 AM
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
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `album_concept`
--

INSERT INTO `album_concept` (`id`, `name`, `content`, `price`) VALUES
(3, '1', '[value-3]', 0),
(24, '2', '', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `carts_products`
--

CREATE TABLE `carts_products` (
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
(1, '1', 3),
(6, '1721636876316123.jpg', 24),
(7, '1721636876317Screenshot2024-01-30174106.png', 24);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `image` text NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `items`
--

INSERT INTO `items` (`id`, `name`, `image`, `description`, `price`, `type`) VALUES
(1, 'Canon', '[value-3]', '[value-4]', 0, ''),
(2, 'Nikon', '[value-3]', '[value-4]', 0, '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `items_type`
--

CREATE TABLE `items_type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `items_type`
--

INSERT INTO `items_type` (`id`, `name`) VALUES
(1, 'Đèn'),
(2, 'Máy Ảnh'),
(3, 'Concept'),
(4, 'Phụ kiện');

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
  `phone` int(11) NOT NULL,
  `password` varchar(64) NOT NULL,
  `token` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `cart_id` bigint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`UID`, `name`, `avt`, `email`, `phone`, `password`, `token`, `role`, `cart_id`) VALUES
(65, 'Đỗ Hùng Hảo', '1721626115728.jpg', 'dohunghao.work@gmail.com', 1234, 'ac1c464adc65360fc18692cfe97369b5f82b92173091ff2fe585419d301bf8c3', '', 'ADMIN', 1721464952362);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `album_concept`
--
ALTER TABLE `album_concept`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `carts_products`
--
ALTER TABLE `carts_products`
  ADD UNIQUE KEY `cart_id` (`cart_id`,`id_item`),
  ADD KEY `carts_products_ibfk_4` (`id_item`),
  ADD KEY `carts_products_ibfk_2` (`UID`);

--
-- Chỉ mục cho bảng `comment_album`
--
ALTER TABLE `comment_album`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`,`id_album`),
  ADD KEY `UID` (`UID`),
  ADD KEY `id_album` (`id_album`);

--
-- Chỉ mục cho bảng `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gallery_ibfk_1` (`album_id`);

--
-- Chỉ mục cho bảng `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `items_type`
--
ALTER TABLE `items_type`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `reply_comment`
--
ALTER TABLE `reply_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_comment` (`id_comment`),
  ADD KEY `UID` (`UID`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UID`),
  ADD UNIQUE KEY `cart_id` (`cart_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `album_concept`
--
ALTER TABLE `album_concept`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT cho bảng `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `items_type`
--
ALTER TABLE `items_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `UID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `carts_products`
--
ALTER TABLE `carts_products`
  ADD CONSTRAINT `carts_products_ibfk_2` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carts_products_ibfk_3` FOREIGN KEY (`cart_id`) REFERENCES `users` (`cart_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carts_products_ibfk_4` FOREIGN KEY (`id_item`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `comment_album`
--
ALTER TABLE `comment_album`
  ADD CONSTRAINT `comment_album_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`),
  ADD CONSTRAINT `comment_album_ibfk_2` FOREIGN KEY (`id_album`) REFERENCES `album_concept` (`id`);

--
-- Các ràng buộc cho bảng `gallery`
--
ALTER TABLE `gallery`
  ADD CONSTRAINT `gallery_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `album_concept` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `reply_comment`
--
ALTER TABLE `reply_comment`
  ADD CONSTRAINT `reply_comment_ibfk_1` FOREIGN KEY (`id_comment`) REFERENCES `comment_album` (`id`),
  ADD CONSTRAINT `reply_comment_ibfk_2` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`);
-- COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
