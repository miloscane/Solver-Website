window.onscroll = function() {scroll()};

function scroll() {
	//Main navigation
	var mainNav	=	document.getElementById("main-nav-wrap");
	if (window.pageYOffset > 0) {
		mainNav.classList.add("main-nav-wrap-colored");
 	}else{
    	mainNav.classList.remove("main-nav-wrap-colored");
	}
}

function scrollToElem(elem,offset){
	elem.getElementsByClassName('scrollAnchor')[0].scrollIntoView({ behavior: 'smooth',block:'start',inline:'start'});
}