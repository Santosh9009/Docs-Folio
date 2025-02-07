const API_BASE_URL = "http://localhost:5001";

export const fetchAbout = async () => {
    const response = await fetch(`${API_BASE_URL}/about`);
    if (!response.ok) throw new Error("Failed to fetch about data");
    return response.json();
};

export const fetchProjects = async () => {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) throw new Error("Failed to fetch projects data");
    return response.json();
};

export const fetchContact = async () => {
    const response = await fetch(`${API_BASE_URL}/contact`);
    if (!response.ok) throw new Error("Failed to fetch contact data");
    return response.json();
};
