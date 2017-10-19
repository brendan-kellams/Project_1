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


//==============================================================
//                      Global Variables
//==============================================================

var group = {groupName:"", playListID:"", users:[]};
var groups = [];

var user = {userID:"", userName:""};
var users = [];

var currentGroup = "Group1";


//====================================================================
//  refreshGroups()
//====================================================================
function refreshGroups(groupName)
{
 	$("#groupSubmenu").append('<li class="groupList"><a href="#">'+groupName+'</a></li>');
}


//====================================================================
//  refreshUsers()
//====================================================================
function refreshUsers()
{
  for (var i=0; i < groups.length; i++)
  {
      group = groups[i];
      if (group.groupName === currentGroup)
      {
            $("#friendSubmenu").empty()

            for (var j=0; j < group.users.length; j++)
            {
              $("#friendSubmenu").append('<li><a href="#">'+group.users[j].userID+'</a></li>');
            }
            break;
      }
  }
}


//====================================================================
//  onClick()
//====================================================================
$(document).on("click", ".groupList", function() {

  currentGroup = $(this).text();
  console.log(currentGroup);
  refreshUsers();
});


//====================================================================
//  addUser()
//====================================================================
function addUser(){

  event.preventDefault();

  var addUser = false;
  var userid = $("#username").val().trim();

  console.log(userid);

  for (var i=0; i < users.length; i++)
  {
      user = users[i];

      console.log(user);

      if (user.userID === userid)
      {
        addUser = false;
      }
      else
      {
        addUser = true;
      }
  }

  if (addUser)
  {
      users.length = 0;

      database.ref('/users/' + userid).set({
                UserID: userid,
                userName: ""
      });

      for (var i=0; i < groups.length; i++)
      {
        group = groups[i];
        if (group.groupName === currentGroup)
        {
            groups.length = 0;
            group.users.push(userid);

            database.ref('/groups/'+ currentGroup).set({
            groupName: currentGroup,
            playListID: group.playListID,
            users: group.users
            });
            break;
        }
      }
      refreshUsers(userid);
  }

}


//====================================================================
//  database.ref(/groups) Event Listener
//====================================================================
database.ref('/groups').on("child_added", function(childSnapshot, prevChildKey) {

  group = childSnapshot.val();
  
  groups.push(group);

  refreshGroups(group.groupName);
});


//====================================================================
//  database.ref(/users) Event Listener
//====================================================================
database.ref('/users').on("child_added", function(childSnapshot, prevChildKey) {

  user = childSnapshot.val();
  users.push(user);

  console.log(users);
});