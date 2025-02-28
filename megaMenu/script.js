document.addEventListener("DOMContentLoaded",function(){
    const menuButtons = document.querySelectorAll(".menu-button");

    menuButtons.forEach(button=>{
        button.addEventListener("click",function(){
            const isExpanded = this.getAttribute("aria-expanded") === "true";

            menuButtons.forEach(button=>{
                button.setAttribute("aria-expanded","false");
                button.parentElement.classList.remove("open");
            });

            if(!isExpanded){
                this.setAttribute("aria-expanded","true");
                this.parentElement.classList.add("open");
            }
        });

        //✅ Enable Keyboard Navigation
        button.addEventListener("keydown",function(e){
            let submenu = this.nextElementSibling;
            if(!submenu) return;

            let items = submenu.querySelectorAll("a");

            if(e.key === "ArrowDown"){
                e.preventDefault();
                items[0].focus;
            }
        });

        //✅ Close the Menu When Pressing Escape
        document.addEventListener("keydown",function(e){
            if(e.key === "Escape"){
                menuButtons.forEach(button=>{
                    button.setAttribute("aria-expanded","false");
                    button.parentElement.classList.remove("open");
                });
            }
        })

        //✅ Close Menu When Clicking Outside
        document.addEventListener("click",function(e){
           if(!e.target.closest(".mega-menu")) {
               menuButtons.forEach(button=>{
                button.setAttribute("aria-expanded","false");
                button.parentElement.classList.remove("open");
               });
           }
        })
    });
});