const result = []
let filterItems = []
let currentItemId = null

function put (data) {
    result.push(data)
}

function getAll() {
    return result
}

function get(id) {
    const items = result.filter(r => r.id === id)
    if (items.length > 0) {
        return items[0]
    }
}

function search(word) {
    // console.log(word, result)
    const items = word.length === 0 ? getAll() : result.filter(r => ~r.content.toLowerCase().indexOf(word.toLowerCase()))
    showItems(items)
    filterItems = items
}

function showItems(items) {
    const history = document.querySelector('.list ul')
    // console.log(history)
    history.innerHTML = ''
    items.forEach(item => {
        // console.log(item)
        const li = document.createElement('li')
        const href = document.createElement('a')
        href.innerText = item.content.replace(/\<br\/\>/g,' ')
        href.onclick = (evt) => showMemo(item)
        href.href = '#this'
        li.appendChild(href)
        history.appendChild(li)
    })
}

function showMemo(item) {
    document.querySelector('.text').innerHTML = item.content
    currentItemId = item.id
}

function saveItem(evt) {
    const html = document.querySelector('textarea').value.replace(/\n/g, '<br/>')
    console.log(html)
    put({
        id: new Date() * 1,
        content: html,
    })
    search(document.querySelector('.search-box').value)
    // showItems(items)

    document.querySelector('textarea').value = ''
    document.querySelector('textarea').focus()
}

function saveEditItem() {
    if (!currentItemId) {
        return
    }
    const html = document.querySelector('.text').innerHTML
    const item = result.filter(it => it.id === currentItemId)[0]
    if(!item) {
        return
    }
    console.log(currentItemId, item)
    item.content = html
    showItems(filterItems)
}

function initHistory() {
    console.log('start to init list')

    for (let i = 0; i < 4; i ++) {
        put({
            id: new Date() * 1 + Math.random(),
            content: i + '. Put new Message at ' + new Date() + Math.random(),
        })
    }

    const items = getAll()
    filterItems = items
    showItems(items)
}

function deleteItem() {
    if (!currentItemId) {
        return
    }
    const index = result.findIndex(item => item.id === currentItemId)
    if(index < 0){
        return
    }
    result.splice(index, 1)

    search(document.querySelector('.search-box').value)
    // showItems(filterItems)

    document.querySelector('.text').innerHTML = 'DELETED'
}
