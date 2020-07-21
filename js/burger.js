const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger__menu');
const burgerMenuClose = document.querySelector('.burger__menu_close');

burger.addEventListener('click', ()=> {
    burger.style.opacity = 0;   
    burgerMenu.classList.add('burger__menu_show');
    
    burgerMenuClose.addEventListener('click', ()=> {
        burger.style.opacity = 1;
        burgerMenu.classList.remove('burger__menu_show');
    })
})

