const express = require('express');
const { Router } = require('express');
const { Genre } = require("../db")
const {API_KEY} = process.env
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/", async (req, res, next) => {
    return Genre.findAll()
    .then((g) => {
        res.send(g)
    })
    .catch((error) => {
        next(error)
    })
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
