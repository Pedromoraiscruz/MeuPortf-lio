async function converter() {
    const valorInput = document.getElementById("valor");
    const moedaDeInput = document.getElementById("de");
    const moedaParaInput = document.getElementById("para");
    const resultado = document.getElementById("resultado");

  
    if (!valorInput || !moedaDeInput || !moedaParaInput || !resultado) {
        console.error("Elementos HTML não encontrados.");
        return;
    }

    const valor = parseFloat(valorInput.value);
    const moedade = moedaDeInput.value;
    const moedapara = moedaParaInput.value;

    if (isNaN(valor) || valor <= 0) {
        resultado.textContent = "Por favor, insira um valor numérico maior que zero.";
        return;
    }

    if (moedade === moedapara) {
        resultado.textContent = "Escolha moedas diferentes para conversão.";
        return;
    }

    const url = `https://api.exchangerate.host/convert?from=${moedade}&to=${moedapara}&amount=${valor}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === undefined) {
            resultado.textContent = "Não foi possível obter o resultado da conversão.";
            return;
        }

        const valorConvertido = parseFloat(data.result).toFixed(2);
        resultado.textContent = `Resultado: ${valor} ${moedade} = ${valorConvertido} ${moedapara}`;
    } catch (error) {
        console.error("Erro ao acessar a API:", error);
        resultado.textContent = "Erro ao obter a taxa de câmbio. Tente novamente mais tarde.";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const botao = document.querySelector("button");
    if (botao) {
        botao.addEventListener("click", converter);
    }
});
