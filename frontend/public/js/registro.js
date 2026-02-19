const formRegistro = document.getElementById('formRegistro');
const inputs = document.querySelectorAll('input');
const divResultado = document.querySelector('.divResultado');

if (formRegistro) {
    formRegistro.addEventListener('submit', async (e)=>{
        e.preventDefault();
        const datos = {};
        inputs.forEach((campo)=>{
            datos[campo.name] = campo.value
        })
        const response = await fetch('http://localhost:1234/cunca/usuario/api/registro', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(datos)
        });
        const data = await response.json();
        console.log('DATA EN REGISTRO: ', data);
        
         if (data.error) {
            data.error.forEach(e=>{
                if (e.message.includes('jugadores.correo')) {
                    divResultado.innerHTML=`<p>El correo ya se encuentra en uso.</p>`;
                } else if (e.message.includes('jugadores.username')){
                    divResultado.innerHTML=`<p>El nombre de usuario ya se encuentra en uso.</p>`
                }else{
                    divResultado.insertAdjacentHTML('beforeend', `<p>${e.message}</p>`);
                }
                setTimeout(()=>{
                    divResultado.innerHTML="";
                }, 6000)
            })
        }else{
            divResultado.innerHTML = `
                    <span style="color: green;">¡${data.message}!</span>
                `;
            setTimeout(() => {
                window.location.href = '/cunca/inicio';
            }, 2000)
        }
    })
}