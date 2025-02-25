$(document).ready(function() {
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

    // Update data setiap 30 detik
    fetchCryptoPrices();
    createPriceChart();
    updateTimers();
    setInterval(() => {
        fetchCryptoPrices();
        updateTimers();
    }, 30000);

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
});
