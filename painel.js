import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, query, where, collection, getDocs, deleteDoc, doc, orderBy } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getAuth, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

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
function UserLoged () {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        
        ProcuraClientes();
    
      }
    });
}
//-----------------------------------------------------------------

//FUNÇÃO QUE PEGA OS DADOS NO FIRESTORE-------------------------------------------------
async function ProcuraClientes() {

    const q = query(collection(db, "clientes"))

    const querySnapshot = await getDocs(q);
   
    const clientes = querySnapshot.docs.map(doc => ({
        ...doc.data(),
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
        //li.id = cliente.uid; //adiciona o uid de cada transação como id de cada lista
        
    
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

