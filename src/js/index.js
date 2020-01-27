// Polyfills
@import '../../node_modules/babel-polyfill/browser.js'

// Main
(function() {
  // Constants
  const rootPath = 'static/content'
  // Utils
  const loadify = @import './utils/loadify.js'
  const zipRecords = @import './utils/zipRecords.js'

  (async function() {
    const header = document.getElementById('header')
    const main = document.getElementById('main')
    const footer = document.getElementById('footer')

    const { records } = await loadify(`${rootPath}/index.json`)
    const items = zipRecords(records)

    const cachedItems = {}

    const setItem = ({ title, body }) => {
      header.innerText = title
      main.innerText = body.join('\n')
    }

    const selectItem = async (fileName) => {
      if (!fileName) { return }

      const item = cachedItems[fileName] || await loadify(`${rootPath}/${fileName}`)

      if (!(fileName in cachedItems)) {
        cachedItems[fileName] = item
      }

      setItem(item)
    }

    const select = document.createElement('select')
    select.id = 'menuSelect'
    select.oninput = ({ target }) => {
      selectItem(target.value)
    }

    const createOption = item => {
      const option = document.createElement('option')
      option.value = item.fileName
      option.innerText = item.name
      select.appendChild(option)
    }

    createOption({ value: '', name: 'Select a song'})

    items
      .sort((a, b) => a.name > b.name ? 1 : -1)
      .forEach(createOption)

    footer.appendChild(select)
  })()
})()
