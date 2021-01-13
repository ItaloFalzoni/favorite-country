window.addEventListener('load', function() {
  loadApi()
})

async function loadApi() {
  const result = await fetch('https://restcountries.eu/rest/v2/all')
  const defaultListArray = await result.json()
  const favoriteListArray = []

  const defaultList = document.querySelector('.default')
  const favoriteList = document.querySelector('.favorite')

  function createElements(data, parent) {
    function createElement(elementClass, parent, elementType) {
      var element = document.createElement(elementType)
      element.setAttribute('class', elementClass)
      parent.appendChild(element)
      return element
    }

    const elementCard = createElement('card', parent, 'div')
    const elementRowTop = createElement('row', elementCard, 'div')
    const elementTopLeft = createElement('left', elementRowTop, 'div')
    const elementTopRight = createElement('right', elementRowTop, 'div')
    const elementImg = createElement('img', elementTopLeft, 'img')
    const elementName = createElement('name', elementTopLeft, 'p')
    const elementBottomRow = createElement('row', elementCard, 'div')
    const elementBottomLeft = createElement('left', elementBottomRow, 'div')
    const elementButton = createElement('button', elementBottomRow, 'button')

    elementCard.setAttribute('id', data.numericCode)
    elementImg.setAttribute('src', data.flag)
    elementImg.setAttribute('alt', 'Bandeira')
    elementName.textContent = data.translations.br
    elementTopRight.textContent = `ID: ${data.numericCode}`
    elementBottomLeft.textContent = `População: ${data.population}`
    elementButton.setAttribute('id', data.numericCode)

  }

  function loadLists() {
    document.querySelector('.default').innerHTML = ''

    defaultListArray.sort((a, b) => a.translations.br.localeCompare(b.translations.br))
    favoriteListArray.sort((a, b) => a.translations.br.localeCompare(b.translations.br))
    
    defaultListArray.map(data => {
      createElements(data, defaultList)
    })


    document.querySelector('.favorite').innerHTML = ''
    favoriteListArray.map(data => {
      createElements(data, favoriteList)
    })

    var defaultListItems = document.querySelectorAll('.default .card')
    var favoriteListItems = document.querySelectorAll('.favorite .card')
    var arrayDefaultButtons = [...defaultListItems]
    var arrayFavoriteButtons = [...favoriteListItems]
    var actionButtonDefaultArray = document.querySelectorAll('.default .button'), actionAdd
    var actionButtonFavoriteArray = document.querySelectorAll('.favorite .button'), actionRemove
    var action = null

    for (i = 0; i < actionButtonDefaultArray.length; i ++) {
      actionAdd = actionButtonDefaultArray[i]
      actionAdd.addEventListener('click', () => {
        var element = event.path[2]
        action = event.path[3].className
        var index = arrayDefaultButtons.indexOf(element)

        if (action == 'default') {
          favoriteListArray.push(defaultListArray[index])
          defaultListArray.splice(index, 1)
        }
        loadLists()
      })
    }

    for (i = 0; i < actionButtonFavoriteArray.length; i ++) {
      actionRemove = actionButtonFavoriteArray[i]
      actionRemove.addEventListener('click', () => {
        var element = event.path[2]
        action = event.path[3].className
        var index = arrayFavoriteButtons.indexOf(element)

        if (action == 'favorite') {
          defaultListArray.push(favoriteListArray[index])
          favoriteListArray.splice(index, 1)
        }
        loadLists()
      })
    }
  }
  
  loadLists()

}
