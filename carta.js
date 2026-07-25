import {
    db,
    doc,
    getDoc
} from "./firebase.js";

const passwordScreen = document.getElementById("passwordScreen");
const envelopeScreen = document.getElementById("envelopeScreen");
const app = document.getElementById("app");

const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");
const unlockBtn = document.getElementById("unlockBtn");
const envelope = document.getElementById("envelope");

passwordScreen.style.display = "flex";
envelopeScreen.style.display = "none";
app.style.display = "none";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let carta = null;

// Carrega a carta do Firebase
async function carregarCarta() {

    if (!id) {
        passwordError.textContent = "Carta não encontrada.";
        return false;
    }

    try {

        const snap = await getDoc(doc(db, "cartas", id));

        if (!snap.exists()) {
            passwordError.textContent = "Carta não encontrada.";
            return false;
        }

        carta = snap.data();
        return true;

    } catch (e) {

        console.error(e);
        passwordError.textContent = "Erro ao carregar carta.";
        return false;

    }

}

// Verifica senha
unlockBtn.addEventListener("click", async () => {

    if (!carta) {

        const ok = await carregarCarta();

        if (!ok) return;

    }

    if (passwordInput.value !== carta.senha) {

        passwordError.textContent = "❌ Senha incorreta!";
        passwordInput.value = "";
        passwordInput.focus();
        return;

    }

    passwordScreen.style.display = "none";
    envelopeScreen.style.display = "flex";

});

passwordInput.addEventListener("keydown", e => {

    if (e.key === "Enter")
        unlockBtn.click();

});

// Envelope
envelope.addEventListener("click", () => {

    criarCoracoes();

    envelope.classList.add("open");

    setTimeout(() => {

        envelopeScreen.style.display = "none";
        app.style.display = "block";

        document.getElementById("destino").innerText =
            "Para: " + carta.destino + " ❤️";

        document.getElementById("tituloCarta").innerText =
            carta.titulo;

        document.getElementById("textoCarta").innerText =
            carta.texto;

        document.getElementById("remetente").innerText =
            "Com amor, " + carta.nome + " ❤️";

    }, 2500);

});

// Corações
function criarCoracoes() {

    const emojis = ["❤️","💖","💕","💗","💓","💞"];

    for (let i = 0; i < 60; i++) {

        setTimeout(() => {

            const heart = document.createElement("div");

            heart.className = "heart";

            heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

            heart.style.left = Math.random() * 100 + "vw";
            heart.style.fontSize = (20 + Math.random() * 35) + "px";
            heart.style.setProperty("--x", (Math.random() * 300 - 150) + "px");

            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 4000);

        }, i * 70);

    }

}