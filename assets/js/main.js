// object for buttons to adjust menu hidding after click
const buttons=[
  document.getElementById("b-welcome"),
  document.getElementById("b-projects"),
  document.getElementById("b-contact")
]
const loadMore = document.getElementById("more")
let startingIndex = 0;
let endingIndex = 6;
let portfolio =[]

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
    portfolio = await response.json();
    return portfolio.projects
  }

// Post fetched content and add iframe
function postPortfolio(portfolio){
    for(let i=0; i<portfolio.length; i++){
      projects.insertAdjacentHTML('beforeend',`
      <div id="${portfolio[i].id}" style="background-image: url(./assets/img/${portfolio[i].img});cursor:pointer"><p>${portfolio[i].name}</p><span>${portfolio[i].framework}</span></div>
      `)
      document.getElementById(portfolio[i].id).addEventListener("click",()=>{
        iframe.setAttribute("src",portfolio[i].url)
        visitpage.setAttribute("href",portfolio[i].url)
        iframeContainer.classList.toggle("hidden")
      })
    }
}

  
  

//RUN FUNCTION//
getPortfolio().then(data => postPortfolio(data.slice(startingIndex, endingIndex)))
loadMore.addEventListener("click",()=>{
  startingIndex += 6;
  endingIndex += 6
  getPortfolio().then(data => {
    postPortfolio(data.slice(startingIndex, endingIndex))
    if(data.length<=endingIndex){
      loadMore.style.display="none"
    }
  })
})

//Buttons adjustment| Menu hidding after click //
for(let element of buttons){
  element.onclick= ()=>{uncheck()
    iframeContainer.setAttribute("class","hidden")}
}

//hide iframe
iframeContainer.addEventListener("click",()=>{
  iframeContainer.classList.toggle("hidden")
  iframe.setAttribute("src","")
})