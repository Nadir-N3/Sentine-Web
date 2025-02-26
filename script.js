$(document).ready(function() {
    // Toggle Sidebar Slider
    $('#menu-toggle').on('click', function() {
        $('#sidebar').toggleClass('active');
    });

    // Close Sidebar saat klik di luar
    $(document).on('click', function(event) {
        if (!$(event.target).closest('#sidebar, #menu-toggle').length) {
            $('#sidebar').removeClass('active');
        }
    });

    // Navigasi Interaktif (pindah section dengan animasi scroll)
    $('a[href^="#"]').not('[href="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top - 80
        }, 800);
        $('#sidebar').removeClass('active');
    });

    // Dashboard Akun dengan localStorage
    let userData = JSON.parse(localStorage.getItem('sentinelUser')) || { name: 'Pengguna', favorites: 'Gradient, BlockMesh, Functor' };
    $('#user-name').text(userData.name);
    $('#favorite-airdrops').text(userData.favorites);

    $('#edit-profile').on('click', function(e) {
        e.preventDefault();
        const newName = prompt('Masukkan Nama Pengguna Baru:', userData.name);
        const newFavorites = prompt('Masukkan Airdrop Favorit (pisahkan dengan koma):', userData.favorites);
        if (newName && newFavorites) {
            userData.name = newName.trim();
            userData.favorites = newFavorites.trim().split(',').map(item => item.trim()).join(', ');
            localStorage.setItem('sentinelUser', JSON.stringify(userData));
            $('#user-name').text(userData.name);
            $('#favorite-airdrops').text(userData.favorites);
            $('#save-profile').addClass('hidden');
        }
        $('#save-profile').toggleClass('hidden', !newName || !newFavorites);
    });

    // Notifikasi Real-Time Sederhana (Update setiap 1 menit)
    function updateNotifications() {
        const notifications = [
            `Airdrop Gradient berakhir dalam ${Math.floor(Math.random() * 15) + 1} hari.`,
            'BlockMesh membuka drophunt baru dalam 24 jam!',
            `Functor membutuhkan ${Math.floor(Math.random() * 5) + 1} tugas untuk bonus.`
        ];
        let html = '<ul class="list-disc pl-5 text-gray-600">';
        notifications.forEach(notif => html += `<li>${notif}</li>`);
        html += '</ul>';
        $('#notification-list').html(html);
    }
    updateNotifications();
    setInterval(updateNotifications, 60000); // Update setiap 1 menit

    // Toggle Dashboard, Notifikasi, dan Pengaturan
    $('a[href="#dashboard"]').on('click', function(e) {
        e.preventDefault();
        $('.mt-12').hide();
        $('#dashboard').show();
        $('#sidebar').removeClass('active');
    });

    $('a[href="#notifications"]').on('click', function(e) {
        e.preventDefault();
        $('.mt-12').hide();
        $('#notifications').show();
        $('#sidebar').removeClass('active');
    });

    $('a[href="#settings"]').on('click', function(e) {
        e.preventDefault();
        $('.mt-12').hide();
        $('#settings').show();
        $('#sidebar').removeClass('active');
    });

    $('a[href="#logout"]').on('click', function(e) {
        e.preventDefault();
        if (confirm('Yakin ingin keluar?')) {
            localStorage.removeItem('sentinelUser');
            userData = { name: 'Pengguna', favorites: 'Gradient, BlockMesh, Functor' };
            $('#user-name').text(userData.name);
            $('#favorite-airdrops').text(userData.favorites);
            alert('Berhasil keluar. Balik ke Beranda.');
            $('.mt-12').hide();
            $('#home').show();
            $('#sidebar').removeClass('active');
        }
    });

    // Mode Gelap/Terang
    $('#dark-mode').on('change', function() {
        if ($(this).is(':checked')) {
            $('body').removeClass('bg-gray-50 text-gray-800').addClass('bg-gray-900 text-white');
            $('.bg-white').removeClass('bg-white text-gray-600').addClass('bg-gray-800 text-gray-300');
            $('.bg-blue-600').removeClass('bg-blue-600').addClass('bg-gray-700');
            $('.bg-blue-500').removeClass('bg-blue-500').addClass('bg-gray-600');
            $('.bg-yellow-500').removeClass('bg-yellow-500').addClass('bg-yellow-600');
            $('.text-blue-600').removeClass('text-blue-600').addClass('text-gray-400');
            $('.text-blue-500').removeClass('text-blue-500').addClass('text-gray-300');
            $('.text-gray-500').removeClass('text-gray-500').addClass('text-gray-400');
            $('.border-blue-400').removeClass('border-blue-400').addClass('border-gray-600');
            $('.bg-gradient-to-r').removeClass('from-blue-600 to-blue-800').addClass('from-gray-700 to-gray-900');
        } else {
            $('body').removeClass('bg-gray-900 text-white').addClass('bg-gray-50 text-gray-800');
            $('.bg-gray-800').removeClass('bg-gray-800 text-gray-300').addClass('bg-white text-gray-600');
            $('.bg-gray-700').removeClass('bg-gray-700').addClass('bg-blue-600');
            $('.bg-gray-600').removeClass('bg-gray-600').addClass('bg-blue-500');
            $('.bg-yellow-600').removeClass('bg-yellow-600').addClass('bg-yellow-500');
            $('.text-gray-400').removeClass('text-gray-400').addClass('text-blue-600');
            $('.text-gray-300').removeClass('text-gray-300').addClass('text-blue-500');
            $('.text-gray-400').removeClass('text-gray-400').addClass('text-gray-500');
            $('.border-gray-600').removeClass('border-gray-600').addClass('border-blue-400');
            $('.bg-gradient-to-r').removeClass('from-gray-700 to-gray-900').addClass('from-blue-600 to-blue-800');
        }
        localStorage.setItem('darkMode', $(this).is(':checked') ? 'on' : 'off');
    });

    // Load Mode Gelap/Terang dari localStorage
    const darkMode = localStorage.getItem('darkMode') === 'on';
    if (darkMode) {
        $('#dark-mode').prop('checked', true);
        $('#dark-mode').trigger('change');
    }

    // Ubah Bahasa
    $('#language-select').on('change', function() {
        const lang = $(this).val();
        if (lang === 'en') {
            $('h1').text('SentinelDiscus - Trusted Airdrop & Crypto Hub');
            $('[data-lang="welcome"]').text('Welcome to SentinelDiscus! We are the premier platform for our community, providing the latest information on crypto airdrops, blockchain projects, and free drophunting opportunities. Join us for exclusive updates and seize these opportunities now!');
            $('[data-lang="join"]').text('Join SentinelDiscus Telegram');
            $('[data-lang="airdrops"]').text('Latest Airdrop Opportunities');
            $('[data-lang="drophunting"]').text('Latest Drophunting Opportunities');
            $('[data-lang="crypto-data"]').text('Real-Time Crypto Data');
            $('[data-lang="about"]').text('About Us');
            $('[data-lang="contact"]').text('Contact Us');
            $('[data-lang="socials"]').text('Follow Us on Social Media');
            $('[data-lang="tips"]').text('Airdrop Farming Tips');
            $('[data-lang="filter"]').text('Filter by Blockchain');
            $('#dashboard h2').text('Account Dashboard');
            $('#notifications h2').text('Airdrop Notifications');
            $('#settings h2').text('Settings');
        } else {
            $('h1').text('SentinelDiscus - Pusat Airdrop & Kripto Terpercaya');
            $('[data-lang="welcome"]').text('Selamat datang di SentinelDiscus! Kami adalah platform utama untuk komunitas kami, menyediakan informasi terbaru tentang airdrop crypto, proyek blockchain, dan peluang drophunting gratis. Bergabunglah untuk update eksklusif dan manfaatkan peluang ini sekarang!');
            $('[data-lang="join"]').text('Bergabung di Telegram SentinelDiscus');
            $('[data-lang="airdrops"]').text('Peluang Airdrop Terbaru');
            $('[data-lang="drophunting"]').text('Peluang Drophunting Terkini');
            $('[data-lang="crypto-data"]').text('Data Kripto Real-Time');
            $('[data-lang="about"]').text('Tentang Kami');
            $('[data-lang="contact"]').text('Hubungi Kami');
            $('[data-lang="socials"]').text('Ikuti Kami di Sosial Media');
            $('[data-lang="tips"]').text('Tips Farming Airdrop');
            $('[data-lang="filter"]').text('Filter Berdasarkan Blockchain');
            $('#dashboard h2').text('Dashboard Akun');
            $('#notifications h2').text('Notifikasi Airdrop');
            $('#settings h2').text('Pengaturan');
        }
        localStorage.setItem('language', lang);
    });

    // Load Bahasa dari localStorage
    const language = localStorage.getItem('language') || 'id';
    $('#language-select').val(language);
    $('#language-select').trigger('change');

    // Reset Pengaturan
    $('#reset-settings').on('click', function() {
        if (confirm('Yakin ingin reset semua pengaturan?')) {
            localStorage.removeItem('darkMode');
            localStorage.removeItem('language');
            localStorage.removeItem('sentinelUser');
            $('#dark-mode').prop('checked', false).trigger('change');
            $('#language-select').val('id').trigger('change');
            userData = { name: 'Pengguna', favorites: 'Gradient, BlockMesh, Functor' };
            $('#user-name').text(userData.name);
            $('#favorite-airdrops').text(userData.favorites);
            alert('Pengaturan berhasil direset. Balik ke Beranda.');
            $('.mt-12').hide();
            $('#home').show();
        }
    });

    // Fungsi untuk ambil harga kripto dari CoinGecko API (gratis)
    function fetchCryptoPrices() {
        $.getJSON('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd', function(data) {
            let prices = '<div class="grid grid-cols-1 md:grid-cols-3 gap-4">';
            prices += `<div class="bg-white p-4 rounded-lg shadow"><p class="text-gray-600">Bitcoin: $${data.bitcoin.usd}</p></div>`;
            prices += `<div class="bg-white p-4 rounded-lg shadow"><p class="text-gray-600">Ethereum: $${data.ethereum.usd}</p></div>`;
            prices += `<div class="bg-white p-4 rounded-lg shadow"><p class="text-gray-600">Binance Coin: $${data.binancecoin.usd}</p></div>`;
            prices += '</div>';
            $('#crypto-prices').html(prices);
        }).fail(function() {
            $('#crypto-prices').html('<p class="text-gray-600">Error loading prices. Coba refresh halaman.</p>');
        });
    }

    // Grafik harga kripto sederhana pake Chart.js
    function createPriceChart() {
        const ctx = document.getElementById('priceChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: 'Bitcoin Price (USD)',
                    data: [40000, 42000, 41000, 43000, 45000],
                    borderColor: '#4299e1',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: false }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // Timer airdrop sederhana
    function updateTimers() {
        $('.timer').each(function() {
            const endDate = new Date($(this).data('end'));
            const now = new Date();
            const diff = endDate - now;
            if (diff > 0) {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                $(this).text(`${days}d ${hours}h ${minutes}m`);
            } else {
                $(this).text('Airdrop Berakhir');
            }
        });
    }

    // Filter airdrop berdasarkan blockchain
    $('#filter-btn').on('click', function() {
        $('#filter-options').toggleClass('hidden');
    });

    $('#filter-options select').on('change', function() {
        const blockchain = $(this).val();
        let filteredAirdrops = $('.animate__fadeIn');
        if (blockchain !== 'all') {
            filteredAirdrops = $(`.animate__fadeIn:contains(${blockchain})`);
            $('.animate__fadeIn').hide();
            filteredAirdrops.show();
        } else {
            $('.animate__fadeIn').show();
        }
    });

    // Search bar sederhana (opsional, tambahkan input di navbar kalau mau)
    $('#search-input').on('input', function() {
        const query = $(this).val().toLowerCase();
        $('.animate__fadeIn').each(function() {
            const text = $(this).text().toLowerCase();
            $(this).toggle(text.includes(query));
        });
    });

    // Update data setiap 30 detik
    fetchCryptoPrices();
    createPriceChart();
    updateTimers();
    setInterval(() => {
        fetchCryptoPrices();
        updateTimers();
    }, 30000);
});
