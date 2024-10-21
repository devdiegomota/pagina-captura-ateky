// Funções necessárias sendo importadas 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { doc, getDoc, collection, addDoc, updateDoc, deleteDoc, deleteField } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCdAe8MPSQuQuWf70YLt_dKSbmL63vs4LY",
    authDomain: "pagina-captura-ateky.firebaseapp.com",
    projectId: "pagina-captura-ateky",
    storageBucket: "pagina-captura-ateky.appspot.com",
    messagingSenderId: "729981358031",
    appId: "1:729981358031:web:867110a22fe7b640638cba",
    measurementId: "G-SF78RMG6TT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Chama o botão enviar
let botao = document.getElementById('submit')


function sumirerro() {
    erros.erro().style.display = "none"
    

}

//Função que é chamada pelo botão enviar
async function add() {
    
    var nome = document.getElementById('nome').value
    var telefone = document.getElementById('telefone').value
    var endereco = document.getElementById('endereco').value
    //var erro = document.getElementsByClassName('error')

    if (!nome || !telefone || !endereco ) {
        erros.erro().style.display = "block"

    } else {
        try {
            const docRef = await addDoc(collection(db, "clientes"), {
    
                nome: document.getElementById('nome').value,
                telefone: document.getElementById('telefone').value,
                endereco: document.getElementById('endereco').value
            });
            //Se der certo o envio dos dados
            document.location.href = "sucess.html"
            console.log("Document written with ID: ", docRef.id);
    
        } catch (e) { //Caso der erro é exibido
            console.error("Error adding document: ", e);
        }

    }  
}
//Observa os botoes e chama função
botao.addEventListener("click", add)    
nome.addEventListener("input", sumirerro)
telefone.addEventListener("input", sumirerro)
endereco.addEventListener("input", sumirerro)

const erros = {
    erro: () => document.getElementById('error')
}