
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://lxtdatdxttziyipkxfhw.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
//Pada tahap pengembangan awal, website Saya menggunakan Local Storage sebagai media penyimpanan data 
// karena lebih sederhana dan sudah mencukupi untuk menjalankan seluruh fitur utama. 
// Selain itu, proyek ini juga menyiapkan file supabase.js sebagai bentuk persiapan apabila pengembangan dilanjutkan ke tahap backend. 
// File tersebut berfungsi sebagai konfigurasi awal untuk menghubungkan aplikasi dengan Supabase, 
// sehingga di tahap selanjutnya sistem dapat dikembangkan menggunakan database dan autentikasi server-side tanpa harus mengubah struktur aplikasi secara keseluruhan.