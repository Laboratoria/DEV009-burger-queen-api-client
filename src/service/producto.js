const token = localStorage.getItem('token'); 

const headers = {
  'Authorization': `Bearer ${token}`, 
  "Content-Type": "application/json",
};

const baseUrl = 'http://127.0.0.1:8080'

//Funcion para obtener todos los productos 
export const getAllProductos = async () => {
  const response = await fetch(`${baseUrl}/products?_page=1&_limit=10`, { method: 'GET', headers: headers })

  if (response.status == 200) {
    return await response.json()
  }

}

//Funcion para eliminar los productos 

export const deleteAllProducts = async (productId) => {
  const response = await fetch(`${baseUrl}/products/${productId}`, { method: 'DELETE', headers: headers })
  if (response.status == 200) {
    return await response.json()
  }
}


//Funcion para editar los productos

export const updateProduct = async (productId, updatedData) => {
  const response = await fetch (`${baseUrl}/products/${productId}`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(updatedData),
  })

  if (response.status == 200) {
    return await response.json()
  }
}

//Funcion para crear los productos 
export const createProduct = async (productData) => {
  const response = await fetch(`${baseUrl}/products`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(productData),
  });

  if (response.status === 201) {
    return await response.json();
  } else {
    throw new Error('No se pudo crear el producto');
  }
};