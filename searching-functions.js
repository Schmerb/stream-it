//
// loops through data and stores each movie in state object
// as long as it does not already exist
//
function filterData() {
    data.forEach(movie => {
        if(!state.data.hasOwnProperty(movie.imdb)) {
            if(movie.hasOwnProperty('purchase_web_sources')) {
                state.data[movie.imdb] = movie;
            }
        }
    });
    movieData1.forEach(movie => {
        if(!state.data.hasOwnProperty(movie.imdb)) {
            if(movie.hasOwnProperty('purchase_web_sources')) {
                state.data[movie.imdb] = movie;
            }
        }
    });
    movieData200.forEach(movie => {
        if(!state.data.hasOwnProperty(movie.imdb)) {
            if(movie.hasOwnProperty('purchase_web_sources')) {
                state.data[movie.imdb] = movie;
            }
        }
    });
    movieData200To400.forEach(movie => {
        if(!state.data.hasOwnProperty(movie.imdb)) {
            if(movie.hasOwnProperty('purchase_web_sources')) {
                state.data[movie.imdb] = movie;
            }
        }
    });
    movieData400To600.forEach(movie => {
        if(!state.data.hasOwnProperty(movie.imdb)) {
            if(movie.hasOwnProperty('purchase_web_sources')) {
                state.data[movie.imdb] = movie;
            }
        }
    });
    movieData600To800.forEach(movie => {
        if(!state.data.hasOwnProperty(movie.imdb)) {
            if(movie.hasOwnProperty('purchase_web_sources')) {
                state.data[movie.imdb] = movie;
            }
        }
    });
    movieData900To1150.forEach(movie => {
        if(!state.data.hasOwnProperty(movie.imdb)) {
            if(movie.hasOwnProperty('purchase_web_sources')) {
                state.data[movie.imdb] = movie;
            }
        }
    });
    movieData1150To1350.forEach(movie => {
        if(!state.data.hasOwnProperty(movie.imdb)) {
            if(movie.hasOwnProperty('purchase_web_sources')) {
                state.data[movie.imdb] = movie;
            }
        }
    });
}

function searchData(search) {
    filterData();
    let results = [];
    search = search.trim().toLowerCase();
    Object.values(state.data).forEach(movie => {
        let title = movie.title.toLowerCase();
        if(title.includes(search)) {
            results.push(movie);
        }
    });

    console.log(search, ": ", results);
}


function searchSourceFiles(search) {
    search = search.trim().toLowerCase();
    let counter = 0;
    let results = [];
    let startTime = Date.now();
    movieData1.forEach(movie => {
        if(movie.title.toLowerCase().includes(search)) {
            results.push(movie);
        }
        counter++;
    });
    movieData200.forEach(movie => {
        if(movie.title.toLowerCase().includes(search)) {
            results.push({
                movie,
                from: 'movieData200'
            });
        }
        counter++;
    });
    movieData200To400.forEach(movie => {
        if(movie.title.toLowerCase().includes(search)) {
            results.push({
                movie,
                from: '200To400'
            });
        }
        counter++;
    });
    movieData400To600.forEach(movie => {
        if(movie.title.toLowerCase().includes(search)) {
            results.push({
                movie,
                from: '400To600'
            });
        }
        counter++;
    });
    movieData600To800.forEach(movie => {
        if(movie.title.toLowerCase().includes(search)) {
            results.push({
                movie,
                from: '600To800'
            });
        }
        counter++;
    });
    movieData845To900.forEach(movie => {
        if(movie.title.toLowerCase().includes(search)) {
            results.push({
                movie,
                from: '845To900'
            });
        }
        counter++;
    });
    movieData900To1150.forEach(movie => {
        if(movie.title.toLowerCase().includes(search)) {
            results.push({
                movie,
                from: '900To1150'
            });
        }
        counter++;
    });
    movieData1150To1350.forEach(movie => {
        if(movie.title.toLowerCase().includes(search)) {
            results.push({
                movie,
                from: '1150To1350'
            });
        }
        counter++;
    });

    let endTime = Date.now();
    console.log('Counter = ', counter);
    console.log('results = ', results);
    console.log('time elapsed = ', endTime - startTime + 'ms');
    state.dataResults.push(results);
}