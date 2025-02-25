$(document).ready(function() {
    // Fungsi untuk ambil harga kripto dari CoinGecko API (gratis)
    function fetchCryptoPrices() {
        $.getJSON('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,flare-network&vs_currencies=usd', function(data) {
            let prices = '<div class="grid grid-cols-1 md:grid-cols-4 gap-4">';
            prices += `<div class="bg-white p-4 rounded-lg shadow"><p class="text-gray-600">Bitcoin: $${data.bitcoin.usd}</p></div>`;
            prices += `<div class="bg-white p-4 rounded-lg shadow"><p class="text-gray-600">Ethereum: $${data.ethereum.usd}</p></div>`;
            prices += `<div class="bg-white p-4 rounded-lg shadow"><p class="text-gray-600">Binance Coin: $${data.binancecoin.usd}</p></div>`;
            prices += `<div class="bg-white p-4 rounded-lg shadow"><p class="text-gray-600">Flare (FLR): $${data['flare-network'] ? data['flare-network'].usd : 'Data not available'}</p></div>`;
            prices += '</div>';
            $('#crypto-prices').html(prices);
        }).fail(function() {
            $('#crypto-prices').html('<p class="text-gray-600">Error loading prices. Coba refresh halaman.</p>');
        });
    }

    // Fungsi untuk ambil data Flare Network (contoh sederhana, gunakan API Flare kalau ada)
    function fetchFlareStats() {
        // Placeholder untuk data Flare Network (karena API gratis Flare mungkin terbatas, gunakan data manual atau CoinGecko)
        $.getJSON('https://api.coingecko.com/api/v3/coins/flare-network', function(data) {
            $('#flare-stats').html(`<p class="text-gray-600">Flare Network - Market Cap: $${data.market_data.market_cap.usd.toLocaleString()} | Harga: $${data.market_data.current_price.usd}</p>`);
        }).fail(function() {
            $('#flare-stats').html('<p class="text-gray-600">Error loading Flare stats. Coba refresh halaman.</p>');
        });
    }

    // Update data setiap 30 detik
    fetchCryptoPrices();
    fetchFlareStats();
    setInterval(() => {
        fetchCryptoPrices();
        fetchFlareStats();
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

    // Search bar sederhana
    $('#search-input').on('input', function() {
        const query = $(this).val().toLowerCase();
        $('.animate__fadeIn').each(function() {
            const text = $(this).text().toLowerCase();
            $(this).toggle(text.includes(query));
        });
    });
});
