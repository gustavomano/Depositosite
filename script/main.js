const NUMERO_WHATSAPP = '5512996236909';

document.addEventListener('DOMContentLoaded', () => {

    // --- MENU RESPONSIVO ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
        });
    }

    // --- FORMULÁRIO DE ORÇAMENTO (lista de materiais + envio direto pro WhatsApp) ---
    const formOrcamento = document.getElementById('form-orcamento');

    if (formOrcamento) {
        const itemInput = document.getElementById('item-input');
        const btnAdicionar = document.getElementById('btn-adicionar');
        const listaMateriaisEl = document.getElementById('lista-materiais');
        const listaVaziaEl = document.getElementById('lista-vazia');
        const materiais = [];

        function renderLista() {
            listaMateriaisEl.innerHTML = '';

            materiais.forEach((item, index) => {
                const li = document.createElement('li');

                const texto = document.createElement('span');
                texto.textContent = item;

                const btnRemover = document.createElement('button');
                btnRemover.type = 'button';
                btnRemover.className = 'remover-item';
                btnRemover.setAttribute('aria-label', 'Remover item');
                btnRemover.textContent = '×';
                btnRemover.addEventListener('click', () => {
                    materiais.splice(index, 1);
                    renderLista();
                });

                li.appendChild(texto);
                li.appendChild(btnRemover);
                listaMateriaisEl.appendChild(li);
            });

            listaVaziaEl.style.display = materiais.length ? 'none' : 'block';
        }

        function adicionarItem() {
            const valor = itemInput.value.trim();
            if (!valor) return;

            materiais.push(valor);
            itemInput.value = '';
            itemInput.focus();
            renderLista();
        }

        btnAdicionar.addEventListener('click', adicionarItem);

        itemInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                adicionarItem();
            }
        });

        renderLista();

        formOrcamento.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const observacoes = document.getElementById('observacoes').value.trim();

            if (!nome || !telefone) {
                alert('Preencha seu nome e WhatsApp antes de enviar.');
                return;
            }

            if (materiais.length === 0) {
                alert('Adicione pelo menos um item à sua lista de materiais.');
                return;
            }

            let mensagem = 'Novo Orçamento - WM Babolange\n\n';
            mensagem += `Cliente: ${nome}\n`;
            mensagem += `Contato: ${telefone}\n`;
            mensagem += 'Materiais: \n';
            mensagem += materiais.join('\n');

            if (observacoes) {
                mensagem += `\n\nObservações: ${observacoes}`;
            }

            const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
            window.location.href = url;
        });
    }
});
