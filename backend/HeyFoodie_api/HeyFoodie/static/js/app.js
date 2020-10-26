$(document).ready(function(){
    $("#view").click(function(){
        $("#showDetail").toggle();
    })
})

// not finish
$('#form').submit(function(e){
    $.post('/url/', $(this).serialize(), function(data){ 
        $('.message').html(data.message);
    });
    e.preventDefault();
});