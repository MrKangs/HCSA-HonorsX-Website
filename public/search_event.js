var searchinput = document.getElementsByClassName("searchhh");
var eventName = document.getElementsByClassName("event-name-search");
var eventArr = document.getElementsByClassName("event-holder");
var input;
var nameArr = [];

function find(event){

    input = event.currentTarget.value.toLowerCase();
    for(var i = 0; i < eventArr.length; i++){
        nameArr[i] = eventArr[i].getElementsByClassName("rsvp-name-search");
        console.log(nameArr);
    }
    var flag;
    for(var i = 0; i < eventName.length; i++){
        flag = 0;
        if((nameArr[i].length == 0) &&
        ((eventName[i].textContent.toLowerCase().includes(input)) == false)){
            eventArr[i].style.display = "none";
        }
        else if((nameArr[i].length == 0) &&
        ((eventName[i].textContent.toLowerCase().includes(input)) == true)){
            eventArr[i].style.display = "block";
        }
        for(var j = 0; j < nameArr[i].length; j++){ 
            if((nameArr[i][j].textContent.toLowerCase().includes(input)) == true){
                flag = 1;
                eventArr[i].style.display = "block";
            }

            if((j == nameArr[i].length-1) && (flag == 0) &&
            ((eventName[i].textContent.toLowerCase().includes(input)) == false)){
                eventArr[i].style.display = "none";
            }
            else if((j == nameArr[i].length-1) &&
            ((eventName[i].textContent.toLowerCase().includes(input)) == true)){
                    eventArr[i].style.display = "block";
            }
        }
    }
}

var url = window.location.href;
if(url.includes("events")){
    searchinput[0].addEventListener('input', find);
}
