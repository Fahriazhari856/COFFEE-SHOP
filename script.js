// Scroll functionality for product sections
function scrollProducts(sectionId, direction) {
    // Ambil elemen scroll berdasarkan ID
    const scrollContainer = document.getElementById(sectionId + "-scroll");
    if (!scrollContainer) return; // Safety check kalau ID tidak ditemukan

    // Lebar scroll per klik (sesuaikan dengan card width + gap)
    const scrollAmount = 250; 

    // Arah scroll
    if (direction === "left") {
        scrollContainer.scrollBy({
            left: -scrollAmount,
            behavior: "smooth"
        });
    } else if (direction === "right") {
        scrollContainer.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        });
    }

    // Optional: update tombol navigasi jika ada
    setTimeout(() => {
        if (typeof updateNavButtons === "function") {
            updateNavButtons(sectionId);
        }
    }, 300);
}
