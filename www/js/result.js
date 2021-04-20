resulttab.addEventListener('click', clickresult);
backbtn.addEventListener('click', goback);

function clickresult(){
    hometab.classList.remove('active');
    homeName.classList.add('hide');
    resultdiv.classList.add('hide');
    resultpage.classList.remove('hide');
    backbtn.classList.remove('hide');
    mapArea.classList.remove('hide');
    favelist.classList.add('hide');
}

function businessId(id){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        console.log(this.responseText);
        let result = JSON.parse(this.responseText)
        displayResult(result);
    }
    });
    xhr.open("GET", "https://api.yelp.com/v3/businesses/"+id);
    xhr.setRequestHeader("Authorization", "Bearer GwlxjEcOFdrbZeohh6vRfDOZKBkLIx10cobFqOyHbXjTSxiPg5Ucys6KLIndZxuaJln3MPHgCtlRCAgXufwjv9eKPwmMmDlW660rEu31Kd8dYP8zNtXmpcSZW4HRX3Yx");
    xhr.send();
}

function displayResult(result){
    resultpage.innerHTML=" ";
    document.body.style.height = '915px';
    hometab.classList.remove('active');
    favetab.classList.remove('active');
    homeName.classList.add('hide');
    resultdiv.classList.add('hide');
    resultpage.classList.remove('hide');
    backbtn.classList.remove('hide');
    favelist.classList.add('hide');
    mapArea.classList.remove('hide');
   

    let store_is = "Closed";
            if (result.is_closed == false){
                store_is = "Open";
            }
    let claimed = "Claimed (✓)";
            if (result.is_claimed == false){
                claimed = "Unclaimed (✗)";
            }

    let addfave = document.createElement('button');
    addfave.innerHTML = "<i class='fas fa-heart' style='color:white; font-size: 18px;'></i>";
    addfave.style.backgroundColor="transparent";
    addfave.style.border="0";
    addfave.style.float="right";
    addfave.style.marginRight="5px";
    addfave.style.marginBottom="0";
    addfave.id = result.id;
    faveId = addfave.id;

    let restoName = document.createElement('h2');
    restoName.style.fontFamily="Nunito";
    restoName.style.color="#DAA500";
    restoName.style.textAlign="center";
    
    restoName.appendChild(document.createTextNode(result.name));
    faveName = result.name;
    
    let hr = document.createElement('hr');
    hr.style.border="1px solid white";
    hr.style.marginLeft="15px";

    let titleInfo = document.createElement('h6');
    titleInfo.style.fontFamily ="Nunito";
    titleInfo.style.fontWeight="bold";
    titleInfo.style.color="white";
    titleInfo.style.textAlign="center";
    titleInfo.appendChild(document.createTextNode(
             result.price + " • " + result.categories[0].title + ", " + result.categories[1].title));

    let otherInfo = document.createElement('h6');
    otherInfo.style.fontFamily ="Nunito";
    otherInfo.style.fontWeight="bold";
    otherInfo.style.color="white";
    otherInfo.style.textAlign="center";
    otherInfo.appendChild(document.createTextNode(
        store_is +" "+ " • " + " Rating: " + result.rating +" " + " • " + " Reviews: " + result.review_count));
    
    let if_claimed = document.createElement('p');
    if_claimed.style.fontFamily ="Nunito";
    if_claimed.style.fontSize = "10px";
    if_claimed.style.color="white";
    if_claimed.style.textAlign="left";
    if_claimed.style.marginLeft="15px";
    if_claimed.appendChild(document.createTextNode(claimed))
    
    let phoneNum = document.createElement('p');
    phoneNum.style.fontFamily ="Nunito";
    phoneNum.style.fontSize = "10px";
    phoneNum.style.color="white";
    phoneNum.style.textAlign="left";
    phoneNum.style.paddingLeft="2px";
    phoneNum.style.marginLeft="15px";
    phoneNum.appendChild(document.createTextNode("Phone Number: "+result.display_phone));

    let hour = document.createElement('p');
    hour.style.fontFamily ="Nunito";
    hour.style.fontSize = "10px";
    hour.style.color="white";
    hour.style.textAlign="left";
    hour.style.paddingLeft="2px";
    hour.style.marginLeft="15px";
    hour.appendChild(document.createTextNode("Operating Hours: "));

    let table = document.createElement('TABLE');
    table.style.margin = "auto";

    let tbody = document.createElement('TBODY');
    tbody.style.fontFamily ="Nunito";
    tbody.style.fontSize = "10px";
    tbody.style.color="white";
    tbody.style.textAlign = "center";

    table.appendChild(tbody);

    for(let i=0; i<7; i++){
        let day="";
            if(result.hours[0].open[i].day == "0"){
                day = "Monday";
            }
            else if(result.hours[0].open[i].day == "1"){
                day = "Tuesday";
            }
            else if(result.hours[0].open[i].day == "2"){
                day = "Wednesday";
            }
            else if(result.hours[0].open[i].day == "3"){
                day = "Thursday";
            }
            else if(result.hours[0].open[i].day == "4"){
                day = "Friday";
            }
            else if(result.hours[0].open[i].day == "5"){
                day = "Saturday";
            }
            else if(result.hours[0].open[i].day == "6"){
                day = "Sunday";
            }
            else{
                day ="Error getting day";
            }
        let startTime= result.hours[0].open[i].start;
        let endTime =  result.hours[0].open[i].end;
        let tr = document.createElement('TR');
        let td1 = document.createElement('TD');
        let td2 = document.createElement('TD');
        td1.appendChild(document.createTextNode(day));
        td2.appendChild(document.createTextNode( getFormattedTime(startTime) + " - " + getFormattedTime(endTime)));
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.append(tr);
    }

    let addy = document.createElement('p');
    addy.style.fontFamily ="Nunito";
    addy.style.fontSize = "10px";
    addy.style.color="white";
    addy.style.textAlign="center";
    addy.style.paddingLeft="2px";
    addy.style.marginLeft="15px";
    addy.appendChild(document.createTextNode("Address: " + result.location.display_address[0] + " " 
                    + result.location.display_address[1]));

    resultpage.appendChild(addfave);
    resultpage.appendChild(restoName);
    resultpage.appendChild(hr);
    resultpage.appendChild(titleInfo);
    resultpage.appendChild(otherInfo);
    resultpage.appendChild(phoneNum);
    resultpage.appendChild(if_claimed);
    resultpage.appendChild(table);
    resultpage.appendChild(addy);

    displayMap(result);
    addfave.addEventListener('click', function clickfavebtn(){
        addtolist(faveName);
    });
}

function getFormattedTime(fourDigitTime){
    var hours24 = parseInt(fourDigitTime.substring(0,2));
    var hours = ((hours24 + 11) % 12) + 1;
    var amPm = hours24 > 11 ? 'pm' : 'am';
    var minutes = fourDigitTime.substring(2);
    return hours + ':' + minutes + amPm;
};

function displayMap(result){
    mapArea.classList.remove('hide');
    let lat = result.coordinates.latitude;
    let long = result.coordinates.longitude;
    //Google Maps
    var myLatlng = new google.maps.LatLng(lat, long);
    var mapOptions = {
    zoom: 15,
    center: myLatlng
    }
    let maptry = document.getElementById('map-content').innerHTML="HELLO";
    const map = new google.maps.Map(document.getElementById('map-content'), mapOptions);
    const marker = new google.maps.Marker({
    position: myLatlng,
    map: map
    }) 
}
function goback(){
    document.body.style.height = '1190px';
    resultdiv.classList.remove('hide');
    homeName.classList.add('hide');
    resultpage.classList.add('hide');
    resulttab.classList.add('active');
    hometab.classList.remove('active');
    backbtn.classList.add('hide');
    mapArea.classList.add('hide');
}

