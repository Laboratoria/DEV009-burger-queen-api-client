
const token = localStorage.getItem('token')

const headers = {
  'Authorization': `Bearer ${token}`, // Puedes agregar otros encabezados personalizados aquí
  'Content-Type': 'application/json',
};

// const baseUrl = 'https://virtserver.swaggerhub.com/ssinuco/BurgerQueenAPI/2.0.0'
const baseUrl = 'http://127.0.0.1:8080'


//metodo para consumir endPoint con el metodo get 
export const getAllUsuario = async () => {
  const response = await fetch(`${baseUrl}/users?_page=1&_limit=10`, { method: 'GET', headers: headers })

  if (response.status == 200) {
    return await response.json()
  }

}

//funcion para consumir el endPoint de eliminar usuario 

export const deleteAllUsers = async (id) => {
  const response = await fetch(`${baseUrl}/users/${id}`, { method: 'DELETE', headers: headers })
  if (response.status == 200) {
    return await response.json()
  }
}

//funcion para consumir el endPoint de crear usuario
export const postUsers = async (data) => {

  const response = await fetch(`${baseUrl}/users`, { method: 'POST', headers: headers, body: JSON.stringify(data) })
  if (response.status == 200) {
    return await response.json()
  }
}

//funcion para consumir el endPoint de actualizar usuario
export const updateUsers = async (id, data) => {
  const response = await fetch(`${baseUrl}/users/${id}`, { method: 'PATCH', headers: headers, body: JSON.stringify(data) })
  if (response.status == 200) {
    return await response.json()
  }
}