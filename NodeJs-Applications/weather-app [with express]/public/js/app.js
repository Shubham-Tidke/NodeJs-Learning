

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const msgOne = document.querySelector('#msg-1');//paragraph space to store dynamic response from API
const msgTwo = document.querySelector('#msg-2');//paragraph space to store dynamic response from API

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault(); //to avoid browswe refreshing
    const location = search.value;
    msgOne.textContent = 'fetching..';
    msgTwo.textContent = '';
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error;
            } else {

                msgOne.textContent = data.forecast;
                msgTwo.textContent = data.location;
                console.log(data.location);
                console.log(data.forecast);

            }
        })
    });
})