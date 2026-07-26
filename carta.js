import {
    db,
    doc,
    getDoc
} from "./firebase.js";

// ==========================
// ELEMENTOS
// ==========================

const passwordScreen = document.getElementById("passwordScreen");
const envelopeScreen = document.getElementById("envelopeScreen");
const app = document.getElementById("app");

const unlockBtn = document.getElementById("unlockBtn");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");

const envelope = document.getElementById("envelope");

// ==========================
// ESTADO INICIAL
// ==========================

passwordScreen.style.display = "flex";
envelopeScreen.style.display = "none";
app.style.display = "none";

let senhaCorreta = "";
let carta = null;

// ==========================
// CARREGAR CARTA
// ==========================

async function carregarCarta() {

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    if (!id) {

        alert("Carta não encontrada.");
        return;

    }

    const referencia = doc(db, "cartas", id);

    const documento = await getDoc(referencia);

    if (!documento.exists()) {

        alert("Carta não encontrada.");
        return;

    }

    carta = documento.data();

    senhaCorreta = carta.senha;

}

await carregarCarta();

// ==========================
// SENHA
// ==========================

unlockBtn.addEventListener("click", verificarSenha);

passwordInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        verificarSenha();

    }

});

function verificarSenha() {

    if (passwordInput.value !== senhaCorreta) {

        passwordError.textContent = "Senha incorreta ❤️";

        passwordInput.value = "";

        return;

    }

    passwordScreen.style.display = "none";

    envelopeScreen.style.display = "flex";

}

// ==========================
// ENVELOPE
// ==========================

envelope.addEventListener("click", abrirEnvelope);

function abrirEnvelope() {

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

}

// ==========================
// CORAÇÕES
// ==========================
function criarCoracoes() {

    const emojis = [
        "❤️",
        "💖",
        "💕",
        "💗",
        "💓",
        "💞"
    ];

    for (let i = 0; i < 60; i++) {

        setTimeout(() => {

            const heart = document.createElement("div");

            heart.className = "heart";

            heart.innerHTML =
                emojis[Math.floor(Math.random() * emojis.length)];

            heart.style.left =
                Math.random() * 100 + "vw";

            heart.style.fontSize =
                (20 + Math.random() * 35) + "px";

            heart.style.setProperty(
                "--x",
                (Math.random() * 300 - 150) + "px"
            );

            document.body.appendChild(heart);

            setTimeout(() => {

                heart.remove();

            }, 4000);

        }, i * 70);

    }

}
 // ==========================
// BOTÃO PDF
// ==========================

const btnPDF = document.getElementById("downloadPDF");

if (btnPDF) {

    btnPDF.addEventListener("click", gerarPDF);

}

// ==========================
// GERAR PDF
// ==========================
async function gerarPDF() {

    const botao = document.getElementById("downloadPDF");

    botao.disabled = true;
    botao.innerText = "Gerando PDF...";

    try {

        const { jsPDF } = window.jspdf;

        const elemento = document.querySelector(".paper");

        const canvas = await html2canvas(elemento,{
            scale:2,
            useCORS:true,
            backgroundColor:"#ffffff"
        });

        const img = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p","mm","a4");

        const largura = 210;
        const altura = canvas.height * largura / canvas.width;

        pdf.addImage(img,"PNG",0,0,largura,altura);

        pdf.save("Carta de Amor.pdf");

    } catch(err){

        console.error(err);

        alert("Não foi possível gerar o PDF.");

    }

    botao.disabled = false;
    botao.innerText = "📥 Baixar Carta em PDF";

}