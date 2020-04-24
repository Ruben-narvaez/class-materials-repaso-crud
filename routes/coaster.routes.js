const express = require('express')
const router = express.Router()

// Aquí los endpoints
// router.get('/new', (req, res, next) => res.render('coasters/new-coaster'))

const Coaster = require('../models/coaster.model')
const Park = require('../models/park.model')

router.get('/new', (req, res, next) => {

    Park.find()
        .then(allParks => res.render('coasters/new-coaster', { allParks }))
            .catch(err => console.log("Ha habido un error!", err))

})

router.post('/new', (req, res, next) => {

    console.log(req.body)
    const { name,
        description,
        inversions,
        length,
        park,
        active } = req.body

    Coaster.create({ name, description, inversions, length, park, active })
        .then(() => res.redirect('/coasters/new'))
        .catch(err => console.log("Hubo un error", err))
})

// router.get('/', (req, res, next) => res.render('coasters/coasters-index'))

router.get('/', (req, res, next) => {

    Coaster.find()
        .populate('park')
        .then(allCoasters => res.render('coasters/coasters-index', { allCoasters }))
        .catch(err => console.log("Ha habido un error!", err))
})

// router.get('/:id', (req, res, next) => res.render('coasters/coaster-details'))

router.get('/:id', (req, res, next) => {
    Coaster.findById(req.params.id)
        .populate('park')
        .then(coasterDetails => res.render('coasters/coaster-details', coasterDetails))
        .catch(err => {
            console.log(`An error ocurred: ${err}`)
            next()
        })
})

module.exports = router