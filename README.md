# MIYUKIZEN-social-media-web
A Twitter-like mini social media web application featuring login, guest mode, posting, likes, comments, and profile management built with HTML, CSS, and JavaScript.
<h2>Alur Penggunaan Website (Dari Awal Sampai Akhir)</h2> <h2>1. Halaman Landing / Login</h2>

Halaman pertama yang muncul saat website dibuka.

Tersedia dua pilihan:

<ul> <li>Login</li> <li>Lihat sebagai Guest</li> </ul> <h3>Tombol Login</h3>

Jika tombol Login ditekan:

<ul> <li>Muncul modal</li> <li>User dapat memilih:</li> <ul> <li>Buat Akun menuju halaman register.html</li> <li>Masuk Akun menuju halaman masukakun.html</li> </ul> </ul> <h3>Tombol Lihat sebagai Guest</h3>

Jika tombol Lihat sebagai Guest ditekan:

<ul> <li>User langsung masuk ke Dashboard</li> <li>Status user sebagai Guest</li> </ul>

Guest hanya dapat:

<ul> <li>Melihat konten</li> </ul>

Guest tidak dapat:

<ul> <li>Membuat postingan</li> <li>Memberikan like</li> <li>Menulis komentar</li> <li>Edit atau hapus postingan</li> <li>Membuka halaman profil</li> </ul>
<h2>2. Register (Buat Akun)</h2>

Pada halaman register:

<ul> <li>User mengisi:</li> <ul> <li>Email</li> <li>Password</li> </ul> <li>Data akun disimpan ke LocalStorage</li> </ul>

Setelah berhasil:

<ul> <li>User diarahkan ke halaman login</li> </ul>
<h2>3. Login (Masuk Akun)</h2>

Pada halaman login:

<ul> <li>User memasukkan email dan password</li> <li>Sistem memverifikasi data dari LocalStorage</li> </ul>

Jika data benar:

<ul> <li>User disimpan sebagai currentUser</li> <li>User diarahkan ke Dashboard</li> </ul>

Jika data salah:

<ul> <li>Muncul alert error</li> </ul>
<h2>4. Dashboard (Halaman Utama)</h2>

Dashboard merupakan pusat aktivitas utama aplikasi.

<h3>Tampilan Umum Dashboard</h3>

Topbar:

<ul> <li>Profil (kiri) menuju halaman profile</li> <li>Logo (tengah)</li> <li>Logout (kanan)</li> </ul>

Sidebar:

<ul> <li>Foto profil</li> <li>Username</li> <li>Bio</li> <li>Pencarian user</li> <li>Pencarian postingan</li> </ul>

Feed:

<ul> <li>Menampilkan daftar semua postingan</li> </ul>

Floating Button (+):

<ul> <li>Membuka modal posting</li> </ul>
<h2>5. Perbedaan Hak Akses User dan Guest</h2> <h3>User Login</h3>

User yang login dapat:

<ul> <li>Membuat postingan berupa teks dan banyak foto</li> <li>Upload banyak foto sekaligus</li> <li>Melihat preview foto sebelum posting</li> <li>Menghapus foto sebelum posting</li> <li>Memberikan like</li> <li>Menulis komentar</li> <li>Membalas komentar</li> <li>Edit postingan teks dan foto</li> <li>Hapus postingan</li> <li>Edit profil berupa foto, username, dan bio</li> <li>Logout</li> </ul> <h3>Guest</h3>

Guest hanya dapat:

<ul> <li>Melihat postingan</li> <li>Melihat foto postingan</li> <li>Membuka komentar dalam mode baca saja</li> </ul>

Jika Guest mencoba:

<ul> <li>Membuat postingan akan muncul alert login diperlukan</li> <li>Memberikan like akan muncul alert login</li> <li>Menulis komentar akan muncul pesan login untuk berkomentar</li> <li>Membuka halaman profil akan diarahkan ke halaman login</li> </ul>
<h2>6. Membuat Postingan</h2>

Cara membuat postingan:

<ul> <li>Klik tombol + di pojok kanan bawah</li> <li>Muncul modal di tengah layar</li> </ul>

User dapat:

<ul> <li>Menulis teks</li> <li>Upload lebih dari satu foto</li> <li>Melihat preview foto</li> <li>Menghapus foto satu per satu sebelum posting</li> </ul>

Pilihan tombol:

<ul> <li>Simpan untuk membuat postingan</li> <li>Batal untuk menutup modal dan mereset data</li> </ul>
<h2>7. Edit Postingan</h2>

Jika user adalah pemilik postingan:

<ul> <li>Klik menu tiga titik</li> <li>Pilih Edit</li> </ul>

User dapat:

<ul> <li>Mengubah teks</li> <li>Menambah foto baru</li> <li>Menghapus foto lama</li> </ul>

Tombol yang tersedia:

<ul> <li>Simpan</li> <li>Batal</li> </ul>
<h2>8. Hapus Postingan</h2>

Jika user memilih Hapus:

<ul> <li>Muncul modal konfirmasi</li> </ul>

Pilihan:

<ul> <li>Batal</li> <li>Hapus</li> </ul>

Jika Hapus dipilih:

<ul> <li>Postingan dihapus secara permanen</li> </ul>
<h2>9. Like dan Komentar</h2> <h3>Like</h3> <ul> <li>Klik ikon hati</li> <li>Like dapat diaktifkan dan dinonaktifkan</li> <li>Guest tidak dapat melakukan like</li> </ul> <h3>Komentar</h3>

User dapat:

<ul> <li>Menulis komentar</li> <li>Menghapus komentar milik sendiri</li> <li>Membalas komentar</li> </ul>

Guest:

<ul> <li>Hanya dapat melihat komentar</li> </ul>
<h2>10. Pencarian</h2> <h3>Pencarian User</h3> <ul> <li>Input tersedia di sidebar</li> <li>Memfilter postingan berdasarkan nama author</li> </ul> <h3>Pencarian Postingan</h3> <ul> <li>Mencari postingan berdasarkan isi teks</li> </ul>
<h2>11. Profil User</h2>

Halaman profile memungkinkan user:

<ul> <li>Mengganti foto profil</li> <li>Mengubah username</li> <li>Mengubah bio</li> <li>Menyimpan perubahan</li> <li>Kembali ke dashboard</li> </ul>

Data:

<ul> <li>Disimpan ke LocalStorage</li> <li>Langsung ter-update di dashboard</li> </ul>
<h2>12. Logout</h2>

Cara logout:

<ul> <li>Klik tombol Logout</li> <li>currentUser dihapus dari LocalStorage</li> <li>User diarahkan ke halaman login</li> </ul>
<h2>Teknologi yang Digunakan</h2> <ul> <li>HTML5</li> <li>CSS3</li> <li>JavaScript (Vanilla)</li> <li>LocalStorage</li> <li>Tanpa framework</li> </ul>
<h2>Catatan Penting</h2> <ul> <li>Seluruh fitur berjalan tanpa backend</li> <li>Data bersifat lokal di browser</li> <li>Fitur utama dan fitur tambahan telah terpenuhi</li> <li>Struktur kode rapi dan modular</li> <li>Siap dikembangkan ke tahap selanjutnya</li> </ul>
<h2>Penutup</h2>

MIYUKIZEN merupakan mini social media yang sederhana namun lengkap, dengan alur sistem yang jelas, pengalaman pengguna yang nyaman, serta fitur yang mendekati aplikasi sosial media modern.
