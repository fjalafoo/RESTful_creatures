const express = require('express')
const router = express.Router()

//filesystem core module
const fs = require('fs')

//list all dinosaurs
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
    // console.log('This is the Request Body: ', req.body)
   
     // read dinosaurs file
     let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);

    // add item to dinosaurs array
    dinoData.push(req.body);

    // save dinosaurs to the data.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));

    //redirect to the GET /dinosaurs route (index)
    res.redirect('/dinosaurs');
})

router.delete('/:idx', (req,res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // remove the deleted dinosaur from the dinosaurs array
    dinoData.splice(req.params.idx, 1)

    // save the new dinosaurs to the data.json file
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));

  //redirect to the GET /dinosaurs route (index)

    res.redirect('/dinosaurs')
})

router.get('/edit/:idx', (req,res)=>{
    //grab dino data
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    //display edit page
    res.render('dinosaurs/edit',
     {dino: dinoData[req.params.idx], 
        dinoId: req.params.idx})
})

router.put('/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
  
    //re-assign the name and type fields of the dinosaur to be editted
    dinoData[req.params.idx].name = req.body.name;
    dinoData[req.params.idx].type = req.body.type;
  
     // save the editted dinosaurs to the data.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
    res.redirect('/dinosaurs');
  })

module.exports = router