const menuModule = {
    menu: document.querySelector('.app-menu'),
    handler: document.querySelector('.app-menu-handler'),
    nav: document.querySelector('.app-navbar'),

    toggleMenu() {
        this.menu.classList.add('show')
        this.handler.classList.toggle('active')
        this.menu.classList.toggle('active')
        this.nav.classList.toggle('active')
    },

    onInit() {
        this.handler.addEventListener('click', () => this.toggleMenu())
    }
}

export default menuModule
