import axios from "axios"

export async function requestProjects() {
  try {
    const response = await axios.get('http://localhost:3000/api/projects')
    return response.data
  } catch (error) {
    console.error('Error al obtener los datos:', error)
    throw error
  }
}