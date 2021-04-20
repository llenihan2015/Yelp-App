favetab.addEventListener('click', fave);

function fave(){
    hometab.classList.remove('active');
    homeName.classList.add('hide');
    resultdiv.classList.add('hide');
    resultpage.classList.add('hide');
    backbtn.classList.add("hide");
    mapArea.classList.add('hide');
    favelist.classList.remove('hide');
}

function addtolist(faveName){
    hometab.classList.remove('active');
    resulttab.classList.remove('active');
    favetab.classList.add('active');
    homeName.classList.add('hide');
    resultdiv.classList.add('hide');
    resultpage.classList.add('hide');
    backbtn.classList.add("hide");
    mapArea.classList.add('hide');
    favelist.classList.remove('hide');


    var database= firebase.database();
    var ref = database.ref('Favorites');

    var insertInfo = {
        name: faveName
    }
        ref.push(insertInfo);  
        ref.on("value", function(snapshot){
            favediv.innerHTML=" ";
            snapshot.forEach(function(childSnapshot){
                
                var data = childSnapshot.val();

                var table = document.createElement('TABLE');
                table.style.margin = "auto";
                var tbody = document.createElement('TBODY');
                table.appendChild(tbody);

                let info = document.createElement('p');
                info.style.fontFamily = "Nunito";
                info.style.fontSize = "14px";
                info.style.fontWeight="100";
                info.style.color="#DAA500";
                info.style.textAlign="center";
                info.appendChild(document.createTextNode(data.name));

                let tr = document.createElement('TR');
                let td1 = document.createElement('TD');
                let td2 = document.createElement('TD');

                let btn = document.createElement('button');
                btn.innerHTML = "<i class='fas fa-trash' style='color:white; font-size: 10px;'></i>";
                btn.style.backgroundColor="transparent";
                btn.style.border="0";
                btn.style.margin="0";
                btn.style.float="right";

                btn.addEventListener("click", function(){
                    ref.remove();
                })

                td1.appendChild(info);
                td2.appendChild(btn);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tbody.appendChild(tr);
                favediv.appendChild(table);
        })
    
    })

    

}

