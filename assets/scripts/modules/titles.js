import menuModule from "./menu.js";

const titles = document.querySelectorAll('.app-menu__title')
const divider = document.querySelector('.app-menu-divider')

for (let i = 0; i < titles.length; i++) {
    titles[i].addEventListener('mouseenter', () => titleModule.setActive(i))
    titles[i].addEventListener('click', () => menuModule.toggleMenu())
}

const titleModule = {
    setActive(index) {
        for (let i = 0; i < titles.length; i++) {
            titles[i].classList.remove('active')


            if (i === index) {
                const top = titles[i].offsetTop
                divider.style.transform = `translateY(${top}px)`
                titles[i].classList.add('active')
            }
        }
    }
}

export default titleModule