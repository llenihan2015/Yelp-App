loginbtn.addEventListener('click' , login);
logoutbtn.addEventListener('click', logout);
searchbtn.addEventListener('click', search);
gpsbtn.addEventListener('click', gps);
hometab.addEventListener('click', login);

//show navbar and the elements of the home when logged in
function login(){
    navi.classList.remove('hide');
    loginbtn.classList.add('hide')
    appName.classList.add('hide');
    studname.classList.add('hide');
    homeName.classList.remove('hide');
    logoutbtn.classList.remove('hide');
    resulttab.classList.remove('active');
    favetab.classList.remove('active');
    resultdiv.classList.add('hide');
    resultpage.classList.add('hide');
    backbtn.classList.add('hide');
    mapArea.classList.add('hide');
    favelist.classList.add('hide');
    resname.value = "";
    locationname.value ="";
    document.body.style.height = '600px';
}

 //hide elements of the home tab
function logout(){
    navi.classList.add('hide');
    loginbtn.classList.remove('hide')
    appName.classList.remove('hide');
    studname.classList.remove('hide');
    homeName.classList.add('hide'); 
    logoutbtn.classList.add('hide');
    backbtn.classList.add('hide');
    mapArea.classList.add('hide');
    favelist.classList.add('hide');
    mapArea.innerHTML =" ";
    resultpage.innerHTML =" ";
    resultdiv.innerHTML=" ";
    resname.value = "";
    locationname.value ="";
}

function search(){

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        console.log(this.responseText);
        var data = JSON.parse(this.responseText)
        resultdiv.classList.remove('hide');
        display(data);
    }
    });
    xhr.open("GET", "https://api.yelp.com/v3/businesses/search?term="+resname.value+"&location="+locationname.value);
    xhr.setRequestHeader("Authorization", "Bearer GwlxjEcOFdrbZeohh6vRfDOZKBkLIx10cobFqOyHbXjTSxiPg5Ucys6KLIndZxuaJln3MPHgCtlRCAgXufwjv9eKPwmMmDlW660rEu31Kd8dYP8zNtXmpcSZW4HRX3Yx");
    xhr.send();
}

function gps(){
    navigator.geolocation.getCurrentPosition(position => {
        var long = position.coords.longitude;
        var lati = position.coords.latitude;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        console.log(this.responseText);
        var data = JSON.parse(this.responseText)
        resultdiv.classList.remove('hide');
        display(data);
    }
    });

    xhr.open("GET", "https://api.yelp.com/v3/businesses/search?term="+resname.value+"&latitude="+lati+"&longitude="+long);
    xhr.setRequestHeader("Authorization", "Bearer GwlxjEcOFdrbZeohh6vRfDOZKBkLIx10cobFqOyHbXjTSxiPg5Ucys6KLIndZxuaJln3MPHgCtlRCAgXufwjv9eKPwmMmDlW660rEu31Kd8dYP8zNtXmpcSZW4HRX3Yx");
    xhr.send();
});
}

function display(data){
    document.body.style.height = '1190px';
    resultdiv.classList.remove('hide');
    resulttab.classList.add('active');
    homeName.classList.add('hide');
    hometab.classList.remove('active');
    favetab.classList.remove('active');
    resultdiv.innerHTML=" ";

    var table = document.createElement('TABLE');
    table.style.margin = "auto";

    var tbody = document.createElement('TBODY');
    tbody.style.fontFamily ="Fredoka One";
    tbody.style.fontSize = "12px";
    tbody.style.textAlign = "center";
    //tbody.style.width = "300px"
    
    table.appendChild(tbody);

        for (let i=0; i<10; i++){

            let store_is = "Closed";
            if (data.businesses[i].is_closed == false){
                store_is = "Open";
            }
            
            let tr = document.createElement('TR');
            let td1 = document.createElement('TD');
            let td2 = document.createElement('TD');
            let td3 = document.createElement('TD');
            let td4 = document.createElement('TD');

            let img = document.createElement("img");
            img.src = data.businesses[i].image_url;
            img.style.width = "100px";
            img.style.height="100px";

            let btn = document.createElement('button');
            btn.innerHTML = "<i class='fas fa-angle-double-right' style='color:#7E3131;'></i>";
            btn.style.borderRadius="8px";
            btn.style.backgroundColor="#F0B27A";
            btn.style.borderColor="#F0B27A";
            btn.style.marginLeft="5px;"
            btn.id = data.businesses[i].id;

            td1.appendChild(img);
            td2.appendChild(document.createTextNode(data.businesses[i].name));
            td3.appendChild(document.createTextNode(store_is));
            td4.appendChild(btn);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tbody.appendChild(tr);

            btn.addEventListener("click" , function(){
                let id;
                switch(btn.id){
                    case data.businesses[0].id:
                        id = data.businesses[0].id;
                        break;
                    case data.businesses[1].id:
                        id = data.businesses[1].id;
                        break;
                    case data.businesses[2].id:
                        id = data.businesses[2].id;
                        break;
                    case data.businesses[3].id:
                        id = data.businesses[3].id;
                        break;
                    case data.businesses[4].id:
                        id = data.businesses[4].id;
                        break;
                    case data.businesses[5].id:
                        id = data.businesses[5].id;
                        break;
                    case data.businesses[6].id:
                        id = data.businesses[6].id;
                        break;
                    case data.businesses[7].id:
                        id = data.businesses[7].id;
                        break;
                    case data.businesses[8].id:
                        id = data.businesses[8].id;
                        break;
                    case data.businesses[9].id:
                        id = data.businesses[9].id;
                        break;
                    default:
                        alert("Error Sorry");
                }
                businessId(id);
            });
    }
    resultdiv.appendChild(table);
}
