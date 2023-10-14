
const headers = {
  "Content-Type": "application/json",
};

const baseUrl = 'http://127.0.0.1:8080'


export const loginAuth = async (credentials) => {
  const response = await fetch(`${baseUrl}/login`, { method: 'POST', headers: headers, body: JSON.stringify(credentials) })
  return { status: response.status, data: await response.json() }
}



// if (response.ok) {
//   // Si la respuesta es exitosa, asumimos que el usuario está autenticado
//   const data = await response.json();
//   console.log(data)

//   // Almacenar el token en el estado o en las cookies/local storage
//   const token = data.accessToken;

//   localStorage.setItem('token', token)
//   //
//   localStorage.setItem('user', JSON.stringify(data.user))
//   console.log(token)
//   navigateTo('/admin/usuarios')

//   // Redirigir al usuario a la página protegida o realizar otras acciones
// } else {
//   // Manejar errores de autenticación, como credenciales incorrectas
// }



