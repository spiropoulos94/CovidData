let body = document.getElementById("body");

let options = document.getElementById("country-select")

let statsDiv = document.createElement('div')
statsDiv.id = 'statsDiv'



statsDiv.style = "d-none"
statsDiv.className = "container p-3 mb-2 bg-primary text-white"

body.appendChild(statsDiv)

let submitBtn = document.getElementById('submitBtn')

let selectedCountry = document.getElementById('country-select')

let allCountriesNames = []


// this function takes all the countries names and adds it to be used as the autocomplete values

function getNames() {
    fetch("https://api.covid19api.com/summary")
        .then(response => response.json())
        .then(countries => countries['Countries'])
        .then(countries => countries.forEach(country => allCountriesNames.push(country)))
        .then(names => {
            for (let i = 0; i < allCountriesNames.length; i++) {
                options.innerHTML += ` <option value=${allCountriesNames[i]['Slug']}>${allCountriesNames[i]['Country']}</option>`
            }
        })



}


getNames();



//this function retrieves the summary data.

function getData() {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://api.covid19api.com/summary", requestOptions)
        .then(response => response.json())
        .then(response => response['Countries'])
        .then(countries => {

            //let form = document.getElementById('countryname')
            let data = selectedCountry.value;

            for (let i = 0; i < countries.length; i++) {
                if (data.toUpperCase() === countries[i]['Slug'].toUpperCase()) {


                    let country = countries[i]


                    console.log("Country Found")
                    statsDiv.style = "d-block"


                    statsDiv.innerHTML = `<div id="statsDiv">
                    <h3>${ country['Country']}</h3>
                        <ul>
                            <li>Number of New confirmed cases : <b>${country["NewConfirmed"]}</b></li>
                            <li>Total Confirmed cases : <b>${country['TotalConfirmed']}</b></li>
                            <li>New Recorded Deaths : <b>${country["NewDeaths"]}</b></li>
                            <li>Total Number of Deaths : <b>${country['TotalDeaths']}</b></li>
                            <li>Number of people who recovered recently : <b>${country['NewRecovered']}</b></li>
                            <li>Total number of people who have successfully recovered : <b>${country['TotalRecovered']}</b> </li>
                    </ul>
                    </div>`
                    break;


                }
                else {
                    console.log("country not found")
                    statsDiv.innerHTML = `<h3>Country not found!</h3>`
                }

            }
        })




        .catch(error => console.log('error', error));

}


submitBtn.addEventListener("click", () => {



    console.log("event fired the function getData() !")


    getData();



})


