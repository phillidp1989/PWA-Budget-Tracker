# PWA-Budget-Tracker

## Table of Contents:

[Description](#description)

[Visuals](#visuals)

[Installation](#installation)

[Usage](#usage)

[License](#license)

[Contributing](#contributing)

[Testing](#testing)

[Languages](#languages)

[Author](#author)

## Description:
The deployed app can be found at http://immense-hamlet-11887.herokuapp.com/.

This app keeps track of a user's budget. The user can add transactions which either add or subtract a specified amount from the total. The transactions will then be presented in a line chart using chart.js. This app is a progressive web app meaning it can be downloaded to your computer or smartphone and be used when offline. Assets are cached using a service worker and a manifest contains app information for offline use when installed. Where a user attempts to add a transaction when offline, the post request will be stored using indexedDB and will then be posted to the MongoDB database when the app is back online.

## Visuals:
![screenshot](https://github.com/phillidp1989/PWA-Budget-Tracker/blob/master/public/assets/images/demo.gif)

## Installation:
Clone folder onto your own computer by forking the repository from Github. Install all npm packages using the command "npm install" in the root directory of the project. Open up your MongoDB connection. Run the server by calling "npm start" from the root folder.

## Usage:
Users will type in the name and amount of the transaction and click either add or subtract funds button. The application will then update to reflect the transaction added. When visited on a mobile device, the user will be prompted to download and install the application on their device.

## License:
<img src="https://img.shields.io/github/license/phillidp1989/PWA-Budget-Tracker?logoColor=%23C2CAE8">

## Contributing:
No contributions

## Testing:
No testing framework used

## Languages:
<img src="https://img.shields.io/github/languages/top/phillidp1989/PWA-Budget-Tracker">

## Author:
Name: Dan Phillips

Github Username: phillidp1989

Github Email Address: d.p.phillips@bham.ac.uk

<img src="https://avatars1.githubusercontent.com/u/61989740?v=4">
