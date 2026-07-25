import {
    db,
    doc,
    getDoc
} from "./firebase.js";

const senhaCorreta = "Churrasco1306";

const passwordScreen = document.getElementById("passwordScreen");
const envelopeScreen = document.getElementById("envelopeScreen");
const app = document.getElementById("app");

const unlockBtn = document.getElementById("unlockBtn");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");
const envelope = document.getElementById("envelope");

passwordScreen.style.display = "flex";
envelopeScreen.style.display = "none";
app.style.display = "none";

unlockBtn.addEventListener("click", verificarSenha);

passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") verificarSenha();
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

envelope.addEventListener("click", abrirEnvelope);

async function abrirEnvelope() {

    criarCoracoes();

    envelope.classList.add("open");

    setTimeout(async () => {

        envelopeScreen.style.display = "none";
        app.style.display = "block";

        await carregarCarta();

    },2500);

}

function criarCoracoes(){

    const emojis=["❤️","💖","💕","💗","💓","💞"];

    for(let i=0;i<60;i++){

        setTimeout(()=>{

            const heart=document.createElement("div");

            heart.className="heart";

            heart.innerHTML=emojis[Math.floor(Math.random()*emojis.length)];

            heart.style.left=Math.random()*100+"vw";

            heart.style.fontSize=(20+Math.random()*35)+"px";

            heart.style.setProperty("--x",(Math.random()*300-150)+"px");

            document.body.appendChild(heart);

            setTimeout(()=>heart.remove(),4000);

        },i*70);

    }

}

async function carregarCarta(){

    const params=new URLSearchParams(window.location.search);

    const id=params.get("id");

    if(!id){

        document.getElementById("tituloCarta").innerText="Carta não encontrada";

        document.getElementById("textoCarta").innerText="Nenhum ID informado.";

        return;

    }

    try{

        const referencia=doc(db,"cartas",id);

        const documento=await getDoc(referencia);

        if(!documento.exists()){

            document.getElementById("tituloCarta").innerText="Carta não encontrada";

            document.getElementById("textoCarta").innerText="Essa carta não existe.";

            return;

        }

        const carta=documento.data();
document.getElementById("destino").innerText =
"Para: " + carta.destino + " ❤️";

document.getElementById("tituloCarta").innerText =
carta.titulo;

document.getElementById("textoCarta").innerText =
carta.texto;

document.getElementById("remetente").innerText =
"Com amor, " + carta.nome + " ❤️";

    }

    catch(e){

        console.error(e);

        document.getElementById("tituloCarta").innerText="Erro";

        document.getElementById("textoCarta").innerText="Erro ao carregar carta.";

    }

}