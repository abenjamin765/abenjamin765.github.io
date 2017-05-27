// $(document).ready(function () {
//   $('.card').each(function(i){
//   	setTimeout(function(){
//   	$('.card').eq(i).addClass('pop');
//   	}, 200 * i);
//   });
// });



// $(document).ready(function () {
// 	function isInViewport(element) {
// 	var rect = element.getBoundingClientRect();
// 	var html = document.documentElement;
// 	return (
// 		rect.top >= 0 &&
// 		rect.left >= 0 &&
// 		rect.bottom <= (window.innerHeight || html.clientHeight) &&
// 		rect.right <= (window.innerWidth || html.clientWidth)
// 	);
// 	}
// });
function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

$(window).on('scroll', function() {
  $(".card").each(function() {
    if (isScrolledIntoView($(this))) {
      $(this).find(".card").addClass("pop");
    }
  });
});

