'use strict'

function onInit() {
  renderFilterByQueryStringParams()
  renderBooks()
}

function renderBooks() {
  var books = getBooks()
  const strHtml = books.map(
    (book) =>
      `<tr>
    <td class="book-id">${book.id}</td>
    <td class="book-title">${book.title}</td>
    <td class="book-price">${book.price}$</td>
    <td class="book-rate">${book.rate}</td>
    <td class="btn-container">
      <button data-trans="read-btn" class="read-btn" onclick="onReadBook(${book.id})">Read</button>
      <button data-trans="update-btn" class="update-btn" onclick="onOpenPriceModal(${book.id})">Update</button>
      <button data-trans="delete-btn" class="delete-btn" onclick="onDeleteBook(${book.id})">Delete</button>
    </td>
  </tr>
`
  )
  document.querySelector('.books-container').innerHTML = strHtml.join('')
  doTrans()
}

function onDeleteBook(bookId) {
  deleteBook(bookId)
  renderBooks()
}

function onAddBook(ev) {
  ev.preventDefault()
  var title = document.querySelector('.enter-book-name').value
  var price = +document.querySelector('.enter-book-price').value
  addBook(title, price)
  renderBooks()
}

function onUpdateBook(ev) {
  ev.preventDefault()
  const elPriceModal = document.querySelector('.change-price-modal')
  const bookId = +elPriceModal.dataset.id
  var newPrice = +document.querySelector('.enter-price-modal').value
  updateBook(bookId, newPrice)
  renderBooks()
}

function onReadBook(bookId) {
  const book = getBookById(bookId)
  const elModal = document.querySelector('.modal')
  const elNum = document.querySelector('.num')
  elModal.querySelector('h3').innerText = book.title
  elModal.querySelector('h4').innerText = book.price + '$'
  elModal.querySelector('p').innerText = book.desc
  elModal.classList.add('open')
  elModal.dataset.id = bookId
  elNum.innerText = book.rate
}

function onUpdateRating(plusOrMinus) {
  const elNum = document.querySelector('.num')
  const elModal = document.querySelector('.modal')
  if (plusOrMinus === -1) {
    if (elNum.innerText <= 0) return
    parseInt(elNum.innerText--)
    updateRate(elModal.dataset.id, parseInt(elNum.innerText))
    renderBooks()
  }

  if (plusOrMinus === 1) {
    if (elNum.innerText >= 10) return
    parseInt(elNum.innerText++)
    updateRate(elModal.dataset.id, parseInt(elNum.innerText))
    renderBooks()
  }
}

function onSetFilterBy(filterBy) {
  filterBy = setBookFilter(filterBy)
  renderBooks()

  const queryStringParams = `?maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}&title=${filterBy.title}`
  const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + queryStringParams
  window.history.pushState({ path: newUrl }, '', newUrl)
}

function renderFilterByQueryStringParams() {
  const queryStringParams = new URLSearchParams(window.location.search)
  const filterBy = {
    title: queryStringParams.get('title') || '',
    maxPrice: +queryStringParams.get('maxPrice') || 0,
    minRate: +queryStringParams.get('minRate') || 0,
  }

  if (!filterBy.title && !filterBy.maxPrice && filterBy.minRate) return
  setBookFilter(filterBy)
}

function onCloseModal() {
  document.querySelector('.modal').classList.remove('open')
}

function onMoveToPage(page) {
  moveToPage(page)
  renderBooks()

  const currPage = getCurrPage()

  document.querySelector('.next').disabled = currPage === getPageCount() - 1 ? true : false
  document.querySelector('.prev').disabled = currPage === 0 ? true : false
}

function onSetLang(lang) {
  setLang(lang)
  if (lang === 'he') document.body.classList.add('rtl')
  else document.body.classList.remove('rtl')
  doTrans()
}

function onOpenPriceModal(bookId) {
  const elPriceModal = document.querySelector('.change-price-modal')
  document.querySelector('.overlay').classList.add('open')
  elPriceModal.classList.add('open')
  elPriceModal.dataset.id = bookId
}

function onClosePriceModal() {
  document.querySelector('.change-price-modal').classList.remove('open')
  document.querySelector('.overlay').classList.remove('open')
}

function onOpenAddBookModal() {
  document.querySelector('.create-book-modal').classList.add('open')
  document.querySelector('.overlay').classList.add('open')
}

function onCloseBookModal() {
  document.querySelector('.create-book-modal').classList.remove('open')
  document.querySelector('.overlay').classList.remove('open')
}
