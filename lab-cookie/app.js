const form = document.getElementById('form')
const form2 = document.getElementById('form2')
const notifyEl = document.querySelector('.notification')
const secretData = document.querySelector('.block2__secret-data')

form.addEventListener('submit', e => {
    e.preventDefault()
    const formData = new FormData(form)
    for (const key of formData.keys()) {
        console.log(key, '-', formData.get(key));  
        Cookies.set(key, formData.get(key).trim(), {
            expires: 2,
        })
    }
    form.reset()
})

form2.addEventListener('submit', e => {
    e.preventDefault()
    const formData = new FormData(form2)
    const secretText = formData.get('secret').trim()
    const realSecret = Cookies.get('secret')

    if (secretText === realSecret) {
        notify(
            notifyEl,
            'Success',
            'success',
        )
        secretData.innerHTML = `
            <span>
                Login - ${Cookies.get('login')}
            </span>
            <span>
                Password - ${Cookies.get('password')}
            </span>
            <span>
                Secret - ${realSecret}
            </span>
        `
    } else {
        notify(
            notifyEl,
            'Not equal',
            'danger',
        )
    }
})

const notify = (el, text, type) => {
    el.textContent = text
    let typeClass
    switch (type) {
        case 'danger':
            typeClass = 'danger'
            break;
        case 'success':
            typeClass = 'success'
            break;
        default:
            return
    }
    el.classList.add(typeClass, 'active')
    setTimeout(() => {
        el.classList.remove(typeClass, 'active')
    }, 2000);
}