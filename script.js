$(document).ready(function() {
    // Fungsi untuk ambil harga kripto dari CoinGecko API (gratis, limit 10-50 request/minute)
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

    // Update harga setiap 30 detik
    fetchCryptoPrices();
    setInterval(fetchCryptoPrices, 30000);

    // Filter sederhana untuk airdrop (opsional, bisa dikembangkan)
    $('#filter').on('click', function(e) {
        e.preventDefault();
        alert('Fitur filter berdasarkan blockchain akan segera hadir! Pilih Ethereum, Solana, atau Base untuk melihat airdrop spesifik.');
        // Nanti bisa tambah JavaScript untuk filter berdasarkan data airdrop (manual atau dari API gratis).
    });
});
