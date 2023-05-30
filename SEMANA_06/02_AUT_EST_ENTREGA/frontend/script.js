$(document).ready(function(){
    const hiddenBox = $(".hidden");
    const moreBtn = $(".btn-continue");
    const lessBtn = $(".btn-return");
    $(".btn-continue").on("click", function(event) {
        hiddenBox.show();
        moreBtn.hide();
        lessBtn.show();
    
   

});
    $(".btn-return").on("click", function(event) {
        hiddenBox.hide();
        moreBtn.show();
        lessBtn.hide();
});
});



