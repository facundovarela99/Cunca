const formularioLogin = document.querySelector('.formLogin');
const inputUsername = document.getElementById('inputUsername');
const inputContrasenia = document.getElementById('inputContrasenia');
const divResultado = document.getElementById('divResultado');

if (formularioLogin) {
    formularioLogin.addEventListener('submit', async (e)=>{
        e.preventDefault();
        try{
            const username = inputUsername.value;
            const contrasenia = inputContrasenia.value;
            const response = await fetch('http://localhost:1234/cunca/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({username, contrasenia})
            })
            const data = await response.json();
            console.log('DATA EXTRAIDA DEL POST DEL LOGIN EN INDEX.EJS: ', data);
            if (data.error) {
                data.error.forEach(e=>{
                    divResultado.innerHTML = `
                        <p>${e.message}</p>
                    `
                })
            }else{
                    divResultado.innerHTML = `
                         <span>${data.message}</span>
                         <span style="color: green;">Ingresando...</span>
                        `;
                    setTimeout(() => {
                        window.location.href= '/cunca/home';
                    }, 2000)
                }
        }catch(e){
                 console.log(e)
                divResultado.innerHTML = `
            <p>Error interno del servidor</p>
            `
            }
    })
}
