console.log(localStorage.getItem('superHeroName'));
let url = "https://superheroapi.com/api.php/3128626267200501/";
function loadDetail(){
    let xhrRequest = new XMLHttpRequest();
    var responseJSON;
    xhrRequest.open('GET', url+'search/'+localStorage.getItem('superHeroName'));
    xhrRequest.send();
    xhrRequest.onload = function(event){
        responseJSON = JSON.parse(xhrRequest.response);
        render(responseJSON);
    }
}
let detailsContainer = document.querySelector('.container');
function render(responseJSON){
    let details = responseJSON.results[0];
    console.log(details.powerstats.combat == 'null');
        let detailBox = `<div class="logo-container">
                        <img src=${details.image.url} alt=""  class="logo">
                        </div>
                        <div class="details">
                            <div class="name">${details.name}</div>
                            <table class="table">
                                <caption>Powerstats</caption>
                                <tr> <th>Combat</th> <td>${details.powerstats.combat === 'null' ? Math.floor(Math.random() * 100): details.powerstats.combat}</td> </tr>
                                <tr> <th>Durability</th> <td>${details.powerstats.durability === 'null' ? Math.floor(Math.random() * 100): details.powerstats.durability }</td> </tr>
                                <tr> <th>Intelligence</th> <td>${details.powerstats.intelligence === 'null' ? Math.floor(Math.random() * 100): details.powerstats.intelligence }</td> </tr>
                                <tr> <th>Power</th> <td>${details.powerstats.power === 'null' ? Math.floor(Math.random() * 100): details.powerstats.power}</td> </tr>
                                <tr> <th>Speed</th> <td>${details.powerstats.speed === 'null' ? Math.floor(Math.random() * 100): details.powerstats.speed }</td> </tr>
                                <tr> <th>Strength</th> <td>${details.powerstats.strength === 'null' ? Math.floor(Math.random() * 100): details.powerstats.strength}</td> </tr>
                            </table>
                        </div>`;
    detailsContainer.innerHTML = detailBox;
}

loadDetail();