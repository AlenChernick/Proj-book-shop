var gTrans = {
  title: {
    en: 'Welcome to Book Shop',
    he: 'ברוכים הבאים לחנות ספרים',
  },

  'filter-by': {
    en: 'Filter By:',
    he: 'סינון על פי:',
  },

  'max-price': {
    en: 'Maximum Price:',
    he: 'מחיר מקסימלי:',
  },

  'min-rate': {
    en: 'Minimum Rate:',
    he: 'דירוג מינימלי:',
  },

  search: {
    en: 'Start Searching...',
    he: 'התחל לחפש...',
  },

  id: {
    en: 'Id',
    he: 'מזהה',
  },

  'table-title': {
    en: 'Title',
    he: 'כותרת',
  },

  price: {
    en: 'Price',
    he: 'מחיר',
  },

  rating: {
    en: 'Rating',
    he: 'דירוג',
  },

  actions: {
    en: 'Actions',
    he: 'פעולות',
  },

  'read-btn': {
    en: 'Read',
    he: 'קריאה',
  },

  'update-btn': {
    en: 'Update',
    he: 'עדכון',
  },

  'delete-btn': {
    en: 'Delete',
    he: 'מחיקה',
  },

  'close-btn': {
    en: 'Close',
    he: 'סגירה',
  },

  'new-book': {
    en: 'Create New Book',
    he: 'צור ספר חדש',
  },

  'prev-btn': {
    en: 'Previous Page',
    he: 'לדף הקודם',
  },

  'next-btn': {
    en: 'Next Page',
    he: 'לדף הבא',
  },

  'book-desc': {
    en: 'Book Description',
    he: 'תיאור הספר',
  },

  'new-price': {
    en: 'Pick Price up to 20$',
    he: 'הזן מחיר עד 20$',
  },

  'btn-new-price': {
    en: 'Update Price',
    he: 'עדכן את המחיר',
  },

  'new-book-name': {
    en: 'Enter Book Name',
    he: 'הזן את שם הספר',
  },

  'new-book-price': {
    en: 'Enter Book Price up to 20$',
    he: 'הזן מחיר עד 20$',
  },

  'create-book-new-btn': {
    en: 'Add Book',
    he: 'הוסף ספר',
  },
}

var gCurrLang = 'en'

function getTrans(transKey) {
  var keyTrans = gTrans[transKey]
  if (!keyTrans) return 'UNKNOWN'

  var txt = keyTrans[gCurrLang] //he
  if (!txt) txt = keyTrans.en

  return txt
}

function doTrans() {
  var els = document.querySelectorAll('[data-trans]')
  els.forEach((el) => {
    var transKey = el.dataset.trans
    var txt = getTrans(transKey)

    if (el.localName === 'input') {
      el.setAttribute('placeholder', txt)
    } else el.innerText = txt
  })
}

function setLang(lang) {
  gCurrLang = lang //he
}

function formatNumOlder(num) {
  return num.toLocaleString('es')
}

function formatNum(num) {
  return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num)
}

function formatDate(time) {
  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }
  return new Intl.DateTimeFormat(gCurrLang, options).format(time)
}

function kmToMiles(km) {
  return km / 1.609
}
