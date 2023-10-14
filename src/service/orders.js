const baseUrl = 'http://127.0.0.1:8080'

export const createOrder = async (orderData) => {
  const response = await fetch(`${baseUrl}/orders`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (response.status === 201) {
    return await response.json();
  } else {
    throw new Error('No se pudo crear el producto');
  }
};


//Funcion para obtener todos las ordenes 
export const getAllOrdenes = async () => {
  const response = await fetch(`${baseUrl}/orders?_page=1&_limit=10`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json",
    }
  })

  console.log(response)
  if (response.status == 200) {
    return await response.json()
  }
  else {
    throw new Error('Token invalido inicie sesion nuevamente')
  }

}

export const updateOrden = async (orderId, updatedData) => {
  try {
    const response = await fetch(`${baseUrl}/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (response.status === 200) {
      return await response.json();
    } else if (response.status === 401) {
      // Maneja el caso de token no válido aquí
      throw new Error('Token inválido, inicie sesión nuevamente');
    } else if (response.status === 404) {
      throw new Error('Orden no encontrada');
    } else {
      // Maneja otros códigos de estado aquí
      throw new Error('Error al actualizar la orden');
    }
  } catch (error) {
    console.error('Error al actualizar la orden:', error);
    throw error;
  }
};

//Funcion para eliminar la orden 

export const deleteOrder = async (orderId) => {
  try {
    const response = await fetch(`${baseUrl}/orders/${orderId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      // Orden eliminada con éxito
      const responseData = await response.json();
      return responseData;
    } else if (response.status === 404) {
      // Orden no encontrada
      return { error: 'La orden no existe' };
    } else if (response.status === 401) {
      // No autorizado, token inválido, etc.
      return { error: 'No autorizado para eliminar la orden' };
    } else {
      // Otro error
      return { error: 'Error al eliminar la orden' };
    }
  } catch (error) {
    // Error de red u otro error
    console.error('Error al eliminar la orden:', error);
    return { error: 'Error de red al eliminar la orden' };
  }
};