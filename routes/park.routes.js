const express = require('express')
const router = express.Router()

const Park = require('../models/park.model')

// Aquí los endpoints

router.get('/new', (req, res, next) => res.render('parks/new-park'))


router.post('/new', (req, res, next) => {

    console.log(req.body)
    const { name, description, active } = req.body

    Park.create({ name, description, active })
        .then(() => res.redirect('/parks/new'))
        .catch(err => console.log("Hubo un error", err))
})


module.exports = router