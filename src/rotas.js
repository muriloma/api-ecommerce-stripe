const express = require('express')
const clientes = require('./controladores/clientes')

const rotas = express()

rotas.get('/cliente', clientes.listar)


module.exports = rotas