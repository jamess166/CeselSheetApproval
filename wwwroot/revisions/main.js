import { loadRevisions } from "./revisions.js";


const login = document.getElementById('login'); 
try {
    const resp = await fetch('/api/auth/profile');
    if (resp.ok) {
        const user = await resp.json();
        console.log('Usuario logueado:', user); 
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
        login.style.visibility = 'visible';
        
        console.log('Usuario logueado:', user);
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('projectId');
        console.log('Project ID:', projectId);

        await loadRevisions(projectId);
        // getAccessToken
        // const accessToken = getAccessToken();
        // const reviews = await getRevisions(projectId);
        // // if (!projectId) {
        //     alert('Falta projectId en la URL');           
        // }
        // await loadRevisions(projectId);
        // const accessToken = localStorage.getItem('access_token');

        // if (!accessToken) {
        //     alert('No tienes token válido');
        //     window.location.replace('/');            
        // }

        // const reviews = await getReviews(projectId, accessToken);
        // renderReviews(reviews);
        // console.log(reviews);  

    } else {
        login.innerText = 'Login';
        login.onclick = () => window.location.replace('/api/auth/login');
    }
    login.style.visibility = 'visible';
} catch (err) {
    alert('Could not initialize the application. See console for more details.');
    console.error(err);
}