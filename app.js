'use strict';

let state = {
    popularMovies: [],
    popularTv: [],
    query: '',
    isMobile: false
};

// Selectors
const BANNER = '.banner';
const TITLE = '.title';
const DISCOVER = '.discover';
const SEARCH = '.search';
const POPULAR = '.popular';
const NAV_SEARCH_INPUT = '.nav-search-input';
const NAV_SEARCH_GLASS = '.nav-search-glass';

const MAIN = 'main';
const DISCOVER_CONTAINER = '.discover-container';
const CONTENT = '#content';
const LANDING_PAGE = '.landing';
const LANDING_HEADER = '.landing-header';
const SEARCH_PAGE = '.search-page';
const SEARCH_FORM = '.search-form';
const QUERY_INPUT = '#query-input';


// ================================================================================
// Displays
// ================================================================================
            //  0  ,  1   ,  2   ,  3   ,  4   ,  5   ,    6
let widths = ["w92","w154","w185","w342","w500","w780","original"]
let img_width = widths[2];
      
let IMG_BASE_URL = `https://image.tmdb.org/t/p/${img_width}`;

//
// Returns template for movie poster
//
function posterTemplate(tv, poster_path, title, id, overview, release_date, backdrop_path) {
    return `<div class="${tv ? 'tv': ''} poster">
                <div class="poster-img-wrap">
                    <img src="${IMG_BASE_URL + '/' + poster_path}" 
                        alt="Poster image for ${title}."
                        id="${id}"
                        data-title="${title}"
                        data-id="${id}"
                        data-overview="${overview}"
                        data-release-date="${release_date}"
                        data-backdrop="${backdrop_path}"
                    >
                </div>
                <div class="poster-overlay">
                    <span class="view-detail">View Details</span>
                </div>
                <label for="${id}" class="poster-label">
                    <span>${title}</span><br>
                    <span>${release_date.slice(0,4)}</span>
                </label> 
            </div>`;
}


// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Displays popular movie posters to screen
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displayPopularMovies() {
    let movies = state.popularMovies.map(function(movie) {
        let overview = movie.overview.replace(/["]/g, "'");
        return posterTemplate(false,
                              movie.poster_path,
                              movie.title,
                              movie.id,
                              overview,
                              movie.release_date,
                              movie.backdrop_path);
    });
    $(CONTENT).append(movies);
}



// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Displays popular tv show posters to screen
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displayPopularTv() {
    let shows = state.popularTv.map(function(show) {
        let overview = show.overview.replace(/["]/g, "'");
        return posterTemplate(true,
                              show.poster_path,
                              show.name,
                              show.id,
                              overview,
                              show.first_air_date,
                              show.backdrop_path);
    });
    $(CONTENT).append(shows);
}


// ================================================================================
// Utilities / Helper Functions
// ================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Helper function to print JSON response data to
// console for debugging
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function printResp(resp) {
    console.log(resp);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Handler to collapse and expand nav bar upon scroll
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function collapseNavHandler() {
    $(window).scroll(function(e) {
        let scroll = $(window).scrollTop();
        
        let heightStart = 100;
        let heightEnd = state.isMobile ? 58 : 48;
        let scrollStart = 10;
        let scrollEnd = state.isMobile ? 75 : 100;


        if (scroll > scrollStart && scroll <= scrollEnd) {
            let newHeight = (scroll - scrollStart) / (scrollEnd - scrollStart) * (heightEnd - heightStart) + heightStart;
            collapseNav(newHeight + 'px');
        }

        if (scroll > scrollEnd) {
            collapseNav(`${state.isMobile ? 58 : 48}px`);
        }

        if (scroll <= scrollStart) {
            let newHeight = (scroll - scrollStart) / (scrollEnd - scrollStart) * (heightEnd - heightStart) + heightStart;
            if (newHeight > 100) {
                newHeight = 100;
            }
            uncollapseNav(newHeight + 'px');
        }
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Collapses nav bar to set height
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function collapseNav(newHeight) {
    // $('.logo').fadeOut(200);
    // $('.monitor').fadeOut(200);
    $(TITLE).stop().animate({'font-size': '20px', width: '85px'}, {
                                    duration: 100,
                                    easing: 'linear'
    });
    $(BANNER).stop().animate({height: newHeight}, { // 48px
                                duration: 100,
                                easing: 'linear',
                                step: function(currentHeight) {
                                    // console.log("height: ", currentHeight);
                                }
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Expands nav bar to set height
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function uncollapseNav(newHeight) {
    // $('.logo').fadeIn(200)
    // $('.monitor').fadeIn(200);
    $(TITLE).stop().animate({'font-size': '36px', width: '150px'}, {
                                    duration: 100,
                                    easing: 'linear'
    });
    $(BANNER).stop().animate({height: newHeight}, { // 100px
                                duration: 100,
                                easing: 'linear',
                                step: function(currentHeight) {
                                    // console.log("height: ", currentHeight);
                                }
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Gives a smooth animation to page navigation bringing the 
// target element to the top of the window
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function smoothScroll(target, duration = 1200) {
    $('body, html').animate({
        scrollTop: $(target).offset().top
    }, duration);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Check screen size to determine Mobile Vs. Desktop
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkSizeHandler() {
    $(document).ready(function() {
        checkSize();

        $(window).resize(checkSize);
    });
}

function checkSize() {
    (parseInt($("body").css('width')) <= '414') ? state.isMobile = true : state.isMobile = false;
}

// ================================================================================
// API Handlers
// ================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handles API call for popular movies
// * * * * * * * * * * * * * * * * * * * * * * * * *
function popularMoviesHandler() {
    discoverMoviesTMDB(1, function(resp) {
        // console.log(resp);
        state.popularMovies = resp.results;
        displayPopularMovies();
    });
}


// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handles API call for popular Tv shows
// * * * * * * * * * * * * * * * * * * * * * * * * *
function popularTvShowsHandler() {
    discoverTvTMDB(1, function(resp) {
        // console.log(resp);
        state.popularTv = resp.results;
        displayPopularTv();
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handles API call for movie / tv show search
// * * * * * * * * * * * * * * * * * * * * * * * * *
function searchMultiHandler() {
    searchAllTMDB(state.query, 1, function(resp) {
        searchAllTMDB(state.query, 2, function(resp_p2) {
            let results = resp.results.concat(resp_p2.results);
            // debugger;
            console.log(results);
            let posters = results.filter(result => {
                                    return result.media_type == 'person' ?  false : true;
                                }).map(function(result) {
                let isTvShow = result.media_type == 'tv';
                // let poster_path = result.poster_path == null ? findPoster(isTvShow, result.id) : result.poster_path;
                // debugger;
                let overview = result.overview.replace(/["]/g, "'");
                if (result.poster_path != null) {
                    return posterTemplate(  isTvShow, // tells function to process data-attr as movie or tv-show
                                            result.poster_path,
                                            result.media_type == 'movie' ? result.title : result.name,
                                            result.id,
                                            overview,
                                            result.media_type == 'movie' ? result.release_date : result.first_air_date,
                                            result.backdrop_path);
                }
            });
            $(LANDING_HEADER).text(`'${state.query}' Results`);
            $(CONTENT).empty().append(posters);
        });
    });
}

function discoverHandler() {

}



// ================================================================================
//    API Calls   ~   TMDB, OMDB, Guidebox
// ================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  TMDB API calls
// * * * * * * * * * * * * * * * * * * * * * * * * * 
let TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// * * * * * * * * * * * * *
//  Search ALL 
// * * * * * * * * * * * * *
function searchAllTMDB(searchQuery, page = 1, callback = printResp) {
    let TMDB_SEARCH_ALL_URL = `${TMDB_BASE_URL}/search/multi`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949',
        query: searchQuery,
        page: page
    };
    $.getJSON(TMDB_SEARCH_ALL_URL, query, callback);
}

// * * * * * * * * * * * * *
//  Movie calls (TMDB)
// * * * * * * * * * * * * *
function searchMovieTMDB(searchQuery, page = 1, callback = printResp) {
    let TMDB_SEARCH_MOVIE_URL = `${TMDB_BASE_URL}/search/movie`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949',
        query: searchQuery,
        page: page
    };
    $.getJSON(TMDB_SEARCH_MOVIE_URL, query, callback);
}


function findByIdTMDB(id, callback = printResp) {
    let TMDB_FIND_URL = `${TMDB_BASE_URL}/find/${id}`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949',
        language: 'en-US',
        external_source: 'imdb_id'
    };
    $.getJSON(TMDB_FIND_URL, query, callback);
}

function discoverMoviesTMDB(page = 1, callback = printResp, filter = 'popularity.desc', ) {
    let TMDB_DISCOVER_MOVIES_URL = `${TMDB_BASE_URL}/discover/movie`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949',
        sort_by: filter,
        page: page
    };
    $.getJSON(TMDB_DISCOVER_MOVIES_URL, query, callback);
}


function getMovieDetailsByIdTMDB(movieId, callback = printResp) {
    let TMDB_GET_MOVIE_URL = `${TMDB_BASE_URL}/movie/${movieId}`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949'
    };
    $.getJSON(TMDB_GET_MOVIE_URL, query, callback);
}

function getMovieImagesTMDB(movieId, callback = printResp) {
    let TMDB_MOVIE_IMAGES_URL = `${TMDB_BASE_URL}/movie/${movieId}/images`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949'
    };
    $.getJSON(TMDB_MOVIE_IMAGES_URL, query, callback);
}

function getMovieVideosTMDB(movieId, callback = printResp) {
    let TMDB_MOVIE_VIDEOS_URL = `${TMDB_BASE_URL}/movie/${moiveId}/videos`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949'
    };
    $.getJSON(TMDB_MOVIE_VIDEOS_URL, query, callback);
}

function getMovieRecommendationsTMDB(movieId, page = 1, callback = printResp) {
    let TMDB_MOVIE_RECOMMENDATIONS_URL = `${TMDB_BASE_URL}/movie/${movieId}/recommendations`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949',
        page: page
    };
    $.getJSON(TMDB_MOVIE_RECOMMENDATIONS_URL, query, callback);
}

function getSimilarMoviesTMDB(id, page = 1, callback = printResp) {
    let TMDB_SIMILAR_MOVIES_URL = `${TMDB_BASE_URL}/movie/${id}/similar`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949',
        page: page
    };
    $.getJSON(TMDB_SIMILAR_MOVIES_URL, query, callback);
}

function getMoviesNowPlayingTMDB(page = 1, callback = printResp) {
    let TMDB_MOVIES_NOW_PLAYING_URL = `${TMDB_BASE_URL}/movie/now_playing`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949',
        page: page
    };
    $.getJSON(TMDB_MOVIES_NOW_PLAYING_URL, query, callback);
}

function getUpcomingMoviesTMDB(page = 1, callback = printResp) {
    let TMDB_UPCOMING_MOVIES_URL = `${TMDB_BASE_URL}/movie/upcoming`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949',
        page: page
    };
    $.getJSON(TMDB_UPCOMING_MOVIES_URL, query, callback);
}

function getListOfGenresTMDB(type = 'movie', callback = printResp) {
    let TMDB_GENRES_LIST_URL = `${TMDB_BASE_URL}/genre/${type}/list`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949'
    };
    $.getJSON(TMDB_GENRES_LIST_URL, query, callback);
}

function getMoviesByGenreTMDB(genreId_s, page = 1, callback = printResp) {
    let TMDB_MOVIES_BY_GENRE_URL = `${TMDB_BASE_URL}/discover/movie`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949',
        sort_by: 'popularity.desc',
        page: page,
        with_genres: genreId_s // List of genres must be comma separated 
    };
    $.getJSON(TMDB_MOVIES_BY_GENRE_URL, query, callback);
}

// * * * * * * * * * * * * *
//  TV calls (TMDB)
// * * * * * * * * * * * * *

function discoverTvTMDB(page = 1, callback = printResp, filter = 'popularity.desc') {
    let TMDB_DISCOVER_TV_URL = `${TMDB_BASE_URL}/discover/tv`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949',
        sort_by: filter,
        page: page
    };
    $.getJSON(TMDB_DISCOVER_TV_URL, query, callback);
}

function getTvDetailsTMDB(tvId, callback = printResp) {
    let TMDB_TV_DETAILS_URL = `${TMDB_BASE_URL}/tv/${tvId}`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949'
    };
    $.getJSON(TMDB_TV_DETAILS_URL, query, callback);
}

function getTVExternalIdsTMDB(tvId, callback = printResp) {
    let TMDB_TV_EXTERNAL_IDS_URL = `${TMDB_BASE_URL}/tv/${tvId}/external_ids`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949'
    };
    $.getJSON(TMDB_TV_EXTERNAL_IDS_URL, query, callback);
}

function getTvVideosTMDB(tvId, callback = printResp) {
    let TMDB_TV_VIDEOS_URL = `${TMDB_BASE_URL}/tv/${tvId}/videos`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949'
    };
    $.getJSON(TMDB_TV_VIDEOS_URL, query, callback);
}

function getPopularTv(page = 1, callback = printResp) {
    let TMDB_POPULAR_TV_URL = `${TMDB_BASE_URL}/tv/popular`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949',
        page: page
    };
    $.getJSON(TMDB_POPULAR_TV_URL, query, callback);
}

function getCurrentlyOnAirTvTMDB(page = 1, callback = printResp) {
    let TMDB_CURRENT_TV_URL = `${TMDB_BASE_URL}/tv/on_the_air`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949',
        page: page
    };
    $.getJSON(TMDB_CURRENT_TV_URL, query, callback);
}

function getTvSeasonDetailsTMDB(tvId, seasonNumber, callback = printResp) {
    let TMDB_TV_SEASON_URL = `${TMDB_BASE_URL}/tv/${tvId}/season/${seasonNumber}`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949'
    };
    $.getJSON(TMDB_TV_SEASON_URL, query, callback);
}

