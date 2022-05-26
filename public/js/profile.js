const openPopUp = document.getElementById('triggerContactPopup');
const contactPopupWindow = document.getElementById('contactPopupWindow');
const closeBtn = document.getElementById('closeBtn');
var contactPopupStatus = false;
contactPopupWindow.setAttribute("style","visibility: hidden");

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

closeBtn.addEventListener("click", activatePopUp);

openPopUp.addEventListener("click", activatePopUp);

    
function activatePopUp(){
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