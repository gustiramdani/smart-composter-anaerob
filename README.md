******Smart Anaerob Composter - Monitoring IoT & Prediksi Machine Learning******

Proyek ini adalah sistem Internet of Things (IoT) untuk memantau dan mengoptimalkan proses pengomposan pada komposter anaerob. Sistem ini dilengkapi dengan kemampuan prediksi berbasis Machine Learning untuk otomatisasi penyiraman.

![3d kompos 1](https://github.com/user-attachments/assets/3990bcaf-01ba-44f5-861f-15f688e73a9f)

📝 Latar Belakang
Pengelolaan sampah organik merupakan salah satu tantangan lingkungan yang serius di Indonesia. Menurut data SIPSN KLHK tahun 2023, timbulan sampah nasional mencapai lebih dari 38 juta ton, namun baru 48.12% yang tertangani. Pengomposan anaerob adalah salah satu solusi efektif untuk mengurangi limbah organik. Namun, proses ini sangat bergantung pada parameter lingkungan seperti suhu, kelembapan, dan pH agar dekomposisi berjalan optimal. Proyek ini dibangun untuk memantau parameter-parameter krusial tersebut secara real-time dan melakukan intervensi otomatis untuk menjaga kondisi ideal. 

✨ Fitur Utama
1. Pemantauan Real-time: Mengukur dan menampilkan data suhu, kelembapan, dan pH dari dalam komposter secara terus-menerus melalui dashboard web. 
2. Otomatisasi Penyiraman: Sistem secara otomatis mengaktifkan pompa air jika kelembapan turun di bawah 50% atau suhu melebihi 70°C untuk menjaga kondisi ideal bagi mikroorganisme.
3. Prediksi Kebutuhan Air (Machine Learning): Mengimplementasikan model Random Forest yang mampu memprediksi:
   a. Kapan penyiraman dibutuhkan (model klasifikasi). 
   b. Berapa banyak debit air yang harus dialirkan (model regresi). 
4. Dashboard Web Interaktif: Menampilkan data sensor terkini serta data historis yang dapat diekspor dalam format CSV untuk analisis lebih lanjut.

🛠️ Arsitektur Sistem
Sistem ini terdiri dari tiga bagian utama: Input, Proses, dan Output. 

- Input: Sensor Suhu (DS18B20), Sensor Kelembapan (DHT11), dan Sensor pH Tanah mengumpulkan data langsung dari media kompos. 
- Proses: Mikrokontroler ESP32 bertindak sebagai otak sistem. Ia memproses data sensor, mengirimkannya ke Firebase Realtime Database, dan menjalankan logika untuk kontrol otomatisasi. Server backend yang dibangun dengan Python Flask kemudian mengambil data dari Firebase untuk disimpan di database PostgreSQL. 
- Output: Data yang telah diolah ditampilkan pada dashboard web. Jika kondisi pemicu terpenuhi, ESP32 akan mengaktifkan relay untuk menyalakan pompa air.

💻 Tumpukan Teknologi (Tech Stack)

Perangkat Keras (Hardware)
- Mikrokontroler: ESP32 
- Sensor:
  a. Suhu: DS18B20 
  b. Kelembapan: DHT11 
  c. pH: Sensor pH Tanah 
  d. Aliran Air: Flow Sensor YF-S201 
- Aktuator: Pompa DC 12V & Relay 12V 
- Display: LCD I2C 16x2 
- Power Supply: Trafo PSU DC 12V 

Perangkat Lunak & Platform (Software & Platforms)
- Firmware: Arduino IDE 
- Database: Firebase Realtime Database (RTDB) & PostgreSQL 
- Backend: Python dengan framework Flask 
- Frontend: HTML, CSS, JavaScript 
- Infrastruktur: Ubuntu Server & Docker 
- Desain & Diagram: Cirkit Designer, Draw.io, FreeCAD

🚀 Hasil & Pencapaian

Hasil Pengujian Sistem
Sistem monitoring berhasil mengukur dan menampilkan data suhu, kelembapan, dan pH secara real-time melalui website dengan akurat. 
Sistem penyiraman otomatis terbukti fungsional dan mampu merespons kondisi lingkungan sesuai ambang batas yang ditentukan (Kelembapan < 50% atau Suhu > 70°C). 
Rata-rata error sensor setelah kalibrasi: Suhu (2.19%), Kelembapan (3.32%). 


Performa Model Machine Learning
Model Random Forest yang diterapkan menunjukkan performa yang sangat baik pada data uji:
Model Klasifikasi (Memprediksi "Perlu Siram" atau "Tidak"):
* Akurasi: 99.28% 

Model Regresi (Mengestimasi debit air):
* Mean Absolute Error (MAE): 0.6728 L/min 
* Root Mean Squared Error (RMSE): 0.8272 L/min


🖼️ Galeri Proyek
![rangkaian full](https://github.com/user-attachments/assets/84dff612-31b7-445e-b9c9-c5f194b49af1)


🧑‍💻 Kontributor
Gusti Ramdani - github.com/gustiramdani (2025)

🙏 Ucapan Terima Kasih
Proyek ini tidak akan terwujud tanpa bimbingan dan dukungan dari:
1. Gema Parasti Mindara, S.Si., M.Kom. selaku dosen pembimbing. 
2. Yayasan Tjoerah Lestari Bersama yang telah memfasilitasi lokasi dan pengumpulan data.
