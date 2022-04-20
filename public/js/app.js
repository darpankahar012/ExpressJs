// console.log('Client side javascript file is loaded!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageSecond = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = "Loading..."
    messageSecond.textContent = ""

    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log("data error", data.error)
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageSecond.textContent = data.forecast
                // console.log("data location", data.location)
                // console.log("data forecast", data.forecast)
            }
        })
    })

    console.log("submit", location)
})