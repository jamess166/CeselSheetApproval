const express = require('express');
const { getUserProjects } = require('../services/aps.js');

const router = express.Router();

router.get('/projects/api/all', async function (req, res, next) {
    console.log('Ruta projects/api/all llamada');
    try {
        const access_token = req.session?.internal_token; // <-- token ya lo guardaste aquí
        if (!access_token) return res.status(401).send('No autorizado');

        const projects = await getUserProjects(access_token);
        res.json(projects);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
