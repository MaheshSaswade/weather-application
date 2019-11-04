console.log('Javascript loaded');

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const firstMessage = document.querySelector('#firstMessage')
const secondMessage = document.querySelector('#secondMessage')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value
    console.log(location)
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                firstMessage.textContent = data.error
            } else {
                console.log(data.location)
                firstMessage.textContent = data.location
                console.log(data.forecast)
                secondMessage.textContent = data.forecast
            }
            
        })
    })
})