const play = document.querySelector('.card-play')
const card = document.querySelector('.card')
const bg = document.querySelector('.card-bg')
const section = document.querySelector('.card-section')

play.addEventListener('click', () => {
    card.classList.toggle('active')
    bg.classList.toggle('active')
    play.classList.toggle('active')
    setTimeout(() => {
        section.classList.toggle('active')
    }, 600)
})