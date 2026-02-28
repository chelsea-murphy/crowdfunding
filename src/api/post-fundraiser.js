export default async function postFundraiser(fundraiserData) {
  const token = window.localStorage.getItem("token");
  const url = `${import.meta.env.VITE_API_URL}/fundraisers/`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`,
    },
    body: JSON.stringify({
      title: fundraiserData.title,
      description: fundraiserData.description,
      goal: fundraiserData.goal,
      image: fundraiserData.image,
      is_open: true,
    }),
  });

  if (!response.ok) {
    const fallbackError = `Error creating fundraiser`;
    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });
    
    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}