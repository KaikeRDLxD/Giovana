import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "AIzaSyBwuqNjNA1hTd9Q2-_ejoURJ_y014YO5hE",

    authDomain: "cartadeamor-52ee8.firebaseapp.com",

    projectId: "cartadeamor-52ee8",

    storageBucket: "cartadeamor-52ee8.firebasestorage.app",

    messagingSenderId: "927790495129",

    appId: "1:927790495129:web:8fdb28036cc9b2bda78f08"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {
    db,
    collection,
    addDoc,
    doc,
    getDoc
};