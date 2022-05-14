var firebaseConfig = {
  apiKey: "AIzaSyC4TpdAer9Cr_he1YyCpSfI6_JnEUIg0gQ",
  authDomain: "myblog-9364f.firebaseapp.com",
  databaseURL: "https://myblog-9364f.firebaseio.com",
  projectId: "myblog-9364f",
  storageBucket: "myblog-9364f.appspot.com",
  messagingSenderId: "894120877025",
  appId: "1:894120877025:web:02c677624c1a6c94e150a0",
  measurementId: "G-MWGWHRJC7T"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

document.getElementById('buttons').addEventListener('click',submit)

function submit(e){
  e.preventDefault();
var email = document.getElementById('email').value;
var password=document.getElementById('pwd').value;


firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {

  window.location.replace("blog.html");


  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

  document.getElementById('errormessage').innerHTML=`<div class="alert alert-success">${errorMessage}</div>`;

    setTimeout(function () {
document.getElementById('errormessage').style.display='none';
}, 5000);
  });
  document.getElementById('signform').reset();


}
