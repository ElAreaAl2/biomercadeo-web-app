var kad_cursor = "modeB";
var kad_container_width = 1024;
var kad_container_height = 768;


 // Definir el objeto CLMPlayer si no existe
 var CLMPlayer = CLMPlayer || {}; 
 CLMPlayer.gotoSlide = function(module, slide, transition) {
     window.location.href = slide;
 }


 $('.open-pop1').click(function(){
   $('.popup1').removeClass('popup-oculto');
});

$('.open-pop2').click(function(){
   $('.popup2').removeClass('popup-oculto');
});

$('.open-pop3').click(function(){
    $('.popup3').removeClass('popup-oculto');
 });


 $('.popup .close-pop1, .popup .close-pop2, .popup .close-pop3').click(function(){
     $('.popup1, .popup2, .popup3').addClass('popup-oculto');
 });


$('.abrir-paso1').click(function(){
    $('.paso1').removeClass('ocultar');
});

$('.abrir-paso2').click(function(){
    $('.paso2').removeClass('ocultar');
});

$('.abrir-paso3').click(function(){
    $('.paso3').removeClass('ocultar');
});

function resizeSlide() {
    var baseWidth = 1280;
    var baseHeight = 720;
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    
    var scale = Math.min(windowWidth / baseWidth, windowHeight / baseHeight);
    if (scale > 1) scale = 1;
    
    var leftPos = (windowWidth - (baseWidth * scale)) / 2;
    var topPos = (windowHeight - (baseHeight * scale)) / 2;
    
    $('#kad_container').css({
        'transform': 'scale(' + scale + ')',
        'left': leftPos + 'px',
        'top': topPos + 'px'
    });

    // Mostramos el contenedor una vez posicionado
    $('#kad_container').addClass('visible');
}

// Usamos 'ready' para que se ejecute apenas el DOM esté disponible
$(document).ready(function() {
    resizeSlide();
});

// Y 'resize' para mantener la posición si se gira el iPad
$(window).on('resize', function() {
    resizeSlide();
});