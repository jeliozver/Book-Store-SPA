# Book Store SPA (Angular 6)

### Description

Book Store is a simple single page application (SPA) that lets you buy, rate and leave your comment for all the books that are available in the store. You can also see all of your purchased books history or create your own favorite books list.

### Tech

Book Store uses a number of open source projects to work:
* [MongoDB](https://www.mongodb.com) - Free and open-source cross-platform document-oriented database
* [Mongoose](http://mongoosejs.com/index.html) - Elegant MongoDB object modeling for NodeJS
* [NodeJS](https://nodejs.org/en/) - Evented I/O for the backend
* [ExpressJS](https://expressjs.com) - Fast, unopinionated, minimalist web framework for NodeJS
* [JSONWebToken](https://jwt.io) - Used for authorization
* [Angular](https://angular.io) - Platform that makes it easy to build applications with the web

The goal of this project is to show the core concepts of building SPA with ExpressJS and Angular. In this project I've used:

* Wrapped each major feature into a module
* Lazy-loading for most of the modules so the app can start faster
* Preload lazy-loaded modules after the app starts so they can be ready for use as soon as possible
* Services for each major feature
* Guards to prevent unauthorized users to view routes that require authentication or admin rights
* Interceptors for attaching JWT token to the request headers, showing notifications from the server response and error handling
* Custom directives
* TypeScript models
* Reactive forms for handling user input

### Installation

Book Store requires 
* [MongoDB](https://www.mongodb.com/download-center#community) v3.6+
* [NodeJS](https://nodejs.org/en/) v8+

Install MongoDB and start the database (port: 27017)

```sh
$ cd server
$ start-mongodb
```

Install the dependencies and start the server (port: 8000)

```sh
$ cd server
$ npm install
$ npm start
```

Install the dependencies and start the client (port: 4200)

```sh
$ cd..
$ cd client
$ npm install
$ ng serve
```

### Features

- Anonymous users
    - Login/Register
    - View all books
    - View books details, rating and comments

- Authenticated users
    - Buy books
    - Rate books
    - Comment books
    - Create favorite books list

- Admin users
    - Add books to the store
    - Edit books
    - Delete books
    - Delete offensive user comments
    - Block user from commenting

### Authors

* [Zhelyan Radoev](https://github.com/jeliozver)

### License
----

MIT