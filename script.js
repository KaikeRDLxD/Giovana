// ==========================
// CONFIGURAÇÃO
// ==========================

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
const envelopeScreen = document.getElementById("envelopeScreen");
const app = document.getElementById("app");

const unlockBtn = document.getElementById("unlockBtn");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");

const envelope = document.getElementById("envelope");

// ==========================
// ESTADO INICIAL
// ==========================

envelopeScreen.style.display = "none";
app.style.display = "none";

// ==========================
// SENHA
// ==========================

unlockBtn.addEventListener("click", verificarSenha);

passwordInput.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        verificarSenha();
    }
});

function verificarSenha(){

    if(passwordInput.value === senhaCorreta){

        passwordScreen.style.display = "none";
        envelopeScreen.style.display = "flex";

    }else{

        passwordError.textContent = "❌ Senha incorreta!";
        passwordInput.value = "";
        passwordInput.focus();

    }

}

// ==========================
// ENVELOPE
// ==========================

envelope.addEventListener("click", abrirEnvelope);
function abrirEnvelope() {

    console.log("Abrindo envelope...");

    criarCoracoes();

    envelope.classList.add("open");

    setTimeout(() => {

        document.getElementById("envelopeScreen").style.display = "none";
        document.getElementById("app").style.display = "block";

    }, 2500);

}let envelopeAberto = false;



function criarCoracoes(){

    const emojis = [
        "❤️",
        "💖",
        "💕",
        "💗",
        "💓",
        "💞"
    ];

    for(let i=0;i<60;i++){

        setTimeout(()=>{

            const heart=document.createElement("div");

            heart.className="heart";
            heart.innerHTML = emojis[Math.floor(Math.random()*emojis.length)];

            heart.style.left = Math.random()*100+"vw";
            heart.style.fontSize = (20+Math.random()*35)+"px";

            heart.style.setProperty(
                "--x",
                (Math.random()*300-150)+"px"
            );

            document.body.appendChild(heart);

            setTimeout(()=>{
                heart.remove();
            },4000);

        },i*70);

    }

}/// ==========================
// EDITOR DA CARTA
// ==========================

// ==========================
// SALVAR CARTA + POPUP
// ==========================

const saveButton = document.querySelector(".save");

const savePopup = document.getElementById("savePopup");

const closePopup = document.getElementById("closePopup");

const copyBtn = document.getElementById("copyBtn");

const whatsappBtn = document.getElementById("whatsappBtn");


let linkCarta = "";



saveButton.addEventListener("click", async ()=>{


const carta = {

nome:
document.getElementById("nomeRemetente").value,

destino:
document.getElementById("nomeDestino").value,

titulo:
document.getElementById("tituloCarta").value,

texto:
document.getElementById("textoCarta").value

};



console.log("Tentando salvar:", carta);



try{

const docRef = await addDoc(
    collection(db, "cartas"),
    carta
);

const url = new URL("carta.html", window.location.href);
url.searchParams.set("id", docRef.id);

linkCarta = url.toString();

console.log("Carta salva:", linkCarta);

savePopup.style.display = "flex";


}

catch(error){


console.error(
"Erro Firebase:",
error
);


alert(
"Erro ao salvar carta"
);


}



});





closePopup.addEventListener("click",()=>{

savePopup.style.display="none";

});





copyBtn.addEventListener("click",()=>{


navigator.clipboard.writeText(linkCarta);


alert(
"Link copiado ❤️"
);


});





whatsappBtn.addEventListener("click",()=>{


window.open(
"https://wa.me/?text="+
encodeURIComponent(
"❤️ Minha carta para você:\n\n"+linkCarta
)
);


});