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
document.getElementById('logout').addEventListener("click",logoutfunc)
function logoutfunc(e)
{
  e.preventDefault();
  firebase.auth().signOut().then(function() {

    window.location.replace("login.html");

}).catch(function(error) {
  alert(error);
});
}

var commentsRef = firebase.database().ref('massages' ).orderByChild('number');
commentsRef.on('value', (snapshot) => {
//  addCommentElement(postElement, data.key, data.val().text, data.val().author);
var output = `<h1 style="text-align:center">Blogs</h1>`
snapshot.forEach((datas)=>{
  var data = datas.val();

  // Or inserted into an <img> element:
  output += `<div class="card  mb-3"; style="width:100%;  text-align:center";>
          <img class="card-img-top" src="${data.FileURL}" style="width:100%;">
           <h4 class="card-title"> ${data.Title}</h4>
           <div class="card-text d-inline-flex justify-content-between" mt-3>
           <div> Publisher: ${data.Blogger} </div>
           <div> ${data.date} </div>
           </div>

           <p class="card-text mt-3"> ${data.Comment} </p> </div>`
})
document.getElementById('display').innerHTML=output;

});
