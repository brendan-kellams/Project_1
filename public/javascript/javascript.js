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


//=====================================================================
// This is used to trigger the toggle button to toggle the sidebar menu
//=====================================================================
$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});

// this is used to reshape the contents when hitting the toggle button
$('#sidebarCollapse').on('click', function () {
    if ($('iframe').width() === 1210) {
        $('iframe').css('width', '1370px');
    } else {
        $('iframe').css('width', '1210px');;
    }
});


//====================================================================
//  displayUsers()
//====================================================================
function displayUsers(groupName, userName)
{
 	//$("#groupSubmenu").append("<li></li>" + userName);
 	$("#groupSubmenu").append('<li class="groupList"><a href="#">'+groupName+'</a></li>');
 	$("#friendSubmenu").append('<li class="collapse list-unstyled"><a href="#">'+userName+'</a></li>');
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


// this is used to get the modal working when adding a friend

// var modal = $('#myModal');

// var link = $('#addFriend');

// var span = $('.close')[0];

// link.onclick = function() {
//     modal.style.display = "block";
// }

// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }