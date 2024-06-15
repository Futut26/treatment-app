-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 15 Jun 2024 pada 20.12
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `treatment_app`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `no_hp` varchar(255) DEFAULT NULL,
  `no_ktp` varchar(255) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `customers`
--

INSERT INTO `customers` (`id`, `user_id`, `no_hp`, `no_ktp`, `alamat`, `created_at`, `updated_at`) VALUES
(1, 2, '081234567890', '1234567890', 'Jl. Jalan No. 1', '2024-06-13 19:51:50', '2024-06-13 19:51:50'),
(2, 3, '08123333333334', '7201046118899999', 'bakti', '2024-06-14 07:42:19', '2024-06-14 07:43:30');

-- --------------------------------------------------------

--
-- Struktur dari tabel `dokters`
--

CREATE TABLE `dokters` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `spesialis` varchar(255) NOT NULL,
  `deskripsi` text NOT NULL,
  `dokter_image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `dokters`
--

INSERT INTO `dokters` (`id`, `nama`, `spesialis`, `deskripsi`, `dokter_image`, `created_at`, `updated_at`) VALUES
(1, 'dr. Vania Aramita Sari, Sp.B.P.R.E., Subsp.E.L.,(K)', 'Dokter Plastic Surgeon', '<p>gggggg</p>', '/assets/img/dokter/Artboard 1.png', '2024-06-13 19:52:00', '2024-06-14 07:30:57'),
(2, 'dr. Putri Rezkini, Sp.BP-RE', 'Dokter Plastic Surgeon', '<p class=\"ql-align-justify\">dr. Putri Rezkini atau biasa dipanggil dr. Puput memiliki&nbsp;<em>passion</em>&nbsp;pada permasalahan kebotakan. Beliau bahkan mempelajari khusus tentang&nbsp;<em>hair transplant</em>&nbsp;di Kyungpook National Hair Transplant Centre, Korea Selatan. Beliau juga memiliki keinginan besar untuk meningkatkan kualitas hidup pasien yang ingin mengembalikan tubuhnya seperti sebelum pasca melahirkan ataupun penuaan.</p><p class=\"ql-align-justify\">Menurut beliau, menjadi dokter adalah sebuah tantangan dimana dirinya dapat membantu masyarakat yang membutuhkan. Karena setiap orang memiliki permasalah masing-masing dan memiliki tujuan yang sama yaitu mempercantik diri. Beliau dengan senang hati akan membantu setiap permasalahan pasien termasuk para pasien yang mengalami cacat akibat kecelakaan, penyakit ataupun sejak lahir</p><p class=\"ql-align-justify\">Bagi dr. Puput, bedah plastik bukan hanya mengenai merubah diri dan menjadi cantik saja, lebih dari itu bedah plastik juga berperan penting untuk kesehatan serta meningkatkan kualitas hidup menjadi jauh lebih baik, baik dari luar maupun dari dalam.</p><p><br></p>', '/assets/img/dokter/20692e69f82953f89116c38b27bed2d5.png', '2024-06-13 19:52:04', '2024-06-14 07:35:00'),
(3, 'dr. Tasya Anggrahita, Sp.B.P.R.E., Subsp.E.L.,(K)', 'Dokter Plastic Surgeon', '<p class=\"ql-align-justify\">dr. Tasya merupakan seorang dokter bedah plastik dengan spesialisasi&nbsp;<em>Rhinoplasty</em>&nbsp;dan&nbsp;<em>Otoplasty</em>&nbsp;di Plasthetic Clinic Cabang Bendungan Hilir. Beliau sudah banyak sekali menangani berbagai keluhan pasien mengenai&nbsp;<em>Rhinoplasty</em>. Dengan kehandalanya beliau bisa mengerjakan teknik&nbsp;<em>Rhinoplasty</em>&nbsp;2&nbsp;<em>ear cartilage</em>,&nbsp;<em>ear cartilage</em>&nbsp;+ implan, ataupun menggunakan tulang iga. Beliau juga dikenal dengan pribadi yang teliti dan sangat detail dalam melakukan pekerjaan.</p><p class=\"ql-align-justify\">dr. Tasya kini juga sudah berpengalaman lebih dari 10 tahun di dunia kesehatan dan kecantikan. Pada awal tahun 2024, dr Tasya mendapatkan gelar konsultan bedah plastik lanjut atau Subsp.E.L.,(K) dan terus belajar demi kepuasan dan kepercayaan pasien. Maka dari itu performa serta kinerjanya tidak diragukan lagi dalam dunia medis.</p><p><br></p>', '/assets/img/dokter/7c09a823e426c9d729c5b1f1573c38ba.png', '2024-06-13 19:52:06', '2024-06-14 07:39:29'),
(4, 'Dr. Jane Roe', 'Dokter Anak', 'Ea et id dolor. Aperiam voluptatem explicabo sit iusto. Non labore iure molestiae minima.', '/assets/img/dokter/6572b08c28386162ec44f87627684aa3.png', '2024-06-13 19:52:09', '2024-06-13 19:52:09');

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `jadwals`
--

CREATE TABLE `jadwals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `dokter_id` bigint(20) UNSIGNED NOT NULL,
  `treatment_id` bigint(20) UNSIGNED NOT NULL,
  `hari` varchar(255) NOT NULL,
  `jam_mulai` time NOT NULL,
  `jam_selesai` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `jadwals`
