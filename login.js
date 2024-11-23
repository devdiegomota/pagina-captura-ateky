import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig  = {
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


//MANTEM USUARIO LOGADO MESMO RECARREGANDO A PÁGINA
document.addEventListener("DOMContentLoaded", function() {
    UserLoged();
    // Sua função aqui
  
  });

//VERIFICA SE O USUARIO TA LOGADO
function UserLoged () {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        
        window.location.href = "painel.html"
    
      }
    });
}
//-------------------------------------------------------------------------------

//BOTOES
const recoverpass = document.getElementById('recover-password-b');
recoverpass.addEventListener("click", RecoveryPassword);

const submit = document.getElementById('login-button');
submit.addEventListener("click", function (event) {
    event.preventDefault()

    //Inputs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    //FAZER LOGIN
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            // Signed up 
            const user = userCredential.user;

            window.location.href = "painel.html"
            // ...
            
        })
        .catch((error) => {
            alert(GetErrorMessage(error))
            const errorCode = error.code;
            const errorMessage = error.message;

            //TRANSFORMAR ERRO EM MENSAGEM
            function GetErrorMessage(error) {

                if (error.code == 'auth/invalid-credential') {
                    return ('Verifique usuario ou senha')
                }
                else if (error.code == 'auth/invalid-email') {
                    return ('Email inválido')
                }
                else if (error.code == 'auth/too-many-requests') {
                    return ('Conta bloqueada por muitas tentativas. Altere a senha.')
                }
            }
            /*
            alert(errorMessage)
            alert(errorCode)*/
            // ..
        });
})
//RECUPERAR O PASSWORD
function RecoveryPassword() {

    const email = document.getElementById('email').value;

    ShowLoading();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
        .then(() => {

            alert('Email enviado')
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            //alert(GetErrorMessage(error))
            alert(errorCode)
            //alert(errorMessage)
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
        
}

