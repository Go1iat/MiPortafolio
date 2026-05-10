async function consultarCrypto() {
    const monto = document.getElementById('monto').value;
    const crypto = document.getElementById('crypto').value;
    const resultadoDiv = document.getElementById('resultado');

    if (!monto || monto <= 0) {
        resultadoDiv.innerHTML = "<small>Ingresa una cantidad válida</small>";
        return;
    }

    resultadoDiv.innerHTML = "Consultando mercado...";

    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
        const data = await response.json();
        
        const precioActual = data[crypto].usd;
        const valorTotal = monto * precioActual;

        resultadoDiv.innerHTML = `
            <h2 style="color: #10b981;">$${valorTotal.toLocaleString('en-US', {minimumFractionDigits: 2})} USD</h2>
            <p style="font-size: 0.8rem; color: #94a3b8;">Precio actual: $${precioActual.toLocaleString()} USD</p>
        `;
    } catch (error) {
        resultadoDiv.innerHTML = "Error de conexión.";
    }
}