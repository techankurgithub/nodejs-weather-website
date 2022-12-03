//const { response } = require("express");

//console.log('client side js file is loaded');

// fetch('http://localhost:3000/weather?address=!').then(response =>  {
//     return response.json();
// }).then(data => {
//     if(data.error){
//         console.log(data.error);
//     } else {
//         console.log(data);
//     }    
// });

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageone = document.querySelector('#message1');
const messagetwo = document.querySelector('#message2');


//messagetwo.textContent = 'from java script 2';

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = searchElement.value;

    messageone.textContent = 'Loading...';
    messagetwo.textContent = '';
    // console.log(location);

    fetch('/weather?address=' + location).then(response =>  {
    return response.json();
}).then(data => {
    if(data.error){
        //console.log(data.error);
        messageone.textContent = data.error;
        
    } else {
        //console.log(data);
        messageone.textContent = data.forecast;
        messagetwo.textContent = data.location;
    }    
});
});