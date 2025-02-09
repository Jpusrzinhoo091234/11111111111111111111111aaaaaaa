class LoginManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('legendsStoreUsers') || '[]');
        this.currentUser = null;
        this.initElements();
        this.initEventListeners();
    }

    initElements() {
        this.loginModal = document.getElementById('loginModal');
        this.loginForm = document.getElementById('loginForm');
        this.registerForm = document.getElementById('registerForm');
        this.loginBtn = document.querySelector('.game-login-btn');
        this.closeLoginModalBtn = document.querySelector('.close-login-modal');
        this.switchToRegisterLinks = document.querySelectorAll('.switch-to-register');
        this.switchToLoginLinks = document.querySelectorAll('.switch-to-login');
    }

    initEventListeners() {
        // Abrir modal de login
        this.loginBtn.addEventListener('click', () => this.openLoginModal());

        // Fechar modal de login
        this.closeLoginModalBtn.addEventListener('click', () => this.closeLoginModal());

        // Trocar para formulário de registro
        this.switchToRegisterLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showRegisterForm();
            });
        });

        // Trocar para formulário de login
        this.switchToLoginLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLoginForm();
            });
        });

        // Submissão do formulário de login
        this.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.login();
        });

        // Submissão do formulário de registro
        this.registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.register();
        });
    }

    openLoginModal() {
        this.loginModal.style.display = 'flex';
        this.showLoginForm();
    }

    closeLoginModal() {
        this.loginModal.style.display = 'none';
    }

    showLoginForm() {
        this.loginForm.style.display = 'block';
        this.registerForm.style.display = 'none';
    }

    showRegisterForm() {
        this.loginForm.style.display = 'none';
        this.registerForm.style.display = 'block';
    }

    login() {
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const user = this.users.find(u => u.username === username && u.password === password);

        if (user) {
            this.currentUser = user;
            this.updateLoginButton(user);
            this.showCartoonAlert('🎉 Login Bem-Sucedido!', `Bem-vindo de volta, ${user.username}!`);
            this.closeLoginModal();
        } else {
            this.showCartoonAlert('❌ Erro de Login', 'Usuário ou senha incorretos.');
        }
    }

    register() {
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validações básicas
        if (password !== confirmPassword) {
            this.showCartoonAlert('❌ Erro de Registro', 'As senhas não coincidem.');
            return;
        }

        // Verificar se usuário já existe
        const existingUser = this.users.find(u => u.username === username);
        if (existingUser) {
            this.showCartoonAlert('❌ Erro de Registro', 'Usuário já cadastrado.');
            return;
        }

        // Criar novo usuário
        const newUser = { username, password };
        this.users.push(newUser);
        localStorage.setItem('legendsStoreUsers', JSON.stringify(this.users));

        this.currentUser = newUser;
        this.updateLoginButton(newUser);
        this.showCartoonAlert('🎉 Registro Concluído!', `Bem-vindo, ${username}!`);
        this.closeLoginModal();
    }

    updateLoginButton(user) {
        const loginBtn = document.querySelector('.game-login-btn');
        loginBtn.innerHTML = `
            <span class="login-icon">👤</span>
            <span class="login-text">${user.username}</span>
        `;
    }

    showCartoonAlert(title, message) {
        const alertContainer = document.createElement('div');
        alertContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #f0f0ff;
            border: 5px solid #6a5acd;
            border-radius: 20px;
            padding: 20px;
            text-align: center;
            z-index: 1000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            max-width: 90%;
            width: 300px;
        `;

        alertContainer.innerHTML = `
            <h2 style="color: #6a5acd; margin-bottom: 15px;">${title}</h2>
            <p style="white-space: pre-line; color: #4b3d8f;">${message}</p>
            <button style="
                background-color: #6a5acd;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                margin-top: 15px;
                cursor: pointer;
                transition: all 0.3s ease;
            ">Entendi!</button>
        `;

        const closeButton = alertContainer.querySelector('button');
        closeButton.addEventListener('click', () => {
            alertContainer.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => document.body.removeChild(alertContainer), 300);
        });

        const styleTag = document.createElement('style');
        styleTag.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(styleTag);

        document.body.appendChild(alertContainer);
    }
}

// Inicializar login
document.addEventListener('DOMContentLoaded', () => {
    window.loginManager = new LoginManager();
});
