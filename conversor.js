async function convertirMoneda() {
    const monto = document.getElementById('monto').value;
    const moneda = document.getElementById('moneda').value;
    const resultadoDiv = document.getElementById('resultado');

    if (!monto || monto <= 0) {
        resultadoDiv.innerHTML = "Ingresa un monto";
        return;
    }

    // 1. Regla para países dolarizados
    if (moneda === "USD_FIXED") {
        resultadoDiv.innerHTML = `Son $${parseFloat(monto).toLocaleString('en-US')} USD`;
        return;
    }

    try {
        const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const data = await res.json();
        let tasa = data.rates[moneda];

        // 2. CASO ESPECIAL VENEZUELA: Si la API devuelve 0 o no responde
        if (moneda === "VES" && (!tasa || tasa === 0)) {
            tasa = 499.27; // <--- Pon aquí la tasa del BCV del día si la API falla
            const final = monto / tasa;
            resultadoDiv.innerHTML = `Son $${final.toLocaleString('en-US', {minimumFractionDigits: 2})} USD 
            <br><small style="color: #fbbf24;">(Usando tasa referencial BCV)</small>`;
            return;
        }

        // 3. Lógica normal para el resto de países
        if (tasa) {
            const final = monto / tasa;
            let aviso = "";
            if (["VES", "ARS", "CUP"].includes(moneda)) {
                aviso = `<br><mid style="color: #fbbf24;">⚠️ Tasa oficial (puede variar mercado paralelo).</mid>`;
            }
            resultadoDiv.innerHTML = `Son $${final.toLocaleString('en-US', {minimumFractionDigits: 2})} USD ${aviso}`;
        } else {
            resultadoDiv.innerHTML = "Moneda no disponible en esta API.";
        }

    } catch (e) {
        resultadoDiv.innerHTML = "Error de red. Intenta más tarde.";
    }
}