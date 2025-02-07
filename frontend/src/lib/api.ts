export async function fetchFromAPI(endpoint: string) {
    try {
        const response = await fetch(`http://localhost:5001${endpoint}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
} 