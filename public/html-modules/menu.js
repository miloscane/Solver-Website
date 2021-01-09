function openResponsiveMenu(){
	var menu	=	document.getElementById("main-menu");
	var menuIcon=	document.getElementById("responsive-menu-opener");
	if(menu.classList.contains("opened")){
		menu.classList.remove("opened");
		menuIcon.classList.remove("responsiveMenuOpened");
	}else{
		menu.classList.add("opened");
		menuIcon.classList.add("responsiveMenuOpened");
	}
}