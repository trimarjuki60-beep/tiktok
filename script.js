async function downloadVideo() {
    const urlInput = document.getElementById('videoUrl').value.trim();
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');

    if (!urlInput) {
        alert('Harap masukkan URL video TikTok!');
        return;
    }

    // Tampilkan animasi loading
    loading.classList.remove('hidden');
    result.classList.add('hidden');

    try {
        // Menggunakan API publik TikWM untuk scraping video TikTok
        const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(urlInput)}`);
        const data = await response.json();

        if (data.code === 0) {
            const videoData = data.data;

            // Update elemen HTML dengan data dari TikTok
            document.getElementById('thumb').src = videoData.cover;
            document.getElementById('author').innerText = `@${videoData.author.unique_id}`;
            document.getElementById('desc').innerText = videoData.title || 'Tidak ada deskripsi';
            
            document.getElementById('downloadNoWatermark').href = videoData.play;
            document.getElementById('downloadAudio').href = videoData.music;

            // Tampilkan hasil
            loading.classList.add('hidden');
            result.classList.remove('hidden');
        } else {
            alert('Gagal mengambil video. Pastikan link TikTok valid!');
            loading.classList.add('hidden');
        }
    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat memproses permintaan.');
        loading.classList.add('hidden');
    }
}
