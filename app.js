
let body = document.getElementById("body");


let submitBtn = document.getElementById('submitBtn')

function getData() {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://api.covid19api.com/summary", requestOptions)
        .then(response => response.json())

        .then(result => {
            //JSONResponse = JSON.parse(result)
            let form = document.getElementById('countryname')
            let data = form.value;

            result["Countries"].forEach(element => {



                if (((element['Country'].toUpperCase())) === data.toUpperCase()) {



                    console.log('ok, country exists, the stats are the following:')
                    console.log(element)

                    let statsDiv = document.createElement('div')
                    statsDiv.id = 'statsDiv'
                    body.appendChild(statsDiv)

                    let countryHeader = document.createElement('h3')
                    countryHeader.innerHTML = element['Country']
                    statsDiv.appendChild(countryHeader)

                    let dataList = document.createElement("ul")

                    let dataObject = element


                    let newConfirmed = document.createElement('li')
                    newConfirmed.innerHTML = `Number of New confirmed cases : ${dataObject["NewConfirmed"]}`
                    dataList.appendChild(newConfirmed)

                    let totalConfirmed = document.createElement('li')
                    totalConfirmed.innerHTML = `Total Confirmed cases : ${dataObject['TotalConfirmed']}`
                    dataList.appendChild(totalConfirmed)

                    let newDeaths = document.createElement('li')
                    newDeaths.innerHTML = `New Recorded Deaths : ${dataObject["NewDeaths"]}`
                    dataList.appendChild(newDeaths)

                    let totalDeaths = document.createElement('li')
                    totalDeaths.innerHTML = `Total Number of Deaths : ${dataObject['TotalDeaths']}`
                    dataList.appendChild(totalDeaths)

                    let newRecovered = document.createElement('li')
                    newRecovered.innerHTML = `Number of people who recovered recently :${dataObject['NewRecovered']}`
                    dataList.appendChild(newRecovered)

                    let totalRecovered = document.createElement('li')
                    totalRecovered.innerHTML = `Total number of people who have successfully recovered : ${dataObject['TotalRecovered']} `
                    dataList.appendChild(totalRecovered)

                    statsDiv.appendChild(dataList)







                }



            })
            let warning = document.createElement('h5')
            warning.innerHTML = "Country not found!"
            body.appendChild(warning)
            console.log(warning)

        })

        .catch(error => console.log('error', error));

}


submitBtn.addEventListener("click", () => {



    console.log("event fired the function getData() !")

    getData();



})

document.getElementById('searchForm').addEventListener('submit', function (e) {
    search(document.getElementById('searchText'));
    e.preventDefault();
}, false);

