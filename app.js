const express = require('express');
const path = require('path');
const solutions = require('./data/solutions');
const policies = require('./data/policies');
const partners = require('./data/partners');
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index', { partners })
})

app.get('/partners', (req, res) => {
  res.render('partners', { title: 'Technology Partners | TS Lab', activePage: 'partners', partners })
})

app.get('/partners/:slug', (req, res, next) => {
  const partner = partners.find(item => item.slug === req.params.slug)
  if (!partner) return next()
  res.render('partner-detail', { title: `${partner.name} Solutions | TS Lab`, activePage: 'partners', partner })
})

app.get('/solutions', (req, res) => {
  res.render('solutions', { title: 'Cybersecurity Solutions | TS Lab', activePage: 'solutions', areas: solutions })
})

app.get('/solutions/:slug', (req, res, next) => {
  const area = solutions.find(solution => solution.id === req.params.slug)
  if (!area) return next()
  res.render('solution-detail', {
    title: `${area.label} | TS Lab`,
    activePage: 'solutions',
    area,
    areas: solutions
  })
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About TS Lab | Technology with purpose', activePage: 'about' })
})

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact TS Lab | Talk to our team', activePage: 'contact' })
})

app.get('/terms-and-conditions', (req, res) => {
  res.render('policy', { title: 'Terms & Conditions | TS Lab', policy: policies.terms })
})

app.get('/privacy-policy', (req, res) => {
  res.render('policy', { title: 'Privacy Policy | TS Lab', policy: policies.privacy })
})

app.listen(port, (error) => {
  if (error) {
    console.error(`Could not start TS Lab on port ${port}: ${error.message}`)
    process.exit(1)
  }
  console.log(`TS Lab running at http://localhost:${port}`)
})
