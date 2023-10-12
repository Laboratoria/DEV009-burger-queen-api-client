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


    const userRole = data.user.role; 
    localStorage.setItem("userRole", userRole);


    localStorage.setItem("accessToken", data.accessToken);

    return data;
  } else {
    throw new Error("Ha ocurrido un error en la petición");
  }
};



