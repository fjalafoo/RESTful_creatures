const express = require('express')
const router = express.Router()

//filesystem core module
const fs = require('fs')

router.get('/',(req,res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs);
    res.render('dinosaurs/index', {myDinos: dinoData})
    
})

router.get('/new', (req,res)=>{
    res.render('dinosaurs/new')
})

// anything with column should be down, cause it will be confused when it comes to index
router.get('/:idx', (req,res)=>{
    //get dinosaurs
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // console.log('This is the req.params object! ',req.params)
    let dinoIndex = parseInt(req.params.idx)

    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]});

})

router.post('/',(req,res)=>{
    console.log('This is the Request Body: ', req.body)
    res.redirect('/dinosaurs')
})

module.exports = router