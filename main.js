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

    function checkLoginStatus() {
        const username = localStorage.getItem('username');
        if (username) {
            loginButton.style.display = 'none';
            usernameInput.style.display = 'none';
            passwordInput.style.display = 'none';
            logoutButton.style.display = 'inline-block';
            welcomeMessage.style.display = 'inline';
            welcomeUsername.textContent = username;
            postForm.style.display = 'block'; // Mostrar o formulário de postagem
        } else {
            loginButton.style.display = 'inline-block';    
            usernameInput.style.display = 'inline-block';
            passwordInput.style.display = 'inline-block';        
            logoutButton.style.display = 'none';
            welcomeMessage.style.display = 'none';
            postForm.style.display = 'none'; // Ocultar o formulário de postagem            
        }
    }

    function loadPosts() {
        const endpoint = postAulaForm ? `${baseUrl}/aulas` : (postScriptForm ? `${baseUrl}/scripts` : null);
        if (!endpoint) return;

        fetch(endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta da rede: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
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
                                    <td>${new Date(post.hora).toLocaleTimeString()}</td>
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
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta da rede: ' + response.statusText);
            }
            return response.json();
        })
        .then(() => {
            loadPosts();
        })
        .catch(error => console.error('Erro ao postar dados:', error));
    }

    if (loginButton && logoutButton) {
        loginButton.addEventListener('click', function() {
            const username = usernameInput.value;
            const password = passwordInput.value;

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
    }

    if (postAulaForm) {
        const postButton = document.getElementById('postButton');
        if (postButton) {
            postButton.addEventListener('click', function() {
                const titulo = document.getElementById('titulo').value;
                const descricao = document.getElementById('conteudo').value;
                const username = localStorage.getItem('username');

                if (titulo && descricao) {
                    postData(`${baseUrl}/aulas`, {
                        titulo: titulo,
                        descricao: descricao,
                        autor: username,
                        data: new Date().toISOString().split('T')[0], // Data no formato YYYY-MM-DD
                        hora: new Date().toLocaleTimeString() // Hora no formato de string
                    });
                } else {
                    alert('Por favor, preencha todos os campos obrigatórios.');
                }
            });
        }
    }

    if (postScriptForm) {
        const postButton = document.getElementById('postButton');
        if (postButton) {
            postButton.addEventListener('click', function() {
                const titulo = document.getElementById('titulo').value;
                const descricao = document.getElementById('conteudo').value;
                const username = localStorage.getItem('username');

                if (titulo && descricao) {
                    postData(`${baseUrl}/scripts`, {
                        titulo: titulo,
                        descricao: descricao,
                        autor: username,
                        data: new Date().toISOString().split('T')[0], // Data no formato YYYY-MM-DD
                        hora: new Date().toLocaleTimeString() // Hora no formato de string
                    });
                } else {
                    alert('Por favor, preencha todos os campos obrigatórios.');
                }
            });
        }
    }

    // Função para mostrar/ocultar o botão "scroll to top"
    window.addEventListener('scroll', function() {
        const scrollToTopButton = document.getElementById('scrollToTop');
        if (window.scrollY > 100) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    // Função para rolar para o topo da página
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Adiciona o evento de clique no botão "scroll to top"
    const scrollToTopButton = document.getElementById('scrollToTop');
    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', scrollToTop);
    }

    // Carregar posts ao carregar a página
    loadPosts();
    checkLoginStatus();
});