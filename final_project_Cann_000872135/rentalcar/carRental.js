/**
 * Web App to process Car Rentals for
 * "Dodgey Brakes Car Rental"
 */

// storage for client list
let clientArr = [];
let currentClient = {};

const loadClients = () => {
    //Load JSON
    let xhr = new XMLHttpRequest();
    xhr.open('GET', './rentalclients.json', true);

    xhr.onload = () => {
        clientArr = JSON.parse(xhr.responseText)
    }
    xhr.send();
}

// On page Load, call this method to load all of the 
window.onload = loadClients;

// attach keyUP listener
document.getElementById('lastNameSearch').addEventListener('keyup', function() {
    searchList(this.value)
})


const searchList = (lName) => {
    // clears the list 
    document.getElementById('resultList').innerHTML = '';
    let matches = [];

    //checks the list for a matching name
    clientArr.forEach((item) => {
        if (item.last_name.toLowerCase().startsWith(lName.toLowerCase())) {
            // console.log(item.last_name)
            matches.push(`<li>${item.first_name} ${item.last_name}</l1>`)
        }
    })

    // display the clients in the text box
    matches.forEach((item) => {
        document.getElementById('resultList').innerHTML += item;
    })

    // once selected enable the next form
    let listItems = document.querySelectorAll('li');
    listItems.forEach((item) => {
        item.addEventListener('click', function() {
            findCurrentClientOBJ(item.innerHTML)
            enableForm();
        })
    })


}

// used tio display the num of days for a rental
document.getElementById('rentalDayValue').addEventListener('change', function() {
    displayNum(this.value)
})

function displayNum(days) {
    document.querySelector('.rentalDayDisplay').innerHTML = days;
}
let enableForm = () => {
    document.getElementById('compactSelector').disabled = false;
    document.getElementById('midSizedtSelector').disabled = false;
    document.getElementById('luxurySelector').disabled = false;
    document.getElementById('vanTruckSelector').disabled = false;
    document.getElementById('roofRack').disabled = false;
    document.getElementById('GPS').disabled = false;
    document.getElementById('childSeat').disabled = false;
    document.getElementById('rentalDayValue').disabled = false;
    document.getElementById('finishOrder').disabled = false;

}

// Saves the client info in an global var
function findCurrentClientOBJ(fullName) {
    let full = fullName.split(' ');
    currentClient.fName = full[0];
    currentClient.lName = full[1];
    console.log('Clicked CLient Name: ' + currentClient.fName + ' ' + currentClient.lName)

    for (i = 0; i < clientArr.length; i++) {
        if ((currentClient.fName == clientArr[i].first_name) &&
            (currentClient.lName == clientArr[i].last_name)) {
            currentClient.info = clientArr[i];
        }
    }
}
// when button is clicked, the results will be displayed
function finishOrder() {
    // show the block
    let order = document.querySelector('.order');
    order.style.display = 'block';

    // get values of selectors
    let carType = document.querySelector('input[type="radio"]:checked').value;

    let rentalOptions = document.querySelectorAll('input[type="checkbox"]:checked');
    let pickedOptions = [];

    function load() {
        for (i = 0; i < rentalOptions.length; i++) {
            pickedOptions.push(rentalOptions[i].value)
        }
    };
    load();

    console.log(pickedOptions)
}