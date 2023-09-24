const axios = require('axios')

async function fetchCategories () {
  try {
    const response = await axios.get('http://localhost:8080/categories')
    console.log(response.data)
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

fetchCategories()
