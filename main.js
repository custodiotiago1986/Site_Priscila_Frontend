document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const postAulaForm = document.getElementById('postAulaForm');
    const postScriptForm = document.getElementById('postScriptForm');
    const postsTable = document.getElementById('postsTable');
    const postForm = document.getElementById('postForm');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const welcomeUsername = document.getElementById('welcomeUsername');
    const endpoint = document.getElementById('postAulaForm') ? '/aulas' : '/scripts';

    function checkLoginStatus() {
        const username = localStorage.getItem('username');
        if (username) {
            loginButton.style.display = 'none';
            logoutButton.style.display = 'inline-block';
            welcomeMessage.style.display = 'inline';
            welcomeUsername.textContent = username;
            postForm.style.display = 'block';
            loadPosts();
        } else {
            loginButton.style.display = 'inline-block';
            logoutButton.style.display = 'none';
            welcomeMessage.style.display = 'none';
            postForm.style.display = 'none';
        }
    }

    function loadPosts() {
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                postsTable.innerHTML = `
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Conteúdo</th>
                                <th>Autor</th>
                                <th>Data</th>
                                <th>Hora</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.map(post => `
                                <tr>
                                    <td>${post.titulo}</td>
                                    <td>${post.conteudo}</td>
                                    <td>${post.autor}</td>
                                    <td>${post.data}</td>
                                    <td>${post.hora}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
            })
            .catch(error => console.error('Erro ao carregar postagens:', error));
    }

    function postData(url, data) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(() => {
            loadPosts();
        })
        .catch(error => console.error('Erro ao postar dados:', error));
    }

    loginButton.addEventListener('click', function() {
        const username = usernameInput.value;
        const password = passwordInput.value;

        // Simulação de autenticação (substituir por autenticação real)
        if (username && password) {
            localStorage.setItem('username', username);
            checkLoginStatus();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('username');
        checkLoginStatus();
    });

    if (postAulaForm) {
        document.getElementById('postButton').addEventListener('click', function() {
            const titulo = document.getElementById('titulo').value;
            const conteudo = document.getElementById('conteudo').value;
            const username = localStorage.getItem('username');

            if (titulo && conteudo) {
                postData('/aulas', {
                    titulo: titulo,
                    conteudo: conteudo,
                    autor: username,
                    data: new Date().toLocaleDateString(),
                    hora: new Date().toLocaleTimeString()
                });
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }

    if (postScriptForm) {
        document.getElementById('postButton').addEventListener('click', function() {
            const titulo = document.getElementById('titulo').value;
            const conteudo = document.getElementById('conteudo').value;
            const username = localStorage.getItem('username');

            if (titulo && conteudo) {
                postData('/scripts', {
                    titulo: titulo,
                    conteudo: conteudo,
                    autor: username,
                    data: new Date().toLocaleDateString(),
                    hora: new Date().toLocaleTimeString()
                });
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }

    checkLoginStatus();
});