function getTvSeasonExternalIdsTMDB(tvId, seasonNumber, callback = printResp) {
    let TMDB_TV_SEASON_EXTERNAL_IDS_URL = `${TMDB_BASE_URL}/tv/${tvId}/season/${seasonNumber}/external_ids`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949'
    };
    $.getJSON(TMDB_TV_SEASON_EXTERNAL_IDS_URL, query, callback);
}

function getTvSeasonVideosTMDB(tvId, seasonNumber, callback = printResp) {
    let TMDB_TV_SEASON_VIDEOS_URL = `${TMDB_BASE_URL}/tv/${tvId}/season/${seasonNumber}/videos`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949'
    };
    $.getJSON(TMDB_TV_SEASON_VIDEOS_URL, query, callback);
}

function getTvEpisodeDetailsTMDB(tvId, seasonNumber, episodeNumber, callback = printResp) {
    let TMDB_GET_TV_EPISODE_URL = `${TMDB_BASE_URL}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949'
    };
    $.getJSON(TMDB_TV_EPISODE_URL, query, callback);
}

function getTvEpisodeExternalIdsTMDB(tvId, seasonNumber, episodeNumber, callback = printResp) {
    let TMDB_GET_TV_EPISODE_EXTERNAL_IDS_URL = `${TMDB_BASE_URL}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/external_ids`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949'
    };
    $.getJSON(TMDB_TV_EPISODE_EXTERNAL_IDS_URL, query, callback);
}

function getTvEpisodeVideosTMDB(tvId, seasonNumber, episodeNumber, callback = printResp) {
    let TMDB_TV_EPISODE_VIDEOS_URL = `${TMDB_BASE_URL}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/videos`;
    let query = {
        api_key: '33e990a96c93fc44034cdc76ec1ec949'
    };
    $.getJSON(TMDB_TV_EPISODE_VIDEOS_URL, query, callback);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  OMDB API calls
// * * * * * * * * * * * * * * * * * * * * * * * * * 
let OMDB_URL = 'https://www.omdbapi.com/';

function searchByIdOMDB(id, callback) {
    (arguments.length == 1) ? callback = printResp : null;
    let query = {
        i: id,
        plot: 'short',
        apikey: '48bffb4a',
        tomatoes: 'True'
    };
    $.getJSON(OMDB_URL, query, callback);
}

function searchCustomOMDB(params, callback) {
    (arguments.length == 1) ? callback = printResp : null;
    let query = {
        apikey: '48bffb4a'
    };
    Object.assign(query, params);
    $.getJSON(OMDB_URL, query, callback);
}

function searchPosterOMDB(id, callback) {
    (arguments.length == 1) ? callback = printResp : null;
    let POSTER_OMDB_URL = 'http://img.omdbapi.com/';
    let query = {
        i: 'tt3896198',
        h: 600,
        apikey: '48bffb4a',
    };
    $.getJSON(POSTER_OMDB_URL, query, callback);
}


// ================================================================================
//    Event Listeners
// ================================================================================
function searchNavClick() {
    $(SEARCH).on('touchstart click', function(e) {
        e.preventDefault();
        $(LANDING_PAGE).addClass('hidden');
        $(SEARCH_PAGE).removeClass('hidden');
        $(SEARCH_FORM).focusin();
        $(QUERY_INPUT).val('').focus();
    }); 
}

function popularNavClick() {
    $(POPULAR).on('touchstart click', function(e) {
        e.preventDefault();
        $(SEARCH_PAGE).addClass('hidden');
        $(LANDING_PAGE).removeClass('hidden');
        $(LANDING_HEADER).text('Browse Popular Titles');
        $(CONTENT).empty();
        $(QUERY_INPUT).val('')
        popularMoviesHandler();
        popularTvShowsHandler();
        smoothScroll(MAIN);
    });
}

function discoverNavClick() {
    $(DISCOVER).on('touchstart click', function(e) {
        e.preventDefault();
        $(QUERY_INPUT).val('')
        discoverHandler();
        smoothScroll(MAIN);
    });
}

function searchFormSubmit() {
    $(SEARCH_FORM).submit(function(e) {
        e.preventDefault();
        state.query = $(QUERY_INPUT).val();
        $(LANDING_HEADER).text('Loading . . .');
        $(QUERY_INPUT).val('')
        searchMultiHandler();
    });
}

function searchFormFocus() {
    $(SEARCH_FORM).focusin(function(e) {
        e.preventDefault();
        $(this).addClass('search-form-focus');
    });

    $(SEARCH_FORM).focusout(function(e) {
        e.preventDefault();
        $(this).removeClass('search-form-focus');
    });
}

function navSearchGlassClick() {
    $(NAV_SEARCH_GLASS).click(e => {
        e.preventDefault();
        // $(NAV_SEARCH_INPUT).show().focus();
        $(NAV_SEARCH_INPUT).show()
                            .animate({width: '200px'}, {
                                    duration: 500,
                                    easing: 'linear'
                            })
                            .focus();
    });

    $(NAV_SEARCH_INPUT).focusout(e => {
        e.preventDefault();
        $(NAV_SEARCH_INPUT).animate({width: '0'}, {
                                    duration: 300,
                                    easing: 'linear',
                                    complete: () => {
                                        $(NAV_SEARCH_INPUT).hide();
                                    }
                            });
    });
}

// ================================================================================
//    Event Listener Groups
// ================================================================================
function init() {
    $(SEARCH_FORM).focusin();
    $(QUERY_INPUT).focus();
    popularMoviesHandler();
    popularTvShowsHandler();
}

function watchNavItems() {
    searchNavClick();
    popularNavClick();
    discoverNavClick();
    searchFormSubmit();
    navSearchGlassClick();
    searchFormFocus();
}

function utilities() {
    checkSizeHandler();
    // collapseNavHandler();
}

// ================================================================================
//    Entry Point
// ================================================================================
$(function() {
    watchNavItems();
    utilities();
    init();
});