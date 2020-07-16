let favouritesList = JSON.parse(localStorage.getItem('favouritesList'));
let favouritesObjectList = [];
let url = "https://superheroapi.com/api.php/3128626267200501/search/";
function fetchAllFavourites(){
    for(let item of favouritesList){
        fetchSuperHero(url + item);
    }
}

//loading details about super Heros
function fetchSuperHero(url){
    let xhrRequest = new XMLHttpRequest();
    var responseJSON;
    xhrRequest.open('GET', url);
    xhrRequest.send();
    xhrRequest.onload = function(event){
        responseJSON = JSON.parse(xhrRequest.response);
        favouritesObjectList.push(responseJSON.results[0]);
    }
}
fetchAllFavourites();

let mainSection = document.querySelector('.list');
function render(){
    console.log('render');
    mainSection.innerHTML = "";
    for(let item of favouritesObjectList){
        let li =  `<li class="list-item">
                        <div class="logo-container">
                            <img src=${item.image.url} alt="" class="super-hero-logo">
                        </div>
                        <div class="details-container">
                            <div class="name">${item.name}</div>
                            <a href="./favourites.html" class="remove-from-favourites">
                                Remove From Favourites    
                            <i class="far fa-heart"></i>
                            </a>
                            <a href="./details.html" class="details">
                                Details 
                            </a>
                        </div>
                    </li>`;
        mainSection.insertAdjacentHTML('beforeend', li);
    }
    addEventListenerToButtons();
}

function addEventListenerToButtons(){
    let list = mainSection.childNodes;
    console.log(list);
    for(let listItem of list){
        let detailBox = listItem.childNodes[3].childNodes;
        let addToFavouritesButton = detailBox[3];
        let showDetailsButton = detailBox[5];
        addToFavouritesButton.addEventListener('click', function(event){
            const index = favouritesList.indexOf(detailBox[1].innerHTML);
            console.log(index);
            favouritesList.splice(index, 1)
            localStorage.setItem('favouritesList', JSON.stringify(favouritesList));
        });
            // if(favouritesListString == null){
            //     favouritesList.push(detailBox[1].innerHTML);
            //     localStorage.setItem('favouritesList', JSON.stringify(favouritesList));
            // }else{
            //     favouritesList = JSON.parse(localStorage.getItem('favouritesList'));
            //     favouritesList.push(detailBox[1].innerHTML);
            //     localStorage.setItem('favouritesList', JSON.stringify(favouritesList));
            // }
        showDetailsButton.addEventListener('click', function(){
            console.log('show details');
            localStorage.setItem('superHeroName', detailBox[1].innerHTML);
        });
        console.log(detailBox);
    }
}

setTimeout(render, 2000);