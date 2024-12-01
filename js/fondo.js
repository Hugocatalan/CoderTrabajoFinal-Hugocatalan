
const apiUrl = "https://picsum.photos/1920/1080?random";
const body = document.body;
fetch(apiUrl)
    .then(response => {
        if (response.ok) {
            
            body.style.backgroundImage = `url(${response.url})`;
            body.style.backgroundSize = 'cover';
            body.style.backgroundPosition = 'center';
            body.style.height = '100vh'; 
        } else {
            console.error("Error al obtener la imagen.");
        }
    })
    .catch(error => {
        console.error("Error al hacer la solicitud:", error);
    });
