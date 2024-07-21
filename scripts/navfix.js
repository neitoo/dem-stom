document.addEventListener('DOMContentLoaded', function() {
    var nav = document.getElementById('nav');
    var header = document.querySelector('.header');
    var heightHeader = header.offsetHeight;
    var navHeight = nav.offsetHeight;
    var main = document.querySelector('.main');

    window.addEventListener('scroll', function(){
        if(window.scrollY > heightHeader && nav.style.display !== 'none'){
            nav.classList.add('fixed');
            main.style.marginTop = navHeight + 'px';
        } else {
            nav.classList.remove('fixed');
            main.style.marginTop = '0';
        }
    });
});