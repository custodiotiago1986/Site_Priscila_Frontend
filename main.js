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
    const baseUrl = 'http://localhost:3000'; // URL do backend
    const endpoint = postAulaForm ? `${baseUrl}/aulas` : (postScriptForm ? `${baseUrl}/scripts` : null);

    function checkLoginStatus() {
        const username = localStorage.getItem('username');
        console.log('Verificando status de login. Usuário atual:', username);
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
        if (!endpoint) return; // Exit if endpoint is not set

        console.log('Carregando postagens de', endpoint);
        fetch(endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta da rede: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Postagens carregadas:', data);
                postsTable.innerHTML = `
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Descrição</th>
                                <th>Autor</th>
                                <th>Data</th>
                                <th>Hora</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.map(post => `
                                <tr>
                                    <td>${post.titulo}</td>
                                    <td>${post.descricao}</td>
                                    <td>${post.autor}</td>
                                    <td>${new Date(post.data).toLocaleDateString()}</td>
                                    <td>${new Date(post.data).toLocaleTimeString()}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
            })
            .catch(error => console.error('Erro ao carregar postagens:', error));
    }

    function postData(url, data) {
        console.log('Enviando dados para', url, 'com o conteúdo:', data);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta da rede: ' + response.statusText);
            }
            return response.json();
        })
        .then(() => {
            console.log('Dados postados com sucesso.');
            loadPosts();
        })
        .catch(error => console.error('Erro ao postar dados:', error));
    }

    if (loginButton && logoutButton) {
        loginButton.addEventListener('click', function() {
            const username = usernameInput ? usernameInput.value : '';
            const password = passwordInput ? passwordInput.value : '';
            console.log('Tentando fazer login com usuário:', username);

            // Simulação de autenticação (substituir por autenticação real)
            if (username && password) {
                localStorage.setItem('username', username);
                checkLoginStatus();
            } else {
                console.error('Por favor, preencha todos os campos.');
                alert('Por favor, preencha todos os campos.');
            }
        });

        logoutButton.addEventListener('click', function() {
            console.log('Realizando logout.');
            localStorage.removeItem('username');
            checkLoginStatus();
        });
    }

    if (postAulaForm) {
        const postButton = document.getElementById('postButton');
        if (postButton) {
            postButton.addEventListener('click', function() {
                const titulo = document.getElementById('titulo') ? document.getElementById('titulo').value : '';
                const descricao = document.getElementById('descricao') ? document.getElementById('descricao').value : '';
                const username = localStorage.getItem('username');
                console.log('Tentando postar aula com título:', titulo);

                if (titulo && descricao) {
                    postData(`${baseUrl}/aulas`, {
                        titulo: titulo,
                        descricao: descricao,
                        autor: username,
                        data: new Date().toISOString(), // Data no formato ISO
                        hora: new Date().toLocaleTimeString() // Hora no formato de string
                    });
                } else {
                    console.error('Por favor, preencha todos os campos obrigatórios.');
                    alert('Por favor, preencha todos os campos obrigatórios.');
                }
            });
        }
    }

    if (postScriptForm) {
        const postButton = document.getElementById('postButton');
        if (postButton) {
            postButton.addEventListener('click', function() {
                const titulo = document.getElementById('titulo') ? document.getElementById('titulo').value : '';
                const descricao = document.getElementById('descricao') ? document.getElementById('descricao').value : '';
                const username = localStorage.getItem('username');
                console.log('Tentando postar script com título:', titulo);

                if (titulo && descricao) {
                    postData(`${baseUrl}/scripts`, {
                        titulo: titulo,
                        descricao: descricao,
                        autor: username,
                        data: new Date().toISOString(), // Data no formato ISO
                        hora: new Date().toLocaleTimeString() // Hora no formato de string
                    });
                } else {
                    console.error('Por favor, preencha todos os campos obrigatórios.');
                    alert('Por favor, preencha todos os campos obrigatórios.');
                }
            });
        }
    }

    checkLoginStatus();
});