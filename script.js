function startAll(){
    // Variables used get the elements in the page of importance
    // -- get the input where the user inputs a subject
    // -- currently the only input being used to search
    const userSearchEl = document.querySelector("#userSearch");
    const recordsNumberEl = document.querySelector("#recordsNumber");
    const startYearEl = document.querySelector("#startYear");
    const endYearEl = document.querySelector("#endYear");
    // -- gets the submit buton element
    const submitBtn = document.querySelector("#submitButton");
     // -- gets the clear button element
    const clearBtn = document.querySelector("#clearButton");
    
    // adding event listener to submit button
    submitBtn.addEventListener("click", function(){
        // used to stop the form element from refreshing the page when the submit button is clicked
        event.preventDefault();
        // variables used to store the values the user inputted into each input element
        // -- used to store the users input from the general search input
        // -- currently userSearch is the only value being used to search 
        const userSearch = userSearchEl.value;
        const recordsNumber = recordsNumberEl.value;
        const startYear = startYearEl.value;
        const endYear = endYearEl.value;
        
        // variable used to store our api key       
        const yourKey = "0LwsSDSFDRhkkSNSLoqgozWbok0rVns1";
        // varibale used to create the url that we will use to get info from the NYT API
        const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+ userSearch + "&api-key="+yourKey;
    
        // used to get information from the NYT API
        axios.get(queryURL)
                .then(function(response) {
                    // variable used to store the information recieved from NYT API
                    // -- response is an object. It is just a variable, it could be called anything
                    // -- data is a property of response, response is a proprerty of data, docs is a proprety of docs
                    searchArticles = response.data.response.docs;
                    // Used to call our function further down that is used to render the information we got from the NYT API
                    renderArticles(searchArticles);
            });
        
    });

    // Created an event listener for the clear button. Clears all the information from the previous search
    clearBtn.addEventListener("click", function(){
        // All the code below used to set the values of all the inputs to an empty string
        document.getElementById("#userSearch").value = "";
        document.getElementById("#recordsNumber").value = "";
        document.getElementById("#startYear").value = "";
        document.getElementById("#endYear").value = "";
        });

    // Function created to render the information recieved from the NYT API
    function renderArticles(searchArticles){
    
        // gets the element where we want to dispaly the results
        let articleEl = document.getElementById('searchResults');
        // takes the information passed from the axios request and stores it in a new variable
        // -- this isn't necessary it's just easier, in my opinion, to see where the data came from.
        let userArticles = searchArticles;
        // Loop created to render all the articles recieved from the NYT API
        for(let i=0; i < userArticles.length; i++){
    
            // code below used to create each element needed to create the HTML needed to display our results
            // -- each loop creates an h3 for the headline, a p for the abstract, 1 col, and one row.
            // -- each article will be one row with one col. The headline on top and the abstract underneath.
            let headlineEl = document.createElement('h3');
            let abstractEl = document.createElement('p');
            let colEl = document.createElement('div');
            let rowEl = document.createElement('div');
            // code below used to set the classes for the elements created above
            rowEl.setAttribute('class','row');
            colEl.setAttribute('class', 'col');
            // Changes the text within the element used for displaying an article headline.
            headlineEl.innerText = userArticles[i].headline.main;
            // Changes the text within the element used for displaying the abtract of an article.
            abstractEl.innerText = userArticles[i].abstract;
            // appends the headline and abstract elements to the column. Headline is below the abstract
            colEl.append(headlineEl, abstractEl);
            // appends the col (which contains the headline and the abstract)
            rowEl.append(colEl);
            // appends the row (which now contains everything for an article) to the area we want to display the results
            articleEl.append(rowEl);
        }
    };

}startAll();