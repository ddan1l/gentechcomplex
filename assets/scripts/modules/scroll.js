import navModule from "./nav.js";
import titleModule from "./titles.js";

const sections = document.querySelectorAll(".scroll-section");
const sectionsTop = Array.from(sections).map(section => section.offsetTop - 200)

class Debouncer {
    #_timeout = null

    exec(callback, delay) {
        if (this.#_timeout) {
            clearTimeout(this.#_timeout)
        }
        this.#_timeout = setTimeout(() => {
            callback()
            clearTimeout(this.#_timeout)
        }, delay)
    }
}

const debounce = new Debouncer()


function scrollEvent() {
    debounce.exec(() => {
        const lastSectionTop = sectionsTop.findLast(top => document.documentElement.scrollTop > top)
        const sectionIndex = Math.max(sectionsTop.indexOf(lastSectionTop), 0)

        const step = 100 / sections.length

        const percent = (step * (sectionIndex + 1))

        navModule.circledGraph.setValue(percent)
        navModule.circledGraph.setText(`0${sectionIndex + 1}`)

        titleModule.setActive(sectionIndex)
    }, 200)
}


document.addEventListener('DOMContentLoaded', () => {
    scrollEvent()
})

document.addEventListener("scroll", scrollEvent)

