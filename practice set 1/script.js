//store default font size
let defaultSizes = {};

function storeDefaultFontSize(){
    let elements = document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,li,th,td");
    elements.forEach(el=>{
       defaultSizes[el.tagName] =  window.getComputedStyle(el).fontSize;
    });
}

// function to change font size
function changeFontSize(step){
    let elements = document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,li,th,td");

    elements.forEach(el=>{
        let currentSize = window.getComputedStyle(el,null).getPropertyValue("font-size");
        let newSize = parseFloat(currentSize) + step;
        el.style.fontSize = newSize + "px";
    });
}

// Function to reset font size to default

function resetFontSize(){
    let elements = document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,li,th,td");
    elements.forEach(el=>{
        if(defaultSizes[el.tagName]){
            el.style.fontSize = defaultSizes[el.tagName];
        }
    });
}

window.onload = storeDefaultFontSize;



//smooth scroll
document.querySelector(".skip-link").addEventListener("click", function(e){
    e.preventDefault();
    document.querySelector("#maincontent").scrollIntoView({behavior:"smooth"});
});

//darkmode
function toogleDarkMode(){
    document.body.classList.remove("high-contrast");
    document.body.classList.add("dark-mode");
}

//contrast mode
function toogleContrastMode(){
    document.body.classList.remove("dark-mode");
    document.body.classList.add("high-contrast");

}