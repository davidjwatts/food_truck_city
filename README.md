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
* Bootstrap v3.2.0

## Description of Problem and Solution

The prompt: "Create a service that tells the user what types of food trucks might be found near a specific location on a map. Use the data available on [DataSF:Food Trucks](https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat)."

I decided to use Google Maps API along with an Angular front-end served by a simple Rails back-end. The nature of the data suggested that I should use the GPS coordinates with each permit to create markers on the map, and that the data should be refreshed upon page load to provide up to date information. This combination, without any features requiring data persistence, precluded the need to make RESTful API calls back the server after the home page is loaded. Despite being more capable in Rails than I am in Angular, and the desire for the app to use the full-stack to display my skills, I felt the problem simply didn't call for it. The result is a light and nimble app that only makes one API call on page load, and only consists of one page/view in angular.

Based on the prompt, I thought the most essential features of the app would be the map itself, having labeled truck locations also be on the map, and then being able to search for a place or address and have that appear on the map. Once getting these features up and running, I knew having a list of the trucks that was searchable and clickable made the most sense. Filtering by distance from the selected location (if applicable) was also a no-brainer.

Features I wanted to implement:
  For the sake of full-stacking this beast, i wanted to offer persisting user accounts that would feawture a favorites list that you could add trucks to and then view on their own.

  -changing the number of closest trucks to your location or filtering them by a set number of miles from teh location.

  -processing the days/hours differently so the user could sort by dates and times, or choose to only show trucks that were currently open.

  -Further processing the descriptin text to make it prettier. Remove business words from truck name such as "LLC" or "Corporatino", formatting da

* Processing the Data

  The data is processed in a service that can return an array of objects, which can then be used as the reference for the Google Maps markers directive and the window directive. In processing the JSON file retrieved from DataSF, several issues came up.

  One issue is that about 5% of the permits didn't offer coordinates and only had a string description of the place. Google's Geolocation api, which returns a location from a description, does not off a free plan for this number of requests. I decided to omit those permits.

  Another issue is that there are multiple permits per location, which may be from the same vendor or not. I approached this problem as modularly as I could. First I grouped the permits by location, since each location will yield one marker. Then I create a marker using the coordinates for each group. I then fill add an array to the marker which will contain information from each truck at that location, which also consolidates multiple permits from a single vendor at that location. The array of trucks in each marker contains the name, food description, and days/hours attributes of each separate vendor at that location. This information is used when rendering the window for that location.

* Using Google Maps API with Angular

  The AngularUI group had created a module to streamline GMap API use, and I decided this would be a more efficient way to learn how to use GMap API. It offers various directives which do most of the work. The markers directive creates a marker for each element of a specified array. I used a separate single marker directive for the Google places search a user can run. This refers to a solitary marker object that is reset when the user uses the "Remove my location" link. I also use a single window directive which would be populated with the information from the most recently clicked marker on the map.
