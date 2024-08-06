# Site da Priscila - Frontend
Este é o frontend do "Site da Priscila", uma aplicação destinada a permitir que a professora Priscila poste e gerencie conteúdos educacionais. O site oferece funcionalidades para login, postagem de conteúdos e contato com a professora. Para acessar, visite https://profpriscila.netlify.app/.
![image](https://github.com/user-attachments/assets/f148a326-66b4-41ce-b1ad-3db9d25002dd)

## Funcionalidades
- Login e Logout: Gerencia a sessão do usuário utilizando localStorage.
- Postagens de Conteúdo: Permite que a professora adicione e gerencie postagens de conteúdos educacionais-.
- Página de Contato: Formulário para que visitantes possam enviar mensagens diretamente para a professora.
- Responsividade: Utiliza Bootstrap para garantir que o site seja visualizado corretamente em dispositivos de diferentes tamanhos.

## Estrutura do Projeto
- index.html: Página inicial com informações sobre a professora e acesso às postagens.
- aulas.html: Página dedicada às postagens de aulas e materiais educativos.
- scripts.html: Página para postagem e gerenciamento de scripts e outros conteúdos.
- contato.html: Página de contato com um formulário para envio de mensagens.
- style.css: Arquivo CSS para estilos adicionais personalizados.
- main.js: Arquivo JavaScript para gerenciamento de login, interações e integração com o backend.

### Uso
O usuário comum apenas pode visualizar as postagens e enviar e-mail em contato. Já a administradora tem acesso à todas as funções.  
- Login/Logout: O sistema utiliza localStorage para gerenciar o estado de login. O login é necessário para adicionar ou excluir postagens.
- Adicionar Postagens: Use os formulários nas páginas aulas.html e scripts.html para adicionar novos conteúdos.
- Excluir Postagens: Clique no ícone de excluir (visível apenas após o login) para remover postagens.
