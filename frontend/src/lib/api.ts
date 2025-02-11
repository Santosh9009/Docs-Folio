const API = process.env.NEXT_PUBLIC_API_URL;
export async function fetchFromAPI(endpoint: string) {
    try {
        const response = await fetch(`${API+endpoint}`);
        if (!response.ok) {
            console.log('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.log('Error fetching data:');
        throw error;
    }
} 