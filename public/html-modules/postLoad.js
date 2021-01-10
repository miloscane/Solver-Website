scroll();

for(var i=0;i<document.getElementsByClassName("yearPrint").length;i++){
	document.getElementsByClassName("yearPrint")[i].innerHTML=new Date().getFullYear();
}