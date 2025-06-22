document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle para dispositivos móveis
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Accordion para FAQ
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            // Fecha todos os outros itens
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Abre/fecha o item atual
            item.classList.toggle('active');
        });
    });
  

    // Formulário de Lead e evento de submit
    const leadForm = document.getElementById('lead-form');
    const successModal = document.getElementById('success-modal');
    const closeModal = document.querySelector('.close');
    const closeButton = document.querySelector('.success-message button');

    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Usar FormData diretamente
            const formData = new FormData(leadForm);
            
            // Adicionar data e hora do envio
            formData.append('dataHora', new Date().toLocaleString('pt-BR'));
            
            // Enviar dados para o email usando Formspree
            fetch('https://formspree.io/f/xyzjdvow', {
                method: 'POST',
                body: formData // Enviar FormData diretamente, sem converter para JSON
            } )
            .then(response => {
                if (response.ok) {
                    // Exibe o modal de sucesso
                    successModal.style.display = 'flex';
                    
                    // Limpa o formulário
                    leadForm.reset();
                } else {
                    console.error('Erro ao enviar formulário:', response.status);
                    alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
                }
            })
       });
    }
    
    // Fechar o modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            successModal.style.display = 'none';
        });
    }
    
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            successModal.style.display = 'none';
        });
    }
    
    // Fechar o modal ao clicar fora dele
    window.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });


    // Smooth scroll para links de navegação
    const navLinks = document.querySelectorAll('header nav a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    // Fecha o menu mobile se estiver aberto
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                    }
                    
                    // Scroll suave até a seção
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
