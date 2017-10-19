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

var song = {songID:"", rating:1};
var playList = {playListID:"", songList:[]}
var playListTable = [];

var currentGroup = "Group1";
var playlist_1 = "https://open.spotify.com/user/1298427285/playlist/6J2UwWFWSTzT5yg0BxLpOp";
var playlist_2 = "https://open.spotify.com/user/1298427285/playlist/4gomZsrwq4NyrkaNe7L7yd";
var playlist_3 = "https://open.spotify.com/user/1298427285/playlist/2vgjPlRpMdwycbYDytQnw8";

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
  return group.playListID;
}


//====================================================================
//  onClick() event handler for .groupList
//====================================================================
$(document).on("click", ".groupList", function() {

  currentGroup = $(this).text();
  console.log(currentGroup);
  var playListID = refreshUsers();

  // Retrieve the playlist for the selected group

  for (var i=0; i < playListTable.length; i++)
  {
    playList = playListTable[i];

    if (playList.playListID === playListID)
      break;
  }

  console.log(playList);
  return playList;

});


//====================================================================
//  addUser()
//====================================================================
function addUser(){

  event.preventDefault();

  var addUser = true;
  var userid = $("#username").val().trim();

  // Check to see if the user already exists 
  for (var i=0; i < users.length; i++)
  {
      user = users[i];

      if (user.userID === userid)
      {
        addUser = false;
        break;
      }
  }

  // If this is a new user, then add it to the Users list in the Firebase
  if (addUser)
  {
      database.ref('/users/' + userid).set({
                userID: userid,
                userName: ""
      });
  }

  //Now check the users in the current selected group

  for (var i=0; i < groups.length; i++)
  {
    addUser = true;
    group = groups[i];

    if (group.groupName === currentGroup)
    {
        for (var j=0; j < group.users.length; j++)
        {
          if (userid === group.users[j].userID)
          {
            addUser = false;
            break;
          }
        }

        if (addUser)
        {
            user = {userID:userid, userName:""};
            group.users.push(user);

            database.ref('/groups/'+ currentGroup).set({
            groupName: currentGroup,
            playListID: group.playListID,
            users: group.users
            });

            refreshUsers(userid);
        }
        break;
    } //if

  } //for 

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

  console.log(playListTable);
});