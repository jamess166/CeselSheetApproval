async function getJSON(url) {
    const resp = await fetch(url);
    if (!resp.ok) {
        alert('Could not load tree data. See console for more details.');
        console.error(await resp.text());
        return [];
    }
    return resp.json();
}

export async function loadProjects() {
    const container = document.getElementById('projectsList');
    container.innerHTML = '';

    const hubs = await getJSON('/api/hubs');
    for (const hub of hubs) {
        const projects = await getJSON(`/api/hubs/${hub.id}/projects`);

        for (const project of projects) {
            const card = createProjectCard({ ...project, hubId: hub.id });
            container.appendChild(card);
        }
    }
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.classList.add('project-card');

    card.innerHTML = `
        <h3>${project.name}</h3>
        <p>ID: ${project.id}</p>
    `;

    card.addEventListener('click', () => {
        window.location.href = `revisions?hubId=${project.hubId}&projectId=${project.id}`;
    });

    return card;
}