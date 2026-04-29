document.getElementById('form-orcamento').addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede a página de recarregar

    // Captura os dados do formulário exatamente como configuramos
    const dados = {
        nome: document.getElementById('nome').value,
        whatsapp: document.getElementById('whatsapp').value,
        materiais: document.getElementById('materiais').value
    };

    try {
        // Envia os dados para a sua API viva no Render
        const response = await fetch('https://wm-babolange-api.onrender.com/orcamento', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        // Recebe a URL do WhatsApp que o Back-end (o cérebro) gerou
        const res = await response.json();

        // Redireciona o cliente para o WhatsApp com a mensagem pronta
        if (res.url) {
            window.location.href = res.url;
        }

    } catch (error) {
        console.error("Erro ao processar orçamento:", error);
        alert("Ops! Ocorreu um erro ao conectar com o servidor. Tente novamente em instantes.");
    }
});