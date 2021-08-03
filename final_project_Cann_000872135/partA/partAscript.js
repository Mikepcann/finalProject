//store all of the forms/api links in an array of OBJ for easy access
let formsList = [{
        id: 'shortTermRental',
        searchForm: './forms/shortTermRentalForm.html',
        searchID: [{
                elementId: 'addressSTR',
                isText: true
            }, {
                elementId: 'businessLicenceNumberSTR',
                isText: false
            },
            {
                elementId: 'licenseTypeSTR',
                isText: true
            }, {
                elementId: 'typeOfResidenceSTR',
                isText: true
            }
        ],
        api: 'https://data.calgary.ca/resource/gzkz-5k9a.json'
    },
    {
        id: 'secondarySuite',
        searchForm: './forms/secondarySuitesForm.html',
        searchID: [{
                elementId: 'addressSS',
                isText: true
            }, {
                elementId: 'communitySS',
                isText: true
            },
            {
                elementId: 'stickerNumberSS',
                isText: false
            },
            {
                elementId: 'wardSS',
                isText: false
            }
        ],
        api: 'https://data.calgary.ca/resource/jwn6-r58y.json'
    },
    {
        id: 'communityCrimeStats',
        searchForm: './forms/communityCrimeStatsForm.html',
        searchID: [{
                elementId: 'categoryCCS',
                isText: true
            }, {
                elementId: 'communityCCS',
                isText: true
            },
            {
                elementId: 'sectorCCS',
                isText: true
            }, {
                elementId: 'yearCCS',
                isText: false
            }
        ],
        api: 'https://data.calgary.ca/resource/78gh-n26t.json'
    },
    {
        id: 'publicArt',
        searchForm: './forms/publicArtForm.html',
        searchID: [{
                elementId: 'addressPA',
                isText: true
            }, {
                elementId: 'artistPA',
                isText: true
            },
            {
                elementId: 'tabNamePA',
                isText: true
            }, {
                elementId: 'titlePA',
                isText: true
            }
        ],
        api: 'https://data.calgary.ca/resource/2kp2-hsy7.json'
    }
]
let shortTermJSON = [];
let secondarySuiteJSON = [];
let communityCrimeStatJSON = [];
let publicArtJSON = [];
let currentSearch = '';
/* Event listens added to the buttons  
 in order to load the forms
*/
window.onload = function attachListeners() {
    document.getElementById('shortTermRentalDisplay').addEventListener('click', function() {
        loadXML(formsList[0], assignKeyups);

    });

    document.getElementById('secondarySuiteDisplay').addEventListener('click', function() {
        loadXML(formsList[1], assignKeyups);
    });

    document.getElementById('communityCrimeDisplay').addEventListener('click', function() {
        loadXML(formsList[2], assignKeyups);
    });
    document.getElementById('publicArtDisplay').addEventListener('click', function() {
        loadXML(formsList[3], assignKeyups);
    });
    // load JSON Calls
    loadJSON(formsList[0], shortTermJSON);
    loadJSON(formsList[1], secondarySuiteJSON);
    loadJSON(formsList[2], communityCrimeStatJSON);
    loadJSON(formsList[3], currentSearch);
}

// Loads the XML forms onto the page
function loadXML(fileAddress) {
    document.getElementById('searchForm').scrollIntoView({ behavior: 'smooth' });
    let xhr = new XMLHttpRequest();
    xhr.open('Get', fileAddress.searchForm, true);
    xhr.onload = function() {
        document.getElementById('searchForm').innerHTML = this.responseText;
        // console.log(fileAddress.searchID)
        assignKeyups(fileAddress.id, fileAddress.searchID);
    }
    xhr.send();
}
// load the JSON into the variables
function loadJSON(rawData, storageVar) {
    //console.log(api)
    let xhr = new XMLHttpRequest();
    xhr.open('GET', rawData.api, true);
    xhr.onload = function() {
        switch (rawData.id) {
            case 'shortTermRental':
                shortTermJSON = JSON.parse(xhr.responseText);
                break;
            case 'secondarySuite':
                secondarySuiteJSON = JSON.parse(xhr.responseText);
                break;
            case 'communityCrimeStats':
                communityCrimeStatJSON = JSON.parse(xhr.responseText);
                break;
            case 'publicArt':
                publicArtJSON = JSON.parse(xhr.responseText);
                break;
            default:
                console.error('ERROR LOADING JSON FILE');
                break;
        }
    }
    xhr.send();
}

// add event listeners
function assignKeyups(searchForm, searchID) {
    switch (searchForm) {
        case 'shortTermRental':
            for (i = 0; i < searchID.length; i++) {
                let isText = searchID[i].isText;
                let elementId = searchID[i].elementId;
                document.getElementById(elementId).addEventListener('keyup', function() {
                    isText ? searchString(this.value) : searchNumber(this.value);
                });
            }
            break;
        case 'secondarySuite':
            for (i = 0; i < searchID.length; i++) {
                let isText = searchID[i].isText;
                let elementId = searchID[i].elementId;
                document.getElementById(elementId).addEventListener('keyup', function() {
                    isText ? searchString(this.value) : searchNumber(this.value);
                });
            }
            break;
        case 'communityCrimeStats':
            for (i = 0; i < searchID.length; i++) {
                let isText = searchID[i].isText;
                let elementId = searchID[i].elementId;
                document.getElementById(elementId).addEventListener('keyup', function() {
                    isText ? searchString(this.value) : searchNumber(this.value);
                });
            }
            break;
        case 'publicArt':
            for (i = 0; i < searchID.length; i++) {
                let isText = searchID[i].isText;
                let elementId = searchID[i].elementId;
                document.getElementById(elementId).addEventListener('keyup', function() {
                    isText ? searchString(this.value) : searchNumber(this.value);
                });
            }
            break;
        default:
            console.error('NO MATCH');
    }
}

function searchString(str) {
    console.log('Search String called ' + str)
}

function searchNumber(num) {
    console.log('Search number called ' + num)
}
/**
 * Things to to:
 * 1. figure out which form is loaded => CHECK
 * 2. load the JSON for that form => CHECK
 * 3. add keyup events to the appropriate fields => CHECK
 * 4.  perform search based on the field
 * 5. Display results on page
 * [clear results with each search or change to different dastaset search]
 * */