--

INSERT INTO `jadwals` (`id`, `dokter_id`, `treatment_id`, `hari`, `jam_mulai`, `jam_selesai`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Senin', '08:00:00', '12:00:00', '2024-06-13 19:52:10', '2024-06-13 19:52:10'),
(2, 1, 2, 'Selasa', '08:00:00', '12:00:00', '2024-06-13 19:52:10', '2024-06-13 19:52:10'),
(3, 1, 3, 'Rabu', '08:00:00', '12:00:00', '2024-06-13 19:52:10', '2024-06-13 19:52:10'),
(4, 1, 4, 'Kamis', '08:00:00', '12:00:00', '2024-06-13 19:52:10', '2024-06-13 19:52:10'),
(5, 1, 4, 'Jumat', '08:00:00', '12:00:00', '2024-06-13 19:52:10', '2024-06-13 19:52:10'),
(6, 1, 4, 'Sabtu', '08:00:00', '12:00:00', '2024-06-13 19:52:10', '2024-06-13 19:52:10'),
(7, 1, 4, 'Minggu', '08:00:00', '12:00:00', '2024-06-13 19:52:10', '2024-06-13 19:52:10');

-- --------------------------------------------------------

--
-- Struktur dari tabel `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_05_21_120256_create_treatments_table', 1),
(5, '2024_05_22_155033_dokters', 1),
(6, '2024_05_23_120840_create_jadwals_table', 1),
(7, '2024_06_05_194558_create_orders_table', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `treatment_id` bigint(20) UNSIGNED NOT NULL,
  `jadwal_id` bigint(20) UNSIGNED NOT NULL,
  `jam_treatment` time NOT NULL,
  `tanggal_treatment` date NOT NULL,
  `status` varchar(255) NOT NULL,
  `no_antrian` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `treatment_id`, `jadwal_id`, `jam_treatment`, `tanggal_treatment`, `status`, `no_antrian`, `created_at`, `updated_at`) VALUES
(1, 3, 1, 1, '09:00:00', '2024-06-17', 'pending', '111', '2024-06-14 07:45:33', '2024-06-14 07:45:41');

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'admin', NULL, NULL),
(2, 'customer', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('oXPNU8Xg3aTXiIvQhRRSsoYVvWBQ5DfF2r2I7GXX', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicUR2dU9yQUFtVjd6dHJ1ZG9Rd0Z2cjYyaVJsVldaSjJVdXg4aFBXUyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9', 1718379924);

-- --------------------------------------------------------

--
-- Struktur dari tabel `treatments`
--

CREATE TABLE `treatments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `deskripsi` text NOT NULL,
  `harga` varchar(255) NOT NULL,
  `treatment_image` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `treatments`
--

INSERT INTO `treatments` (`id`, `nama`, `deskripsi`, `harga`, `treatment_image`, `created_at`, `updated_at`) VALUES
(1, 'Facial', '<p>Recusandae assumenda at amet ullam corrupti. Ut autem quo ducimus tenetur.</p>', '587.999', '/assets/img/treatment/105f442c3aa7a9c51464a7e2f25cd2d1.png', '2024-06-13 19:51:52', '2024-06-14 07:23:37'),
(2, 'Microbubble Exfoliation', '<p>Et maxime dolor deserunt in. Deleniti illo odit et. Sed esse cum qui porro odit illo.</p>', '234975', '/assets/img/treatment/2d1e4cd5c63b79138aa78c5e98ac602b.png', '2024-06-13 19:51:53', '2024-06-14 07:22:13'),
(3, 'Instant Detox', '<p>Aut non commodi vel. Similique quidem neque aut quaerat est ab. Tempore sapiente sint vel.</p>', '817027', '/assets/img/treatment/5d4c2b0c1fb48dd5cb6405bc9be95c56.png', '2024-06-13 19:51:55', '2024-06-14 07:22:38'),
(4, 'Plasma Nourish', '<p>Non modi perspiciatis sit dolore. Beatae illo neque fuga eveniet. Dolor dolore facilis est numquam.</p>', '956624', '/assets/img/treatment/d003cae7867bf617c784f254073bf654.png', '2024-06-13 19:51:56', '2024-06-14 07:23:10');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `avatar` varchar(2048) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `role_id`, `name`, `email`, `avatar`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 1, 'Admin', 'admin@gmail.com', '/assets/img/avatar/ac2d309710d99f7f96f05a42b9f65fa1.png', NULL, '$2y$12$PR5xOjOEBv5oHoDpsEsnpeO4LHJa.UbnAf5Myz2eYsYdTLcmR5nou', NULL, '2024-06-13 19:51:47', '2024-06-14 07:20:06'),
(2, 2, 'User', 'user@gmail.com', '/assets/img/avatar/441aae3235f1328bc8c9a803a9077cf7.png', NULL, '$2y$10$ieo9JU9Xt6nONrPdV4mEZO.LOI680tas1ouS.fjB4LUOuWOWGflMu', NULL, '2024-06-13 19:51:50', '2024-06-13 19:51:50'),
(3, 2, 'Adinda saraswati', 'adinda@gmail.com', '/assets/img/avatar/default_avatar.jpg', NULL, '$2y$12$j0mH7Bj/esaiqwGChYY0feBtI97qRDGxnqO0JvYsidR4YLYol38Ti', NULL, '2024-06-14 07:42:19', '2024-06-14 07:42:19');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customers_no_hp_unique` (`no_hp`),
  ADD UNIQUE KEY `customers_no_ktp_unique` (`no_ktp`),
  ADD KEY `customers_user_id_index` (`user_id`);

--
-- Indeks untuk tabel `dokters`
--
ALTER TABLE `dokters`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `jadwals`
--
ALTER TABLE `jadwals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jadwals_dokter_id_foreign` (`dokter_id`),
  ADD KEY `jadwals_treatment_id_foreign` (`treatment_id`);

--
-- Indeks untuk tabel `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indeks untuk tabel `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_no_antrian_unique` (`no_antrian`),
  ADD KEY `orders_user_id_index` (`user_id`),
  ADD KEY `orders_treatment_id_foreign` (`treatment_id`),
  ADD KEY `orders_jadwal_id_foreign` (`jadwal_id`);

--
-- Indeks untuk tabel `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indeks untuk tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_unique` (`name`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indeks untuk tabel `treatments`
--
ALTER TABLE `treatments`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_role_id_index` (`role_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `dokters`
--
ALTER TABLE `dokters`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `jadwals`
--
ALTER TABLE `jadwals`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `treatments`
--
ALTER TABLE `treatments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `jadwals`
--
ALTER TABLE `jadwals`
  ADD CONSTRAINT `jadwals_dokter_id_foreign` FOREIGN KEY (`dokter_id`) REFERENCES `dokters` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `jadwals_treatment_id_foreign` FOREIGN KEY (`treatment_id`) REFERENCES `treatments` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_jadwal_id_foreign` FOREIGN KEY (`jadwal_id`) REFERENCES `jadwals` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_treatment_id_foreign` FOREIGN KEY (`treatment_id`) REFERENCES `treatments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
