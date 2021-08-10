/**
 * Web App to process Car Rentals for
 * "Dodgey Brakes Car Rental"
 */


let clientArr = [];

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
    searchList(this.value);
})

const searchList = (lName) => {
    console.log(lName)

    // search the client list
    //display matches in the text box
    // once selected enable the next form
}