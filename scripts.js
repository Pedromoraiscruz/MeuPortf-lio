async function converter() {
    const valorInput = document.getElementById("valor");
    const moedaDe = document.getElementById("de").value;
    const moedaPara = document.getElementById("para").value;
    const resultado = document.getElementById("resultado");

    const valor = parseFloat(valorInput.value);

    if (isNaN(valor) || valor <= 0) {
        resultado.textContent = "Digite um valor válido.";
        return;
    }

    if (moedaDe === moedaPara) {
        resultado.textContent = "Escolha moedas diferentes.";
        return;
    }

    const url = `https://api.frankfurter.app/latest?amount=${valor}&from=${moedaDe}&to=${moedaPara}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const convertido = data.rates[moedaPara].toFixed(2);
        resultado.textContent = `Resultado: ${valor} ${moedaDe} = ${convertido} ${moedaPara}`;
    } catch (error) {
        console.error("Erro:", error);
        resultado.textContent = "Não foi possível obter os dados da conversão.";
    }
}
