'use strict'
const STORAGE_KEY = 'booksDB'
const gNewBook = []
const PAGE_SIZE = 5

var gBooks
var gFilterBy = { title: ' ', minRate: 0, maxPrice: 20 }
var gIdx = 0
var gPageIdx = 0
var gFilteredBooksCount

_createBooks()

function getBooks() {
  var books = gBooks.filter(
    (book) =>
      book.title.includes(gFilterBy.title) && book.price <= +gFilterBy.maxPrice && book.rate >= +gFilterBy.minRate
  )
  gFilteredBooksCount = books.length
  const startIdx = gPageIdx * PAGE_SIZE
  books = books.slice(startIdx, startIdx + PAGE_SIZE)
  return books
}

function moveToPage(page) {
  if (page === '+') gPageIdx++
  else if (page === '-') gPageIdx--
  else gPageIdx = +page
}

function getPageCount() {
  return Math.ceil(gFilteredBooksCount / PAGE_SIZE)
}

function getCurrPage() {
  return gPageIdx
}

function getBookById(bookId) {
  const book = gBooks.find((book) => bookId === book.id)
  return book
}

function deleteBook(bookId) {
  const bookIdx = gBooks.findIndex((book) => bookId === book.id)
  gBooks.splice(bookIdx, 1)
  _saveBooksToStorage()
}

function updateBook(bookId, newPrice) {
  const book = gBooks.find((book) => book.id === bookId)
  book.price = newPrice
  _saveBooksToStorage()
  return book
}

function updateRate(bookId, newRate) {
  const book = gBooks.find((book) => book.id === +bookId)
  book.rate = newRate
  _saveBooksToStorage()
  return book
}

function addBook(title, newPrice) {
  const book = _createNewBook(title, newPrice)
  gBooks.push(book)
  _saveBooksToStorage()
  return book
}

function _createNewBook(title, price) {
  return {
    id: gIdx++,
    title,
    price,
    desc: makeLorem(),
    rate: 0,
  }
}

function _createBook() {
  return {
    id: gIdx++,
    title: makeLorem(3),
    price: getRandomIntInclusive(5, 20),
    desc: makeLorem(),
    rate: 0,
  }
}

function _createBooks() {
  var books = loadFromStorage(STORAGE_KEY)
  if (!books) {
    books = []
    for (let i = 0; i < 21; i++) {
      books.push(_createBook())
    }
  }
  gBooks = books
  _saveBooksToStorage()
}

function setBookFilter(filterBy = {}) {
  if (filterBy.title || filterBy.title !== undefined) gFilterBy.title = filterBy.title
  if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = +filterBy.maxPrice
  if (filterBy.minRate !== undefined) gFilterBy.minRate = +filterBy.minRate
  return gFilterBy
}

function _saveBooksToStorage() {
  saveToStorage(STORAGE_KEY, gBooks)
}
