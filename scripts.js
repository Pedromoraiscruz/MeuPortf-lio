async function converter() {
    const valorInput = document.getElementById("valor");
    const moedaDe = document.getElementById("de");
    const moedaPara = document.getElementById("para");
    const resultado = document.getElementById("resultado");

    const valor = parseFloat(valorInput.value);
    if (isNaN(valor) || valor <= 0) {
        resultado.textContent = "Por favor, insira um valor válido maior que zero.";
        return;
    }

    if (moedaDe.value === moedaPara.value) {
        resultado.textContent = "Escolha moedas diferentes para conversão.";
        return;
    }

    const url = `https://api.exchangerate.host/convert?from=${moedaDe.value}&to=${moedaPara.value}&amount=${valor}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("Resposta da API:", data); // 👈 veja isso no console do navegador

        // Verifica se a resposta foi bem-sucedida e se existe o resultado
        if (data && data.success && data.result !== undefined) {
            const convertido = parseFloat(data.result).toFixed(2);
            resultado.textContent = `Resultado: ${valor} ${moedaDe.value} = ${convertido} ${moedaPara.value}`;
        } else {
            resultado.textContent = "Não foi possível obter o resultado da conversão.";
        }
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        resultado.textContent = "Erro ao obter a taxa de câmbio.";
    }
}
