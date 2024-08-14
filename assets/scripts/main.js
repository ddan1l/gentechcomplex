import "./modules/card.js"
import menuModule from "./modules/menu.js";
import navModule from "./modules/nav.js";
import "./modules/scroll.js"


document.addEventListener('DOMContentLoaded', () => {
    navModule.circledGraph.drawBackground()
    navModule.circledGraph.animateGraph()

    menuModule.onInit()
})