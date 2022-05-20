//This is a traditional JavaScript file that will be run client side in order to dynamically interact with the
//server side scripts handling the responses

//handle to where we will display the output from the server
const responseContainer = document.getElementById("responseContent");

//input box handles (to access client data)
const getInputBox = document.getElementById('getInputBox');
const postInputBox = document.getElementById('postInputBox');
const putInputBox = document.getElementById('putInputBox');
const deleteInputBox = document.getElementById('deleteInputBox');

//button handles
const getButton = document.getElementById("get");
const postButton = document.getElementById("post");
const putButton = document.getElementById("put");
const deleteButton = document.getElementById("delete");

//button listeners
getButton.addEventListener("click",doGet);
postButton.addEventListener("click",doPost);
putButton.addEventListener("click",doPut);
deleteButton.addEventListener("click",doDelete);

//Functions tied to our listeners (what gets done when buttons are pushed)
function doGet(){
    //build a url with the box content as a query
    let urlWithQuery = "./data?data=" + getInputBox.value
    fetch(urlWithQuery)
    .then(response => response.text())
    .then(text => responseContainer.innerHTML+=(text + "<br>"));
}

function doPost(){
    //send the request
    fetch("./data", buildRequest('POST', postInputBox.value))
    .then(response => response.text())
    .then(text => responseContainer.innerHTML+=(text + "<br>"));
}

function doPut(){
    fetch("./data", buildRequest('PUT', putInputBox.value))
    .then(response => response.text())
    .then(text => responseContainer.innerHTML+=(text + "<br>"));
}

function doDelete(){
    fetch("./data", buildRequest('DELETE', deleteInputBox.value))
    .then(response => response.text())
    .then(text => responseContainer.innerHTML+=(text + "<br>"));
}

//request building function,
function buildRequest(requestType, requestMessage){
    const requestData = {
        method: requestType,
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: requestMessage}) //We have to use stringify else it will try and parse the JSON twice
        };
    return requestData;
}
