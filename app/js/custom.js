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
}