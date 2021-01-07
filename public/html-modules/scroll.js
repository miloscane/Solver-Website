window.onscroll = function() {scroll()};

scroll();

function scroll() {
	//Main navigation
	var mainNav	=	document.getElementById("main-nav-wrap");
	if (window.pageYOffset > 0) {
		mainNav.classList.add("main-nav-wrap-colored");
 	}else{
    	mainNav.classList.remove("main-nav-wrap-colored");
	}
}