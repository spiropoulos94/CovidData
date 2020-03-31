
let body = document.getElementById("body");



let statsDiv = document.createElement('div')
statsDiv.id = 'statsDiv'

statsDiv.style = "d-none"
statsDiv.className = "container p-3 mb-2 bg-primary text-white"

body.appendChild(statsDiv)




let submitBtn = document.getElementById('submitBtn')
function getData() {
    let form = document.getElementById('countryname')
    const data = form.value;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://api.covid19api.com/summary", requestOptions)
        .then(response => response.json())

        .then(result => {
            //JSONResponse = JSON.parse(result)

            ///isws prepei prwta na valeis ti tha kanei se periptwsh opou den vrei kanena onoma na kanei match gia na anagkastei na ta tsekarei ola

            result["Countries"].forEach(element => {

                if ((element['Country'].toUpperCase()) === data.toUpperCase()) {

                    console.log('ok, country exists, the stats are the following:')
                    console.log(element)

                    let dataObject = element;

                    statsDiv.style = "d-block"
                    statsDiv.innerHTML = `<div id="statsDiv">
                    <h3>${ element['Country']}</h3>
                        <ul>
                            <li>Number of New confirmed cases : ${dataObject["NewConfirmed"]}</li>
                            <li>Total Confirmed cases :${dataObject['TotalConfirmed']}</li>
                            <li>New Recorded Deaths : ${dataObject["NewDeaths"]}</li>
                            <li>Total Number of Deaths : ${dataObject['TotalDeaths']}</li>
                            <li>Number of people who recovered recently :${dataObject['NewRecovered']}</li>
                            <li>Total number of people who have successfully recovered : ${dataObject['TotalRecovered']} </li>
                    </ul>
                    </div>`

                }


            })


        }).catch(error => console.log('error', error));

}


submitBtn.addEventListener("click", () => {



    console.log("event fired the function getData() !")

    getData();



})

//document.getElementById('searchForm').addEventListener('submit', function (e) {
//    search(document.getElementById('searchText'));
//    e.preventDefault();
//}, false);



