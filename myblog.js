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
var num = 100000;


var storageRef = firebase.storage().ref();
// Create a reference to 'mountains.jpg'
var file;
var getUrl;
const changefile = (event) => {
  file = event.target.files[0];

 document.getElementById('studentForm').setAttribute('disabled', 'true');
    myfunction();
        }
function myfunction(){
  var name= Date.now();
  var mountainsRef = storageRef.child('imagees' + name);
   var   uploadTask = mountainsRef.put(file);

   uploadTask.on('state_changed', function(snapshot){
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    var uploader = document.getElementById('uploader');
    uploader.value=progress;
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED:
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING:
        console.log('Upload is running');
        break;
    }
},
function(error)
{
  console.log(error);
},
function() {

               // get the uploaded image url back
               uploadTask.snapshot.ref.getDownloadURL().then(
                function(downloadURL) {

               // You get your url from here
                console.log('File available at', downloadURL);

              // print the image url
               console.log(downloadURL);
               getUrl = downloadURL;

              document.getElementById('studentForm').removeAttribute('disabled');
            });
          });
      };




 /*var newMetadata = {
   cacheControl: 'public,max-age=300',
   contentType: 'image/jpeg'
 }*/

document.getElementById('studentForm').addEventListener('submit',submitForm)
function submitForm(e) {
  e.preventDefault();
  var uname = inputValue('uname');
  var title = inputValue('title');
  var comment = inputValue('comment');
  var d = new Date();
  var now = d.toDateString();

  savMassage(uname,title,comment,now,getUrl);

  document.getElementById('aler').innerHTML = `<div class="alert alert-success">Data successfully saved</div>`;

  setTimeout(function () {
    document.getElementById('aler').innerHTML = `<div class="alert alert-success" style="display:none">Data successfully saved</div>`;
    document.getElementById('con').style.display="none";
    document.getElementById('studentForm').reset();
  }, 3000);

}




function inputValue(id){
  return document.getElementById(id).value;
}
function savMassage(uname,title,comment,now,getUrl){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
     userUid = user.uid;

  var massagesRef = firebase.database().ref('massages');
  var newMassagesREF = massagesRef.push();
  var num = -1 * new Date().getTime();
  newMassagesREF.set({
    Blogger:uname,
    Title:title,
    Comment:comment,
    FileURL:getUrl,
    date:now,
    Id:userUid,
    number: num
  })
} else {
  // No user is signed in.

}
});
}



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
   usersUid = user.uid;
var commentsRef = firebase.database().ref('massages' ).orderByChild('number');
commentsRef.on('value', (snapshot) => {
//  addCommentElement(postElement, data.key, data.val().text, data.val().author);
var output = `<h1 style="text-align:center">My blogs</h1>`
snapshot.forEach((datas)=>{
  var data = datas.val();
  if(usersUid == data.Id)
  {
  // Or inserted into an <img> element:
  output += `<div class="card  mb-3"; style="width:100%;  text-align:center";>
          <img class="card-img-top" src="${data.FileURL}" style="width:100%;">
           <h4 class="card-title"> ${data.Title}</h4>
           <div class="card-text d-inline-flex justify-content-between" mt-3>
           <div> Publisher: ${data.Blogger} </div>
           <div> ${data.date} </div>
           </div>
           <p class="card-text mt-3"> ${data.Comment} </p>
           <div class="btn-group">
           <button type="button" class="btn btn-danger" onClick="deletes('${datas.key}') ">Delete</button>
           </div>
           </div>`

         }



})
document.getElementById('display').innerHTML=output;

});
} else {
  alert("please create acount")
}
});
const rootRef = firebase.database().ref('massages' );
function deletes(key) {

var deteting = rootRef.child(key);

 return deteting.remove();
}
