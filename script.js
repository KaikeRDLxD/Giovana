import {
    db,
    collection,
    addDoc
} from "./firebase.js";

const nome = document.getElementById("nomeRemetente");
const destino = document.getElementById("nomeDestino");
const titulo = document.getElementById("tituloCarta");
const texto = document.getElementById("textoCarta");

const previewDestino = document.getElementById("previewDestino");
const previewTitulo = document.getElementById("previewTitulo");
const previewTexto = document.getElementById("previewTexto");
const previewRemetente = document.getElementById("previewRemetente");

const saveButton = document.querySelector(".save");

const senhaPopup = document.getElementById("senhaCartaPopup");
const senhaInput = document.getElementById("senhaCartaInput");
const confirmarSenha = document.getElementById("confirmarSenhaCarta");

const savePopup = document.getElementById("savePopup");
const copyBtn = document.getElementById("copyBtn");
const whatsappBtn = document.getElementById("whatsappBtn");
const closePopup = document.getElementById("closePopup");

let linkCarta = "";

// Preview em tempo real

nome.addEventListener("input", () => {
    previewRemetente.innerText = "Com amor, " + (nome.value || "❤️");
});

destino.addEventListener("input", () => {
    previewDestino.innerText = "Para: " + (destino.value || "você") + " ❤️";
});

titulo.addEventListener("input", () => {
    previewTitulo.innerText = titulo.value || "Título da Carta";
});

texto.addEventListener("input", () => {
    previewTexto.innerText = texto.value || "Sua carta aparecerá aqui...";
});

// Abrir popup da senha

saveButton.addEventListener("click", () => {

    if (
        nome.value.trim() === "" ||
        destino.value.trim() === "" ||
        titulo.value.trim() === "" ||
        texto.value.trim() === ""
    ) {
        alert("Preencha todos os campos.");
        return;
    }

    senhaInput.value = "";
    senhaPopup.style.display = "flex";

});

// Salvar carta

confirmarSenha.addEventListener("click", async () => {

    if (senhaInput.value.trim() === "") {
        alert("Digite uma senha.");
        return;
    }

    try {

        const docRef = await addDoc(collection(db, "cartas"), {

            nome: nome.value,
            destino: destino.value,
            titulo: titulo.value,
            texto: texto.value,
            senha: senhaInput.value

        });

        const url = new URL("carta.html", window.location.href);

        url.searchParams.set("id", docRef.id);

        linkCarta = url.toString();

        senhaPopup.style.display = "none";
        savePopup.style.display = "flex";

    } catch (e) {

        console.error(e);
        alert("Erro ao salvar a carta.");

    }

});

copyBtn.addEventListener("click", async () => {

    await navigator.clipboard.writeText(linkCarta);

    alert("Link copiado ❤️");

});

whatsappBtn.addEventListener("click", () => {

    window.open(
        "https://wa.me/?text=" +
        encodeURIComponent("❤️ Minha carta para você:\n\n" + linkCarta)
    );

});

closePopup.addEventListener("click", () => {

    savePopup.style.display = "none";

});