document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    const greeting = document.getElementById('greeting');
    
    // Verifica se o usuário está autenticado
    function checkLoginStatus() {
        const username = localStorage.getItem('username');
        if (username) {
            greeting.textContent = `Olá, ${username}`;
            loginButton.style.display = 'none';
            logoutButton.style.display = 'block';
        } else {
            greeting.textContent = '';
            loginButton.style.display = 'block';
            logoutButton.style.display = 'none';
        }
    }

    // Função para o login
    loginButton.addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username && password) {
            // Aqui você pode adicionar lógica de autenticação com backend
            localStorage.setItem('username', username);
            checkLoginStatus();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Função para o logout
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('username');
        checkLoginStatus();
    });

    // Verifica o status do login ao carregar a página
    checkLoginStatus();
});