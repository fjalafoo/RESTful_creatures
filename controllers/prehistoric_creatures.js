const express = require('express')
const router = express.Router()

//filesystem core module
const fs = require('fs')

//list all creatures
router.get('/',(req,res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures);
    res.render('prehistoric_creatures/index', {myCreature: creatureData})
    
})

//new
router.get('/new', (req, res) =>{
  res.render('prehistoric_creatures/new')

})


//express show route for creatures (lists one creature)
router.get('/:id', (req, res) => {
    // get creatures
    let creatures = fs.readFileSync('./prehistoric_creatures.json');
    let creatureData = JSON.parse(creatures);
  
    //get array index from url parameter
    let creatureIndex = parseInt(req.params.id);
  
    //render page with data of the specified animal
    res.render('prehistoric_creatures/show', {myCreature: creatureData[creatureIndex]});
});



  router.post('/', (req, res) => {
    // read creatures file
    let creatures = fs.readFileSync('./prehistoric_creatures.json');
    let creatureData = JSON.parse(creatures);

    // add item to creatures array
    creatureData.push(req.body);
  
    // save creatures to the data.json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData));
  
    //redirect to the GET /prehistoric route (index)
    res.redirect('/prehistoric_creatures');
  });
  
  router.delete('/:id', (req,res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)

    // remove the deleted dinosaur from the dinosaurs array
    creatureData.splice(req.params.id, 1)

    // save the new dinosaurs to the data.json file
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData));

  //redirect to the GET /dinosaurs route (index)

    res.redirect('/prehistoric_creatures')
})

router.get('/edit/:id', (req,res)=>{
  //grab creature data
  let creatures = fs.readFileSync('./prehistoric_creatures.json')
  let creatureData = JSON.parse(creatures)

  //display edit page
  res.render('prehistoric_creatures/edit',
   {myCreature: creatureData[req.params.id], 
      creatureId: req.params.id})
})


router.put('/:id', (req, res) => {
  let creatures = fs.readFileSync('./prehistoric_creatures.json');
  let creatureData = JSON.parse(creatures);

  //re-assign the name and type fields of the dinosaur to be editted
  creatureData[req.params.id].img_url = req.body.img_url;
  creatureData[req.params.id].type = req.body.type;

   // save the editted dinosaurs to the data.json file
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData));
  res.redirect('/prehistoric_creatures');
})



module.exports = router