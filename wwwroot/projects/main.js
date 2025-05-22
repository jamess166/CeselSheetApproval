const login = document.getElementById('login');

try {
    const resp = await fetch('/api/auth/profile');
    if (resp.ok) {
        const user = await resp.json();
        login.innerText = `Logout (${user.name})`;
        login.onclick = () => {
            const iframe = document.createElement('iframe');
            iframe.style.visibility = 'hidden';
            iframe.src = 'https://accounts.autodesk.com/Authentication/LogOut';
            document.body.appendChild(iframe);
            iframe.onload = () => {
                window.location.replace('/api/auth/logout');
                document.body.removeChild(iframe);
            };
        };

        // Aquí cargamos los proyectos (en lugar del viewer)
        // loadProjects();

    } else {
        login.innerText = 'Login';
        login.onclick = () => window.location.replace('/api/auth/login');
    }
    login.style.visibility = 'visible';
} catch (err) {
    alert('No se pudo iniciar la aplicación. Ver consola para más detalles.');
    console.error(err);
}

// Aquí defines la función loadProjects()
async function loadProjects() {
    const loading = document.getElementById('loadingSpinner');
    const container = document.getElementById('projectsList');
    const empty = document.getElementById('emptyState');
    console.log('Cargando proyectos...');

    loading.classList.remove('d-none');
    container.innerHTML = '';
    empty.classList.add('d-none');

    try {
        const resp = await fetch('/api/projects');
        if (!resp.ok) throw new Error(await resp.text());
        const projects = await resp.json();

        if (projects.length === 0) {
            empty.classList.remove('d-none');
        } else {
            for (const project of projects) {
                const card = document.createElement('div');
                card.classList.add('project-card');
                card.innerHTML = `
                    <h5>${project.name}</h5>
                    <p>${project.description || ''}</p>
                    <button onclick="selectProject('${project.id}')" class="btn btn-outline-primary">
                        Seleccionar
                    </button>
                `;
                container.appendChild(card);
            }
        }
    } catch (err) {
        alert('No se pudieron cargar los proyectos. Ver consola.');
        console.error(err);
    } finally {
        loading.classList.add('d-none');
    }
}

// (opcional) Define también selectProject() si lo usas
function selectProject(id) {
    console.log('Proyecto seleccionado:', id);
    // Aquí puedes guardar el ID en localStorage, o redirigir a otra página
}