const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const port = 8080

app.get('/categories', (req, res) => {
  const categoriesPath = path.join(__dirname, 'categories.json')
  const categoriesData = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'))

  const categoriesMap = {}
  const root = {
    categoryId: "root",
    name: "Root Category",
    parent: null,
    children: []
  }

  categoriesData.forEach(category => {
    category.children = []
    categoriesMap[category.categoryId] = category
  })

  categoriesData.forEach(category => {
    if (category.parent === "root") {
      root.children.push(category)
    } else {
      const parentCategory = categoriesMap[category.parent]
      parentCategory.children.push(category)
    }
  })

  res.json(root)
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
