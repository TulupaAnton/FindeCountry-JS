document.addEventListener('DOMContentLoaded', () => {
  const countriesContainer = document.getElementById('countries-container')
  const searchInput = document.getElementById('search')
  const regionFilter = document.getElementById('regionFilter')

  let countriesData = []

  async function fetchCountries () {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all')
      const data = await response.json()
      countriesData = data
      displayCountries(data)
    } catch (error) {
      console.error('Error fetching countries:', error)
    }
  }

  function displayCountries (countries) {
    countriesContainer.innerHTML = ''
    countries.forEach(country => {
      const countryCard = document.createElement('div')
      countryCard.classList.add('country-card')
      countryCard.innerHTML = `
                <img src="${country.flags.svg}" alt="Flag of ${
        country.name.common
      }">
                <h3>${country.name.common}</h3>
                <p>Population: ${country.population.toLocaleString()}</p>
                <p>Region: ${country.region}</p>
                <p>Capital:${country.capital ? country.capital[0] : 'N/A'}</p>
            `
      countriesContainer.appendChild(countryCard)
    })
  }

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase()
    const filteredCountries = countriesData.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm)
    )
    displayCountries(filteredCountries)
  })

  regionFilter.addEventListener('change', () => {
    const selectedRegion = regionFilter.value
    const filteredCountries = selectedRegion
      ? countriesData.filter(country => country.region === selectedRegion)
      : countriesData
    displayCountries(filteredCountries)
  })

  fetchCountries()
})

function toggleTheme () {
  document.body.classList.toggle('dark-mode')
  const isDarkMode = document.body.classList.contains('dark-mode')
  document.getElementById('theme-toggle').innerText = isDarkMode
    ? '☀️ Light Mode'
    : '🌙 Dark Mode'
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
}

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleButton = document.getElementById('theme-toggle')
  themeToggleButton.addEventListener('click', toggleTheme)

  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode')
    themeToggleButton.innerText = '☀️ Light Mode'
  }
})
