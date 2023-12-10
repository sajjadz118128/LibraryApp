const express = require("express");
const Book = require("../models/Book.js");

const router = express.Router({ mergeParams: true });

const verifyString = (variableName, name) => {
    // Check if the name is null
    if (name === null) {
        throw new Error(`${variableName} cannot be null.`);
    }

    // Check if the name is undefined
    if (name === undefined) {
        throw new Error(`${variableName} cannot be undefined.`);
    }

    // Check if the name is not a string
    if (typeof name !== 'string') {
        throw new Error(`${variableName} must be a string.`);
    }

    // Check if the name is empty or contains only whitespace
    if (name.trim() === '') {
        throw new Error(`${variableName} cannot be empty or contain only whitespace.`);
    }
    // If all checks pass, return true or perform further actions
    return true;
};

/* Get all books */
router.get("/", async (req, res) => {
    try {
        const books = await Book.find({})
        res.status(200).json(books)
    }
    catch (err) {
        return res.status(500).json({
            "error": "Unable to fetch data from the database"
        });
    }
})

/* Add new book */
router.post("/", async (req, res) => {
    try {
        verifyString("bookName", req.body.bookName);
        verifyString("author", req.body.author);
        const newbook = await new Book({
            bookName: req.body.bookName,
            author: req.body.author,
            publisher: req.body.publisher,
            bookCountAvailable: req.body.bookCountAvailable,
        })
        const book = await newbook.save()
        res.status(200).json(book)
    }
    catch (err) {
        res.status(500).json(err.message)
    }
})

/* Update book */
router.put("/:id", async (req, res) => {
    try {
        await Book.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).json("Book details updated successfully");
    }
    catch (err) {
        res.status(500).json(err.message)
    }
})

module.exports = router