const express = require('express')
const bodyParser = require('body-parser')
const conn = require('./db/conn')
const Book = require('./models/Book')

const app = express()
app.use(bodyParser.json())

app.post('/livro', async (req, res) => {
    const book = req.body
    try{
        const bookOut = await Book.create(book)
        res.status(201).json(bookOut)
    }catch(err){
        res.status(400).json({error: err.message})
    }
})

app.get('/livros', async (req,res) =>{
    const books = await Book.findAll()
    res.json(books)
})

app.get('/livro/:id', async (req,res) =>{
    const id = parseInt(req.params.id)
    const book = await Book.findByPk(id)
    if(book){
        res.json(book)
        return;
    }
    res.status(404).json({ error: 'Book not found or id not identified' })
    return;
})

app.put('/livro/:id', async (req,res) =>{
    const id = parseInt(req.params.id)
    const book = req.body
    try {
        let bookAux = await Book.findByPk(id)
        if(bookAux){
            await bookAux.update(book)
            bookAux = await Book.findByPk(id)
            res.json(bookAux)
            return;
        }
        res.status(404).json({ error: 'Book not found or id not identified' })
        return;
        
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.patch('/livro/:id', async (req,res) =>{
    const id = parseInt(req.params.id)
    const book = req.body
    try {
        let bookAux = await Book.findByPk(id)
        if(bookAux){
            await bookAux.update(book)
            bookAux = await Book.findByPk(id)
            res.json(bookAux)
            return;
        }
        await res.status(404).json({ error: 'Book not found or id not identified' })
        return;

    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.delete('/livro/:id', async (req,res) =>{
    const id = parseInt(req.params.id)
    try {
        const book = await Book.findByPk(id)
        if(book){
            await book.destroy()
            res.status(200).json({ sucess: 'Sucessfully deleted book' })
            return;
        }
        res.status(404).json({ error: 'Book not found or id not identified' })
        return;

    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

conn.sync()
    .then(() =>{ app.listen(3000) })
    .catch((err) => console.log(err))