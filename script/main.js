// 1. Espera o DOM carregar para garantir que todos os elementos existem na página
document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DO MENU RESPONSIVO ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            // Alterna a classe 'active' no menu para ele aparecer/sumir
            navMenu.classList.toggle('active');
            // Opcional: anima o botão se você tiver CSS para isso
            menuToggle.classList.toggle('is-active');
        });
    }

    // --- LÓGICA DO FORMULÁRIO DE ORÇAMENTO ---
    const formOrcamento = document.getElementById('form-orcamento');

    if (formOrcamento) {
        formOrcamento.addEventListener('submit', async (e) => {
            e.preventDefault(); // Impede a página de recarregar

            // Captura os dados do formulário
            const dados = {
                nome: document.getElementById('nome').value,
                whatsapp: document.getElementById('whatsapp').value,
                materiais: document.getElementById('materiais').value
            };

            try {
                // Envia os dados para a sua API no Render
                const response = await fetch('https://wm-babolange-api.onrender.com/orcamento', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                });

                // Recebe a URL do WhatsApp gerada pelo Back-end
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
    }
});