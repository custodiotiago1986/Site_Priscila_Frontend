document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    const greeting = document.getElementById('greeting');
    const loginForm = document.getElementById('loginForm');
    
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
            const response = await fetch('http://localhost:3000/users'); // Altere para o URL do seu backend
            const users = await response.json();

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