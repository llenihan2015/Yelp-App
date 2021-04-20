//navigation menu 

const tabs = document.querySelectorAll('.tab');

tabs.forEach(clickedTab =>{
    //Add onClick event
    clickedTab.addEventListener('click', () =>{
        tabs.forEach(tab =>{
            //Remove active
            tab.classList.remove('active');
        })
            //Add active
            clickedTab.classList.add('active');
    });
});

//Preventing the virtual keyboard from pushing the navbar up
resname.onblur = function(){
    navi.classList.remove('tabrel');
}
resname.onfocus = function(){
    navi.classList.add('tabrel');
}
locationname.onblur = function(){
    navi.classList.remove('tabrel');
}
locationname.onfocus = function(){
    navi.classList.add('tabrel');
}