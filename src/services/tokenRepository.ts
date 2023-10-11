export const login = async (email: string, password: string) => {
    
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const accessToken = data.accessToken;
      //donde se esta guardando
      localStorage.setItem("accessToken", accessToken); 
      return data; 
    }
    else {
        throw new Error("Ha ocurrido un error en la petición");
        
    }

}