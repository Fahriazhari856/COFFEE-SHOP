// ====== FUNGSI PILIH MINUMAN ======
function selectDrink(index) {
    // Ambil semua elemen dengan class .drink-item
    const drinks = document.querySelectorAll('.drink-item');

    // Loop: cek apakah index sesuai, lalu beri warna background
    drinks.forEach((drink, i) => {
        drink.style.background = i === index 
            ? 'rgba(255,255,255,0.3)'   // warna saat dipilih
            : 'rgba(255,255,255,0.1)'; // warna default
    });
}

// ====== CAROUSEL / SLIDER ======
let currentSlide = 0;       // slide aktif sekarang
const totalSlides = 3;      // total jumlah slide

function changeSlide(index) {
    // ubah slide ke index yang dipilih
    currentSlide = index;
    updateIndicators(); // update titik indikator
    console.log(`Slide berubah ke: ${index}`);
}

function updateIndicators() {
    // perbarui titik indikator agar sesuai slide aktif
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentSlide);
    });
}

// Auto-advance carousel setiap 5 detik
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    changeSlide(currentSlide);
}, 5000);

// ====== FILTER PRODUK ======
function setActiveFilter(button) {
    // hapus class 'active' dari semua tombol filter
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // tambahkan class 'active' ke tombol yang dipilih
    button.classList.add('active');

    console.log(`Filter dipilih: ${button.textContent}`);
}

// ====== NAVIGASI MENU ATAS ======
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault(); // cegah reload halaman

        // hapus class aktif di semua menu
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });

        // beri class aktif pada menu yang diklik
        this.classList.add('active');
    });
});

// ====== PENCARIAN ======
document.querySelector('.search-box').addEventListener('keypress', function(e) {
    // tekan Enter untuk memulai pencarian
    if (e.key === 'Enter') {
        const searchTerm = this.value.trim();
        if (searchTerm) {
            alert(`Mencari: ${searchTerm}`);
        }
    }
});

// ====== TOGGLE MENU MOBILE ======
function toggleMobileMenu() {
    const nav = document.querySelector('.nav-content');
    // tampil/sembunyikan menu nav di mobile
    nav.style.display = nav.style.display === 'none' ? 'flex' : 'none';
}

// ====== SMOOTH SCROLL UNTUK ANCHOR LINK ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ====== ANIMASI LOADING & SCROLL HEADER ======
window.addEventListener('load', function() {
    // transisi fade in ketika halaman selesai dimuat
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease-in-out';
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    // beri shadow saat scroll lebih dari 100px
    header.style.boxShadow = window.scrollY > 100
        ? '0 4px 8px rgba(0,0,0,0.15)'
        : '0 2px 4px rgba(0,0,0,0.1)';
});

// // ====== SCROLL PRODUK KIRI/ KANAN ======
// function scrollProducts(sectionId, direction) {
//     // ambil elemen scroll berdasarkan ID
//     const scrollContainer = document.getElementById(sectionId + "-scroll");
//     if (!scrollContainer) return; // cek kalau elemen tidak ada

//     const scrollAmount = 250; // geser sejauh 250px per klik tombol

//     if (direction === "left") {
//         // scroll ke kiri
//         scrollContainer.scrollBy({
//             left: -scrollAmount,
//             behavior: "smooth"
//         });
//     } else if (direction === "right") {
//         // scroll ke kanan
//         scrollContainer.scrollBy({
//             left: scrollAmount,
//             behavior: "smooth"
//         });
//     }
// }
