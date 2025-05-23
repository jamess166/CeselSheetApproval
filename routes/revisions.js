const express = require('express');
const { authRefreshMiddleware, getRevisions } = require('../services/aps.js');


const router = express.Router();

router.use('/api/hubs', authRefreshMiddleware);
// router.get('/:projectId', async (req, res) => {
//     console.log('>> Entrando a GET /api/revisions/:projectId');
//     try {
//         const { projectId } = req.params;
//         const token = req.session.internal_token;
//         const revisions = await getRevisions(projectId, token);
//         res.json(revisions);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = router;

// router.get('/api/revisions/', async (req, res) => {
//     console.log('>> Entrando a GET /api/revisions');
//     console.log('Query params:', req.query);
//     console.log('Session:', req.session);

//     try {
//         const { projectId, hubId } = req.query; // <-- ahora viene desde query string
//         const token = req.session.internal_token;

//         if (!projectId || !hubId) {
//             return res.status(400).json({ error: 'Faltan projectId o hubId en la query' });
//         }

//         console.log(`Obteniendo revisiones para proyecto ${projectId} en hub ${hubId}`);
//         const revisions = await getRevisions(projectId, token); // puedes usar también hubId si lo necesitas

//         res.json(revisions);
//     } catch (err) {
//         console.error('Error en GET /api/revisions:', err);
//         res.status(500).json({ error: err.message });
//     }
// });

router.get('/api/hubs/:hub_id/projects/:project_id/revisions', async (req, res, next) => {    
    try {
        // const revisions = await getRevisions(req.params.project_id, req.internalOAuthToken.access_token);
        // res.json(revisions);
        const entries = await getProjectContents(req.params.hub_id, req.params.project_id, req.query.folder_id, req.internalOAuthToken.access_token);
                res.json(entries.map(entry => ({ id: entry.id, name: entry.attributes.displayName, folder: entry.type === 'folders' })));
    } catch (err) {
        next(err);
    }
});

module.exports = router;