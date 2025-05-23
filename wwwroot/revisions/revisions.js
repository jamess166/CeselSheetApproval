export async function loadRevisions(projectId) {
    console.log('Cargando revisiones para el proyecto:', projectId);
    
    // Extraer hubId de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const hubId = urlParams.get('hubId');
    
    if (!hubId) {
        console.error('No se encontró hubId en la URL');
        return;
    }

    try {
        const res = await fetch(`/api/hubs/${hubId}/projects/${projectId}/revisions`);
        
        console.log('Respuesta de la API:', res);
        
        if (!res.ok) {
            const error = await res.json();
            console.error('Error en la respuesta:', error);
            return;
        }
        
        const revisions = await res.json();
        console.log('Revisiones obtenidas:', revisions);
        renderRevisions(revisions);
        
    } catch (error) {
        console.error('Error al cargar revisiones:', error);
    }
}

// function renderRevisions(revisions) {
//     const tbody = document.querySelector('#revisionsTable tbody');
//     if (!tbody) return; // Asegura que exista

//     tbody.innerHTML = '';
//     revisions.forEach(review => {
//         const tr = document.createElement('tr');
//         tr.innerHTML = `
//             <td>${review.status || ''}</td>
//             <td>${review.id || ''}</td>
//             <td>${review.title || ''}</td>
//             <td>${review.createdBy?.name || ''}</td>
//             <td>${new Date(review.createdAt).toLocaleString()}</td>
//         `;
//         tbody.appendChild(tr);
//     });
// }