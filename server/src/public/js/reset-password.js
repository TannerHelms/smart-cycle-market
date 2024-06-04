const messageTag = document.getElementById('message')
const form = document.getElementById('form')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirm-password')
form.style.display = 'none'


let token, id;

window.addEventListener('DOMContentLoaded', async () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => {
            return searchParams.get(prop)
        }
    })
    token = params.token;
    id = params.id;
    const res = await fetch('/auth/verify-password-reset-token', {
        method: 'POST',
        body: JSON.stringify({ token, id }),
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
    if (!res.ok) {
        const { message } = await res.json()
        messageTag.innerText = message
        messageTag.classList.add('error')
        return;
    }
    message.style.display = 'none'
    form.style.display = 'block'
})

const displayNotification = (message, type) => {
    const notification = document.getElementById('notification')
    notification.innerText = message
    notification.style.display = 'block'
    notification.classList.add(type)
}

const handleSubmit = async (event) => {
    event.preventDefault()
    if (!password.value.trim()) {
        return displayNotification('Password is missing', 'error')
    }
    if (!confirmPassword.value.trim()) {
        return displayNotification('Confirm password is missing', 'error')
    }
    if (password.value !== confirmPassword.value) {
        return displayNotification('Passwords do not match', 'error')
    }

    const submitBtn = document.getElementById('submit')
    submitBtn.disabled = true
    submitBtn.innerText = 'Please wait..'
    const resp = await fetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
            id,
            token,
            password: password.value,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })

    submitBtn.disabled = false
    submitBtn.innerText = 'Update Password'

    if (!resp.ok) {
        const { message } = await resp.json()
        return displayNotification(message, 'error')
    }
    messageTag.style.display = 'block'
    messageTag.innerText = 'Password reset successful'
    form.style.display = 'none'
}

form.addEventListener('submit', handleSubmit)



