import axios from "axios";


const API_BASE_URL = process.env.API_BASE_URL;

// récupère le token du local storage
const token = localStorage.getItem("token");

// crée une instance d'Axios avec le token d'autorisation configuré
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
});

export async function createTag(createTagDto, user) {
    const response = await axiosInstance.post("/tag/", {...createTagDto, user });
    return response.data;
}

export async function getAllTags() {
    const response = await axiosInstance.get("/tag/");
    return response.data;
}

export async function getTagById(id) {
    const response = await axiosInstance.get(`/tag/${id}`);
    return response.data;
}

export async function updateTag(id, updateTagDto) {
    const response = await axiosInstance.put(`/tag/${id}`, updateTagDto);
    return response.data;
}

export async function removeTag(id) {
    const response = await axiosInstance.delete(`/tag/${id}`);
    return response.data;
}