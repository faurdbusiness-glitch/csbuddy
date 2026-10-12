const navLinks = document.querySelectorAll(".nav-link");
const csbuddynav = document.getElementById("csbuddynav");
const loginBtn = document.getElementById("loginBtn");
let refsOk = false;

window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loading");
    setTimeout(() => {
        document.body.classList.remove("loading");
        document.getElementById("loader").style.display = "none";
    }, 900);
});


function init() {
    if (navLinks && csbuddynav && loginBtn) {
        refsOk = true;
    }
    else { console.error("Invalid references") }
};

init();


function openLogin() {
    if (document.getElementById("loginOverlay")) {
        return;
    }

    const overlay = document.createElement("div");
    overlay.id = "loginOverlay";
    overlay.classList.add("login-overlay");

    overlay.innerHTML = `
        <div class="login-box">
            <button type="button" id="closeLoginBtn" class="login-close">×</button>

            <h2>Bejelentkezés</h2>

            <label class="login-label" for="loginEmail">E-mail</label>
            <input type="email" id="loginEmail" class="login-input" placeholder="pelda@email.hu">

            <label class="login-label" for="loginPassword">Jelszó</label>
            <input type="password" id="loginPassword" class="login-input" placeholder="••••••••">

            <button type="button" class="login-submit">Bejelentkezés</button>

            <p class="login-switch">Nincs még fiókod? <a href="#">Regisztráció</a></p>
        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById("closeLoginBtn").addEventListener("click", closeLogin);

    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
            closeLogin();
        }
    });
}

function closeLogin() {
    const overlay = document.getElementById("loginOverlay");

    if (overlay) {
        overlay.remove();
    }
}

loginBtn.addEventListener("click", openLogin);


function createTorna() { }