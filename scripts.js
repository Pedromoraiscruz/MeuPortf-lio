async function converter() { 
    const valor = document.getElementById("valor").value;
    const moedade = document.getElementById("de").value;
    const moedapara = document.getElementById("para").value;
    const resultado = document.getElementById("resultado");

    if (valor === "" || isNaN(valor)) { 
        resultado.textContent = "Por favor, insira um valor válido.";
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
        const valorconvertido = data.result.toFixed(2);
        resultado.textContent = `Resultado: ${valor} ${moedade} = ${valorconvertido} ${moedapara}`;
    } catch (error) {
        console.error(error);
        resultado.textContent = "Erro ao obter a taxa de câmbio.";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const botao = document.querySelector("button");
    if (botao) {
        botao.addEventListener("click", converter);
    }
});
