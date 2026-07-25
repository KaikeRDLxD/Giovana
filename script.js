import {
    db,
    collection,
    addDoc
} from "./firebase.js";

const senhaCorreta = "Churrasco1306";

// ==========================
// ELEMENTOS
// ==========================

const passwordScreen = document.getElementById("passwordScreen");
const app = document.getElementById("app");

const unlockBtn = document.getElementById("unlockBtn");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");

const saveButton = document.querySelector(".save");

const savePopup = document.getElementById("savePopup");
const closePopup = document.getElementById("closePopup");

const copyBtn = document.getElementById("copyBtn");
const whatsappBtn = document.getElementById("whatsappBtn");

const senhaCartaPopup = document.getElementById("senhaCartaPopup");
const senhaCartaInput = document.getElementById("senhaCartaInput");
const confirmarSenhaCarta = document.getElementById("confirmarSenhaCarta");

let linkCarta = "";

// ==========================
// ESTADO INICIAL
// ==========================

passwordScreen.style.display = "flex";
app.style.display = "none";

// ==========================
// SENHA FIXA
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
    app.style.display = "block";

}

// ==========================
// PREVIEW
// ==========================

document.getElementById("nomeDestino").addEventListener("input", e => {

    document.getElementById("previewDestino").innerText =
        "Para " + e.target.value + " ❤️";

});

document.getElementById("tituloCarta").addEventListener("input", e => {

    document.getElementById("previewTitulo").innerText =
        e.target.value;

});

document.getElementById("textoCarta").addEventListener("input", e => {

    document.getElementById("previewTexto").innerText =
        e.target.value;

});

document.getElementById("nomeRemetente").addEventListener("input", e => {

    document.getElementById("previewRemetente").innerText =
        "Com amor, " + e.target.value + " ❤️";

});// ==========================
// SALVAR CARTA
// ==========================

saveButton.addEventListener("click", () => {

    senhaCartaInput.value = "";

    senhaCartaPopup.style.display = "flex";

});

confirmarSenhaCarta.addEventListener("click", async () => {

    if (senhaCartaInput.value.trim() === "") {

        alert("Digite uma senha para a carta.");
        return;

    }

    senhaCartaPopup.style.display = "none";

    const carta = {

        nome: document.getElementById("nomeRemetente").value,

        destino: document.getElementById("nomeDestino").value,

        titulo: document.getElementById("tituloCarta").value,

        texto: document.getElementById("textoCarta").value,

        senha: senhaCartaInput.value

    };

    try {

        const docRef = await addDoc(
            collection(db, "cartas"),
            carta
        );

        const url = new URL("carta.html", window.location.href);

        url.searchParams.set("id", docRef.id);

        linkCarta = url.toString();

        savePopup.style.display = "flex";

    } catch (erro) {

        console.error(erro);

        alert("Erro ao salvar a carta.");

    }

});

// ==========================
// POPUP
// ==========================

closePopup.addEventListener("click", () => {

    savePopup.style.display = "none";

});

copyBtn.addEventListener("click", async () => {

    await navigator.clipboard.writeText(linkCarta);

    alert("❤️ Link copiado!");

});

whatsappBtn.addEventListener("click", () => {

    window.open(

        "https://wa.me/?text=" +

        encodeURIComponent(

            "❤️ Minha carta para você:\n\n" + linkCarta

        )

    );

});discordBtn.addEventListener("click", async () => {

    const mensagem =
        "❤️ Minha carta para você:\n\n" + linkCarta;

    try{

        await navigator.clipboard.writeText(mensagem);

        alert(
            "Mensagem copiada!\n\nAgora basta colar no Discord (Ctrl + V)."
        );

    }catch{

        alert("Não foi possível copiar a mensagem.");

    }

});