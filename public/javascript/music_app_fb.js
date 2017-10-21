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
  updateFriendsList();
});

function updateFriendsList() {
  $('#friendSubmenu').empty();
  var addFriend = database.ref('/groups/' + currentGroup).child('userList').orderByChild('userName');
  addFriend.on('value', (snapshot) => {
    // console.log(snapshot.val());
    snapshot.forEach((value) => {
      // console.log(value.val().userName);
      var name = value.val().userName;
      $("#friendSubmenu").append('<li><a href="#">'+name+'</a></li>');
    });
  });
}

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
  return { 
    embedded: group.embedded,
    playlistID: group.playListID
  };
}


//====================================================================
//  onClick() event handler for .groupList
//====================================================================
$(document).on("click", ".groupList", function() {

  currentGroup = $(this).text();
  var info = refreshUsers();
  var playListID = info.embedded;
  var shortID = info.playlistID;
  // console.log(info);

  //Added more change because the other call doesn't work
  updateFriendsList();
  // Retrieve the playlist for the selected group with playListID
  //Do a playlist change
  $('.playlist').attr('src', playListID);
  //Update local storage for add song
  localStorage.setItem('current_playlist', shortID);
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
// $(document).on("click", "#sidebar", function() {

//   if (addThisUser === true)
//   {
//       // check to see if the app user's username and id already exists 
//       for (var i=0; i < users.length; i++)
//       {
//           user = users[i];

//           if (user.userID === thisUserID)
//           {
//             addThisUser = false;
//             break;
//           }
//       }

//       // if this is a new user, then add it to the Users list in the Firebase 
//       if (addThisUser === true)
//       {
//           database.ref('/users/' + thisUserID).set({
//                     userID: thisUserID,
//                     userName: thisUserName
//           });

//           addThisUser = false;
//       }
//   }
// });

//====================================================================
//  addUser() adds a new member to the selected Group
//====================================================================
function addUser()
{
  event.preventDefault();

  var friend = false;
  var username = $("#username").val().trim();
  username = unescape(username);
  $('#username').val('');
  // Make sure the given username exists
  // for (var i=0; i < users.length; i++)
  // {
  //         user = users[i];

  //         if (user.userName === username)
  //         {
  //           addNewUser = true;
  //           break;
  //         }
  // }
  var findFriend = database.ref('/users').orderByChild('userName').equalTo(username);
  findFriend.on('value', 
    (snapshot) => {
      snapshot.forEach(function(value) {
        friend = value.val().userName;
      });
    }
  );
   
  // database.ref('/users').orderByChild('userName').equalTo(username).on('value', (snapshot) => {
  //   snapshot.forEach((value) => {
  //     console.log(value.val());
  //   });
  // });
    // (error) => {
    //   console.log(error);
    // });
  //Now check if the user is in the current selected group

  if (friend)
  {
    // console.log(friend);
    var exists = true;
    var addFriend = database.ref('/groups/' + currentGroup).child('userList').orderByChild('userName').equalTo(friend).limitToFirst(1);
    addFriend.on('value', 
      (snapshot) => {
        // console.log(snapshot.val());
        exists = snapshot.exists();
        snapshot.forEach(function(value) {
          // console.log(value.val());
        });
      }
    );
    if(!exists) {
      console.log('we\'re in exist');
      database.ref('groups').child(currentGroup).child('userList').push({
        userName: friend
      });
    }
    // for (var i=0; i < groups.length; i++)
    // {
    //   group = groups[i];

    //   if (group.groupName === currentGroup)
    //   {
    //       for (var j=0; j < group.userList.length; j++)
    //       {
    //         if (username === group.userList[j].userName)
    //         {
    //           addNewUser = false;
    //           break;
    //         }
    //       }

    //       if (addNewUser)
    //       {
    //           var userName = {userName:username};
    //           group.userList.push(userName);
    //           var ref = databse.ref('/groups/' + currentGroup + '/userList');
    //           console.log(ref);
    //           ref.push(userName, (error) => {console.log(error)});
    //           refreshUsers();
    //       }
    //       break;
    //   } //if

    // } //for 

  }// if

} // end of addUser


//====================================================================
//  database.ref(/groups) Event Listener
//====================================================================
database.ref('/groups').on("value", function(snapShot, prevChildKey) {
  $("#groupSubmenu").empty();
  snapShot.forEach(function(value) {
      group = value.val();
      groups.push(group);
      refreshGroups(group.groupName);
      // console.log(group);
  });
});


//====================================================================
//  database.ref(/users) Event Listener
//====================================================================
database.ref('/users').on("value", function(snapShot, prevChildKey) {
  snapShot.forEach(function(value) {
      user = value.val();
      users.push(user);
      // console.log(user);
  });
});


//====================================================================
//  database.ref(/playlists) Event Listener
//====================================================================
database.ref('/playlists').on("value", function(snapShot, prevChildKey) {
  snapShot.forEach(function(value) {
    playList = value.val();
    var id = playList.playListID;

    playListTable.push(playList);
    // console.log(playList);
  });

});

