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
app.get('/prehistoric_creatures/new', (req, res) => {
    res.render('prehistoric_creatures/new');
  });

//express show route for creatures (lists one creature)
app.get('/prehistoric_creatures/:idx', (req, res) => {
    // get creatures
    let creatures = fs.readFileSync('./prehistoric_creatures.json');
    let creatureData = JSON.parse(creatures);
  
    //get array index from url parameter
    let creatureIndex = parseInt(req.params.idx);
  
    //render page with data of the specified animal
    res.render('prehistoric_creatures/show', {myCreature: creatureData[creatureIndex]});
  });



  app.post('/prehistoric_creatures', (req, res) => {
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
  

module.exports = router