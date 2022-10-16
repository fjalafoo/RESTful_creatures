const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const app = express()

const PORT = 3500

app.set('view engine', 'ejs')
app.use(ejsLayouts)
//body-parser middleware
app.use(express.urlencoded({extended: false}))

app.use('/dinosaurs',require('./controllers/dinosaurs'))

// app.use('/prehistoric_creatures',require('./controllers/prehistoric_creatures'))



app.get('/',(req,res)=>{
    res.redirect('/dinosaurs')
})

app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}`)
})