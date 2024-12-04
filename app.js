require('dotenv').config()
const express = require('express')
const app = express()
const usuarioRoutes = require('./src/routes/usuario')
const produtosRoutes = require('./src/routes/produtos')
const cors = require('cors')

app.use(cors())
app.use(express.json())


app.get('/',(req,res) => {    
    res.json({
        message: 'Bem-vindo',
    });
})


app.use('/v1/usuarios', usuarioRoutes);
app.use('/v1/produtos',produtosRoutes)
module.exports = app;
