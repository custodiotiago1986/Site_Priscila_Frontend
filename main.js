document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    const greeting = document.getElementById('greeting');
    
    // Verifica se o usuário está autenticado
    function checkLoginStatus() {
        const username = localStorage.getItem('username');
        if (username) {
            greeting.textContent = `Olá, ${username}`;
        }
    }

    // Função para fazer login
    async function loginUser(username, password) {
        try {
            console.log('Tentando fazer login...'); // Adicionando log para depuração
            const response = await fetch('http://localhost:3000/users'); // Altere para o URL do seu backend
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const users = await response.json();
            
            console.log('Usuários recebidos do backend:', users); // Adicionando log para depuração

            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem('username', username);
                greeting.textContent = `Olá, ${username}`;
                alert('Login bem-sucedido');
            } else {
                alert('Credenciais inválidas');
            }
        } catch (error) {
            console.error('Erro ao verificar as credenciais:', error);
        }
    }

    // Adiciona o evento de clique ao botão de login
    loginButton.addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username && password) {
            loginUser(username, password);
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Verifica o status de login ao carregar a página
    checkLoginStatus();
});