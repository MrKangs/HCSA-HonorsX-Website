var searchinput = document.getElementsByClassName("searchhh");
var communityServiceName = document.getElementsByClassName("community-service-name-search");
var communityServiceArr = document.getElementsByClassName("community-service-holder");
var input;
var nameArr = [];

function find(event){

    input = event.currentTarget.value.toLowerCase();

    for(var i = 0; i < communityServiceArr.length; i++){
        nameArr[i] = communityServiceArr[i].getElementsByClassName("rsvp-name-search");
    }

    var flag;
    for(var i = 0; i < communityServiceName.length; i++){
        flag = 0;
        if((nameArr[i].length == 0) &&
        ((communityServiceName[i].textContent.toLowerCase().includes(input)) == false)){
            communityServiceArr[i].style.display = "none";
        }
        else if((nameArr[i].length == 0) &&
        ((communityServiceName[i].textContent.toLowerCase().includes(input)) == true)){
            communityServiceArr[i].style.display = "block";
        }
        for(var j = 0; j < nameArr[i].length; j++){ 
            if((nameArr[i][j].textContent.toLowerCase().includes(input)) == true){
                flag = 1;
                communityServiceArr[i].style.display = "block";
            }

            if((j == nameArr[i].length-1) && (flag == 0) &&
            ((communityServiceName[i].textContent.toLowerCase().includes(input)) == false)){
                communityServiceArr[i].style.display = "none";
            }
            else if((j == nameArr[i].length-1) &&
            ((communityServiceName[i].textContent.toLowerCase().includes(input)) == true)){
                    communityServiceArr[i].style.display = "block";
            }
        }
    }
}

var url = window.location.href;
if(url.includes("community-service")){
    searchinput[0].addEventListener('input', find);
}
