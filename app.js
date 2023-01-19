//console.log("HELLOO NODE !");
const dotenv = require('dotenv')
dotenv.config()
const express = require ("express")
const bodyParser = require("body-parser")
//const sequelize = require('./src/db/sequelize')

const app = express()


const port = process.env.PORT || 3000

app
    //.use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())

app.use(function (req, res, next) {
    res.setHeader('X-Powered-By', 'Rainbows')
    next()
})

//sequelize.initDb()


app.get("/", (req, res) => {
    res.json('hello fievre noire')
})

/*require ('./src/routes/findAllPokemon')(app)
require ('./src/routes/findPokemonByPk')(app)
require ('./src/routes/createPokemon')(app)
require ('./src/routes/updatePokemon')(app)
require ('./src/routes/deletePokemon')(app)
require ('./src/routes/deletePokemons')(app)
require ('./src/routes/login')(app)*/

// Ici nous aurons nos points de terminison

// gestion des erreurs 404

app.use(({ res })=>{
    const message = 'Impossible de trouver la resources demandée ! vous pouvez essayer une autre URL'
    res.status(404).json({message})
})
app.listen(port, () => console.log(`Application started on https://localhost:${port}`))