# Biker Phoenix

Final project - CIS 550: Database and Information Systems, University of Pennsylvania. Fall 2017.

## Description

Biker Phoenix is a web-app that allows people to find routes using a combination of bike, subway and walking. Platforms such as Google Maps assume that the user either carries their own bike or none at all. We use [Citi Bike database](https://www.citibikenyc.com/system-data) JSON and combine that with [subway stations database](https://opendata.cityofnewyork.us) of New York City and calculate the shortest distance using a combination of all three, allowing the user to rent a bike and drop it off during the journey.

## Installation

### Running Locally

```sh
npm install express sqlite mongo
npm start
```

The application should start on [localhost:5000](http://localhost:5000/).

## Team Members

[Garvit Gupta](https://github.com/TheGarvitGupta),
[Ignacio Arranz](https://github.com/arranzignacio),
[Gayatri Mavani](https://github.com/gmavani),
[Yu-Ho Hsieh](https://github.com/HsiehYuho)

## Screenshots

![Home - Log in with Facebook or as a guest](https://raw.githubusercontent.com/TheGarvitGupta/CIS550/master/Screenshots/Screen%20Shot%202018-06-16%20at%2010.28.49%20PM.png?token=AJuzDKXb7wrXmg0OE--MGo61lUYwnE9Vks5bL0VawA%3D%3D)
Home - Log in with Facebook or as a guest

![Directions - Point to point route with the mode of transport, distance and time](https://raw.githubusercontent.com/TheGarvitGupta/CIS550/master/Screenshots/Screen%20Shot%202018-06-16%20at%2010.34.00%20PM.png?token=AJuzDMlz2bq8nBqCzHZd2OePIz8daI3Vks5bL0VjwA%3D%3D)
Directions - Point to point route with the mode of transport, distance and time

![Map - Route plotted on the map, with different colours to indicate the mode of transport](https://raw.githubusercontent.com/TheGarvitGupta/CIS550/master/Screenshots/Screen%20Shot%202018-06-16%20at%2010.34.39%20PM.png?token=AJuzDKMaKwNg7r_2DdNJ5lU1JFDMOqKnks5bL0VlwA%3D%3D)
Map - Route plotted on the map, with different colours to indicate the mode of transport

![Subway stations - Search through the database](https://raw.githubusercontent.com/TheGarvitGupta/CIS550/master/Screenshots/Screen%20Shot%202018-06-16%20at%2010.35.24%20PM.png?token=AJuzDAkmlfs4hvAAdOKPomb_5kl8NeNNks5bL0VowA%3D%3D)
Subway stations - Search through the database

A demo video can be found [here](https://youtu.be/ILKdKZQTTY0), thanks to [Yu-Ho](https://github.com/HsiehYuho)!

## Development

### Front End
* HTML5
* CSS3
* AngularJS

### Back End
* Node.js
* Express
* MongoDB
* SQL

### APIs
* Facebook Login
* Google Maps (Plotting)
* Google Maps (Geo-encoding)

### Web Hosting
* AWS RDS (SQL Database only)
