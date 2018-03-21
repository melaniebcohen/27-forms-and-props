![cf](https://i.imgur.com/7v5ASc8.png) Lab 27: Forms and Props
======

## Directory Structure
* **README.md**
* **.gitignore**
* **.eslintrc**
* **.eslintignore**
* **package.json**
  * a `build` script has been configured for building the app with webpack
  * a `watch` script has been configured for watching the app with webpack-dev-server
* **webpack.config.js**
* **babelrc**
* **src/** - contains frontend code
* **src/index.html**
* **src/main.js** - contains entire app
* **src/style**
* **src/style/main.scss**

## Installation
1. To install this application, download the files from this repository
2. `cd` to the repository directory and run `npm i`
3. Use `npm run watch` to run the app locally
4. Navigate to the provided local address and enter in Reddit search details to make a request  
    * Subreddit: _**todayilearned**_ 
    * Number of Results (must be between 0-100): _**23**_

## Application Details
* This app uses `React` and is comprised of three main components:
  1. `<App />` - contains the application state and methods for modifying this state
  2. `<SearchForm />` - contains input fields for the user
  3. `<SearchResultList />` - renders result list for user