$(document).ready(function() {
    // Fungsi untuk ambil harga kripto dari CoinGecko API (gratis, limit 10-50 request/minute)
    function fetchCryptoPrices() {
        $.getJSON('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd', function(data) {
            let prices = '';
            prices += `<p>Bitcoin: $${data.bitcoin.usd}</p>`;
            prices += `<p>Ethereum: $${data.ethereum.usd}</p>`;
            prices += `<p>Binance Coin: $${data.binancecoin.usd}</p>`;
            $('#crypto-prices').html(prices);
        }).fail(function() {
            $('#crypto-prices').html('<p>Error loading prices. Coba refresh halaman.</p>');
        });
    }

    // Update harga setiap 30 detik (gratis, nggak boros quota API)
    fetchCryptoPrices();
    setInterval(fetchCryptoPrices, 30000);
});
