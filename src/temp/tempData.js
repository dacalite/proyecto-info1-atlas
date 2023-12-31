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

export const tempData = [
  {
    "_id": "6591b61803db24b10753a057",
    "IdProyecto": "AAA",
    "IdAplicacion": "App001",
    "TipoAplicacion": "web",
    "Framework": "react",
    "NombreArchivo": "main.js",
    "Lenguaje": "javascript",
    "Breakpoints": [
      412,
      442,
      372,
      13,
      38,
      294,
      28,
      427,
      451,
      422,
      13,
      304,
      478,
      257,
      450,
      199,
      338,
      108
    ],
    "createdAt": "2023-12-31T18:42:32.902Z",
    "updatedAt": "2023-12-31T18:42:32.902Z"
  }
]

export const tempData2 = [
  {
    _id: 1,
    IdProyecto: 'AAA',
    IdAplicacion: 'App001',
    TipoAplicacion: 'web',
    Framework: 'react',
    NombreArchivo: 'main.js',
    Lenguaje: 'javascript',
    Breakpoints: [1, 2, 3, 4],
  },
  {
    _id: 2,
    IdProyecto: 'CCC',
    IdAplicacion: 'App002',
    TipoAplicacion: 'mobile',
    Framework: 'vue',
    NombreArchivo: 'main.js',
    Lenguaje: 'typescript',
    Breakpoints: [1, 2, 3, 4],
  },
  {
    _id: 3,
    IdProyecto: 'BBB',
    IdAplicacion: 'App001',
    TipoAplicacion: 'server',
    Framework: 'svelte',
    NombreArchivo: 'main.js',
    Lenguaje: 'javascript',
    Breakpoints: [],
  },
  {
    _id: 4,
    IdProyecto: '123',
    IdAplicacion: 'App001',
    TipoAplicacion: 'standalone',
    Framework: 'react',
    NombreArchivo: 'main.js',
    Lenguaje: 'javascript',
    Breakpoints: [1],
  },
  {
    _id: 5,
    IdProyecto: 'ABC123',
    IdAplicacion: 'App001',
    TipoAplicacion: 'web',
    Framework: 'react',
    NombreArchivo: 'main.js',
    Lenguaje: 'javascript',
    Breakpoints: [1, 2, 3, 4, 5],
  },
  {
    _id: 6,
    IdProyecto: 'DDD',
    IdAplicacion: 'App001',
    TipoAplicacion: 'server',
    Framework: 'svelte',
    NombreArchivo: 'main.js',
    Lenguaje: 'javascript',
    Breakpoints: [],
  },
  {
    _id: 7,
    IdProyecto: 'EEE',
    IdAplicacion: 'App001',
    TipoAplicacion: 'standalone',
    Framework: 'react',
    NombreArchivo: 'main.js',
    Lenguaje: 'javascript',
    Breakpoints: [1],
  },
  {
    _id: 8,
    IdProyecto: 'FFF',
    IdAplicacion: 'App001',
    TipoAplicacion: 'web',
    Framework: 'react',
    NombreArchivo: 'main.js',
    Lenguaje: 'javascript',
    Breakpoints: [1, 2, 3, 4, 5],
  },
]
