const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },1000)})
  myPromise.then((successMessage) => {
    res.send(JSON.stringify({books}, null, 4));
  })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },1000)})
  myPromise.then((successMessage) => {
    res.send(JSON.stringify(books[isbn], null, 4));
  })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const booksArray = Object.values(books);
  let myPromise = new Promise((resolve,reject) => {
    let filter_author = booksArray.filter((book)=>book.author===author);
    resolve(JSON.stringify({filter_author}, null, 4));
  })
  myPromise.then((successMessage) => {
    res.send(successMessage);
  })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const booksArray = Object.values(books);
    let myPromise = new Promise((resolve,reject) => {
        let filter_title = booksArray.filter((book)=>book.title===title);
        resolve(JSON.stringify({filter_title}, null, 4));
      })
      myPromise.then((successMessage) => {
        res.send(successMessage);
      })
  });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  //let filtered_book = books.filter((book)=>book.isbn == isbn);
  res.send("review for isbn["+isbn+"]:"+JSON.stringify(books[isbn].review, null, 4));
});

module.exports.general = public_users;
