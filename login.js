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


document.getElementById('btnl').addEventListener('click',submitlog)
function submitlog(e){
  e.preventDefault();
var emaill = document.getElementById('emaill').value;
var passwordl=document.getElementById('pwdl').value;


firebase.auth().signInWithEmailAndPassword(emaill, passwordl)
  .then((user) => {
  window.location.replace("blog.html");


  })
  .catch((error) => {
    var errorCodes = error.code;
    var errorMessages = error.message;

  document.getElementById('errormessages').innerHTML=`<div class="alert alert-success">${errorMessages}</div>`;

    setTimeout(function () {
document.getElementById('errormessages').style.display='none';
}, 5000);
  });
  document.getElementById('logform').reset();
}
