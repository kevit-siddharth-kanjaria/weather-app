 console.log("client js");

 const weatherForm = document.querySelector('form')
 const search = document.querySelector('input')
 const msgOne = document.querySelector('#msg_1')
 const msgTwo = document.querySelector('#msg_2')
 

 weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value
    
    msgOne.textContent="Loading..."
    msgTwo.textContent=""

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data)=>{
            console.log(data);
            if (data.error) {
                msgOne.textContent=""
                msgTwo.textContent=data.error;
                console.log(data.error);
            } else {
                let forecast = `It is ${data.forecast}, the temperature is ${data.temperature} F and there is ${data.precip}% chance of rain.`
                msgOne.textContent = data.location
                msgTwo.textContent = forecast
            }
        })
     })
 })