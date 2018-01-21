"use strict"

// Floating menu coloring function 

var nav = document.querySelector('.navigation');

function FloatColorMenu (nav) {
    if (!nav.classList.contains('avigation__sticky-col') && window.pageYOffset > 50) {
        console.log('class \"navigation__sticky-col\" added');
        nav.classList.add('navigation__sticky-col');

    } else if (nav.classList.contains('navigation__sticky-col') && window.pageYOffset < 50) {
        console.log('class \"navigation__sticky-col\" removed');
        nav.classList.remove('navigation__sticky-col');
    }
};

//**********************************************************************

var md = new MobileDetect(window.navigator.userAgent);

md.setStyle = function(cssLink) {
    var a=document.createElement("link");
    a.rel="stylesheet";
    a.href=cssLink;
    document.getElementsByTagName("head")[0].appendChild(a);
};

if (md.mobile() && md.phone()) {
    md.setStyle("css/phone.css");
} else if (md.tablet()) {
    md.setStyle("css/tablet.css");
} else {
    md.setStyle("css/desktop.css");
};
	
//*********************************************************************
var size = 120,
   articlesContent= $('.articles__text'),
   articlesText = articlesContent.text();
    
if(articlesText.length > size){
	articlesContent.text(articlesText.slice(0, size) + ' ...');
};	
