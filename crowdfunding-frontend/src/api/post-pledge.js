export default async function postPledge(fundraiserId, pledgeData) {
    const token = window.localStorage.getItem("token");
    const url = `${import.meta.env.VITE_API_URL}/pledges/`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        },
        body: JSON.stringify({
            amount: pledgeData.amount,
            comment: pledgeData.comment,
            anonymous: pledgeData.anonymous,
            fundraiser: fundraiserId,
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error creating pledge`;
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
    
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}