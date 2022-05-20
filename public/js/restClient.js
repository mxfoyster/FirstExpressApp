const responseContainer = document.getElementById("responseContent");

//button handles
const getButton = document.getElementById("get")
const postButton = document.getElementById("post")
const putButton = document.getElementById("put")
const deleteButton = document.getElementById("delete")

//button listeners
getButton.addEventListener("click",doGet);
postButton.addEventListener("click",doPost);
putButton.addEventListener("click",doPut);
deleteButton.addEventListener("click",doDelete);

function doGet(){
    responseContainer.innerHTML="get";
}

function doPost(){
    responseContainer.innerHTML="post";
}

function doPut(){
    responseContainer.innerHTML="put";
}

function doDelete(){
    responseContainer.innerHTML="delete";
}

