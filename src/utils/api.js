const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const fetchTenants = async () => {
  try {
    const response = await fetch(`${API_URL}/tenants`);
    if (!response.ok) throw new Error("Failed to fetch tenants");
    return await response.json();
  } catch (error) {
    console.error("Error fetching tenants:", error);
    return [];
  }
};
