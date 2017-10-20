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

var thisUserName = "";
var thisUserID = "";
var addThisUser = true;

var group = {groupName:"", playListID:"", userList:[]};
var groups = [];

var user = {userID:"", userName:""};
var users = [];

var song = {songID:"", rating:1};
var playList = {playListID:"", songList:[]}
var playListTable = [];

var currentGroup = "Group1";

var playlist_1 = "https://open.spotify.com/user/1298427285/playlist/6J2UwWFWSTzT5yg0BxLpOp";
var playlist_2 = "https://open.spotify.com/user/1298427285/playlist/4gomZsrwq4NyrkaNe7L7yd";
var playlist_3 = "https://open.spotify.com/user/1298427285/playlist/2vgjPlRpMdwycbYDytQnw8";


//=================================================================
// $(document).ready()
//=================================================================
$(document).ready(function() {

  thisUserName = localStorage.getItem("name");
  thisUserID = localStorage.getItem("id");
});


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

            for (var j=0; j < group.userList.length; j++)
            {
              $("#friendSubmenu").append('<li><a href="#">'+group.userList[j].userName+'</a></li>');
            }
            break;
      }
  }
  return group.playListID;
}


//====================================================================
//  onClick() event handler for .groupList
//====================================================================
$(document).on("click", ".groupList", function() {

  currentGroup = $(this).text();
  var playListID = refreshUsers();

  // Retrieve the playlist for the selected group with playListID

  for (var i=0; i < playListTable.length; i++)
  {
    playList = playListTable[i];

    if (playList.playListID === playListID)
      break;
  }
  return playList;
});



//====================================================================
//  onClick() event handler for #sidebar
//====================================================================
$(document).on("click", "#sidebar", function() {

  if (addThisUser === true)
  {
      // check to see if the app user's username and id already exists 
      for (var i=0; i < users.length; i++)
      {
          user = users[i];

          if (user.userID === thisUserID)
          {
            addThisUser = false;
            break;
          }
      }

      // if this is a new user, then add it to the Users list in the Firebase 
      if (addThisUser === true)
      {
          database.ref('/users/' + thisUserID).set({
                    userID: thisUserID,
                    userName: thisUserName
          });

          addThisUser = false;
      }
  }
});


//====================================================================
//  addUser() adds a new member to the selected Group
//====================================================================
function addUser()
{
  event.preventDefault();

  var addNewUser = false;
  var username = $("#username").val().trim();

  // Make sure the given username exists

  for (var i=0; i < users.length; i++)
  {
          user = users[i];

          if (user.userName === username)
          {
            addNewUser = true;
            break;
          }
  }

  //Now check if the user is in the current selected group

  if (addNewUser)
  {
      for (var i=0; i < groups.length; i++)
      {
        group = groups[i];

        if (group.groupName === currentGroup)
        {
            for (var j=0; j < group.userList.length; j++)
            {
              if (username === group.userList[j].userName)
              {
                addNewUser = false;
                break;
              }
            }

            if (addNewUser)
            {
                var userName = {userName:username};
                group.userList.push(userName);
                database.ref('/groups/'+ currentGroup).set({
                groupName: currentGroup,
                playListID: group.playListID,
                userList: group.userList
                });

                refreshUsers(username);
            }
            break;
        } //if

      } //for 

  }// if

} // end of addUser


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
});


//====================================================================
//  database.ref(/playlists) Event Listener
//====================================================================
database.ref('/playlists').on("child_added", function(childSnapshot, prevChildKey) {

  playList = childSnapshot.val();
  playListTable.push(playList);
});