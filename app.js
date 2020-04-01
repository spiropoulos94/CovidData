
let body = document.getElementById("body");



let statsDiv = document.createElement('div')
statsDiv.id = 'statsDiv'

statsDiv.style = "d-none"
statsDiv.className = "container p-3 mb-2 bg-primary text-white"

body.appendChild(statsDiv)







let submitBtn = document.getElementById('submitBtn')
function getData() {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://api.covid19api.com/summary", requestOptions)
        .then(response => response.json())
        .then(response => response['Countries'])
        .then(countries => {

            let form = document.getElementById('countryname')
            let data = form.value;

            for (let i = 0; i < countries.length; i++) {
                if (data.toUpperCase() === countries[i]['Country'].toUpperCase()) {

                    let country = countries[i]

                    console.log("Country Found")
                    statsDiv.style = "d-block"


                    statsDiv.innerHTML = `<div id="statsDiv">
                    <h3>${ country['Country']}</h3>
                        <ul>
                            <li>Number of New confirmed cases : ${country["NewConfirmed"]}</li>
                            <li>Total Confirmed cases :${country['TotalConfirmed']}</li>
                            <li>New Recorded Deaths : ${country["NewDeaths"]}</li>
                            <li>Total Number of Deaths : ${country['TotalDeaths']}</li>
                            <li>Number of people who recovered recently :${country['NewRecovered']}</li>
                            <li>Total number of people who have successfully recovered : ${country['TotalRecovered']} </li>
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


