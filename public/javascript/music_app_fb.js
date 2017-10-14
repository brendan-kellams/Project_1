//====================================================================
// Firebase Initialization
//====================================================================
var config = {
    apiKey: "AIzaSyAyCExyUKAi8ZxurGIdXMOI12fekQA-2AM",
    authDomain: "musicapp-e8c67.firebaseapp.com",
    databaseURL: "https://musicapp-e8c67.firebaseio.com",
    projectId: "musicapp-e8c67",
    storageBucket: "",
    messagingSenderId: "317115906434"
};
firebase.initializeApp(config);
var database = firebase.database();


//====================================================================
//  displayUsers()
//====================================================================
function displayUsers(groupName, userName)
{
 	//$("#groupSubmenu").append("<li></li>" + userName);
 	$("#groupSubmenu").append('<li class="groupList"><a href="#">'+groupName+'</a></li>');
 	//$("#friendSubmenu").append('<li class="collapse list-unstyled"><a href="#">'+userName+'</a></li>');
 	$("#friendSubmenu").append('<li><a href="#">'+userName+'</a></li>');
};


//====================================================================
//  onClick()
//====================================================================

//$(document).on("click", ".groupList", processGroup);

function processGroup()
{

}


//====================================================================
//  addUser()
//====================================================================
function addUser(){

  event.preventDefault();

  var userName = $("#user-name").val().trim();
  var groupName = $("#group-name").val().trim();
  
  database.ref('/groups').push({
        username: userName,
        groupname: groupName,
        date: firebase.database.ServerValue.TIMESTAMP
  });

  $("#user-name").val("");
  $("#group-name").val("");
}


//====================================================================
//  database.ref()
//====================================================================
database.ref('/groups').on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var groupName = childSnapshot.val().groupname;
  var userName = childSnapshot.val().username;

  displayUsers(groupName, userName);
});

