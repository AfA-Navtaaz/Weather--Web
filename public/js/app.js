console.log('File on js')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('.message-1')
const messageTwo = document.querySelector('.message-2')



weatherForm.addEventListener('submit',(e)=> {

    e.preventDefault()
    const loaction = search.value
    
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+loaction+'&appid=14dded59c340c00b788bb6ebc54e6b34&units=metric#').then((response)=>{

    response.json().then((data) => {
    if(data.message){
        messageOne.textContent = data.message
    }
    else{
        messageOne.textContent = data.name
        messageTwo.textContent = data.main.temp
    }
})
})

})