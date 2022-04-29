const img = document.querySelector('.daytime-image')

const username = Cookies.get('username')
const daytime = defineDaytime()
if (username === undefined) {
    const name = prompt('Введите ваше имя')
    Cookies.set('username', name)
}
    const name = Cookies.get('username')
    const lastVisit = Cookies.get('last-visit')
    const lastDaytime = Cookies.get('last-daytime')
    alert(`Здравствуйте, ${name}. Последний раз вы посещали эту страницу ${lastVisit}. Это был ${lastDaytime}`)

Cookies.set('last-visit', new Date())
Cookies.set('last-daytime', daytime)

img.src = `images/${daytime}.jpg`

function defineDaytime() {
    let daytime
    const time = new Date().getHours()
    if (time < 6) {
        daytime = 'night'
    } else if (time < 12) {
        daytime = 'morning'
    } else if (time < 18) {
        daytime = 'evening'
    } else {
        daytime = 'night'
    }
    return daytime
}