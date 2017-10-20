//=====================================================================
// This is used to trigger the toggle button to toggle the sidebar menu
//=====================================================================

$(document).ready(function () {
    $('#sidebar').toggleClass('active');
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#likeBtn').show();
    });
});

// the modal
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').focus()
});


// 

