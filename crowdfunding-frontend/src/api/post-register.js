export default async function postRegister(username, email, password, firstName, lastName) {
  const url = `${import.meta.env.VITE_API_URL}/register/`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
      password2: password,
      first_name: firstName,
      last_name: lastName,
    }),
  });

  if (!response.ok) {
    const fallbackError = `Error trying to register`;
    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });
    
    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}