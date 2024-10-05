const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
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
      return new Promise((resolve, reject) => {
        try {
            resolve(books);
        } catch (error) {
            reject(error);
        }
    })
    .then((books) => {
        res.send(JSON.stringify(books, null, 4));
    })
    .catch((error) => {
        res.status(500).send({ error: 'An error occurred while fetching the books.' });
    });
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;

    new Promise((resolve, reject) => {
        const book = books[isbn];
        if (book) {
            resolve(book);
        } else {
            reject(new Error('Book not found'));
        }
    })
    .then(book => {
        res.send(book);
    })
    .catch(err => {
        res.status(404).send({ error: err.message });
    });
 });

  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  
  function findBooksByAuthor(author) {
    return new Promise((resolve, reject) => {
      const matchedBooks = [];
      const keys = Object.keys(books);
      for (let i = 0; i < keys.length; i++) {
          const book = books[keys[i]];
          if (book.author === author) {
              matchedBooks.push(book);
          }
      }

      if (matchedBooks.length > 0) {
          resolve(matchedBooks);
      } else {
          reject({ message: "No books found for this author" });
      }
    });
  }
  findBooksByAuthor(author)
    .then(matchedBooks => {
      res.status(200).json(matchedBooks);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});



// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
  
  function findBooksByTitle(title) {
    return new Promise((resolve, reject) => {
      const matchedBooks = [];
      const keys = Object.keys(books);
      for (let i = 0; i < keys.length; i++) {
          const book = books[keys[i]];
          if (book.title === title) {
              matchedBooks.push(book);
          }
      }

      if (matchedBooks.length > 0) {
          resolve(matchedBooks);
      } else {
          reject({ message: "No books found for this title" });
      }
    });
  }
  findBooksByTitle(title)
    .then(matchedBooks => {
      res.status(200).json(matchedBooks);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const isbn = req.params.isbn;
  res.send("Title: "+books[isbn].title+" - Reviews: "+ JSON.stringify(books[isbn].reviews));
});

module.exports.general = public_users;
