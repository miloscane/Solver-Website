window.onscroll = function() {scroll()};

function scroll() {
	//Main navigation
	var mainNav	=	document.getElementById("main-nav-wrap");
	if (window.pageYOffset > 0) {
		mainNav.classList.add("main-nav-wrap-colored");
 	}else{
    	if(!document.getElementById("main-menu").classList.contains("opened")){
    		mainNav.classList.remove("main-nav-wrap-colored");
    	}
	}
}

function scrollToElem(elem){
	elem.getElementsByClassName('scrollAnchor')[0].scrollIntoView({ behavior: 'smooth',block:'start',inline:'start'});
}