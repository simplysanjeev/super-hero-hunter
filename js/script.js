//Auto Complete functionality
let superHeros = [];
let favouritesListString = localStorage.getItem('favouritesList');
let favouritesList = favouritesListString == null ? [] : JSON.parse(favouritesListString);
//Filling the superher array
let url = "https://superheroapi.com/api.php/3128626267200501/";
loadSuperHeroList();
function loadSuperHeroList(){
    // localStorage.clear('superHeros');
    if(localStorage.getItem('superHeros') == null){
        console.log('Inside If');
        let promise = new Promise((resolve, reject) => {
            let i = 1;
            for(i = 1; i <= 733; i++){
                fetchSuperHero(url+i, i);
            }
                let time = 1000 * 60;
               setTimeout(() => {
                console.log('Set Time Out');   
                resolve();}, time);
        });
        promise.then(()=>{
            localStorage.setItem('superHeros', JSON.stringify(superHeros));
        });
        
    }else{
        superHeros = JSON.parse(localStorage.getItem('superHeros'));
    }
}



//loading details about super Heros
function fetchSuperHero(url, i){
        let xhrRequest = new XMLHttpRequest();
        var responseJSON;
        xhrRequest.open('GET', url);
        xhrRequest.send();
        xhrRequest.onload = function(event){
            responseJSON = JSON.parse(xhrRequest.response);
            superHeros.push(responseJSON.name);
        }
}


function createListItem(url){
    let li = document.createElement('li');
    li.setAttribute('class', 'super-hero');
    let divSuperHeroLogoContainer = document.createElement('div');
    divSuperHeroLogoContainer.setAttribute('class', 'super-hero-logo-container');
    let img = document.createElement('img');
    img.setAttribute('src',  '');
}

//autocomplte feature
function autocomplete(searchBar, superHeros){
    var currentFocus;
    searchBar.addEventListener('input', function(event){
        closeAllLists();
        if(!this.value){
            return false;
        }
        var div = document.createElement('div');
        div.setAttribute('id', this.id + "autocomplete-list");
        div.setAttribute('class', "autocomplete-items");
        this.parentNode.appendChild(div);
        let inputString = this.value;
        for(let i = 0; i < superHeros.length; i++){
            if(superHeros[i].substr(0, inputString.length).toUpperCase() == inputString.toUpperCase()){
                let listItem = document.createElement('div');
                listItem.innerHTML = "<strong>" + superHeros[i].substr(0, inputString.length)+"</strong>";
                listItem.innerHTML += superHeros[i].substr(inputString.length);
                listItem.innerHTML += "<input type='hidden' value='" + superHeros[i] + "'>";
                listItem.addEventListener('click', function(event){
                    searchBar.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                div.appendChild(listItem);
            }
        }
    });

    searchBar.addEventListener('keydown', function(event){
        let listItem = document.getElementById(this.id + "autocomplete-list");
        if(listItem){
            listItem = listItem.getElementsByTagName('div');
            if(event.keyCode == 40){
                currentFocus++;
                addActive(listItem);
            }else if(event.keyCode == 13){
                event.preventDefault();
                if(currentFocus > -1){
                    if(listItem){
                        listItem[currentFocus].click();
                    }
                }
            }
        }
    });

    function addActive(listItem){
        if(!listItem){
            return false;
        }
        removeActive(listItem);
        if(currentFocus >= listItem.length){
            currentFocus = 0;
        }
        if(currentFocus < 0){
            currentFocus = (listItem.length - 1);
        }
        listItem[currentFocus].classList.add('autocomplete-active');
    }

    function removeActive(list){
        for(let i = 0; i < list.length; i++){
            list[i].classList.remove('autocomplete-active');
        }
    }

    function closeAllLists(element){
        var list = document.getElementsByClassName('autocomplete-items');
        for(let i = 0; i < list.length; i++){
            if(element != list[i] && element != searchBar){
                list[i].parentNode.removeChild(list[i]);
            }
        }
    }

    document.addEventListener('click', function(event){
        closeAllLists(event.target);
    });

}

autocomplete(document.querySelector('.search-bar'), superHeros);


//search button
let searchButton = document.querySelector('.search-button');
let searchBar = document.querySelector('.search-bar');
searchButton.addEventListener('click', function(event){
    let xhrRequest = new XMLHttpRequest();
    var responseJSON;
    xhrRequest.open('GET', url+'search/'+searchBar.value);
    xhrRequest.send();
    xhrRequest.onload = function(event){
        responseJSON = JSON.parse(xhrRequest.response);
        render(responseJSON);
    }
});


let mainSection = document.querySelector('.list');
function render(responseJSON){
    mainSection.innerHTML = "";
    let list = responseJSON.results;
    for(let item of list){
        let index = favouritesList.indexOf(item.name);
        let li =  `<li class="list-item">
                        <div class="logo-container">
                            <img src=${item.image.url} alt="" class="super-hero-logo">
                        </div>
                        <div class="details-container">
                            <div class="name">${item.name}</div>
                            <a class=${index == -1 ? "add-to-favourites" : "remove-from-favourites"}>
                                ${index == -1 ? "Add To Favourites" : "Remove From Favourites"}    
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
        console.log(listItem);
        let detailBox = listItem.childNodes[3].childNodes;
        let addToFavouritesButton = detailBox[3];
        let showDetailsButton = detailBox[5];
        console.log(detailBox[3].classList[0]);
        addToFavouritesButton.addEventListener('click', function(event){
            favouritesListString = localStorage.getItem('favouritesList');
            favouritesList = favouritesListString == null ? [] : JSON.parse(favouritesListString);
            if(detailBox[3].classList[0] == "remove-from-favourites"){
                const index = favouritesList.indexOf(detailBox[1].innerHTML);
                if(index != -1){
                    favouritesList = favouritesList.splice(index, 1);
                    localStorage.setItem('favouritesList', JSON.stringify(favouritesList));
                    addToFavouritesButton.innerHTML = `Add To Favourites <i class="far fa-heart" aria-hidden="true"></i>`;
                    addToFavouritesButton.classList.remove("remove-from-favourites");
                    addToFavouritesButton.classList.add("add-to-favourites");
                }
            }else{
                favouritesList.push(detailBox[1].innerHTML);
                localStorage.setItem('favouritesList', JSON.stringify(favouritesList));
                addToFavouritesButton.innerHTML = `Remove From Favourites <i class="far fa-heart" aria-hidden="true"></i>`;
                addToFavouritesButton.classList.remove("add-to-favourites");
                addToFavouritesButton.classList.add("remove-from-favourites");
            }
            // if(favouritesListString == null){
            //     favouritesList.push(detailBox[1].innerHTML);
            //     localStorage.setItem('favouritesList', JSON.stringify(favouritesList));
            // }else{
            //     favouritesList = JSON.parse(localStorage.getItem('favouritesList'));
            //     favouritesList.push(detailBox[1].innerHTML);
            //     localStorage.setItem('favouritesList', JSON.stringify(favouritesList));
            // }
        })
        showDetailsButton.addEventListener('click', function(){
            console.log('show details');
            localStorage.setItem('superHeroName', detailBox[1].innerHTML);
        });
        console.log(detailBox);
    }
}

