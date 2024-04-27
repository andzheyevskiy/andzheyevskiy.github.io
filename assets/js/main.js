// Link to the projects container
const projects =document.getElementById("projects-content")


// Fetch portfolio file
async function getPortfolio() {
    const response = await fetch("./assets/json/portfolio.json");
    const portfolio = await response.json();
    return portfolio
  }

// Post fetched conetent
function postPortfoilio(portfolio){
    for(let i=0; i<portfolio.projects.length; i++)
    projects.innerHTML += "<a id='"+portfolio.projects[i].id+"' target='_blank' style='background-image: url(./assets/img/"+portfolio.projects[i].img+");' href='"+portfolio.projects[i].url+"'><p>"+portfolio.projects[i].name+"</p></a>"
}

  
  

//RUN FUNCTION//
getPortfolio().then(data => postPortfoilio(data))
