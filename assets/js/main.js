// object for buttons to adjust menu hidding after click
const buttons=[
  document.getElementById("b-welcome"),
  document.getElementById("b-projects"),
  document.getElementById("b-contact")
]

//iframe elements
const iframeContainer = document.getElementById("iframe-container")
const iframe = document.getElementById("iframe")
const visitpage = document.getElementById("visitpage")

// unckeck menu
const uncheck= function(){document.getElementById("mobile-navbar").checked=false}

// Link to the projects container
const projects =document.getElementById("projects-content")


// Fetch portfolio file
async function getPortfolio() {
    const response = await fetch("./assets/json/portfolio.json");
    const portfolio = await response.json();
    return portfolio
  }

// Post fetched content and add iframe
function postPortfolio(portfolio){
    for(let i=0; i<portfolio.projects.length; i++){
      projects.innerHTML+=`
      <div id="${portfolio.projects[i].id}" style="background-image: url(./assets/img/${portfolio.projects[i].img}"><p>${portfolio.projects[i].name}</p></div>
      `
    }
    for(let i=0; i<portfolio.projects.length; i++){
    document.getElementById(portfolio.projects[i].id).onclick= function(){
      iframe.setAttribute("src",portfolio.projects[i].url)
      visitpage.setAttribute("href",portfolio.projects[i].url)
      iframeContainer.classList.toggle("hidden")
    }
  }
}

  
  

//RUN FUNCTION//
getPortfolio().then(data => postPortfolio(data))

//Buttons adjustment| Menu hidding after click //
for(let element of buttons){
  element.onclick= ()=>{uncheck()}
}

//hide iframe
iframeContainer.addEventListener("click",()=>{
  iframeContainer.classList.toggle("hidden")
})