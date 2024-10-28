export async function fetchUser(email:any) {
  try {
    const response = await fetch(`/api/me?email=${email}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}
