function startAll(){
    const userSearchEl = document.querySelector("#userSearch");
    const recordsNumberEl = document.querySelector("#recordsNumber");
    const startYearEl = document.querySelector("#startYear");
    const endYearEl = document.querySelector("#endYear");
    const submitBtn = document.querySelector("#submitButton");
    console.log(submitBtn);
    const clearBtn = document.querySelector("#clearButton");
    
    submitBtn.addEventListener("click", function(){
        event.preventDefault();
        // const searchResults= nytimesRequest()
        const userSearch = userSearchEl.value;
        const recordsNumber = recordsNumberEl.value;
        const startYear = startYearEl.value;
        const endYear = endYearEl.value;
        // const searchCriteria = [userSearch, recordsNum, startYear, endYear];
        
        const yourKey = "0LwsSDSFDRhkkSNSLoqgozWbok0rVns1";
        console.log(yourKey);
        let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+ userSearch + "&api-key="+yourKey;
        console.log(queryURL);
        // Pull information from input - into the search fields using an onClick
        
        axios.get(queryURL)
                // After the body is turned into json
                .then(function(response) {
                    searchArticles = response.data.response.docs;
                    console.log(searchArticles);
                    renderArticles(searchArticles);
            });
        
    });


    clearBtn.addEventListener("click", function(){
        document.getElementById("#userSearch").value = "";
        document.getElementById("#recordsNumber").value = "";
        document.getElementById("#startYear").value = "";
        document.getElementById("##endYear").value = "";
        });

    
    function renderArticles(searchArticles){
    
        let articleEl = document.getElementById('searchResults');
        let userArticles = searchArticles;
        console.log("user Articles", userArticles);
        for(let i=0; i < userArticles.length; i++){
            console.log(userArticles)
            
            let headlineEl = document.createElement('h3');
            let abstractEl = document.createElement('p');
            let colEl = document.createElement('div');
            let rowEl = document.createElement('div');
            rowEl.setAttribute('class','row');
            colEl.setAttribute('class', 'col');
            headlineEl.innerText = userArticles[i].headline.main;
            console.log(headlineEl.innerText);
            abstractEl.innerText = userArticles[i].abstract;
            colEl.append(headlineEl, abstractEl);
            rowEl.append(colEl);
            articleEl.append(rowEl);
        }
    };

}startAll();