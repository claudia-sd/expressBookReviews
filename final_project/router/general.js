const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  // Check if email is provided in the request body
    if (req.body.username) {
        // Create or update friend's details based on provided email
        users[req.body.username] = {
            "password": req.body.password,
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            // Add similarly for DOB
        };
    }else{
        res.send("Please enter an username");
    };
    // Send response indicating user addition
    //res.send("The user" + (' ') + (req.body.username) + " Has been added!");
    res.send("Customer succesfully registered! Now you can login");
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books,null,4));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
    const isbn = req.params.isbn;
    res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const author = req.params.author; // Get the author from request parameters
  const matchedBooks = []; // Create an array to store matched books

  // Iterate over each key in the books object
  const keys = Object.keys(books);
  for (let i = 0; i < keys.length; i++) {
      const book = books[keys[i]]; // Get the book using the key
      if (book.author === author) { // Check if the author matches
          matchedBooks.push(book); // If so, push it to the matchedBooks array
      }
  }
  // Check if any books were found
  if (matchedBooks.length > 0) {
      res.status(200).json(matchedBooks); // Send the matched books as a response
  } else {
      res.status(404).json({ message: "No books found for this author" }); // No books found
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const title = req.params.title; // Get the title from request parameters
  const matchedBooks = []; // Create an array to store matched books

  // Iterate over each key in the books object
  const keys = Object.keys(books);
  for (let i = 0; i < keys.length; i++) {
      const book = books[keys[i]]; // Get the book using the key
      if (book.title === title) { // Check if the author matches
          matchedBooks.push(book); // If so, push it to the matchedBooks array
      }
  }
  // Check if any books were found
  if (matchedBooks.length > 0) {
      res.status(200).json(matchedBooks); // Send the matched books as a response
  } else {
      res.status(404).json({ message: "No books found for this title" }); // No books found
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const isbn = req.params.isbn;
  res.send("Title: "+books[isbn].title+" - Reviews: "+ JSON.stringify(books[isbn].reviews));
});

module.exports.general = public_users;
