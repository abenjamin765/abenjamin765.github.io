$(function(){
  var height 		    = 300; // Height of the header
  $(".logo-box").css('margin-top', height);
  $(".page-content").css('padding-top', (height + 150));
  $(window).scroll(function() {
    var fromTop 	= $(window).scrollTop(),
    	percentage	= Math.min(1, fromTop / height),
    	marginTop 	= height - height * percentage,
        bgColor     = '50,50,50,', //RGB Values
    	alpha 		= percentage;
    $(".logo-box").css('margin-top', marginTop);
    $(".frame").css('background-color', 'rgba(' + bgColor + alpha + ')');
  });
});

// $(function() {
//   $('a[href*="#"]:not([href="#"])').click(function() {
//     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
//       var target = $(this.hash);
//       target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
//       if (target.length) {
//         $('html, body').animate({
//           scrollTop: target.offset().top - 100
//         }, 1000);
//         return false;
//       }
//     }
//   });
// });


