export const login = async (email, senha) => {
    const resposta = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(dados.erro);
    }

    return dados;
};