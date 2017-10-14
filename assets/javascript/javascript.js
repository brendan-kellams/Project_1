// this is used to trigger the toggle button to toggle the sidebar menu
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