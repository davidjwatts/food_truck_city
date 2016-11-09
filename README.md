# San Francisco Food Trucks

## Introduction

This web application is intended to fulfill the requirements of the ClearVoice coding challenge as part of an application for hire.

## Deployment

The app has been deployed on Heroku and can be used here: [SF Food Trucks](https://desolate-anchorage-57478.herokuapp.com/)

Please excuse a possible delay on first loading as the app may need to be loaded in the servers, since this is a free account, and they put the app to sleep after not being pinged for a certain number of hours.

## Basic Usage

Upon the page loading, the map contains yellow icons for every food truck location registered in San Francisco. You can zoom and drag the map and select individual icons, which brings up a window displaying information for each food truck registered there.

The search bar above the map can be used to query Google Places for a general location or address. The map will then drop a pin and center at the location specific, and zoom in. The list of food trucks on the right will represent the 10 closest permit locations, which also can be clicked on to open the information window. You can deselect your chosen location by clicking on the link above the list.

Regardless of specifying a location, you can search for trucks via keyword match anywhere in their description by entering a query in the search box to the right of the map. A query will remain an active filter if a location search is conducted or deselected. So searching by location and query work separately or in conjunction, and in either order.

## Dependencies

* Ruby
* Bundler
* Rails
* PostgreSQL

JS:
* AngularJS
* Lodash
* angular-google-maps
* angular-simple-logger

CSS:
* Bootstrap

## Description of Problem and Solution

The prompt: "Create a service that tells the user what types of food trucks might be found near a specific location on a map. Use the data available on [DataSF:Food Trucks](https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat)."

The Approach

  I decided to use Google Maps (GMaps) API along with an Angular front-end served by a simple Rails back-end. The nature of the data suggested that I should use the GPS coordinates with each permit to create markers on the map, and that the data should be refreshed upon page load to provide up to date information. This combination, without any features requiring data persistence, precluded the need to make RESTful API calls back to the server after the home page is loaded. Despite being more capable in Rails than I am in Angular, and the desire for the app to use the full-stack to display my skills, I felt the problem simply didn't call for it. The result is a light and nimble app that only makes one API call on page load, and only consists of one page/view in angular.

  Based on the prompt, I thought the most essential feature was a map with labeled truck locations and the ability to search for a place or address and have that appear centered on the map. Secondarily, I wanted a list of the trucks that was searchable, clickable, and filtered by distance from the selected location (if applicable).

Technical Solutions

* Processing the Data

  The data is processed in a service that can return an array of objects, which can then be used as the reference for the GMaps markers directive and the window directive. In processing the JSON file retrieved from DataSF, several issues came up.

  One issue is that about 5% of the permits didn't offer coordinates and only had a string description of the place. Google's Geolocation api, which returns a location from a description, does not off a free plan for this number of requests. I decided to omit those permits.

  Another issue is that there are multiple permits per location, which may be from the same vendor or not. I approached this problem as modularly as I could. First I grouped the permits by location, since each location will yield one marker. Then I create a marker using the coordinates for each group. I then add an array to the marker which will contain information for each truck at that location, which also consolidates multiple permits from a single vendor at that location. The array of trucks in each marker contains the name, food description, and days/hours attributes of each separate vendor at that location. This information is used when rendering the window for that location.

* Using Google Maps API with Angular

  The AngularUI group had created a module to streamline GMap API use, and I decided this would be a more efficient way to learn and implement GMap API. It offers various directives which do most of the work. The markers directive creates a marker for each element of a specified array. I used a separate single marker directive for the Google Places search a user can run. This refers to a solitary marker object that is reset when the user uses the "Remove my location" link. I also use a single window directive which would be populated with the information from the most recently clicked marker on the map.


Future Features

  I was certainly pressed for time with this project, and much of the struggle was determining how to pair down the app's features so I could finish it in time.

  * To incorporate more of a back-end, I wanted to offer persisting user accounts that would feature a list of favorite trucks the user could add and refer to.

  * It would be nice to refine the location search more, which could be accomplished by limiting the closest trucks list to those within a certain radius, and the user could select the distance.

  * Along the same line, filtering the trucks list by days/times open, and then having a currently open link to filter by the current time. Also, I would like to add general food genres as a list of clickable search refinements.

  * Since we're all in AZ, it wouldn't be very fun to have the search location automatically set to the device's location on page load, but this makes a lot of sense for real users in SF.

  * I wanted to further process the descriptions to make them look nicer, for instance removing the colons in favor commas, and removing business terms from vendor name such as "LLC" and "Corporation".

Problems Encountered

  I'm not very familiar with the deployment process, so I had a handful of issues with the asset pipeline, leading me to use some janky hacks to get the Heroku deployment to work. These issues included:

  * Using a CDN link to bootstrap in the main view template, instead of using the gem or a hard copy in the vendor assets folder.

  * Including both a hard copy of AngularJS in the vendor assets folder and using the Angular gem for rails.

  * Another issue I couldn't figure out in time is the "Mixed Content" warnings the Heroku deployment sends in the console upon page load. I couldn't find the non-SSL links anywhere in the assets being used.
