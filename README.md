# MyReads Project

This project is the final milestone of the the third part (React Fundamentals) of Udacity's React Nanodegree program. Essentially it's an application which allow the users to study collections of flashcards. The app will allow users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.. 

## Start of the application

Clone the repository, change directories, and use npm or yarn to install the dependencies.

```bash
$ cd Flashcards
$ yarn
```


## Tests

| Platform | Device                | Tested             |
| :------- | :-------------------- | :----------------- |
| iOS      | iPhone 8 (ios 13.1.3) | :white_check_mark: |
| Android  | POCO F1 (android 9.0)   | :white_check_mark: |

## Code base
```bash
├── README.md - This file.
├── package.json # npm package manager file. 
├── public
├── App.js # This is the root of the app. 
└── src
    └── routes
        ├── StackNavigator.js  # Used for sticky Headers
        └── TabNavigator.js  #Used for Tab Navigation

    ├── screens
        ├── AddCard.js  # Used for Adding card to deck
        ├── DeckInfo.js  # Used for showing deck information
        ├── Decks.js  # Used for showing decks list
        ├── Quiz.js  # Used for showing deck assoicated quiz
        ├── Result.js  # Used for showing quiz result
        └── AddDeck.js  #Used for adding new deck

    ├── utility
        ├── _helper_.js  # Used for making helper function for getting and posting decks
        └── notifications.js  #Used for setting up local notification for the user
```
