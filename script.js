$(document).ready(function() {
    // Fungsi untuk ambil harga kripto dari CoinGecko API (gratis, limit 10-50 request/minute)
    function fetchCryptoPrices() {
        $.getJSON('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd', function(data) {
            let prices = '<div class="grid grid-cols-1 md:grid-cols-3 gap-4">';
            prices += `<div class="bg-gray-800 p-4 rounded-lg shadow"><p class="text-gray-300">Bitcoin: $${data.bitcoin.usd}</p></div>`;
            prices += `<div class="bg-gray-800 p-4 rounded-lg shadow"><p class="text-gray-300">Ethereum: $${data.ethereum.usd}</p></div>`;
            prices += `<div class="bg-gray-800 p-4 rounded-lg shadow"><p class="text-gray-300">Binance Coin: $${data.binancecoin.usd}</p></div>`;
            prices += '</div>';
            $('#crypto-prices').html(prices);
        }).fail(function() {
            $('#crypto-prices').html('<p class="text-gray-300">Error loading prices. Coba refresh halaman.</p>');
        });
    }

    // Update harga setiap 30 detik
    fetchCryptoPrices();
    setInterval(fetchCryptoPrices, 30000);
});
