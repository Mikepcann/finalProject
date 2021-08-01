window.onload = function() {
    document.getElementById('shortTermRentalDisplay').addEventListener('click', function() {
        loadXML('./forms/shortTermRentalForm.html')
    });


    document.getElementById('secondarySuiteDisplay').addEventListener('click', function() {
        loadXML('./forms/secondarySuitesForm.html')
    });

    document.getElementById('communityCrimeDisplay').addEventListener('click', function() {
        loadXML('./forms/communityCrimeStatsForm.html')
    })
    document.getElementById('publicArtDisplay').addEventListener('click', function() {
        loadXML('./forms/publicArtForm.html')
    })
}

// Loads the XML onto the page
function loadXML(fileAddress) {
    document.getElementById('searchForm').scrollIntoView({ behavior: 'smooth' });
    let xhr = new XMLHttpRequest();
    xhr.open('Get', fileAddress, true);
    xhr.onload = function() {
        document.getElementById('searchForm').innerHTML = this.responseText;
    }
    xhr.send();
}