# STREAM IT
Asynchronous API Client-Side Capstone Project from [Thinkful's](https://www.thinkful.com/) fullstack web development program. 

## Project Requirements
* The app should do something interesting: The overarching UX (user experience) requirement for this app is that it pulls in data from a third party API and displays that data in some way to your user. It's up to you to figure out how to make this experience feel compelling to the user, and who it is that you want to make something interesting for.
* Polished appearance for final version: Initially, you'll implement a minimal, functional prototype of your app, which you'll use to get feedback on your app's features. While the first version should not be polished, the final version you submit should be. We'll go into greater detail about what this means in the assignment dedicated to styling your app.
* Responsive: The final version of your app should work on both mobile and desktop.

## Screenshots
![Home Page](./working-screenshots/home-page-alien-search.png?raw=true "Home Page")

![Alien search results](./working-screenshots/alien-query.png?raw=true "Alien search results")

![Alien Detail Page](./working-screenshots/alien-detail-page-with-similar-carousel.png?raw=true "Alien Detial Page")

![Popular Page](./working-screenshots/popular-movies.png?raw=true "Popular Page")

![Discover Content Page](./working-screenshots/discover-content.png?raw=true "Discover Content Page")

## Live [DEMO](https://schmerb.github.io/stream-it/)

## Description
Stream It is a search engine for users to find out exactly where and for how much they can currently stream a movie or tv show and view ratings as well as other useful information. It makes the process of searching for titles across multiple streaming platforms as easy as a few clicks. Provides lists of popular movies and tv shows and a discover content section to browse movies by genre as well as suggestions for similar movies and tv shows. Currently leverages about 340 sources.

## Built With
* HTML5 
* CSS3
* JavaScript
* jQuery
  * Slick - Responsive carousel jQuery plugin

## Notes
* Responsive, mobile first design strategy 
* Specifies hash URL endpoints to retain state of app on page refresh for all views.
  * Utilizes session storage for storing data currently displayed in Slick carousel(s) to save detail page context on page refresh.
* APIs
  * Search powered by The Movie DB (TMDb) API
  * Ratings (IMDB etc..) and metadata from The Open Movie Database (OMDB) API
  * Trailers are fetched from the YouTube API
  * Streaming options / links powered by the GuideBox API
 
