const mongoose = require("mongoose");
const Member = require("../app/member/model");
const Book = require("../app/book/model");
const { dbHost, dbName, dbPort } = require("../app/config");

mongoose
  .connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {})
  .then(async () => {

    const membersCount = await Member.countDocuments();
    const booksCount = await Book.countDocuments();

    if (membersCount === 0) {
      const membersData = [
        {
          code: "M001",
          name: "Angga",
        },
        {
          code: "M002",
          name: "Ferry",
        },
        {
          code: "M003",
          name: "Putri",
        },
      ];

      Member.insertMany(membersData)
        .then(() => {
          console.log("Members inserted successfully");
        })
        .catch((err) => {
          console.error("Error inserting members:", err);
        });
    }

    if (booksCount === 0) {
      const booksData = [
        {
          code: "JK-45",
          title: "Harry Potter",
          author: "J.K Rowling",
          stock: 1,
        },
        {
          code: "SHR-1",
          title: "A Study in Scarlet",
          author: "Arthur Conan Doyle",
          stock: 1,
        },
        {
          code: "TW-11",
          title: "Twilight",
          author: "Stephenie Meyer",
          stock: 1,
        },
        {
          code: "HOB-83",
          title: "The Hobbit, or There and Back Again",
          author: "J.R.R. Tolkien",
          stock: 1,
        },
        {
          code: "NRN-7",
          title: "The Lion, the Witch and the Wardrobe",
          author: "C.S. Lewis",
          stock: 1,
        },
      ];

      Book.insertMany(booksData)
        .then(() => {
          console.log("Books inserted successfully");
        })
        .catch((err) => {
          console.error("Error inserting Books:", err);
        });
    }
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

const db = mongoose.connection;

module.exports = db;
