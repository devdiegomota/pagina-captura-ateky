import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, query, where, collection, getDocs, deleteDoc, doc, orderBy } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

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

UserLoged()
//VERIFICA SE O USUARIO TA LOGADO-----------------------------------------------------
function UserLoged() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {

            ProcuraClientes();

        } else {

            window.location.href = "login.html"
        }
    });
}
//-------------------------------------------------------------------------
//CHAMA O BOTAO DESLOGAR E MONITORA OS CLIQUES NELE PARA CHAMAR FUNCAO
const logoutbutton = document.getElementById('logout-button')
logoutbutton.addEventListener("click", function () {

    Logout();

});
//FUNÇÃO QUE AO SER CHAMADA DESLOGA O USUARIO E MANDA PARA A PAGINA DESEJADA, OU PAGINA DE LOGIN
function Logout() {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            window.location.href = "login.html" //PAGINA ESCOLHIDA AO DESLOGAR
        })
        .catch((error) => {
            alert('Falha ao deslogar')
            console.log(error);
        });
}
//-------------------------------------------------------------------

//FUNÇÃO QUE PEGA OS DADOS NO FIRESTORE-------------------------------------------------
async function ProcuraClientes() {

    const q = query(collection(db, "clientes"))

    const querySnapshot = await getDocs(q);

    const clientes = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        uid: doc.id

    }));

    console.log(clientes)
    AddClientesNaTela(clientes);//coloca essa arwey criada na função que joga na tela
}

//----------------------------------------------------//---------------------------------
function AddClientesNaTela(clientes) {
    const listaordenada = document.getElementById('lista-clientes')

    clientes.forEach(cliente => {
        const li = document.createElement('li');
        //li.classList.add('');
        li.id = cliente.uid; //adiciona o uid de cada transação como id de cada lista

        //criando o botão remover transação na tela
        const BotaoDelete = document.createElement('button')
        BotaoDelete.innerHTML = "Remover"
        BotaoDelete.classList.add('botao-remover-home')
        BotaoDelete.addEventListener('click', event => {
            event.stopPropagation();
            ConfirmRemover(cliente)
        })
        li.appendChild(BotaoDelete)
        //botão criado----------------

        const nome = document.createElement('p')
        nome.innerHTML = '<b>Nome</b> - ' + cliente.nome;
        li.appendChild(nome);

        const telefone = document.createElement('p');
        telefone.innerHTML = '<b>Tel.</b> - ' + cliente.telefone;
        li.appendChild(telefone);

        const endereco = document.createElement('p');
        endereco.innerHTML = '<b>End</b>. - ' + cliente.endereco;
        li.appendChild(endereco)

        listaordenada.appendChild(li);
    });
}

//-----------------------------------------------------------------------------------------
//FUNÇÃO QUE REMOVE A TRANSAÇÃO PELO BOTÃO
//etapa de confirmação antes de deletar
function ConfirmRemover(cliente) {
    const deveriaremover = confirm('Deseja remover esse cadastro?')
    console.log(deveriaremover)
    if(deveriaremover) {
        RemovaTransacao(cliente)
    }
}
//remove direto do firestore e da tela
async function RemovaTransacao(cliente){
    await deleteDoc(doc(db, "clientes", cliente.uid));
    document.getElementById(cliente.uid).remove();
}

//------------------------------------//-------------------------------------------------------//


