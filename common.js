
const navLinks = document.querySelectorAll(".nav-link");
const csbuddynav = document.getElementById("csbuddynav");
const loginBtn = document.getElementById("loginBtn");
let refsOk = false;

  window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loading');
    setTimeout(() => {
      document.body.classList.remove('loading');
      document.getElementById('loader').style.display = 'none';
    }, 900);
  });


function init() {
    if (navLinks && csbuddynav && loginBtn) {
        refsOk = true;
    }
    else { console.error("Invalid references") }
};

init();




function createTorna() { }