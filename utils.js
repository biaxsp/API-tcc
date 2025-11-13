// Função para converter a duração em formato "1h 30 min" para minutos
const parseDuracao = (duracao) => {
    const regex = /(\d+)\s*h\s*(\d+)\s*min/;
    const match = duracao.match(regex);

    if (match) {
        const horas = parseInt(match[1]);
        const minutos = parseInt(match[2]);
        return horas * 60 + minutos;  // Retorna o total em minutos
    }

    if (duracao.includes("h")) {
        return parseInt(duracao.replace("h", "").trim()) * 60;  // Converte horas para minutos
    }
    if (duracao.includes("min")) {
        return parseInt(duracao.replace("min", "").trim());  // Retorna minutos
    }

    return 0;  // Se não conseguir identificar o formato, retorna 0
};

// Função para converter o preço de string para número (com vírgula para ponto)
const parsePreco = (preco) => {
    return parseFloat(preco.replace(",", "."));
};

module.exports = { parseDuracao, parsePreco };
