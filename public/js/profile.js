//handles for contact pop up
const openPopUp = document.getElementById('triggerContactPopup');
const contactPopupWindow = document.getElementById('contactPopupWindow'); //pop up div
const contactCloseBtn = document.getElementById('contactCloseBtn'); //close btn

//handles for big pop up
const bigPopUp = document.getElementById('bigPopUp'); //pop up div
const bigCloseBtn = document.getElementById('bigCloseBtn'); //close btn

//start with them hidden
contactPopupWindow.setAttribute("style","visibility: hidden");
bigPopUp.setAttribute("style","visibility: hidden");

//activation flags
var contactPopupStatus = false;
var bigPopUpStatus = false

//let's add our css
// Get HTML head element
var head = document.getElementsByTagName('HEAD')[0];
 
// Create new link Element
var link = document.createElement('link');

// set the attributes for link element
link.rel = 'stylesheet';

link.type = 'text/css';

link.href = 'css/popups.css';

// Append link element to HTML head
head.appendChild(link);

contactCloseBtn.addEventListener("click", activateContactPopUp);
bigCloseBtn.addEventListener("click", activateBigPopUp);

openPopUp.addEventListener("click", activateContactPopUp);

//TOGGLE THE CONTACT POP UP    
function activateContactPopUp(){
    contactPopupWindow.setAttribute("style","");
    if (!contactPopupStatus) {
        contactPopupWindow.classList.remove("popupFadeOut");
        contactPopupWindow.classList.add("popupFadeIn");
        contactPopupStatus = true;
    }
    else{
        contactPopupWindow.classList.remove("popupFadeIn");
        contactPopupWindow.classList.add("popupFadeOut");
        contactPopupStatus = false;     
    }
}

// TOGGLE THE BIG POP UP
function activateBigPopUp(title, contents = "default"){
    
    let fileName = "popupcontent/" + contents + ".html"; //build filename from parameter
    bigPopUp.setAttribute("style","");
    if (!bigPopUpStatus) {
        //load popup text if it's not overridden
        if (contents !="override"){
            fetch(fileName, {
                
            }).then(function(response) {
                return response.text();
            }).then(function(response) {  
                    document.getElementById("popUpBody").innerHTML = response;
                    document.getElementById("popUpTitle").innerHTML = title;
                    if (contents=="wordgame") {runWordGame();}
            }).catch (function (error){
                console.log(error);  
                //noData();
            });
        }

        //display it
        bigPopUp.classList.remove("popupFadeOut");
        bigPopUp.classList.add("popupFadeIn");
        document.body.classList.add("stopScrolling"); //stop mousewheel etc scrolling main window while dialog activated
        bigPopUpStatus = true;
       
    }
    else{
        bigPopUp.classList.remove("popupFadeIn");
        bigPopUp.classList.add("popupFadeOut");
        document.body.classList.remove("stopScrolling"); //re-enable scrolling main window
        //check if an alert is also active, close it if it is
        let alertBox = document.getElementById("ourAlertBoxCNT");
        if(alertBox){
            if (alertBox.style.visibility == "visible") {
                alertBox.style.visibility = "hidden";
            }
        }
        bigPopUpStatus = false;
    }
}

