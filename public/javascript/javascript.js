//=====================================================================
// This is used to trigger the toggle button to toggle the sidebar menu
//=====================================================================

$(document).ready(function () {
    $('#sidebar').toggleClass('active');
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});
var collapsed = true;
// this is used to reshape the contents when hitting the toggle button
$('#sidebarCollapse').on('click', function () {
    if (collapsed) {
        $('iframe').css('width', '1141px');
    } else {
        $('iframe').css('width', '1318px');
    }
    collapsed = !collapsed;
    
});

// the modal
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').focus()
});


// like counter