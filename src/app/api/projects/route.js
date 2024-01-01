import { connectDB } from '@/libs/mongodb'
import Project from '@/models/Project'
import { NextResponse } from 'next/server'

function generarSerieAleatoria() {
  const tamanoSerie = Math.floor(Math.random() * 51)

  const serie = []

  for (let i = 0; i < tamanoSerie; i++) {
    const numeroAleatorio = Math.floor(Math.random() * 500) + 1
    serie.push(numeroAleatorio)
  }

  return serie
}

export async function GET(req, res) {
  try {
    await connectDB()

    const projects = await Project.find({})

    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    )
  }
}

export async function POST(req, res) {
  try {
    await connectDB()

    const body = await req.json()
    const {
      IdProyecto,
      IdAplicacion,
      TipoAplicacion,
      Framework,
      NombreArchivo,
      Lenguaje,
    } = body

    if (
      !IdProyecto ||
      !IdAplicacion ||
      !TipoAplicacion ||
      !Framework ||
      !NombreArchivo ||
      !Lenguaje
    ) {
      return NextResponse.json(
        {
          error: 'Todos los campos son obligatorios',
        },
        {
          status: 400,
        }
      )
    }

    const Breakpoints = generarSerieAleatoria()

    const newProject = new Project({
      IdProyecto,
      IdAplicacion,
      TipoAplicacion,
      Framework,
      NombreArchivo,
      Lenguaje,
      Breakpoints,
    })

    await newProject.save()

    return NextResponse.json(
      {
        message: 'Proyecto creado correctamente',
      },
      {
        status: 201,
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    )
  }
}

export async function PUT(req, res) {
  try {
    await connectDB()

    const body = await req.json()
    const {
      IdProyecto,
      IdAplicacion,
      TipoAplicacion,
      Framework,
      NombreArchivo,
      Lenguaje,
    } = body

    if (
      !IdProyecto ||
      !IdAplicacion ||
      !TipoAplicacion ||
      !Framework ||
      !NombreArchivo ||
      !Lenguaje
    ) {
      return NextResponse.json(
        {
          error: 'Todos los campos son obligatorios',
        },
        {
          status: 400,
        }
      )
    }


    const ProjectToUpdate = await Project.findOneAndUpdate(
      { IdProyecto },
      {
        IdProyecto,
        IdAplicacion,
        TipoAplicacion,
        Framework,
        NombreArchivo,
        Lenguaje,
      },
      { new: true, runValidators: true }
    )

    if (!ProjectToUpdate) {
      return NextResponse.json(
        {
          error: 'El proyecto no existe',
        },
        {
          status: 404,
        }
      )
    }

    return NextResponse.json(
      {
        message: 'Proyecto actualizado correctamente',
      },
      {
        status: 201,
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    )
  }
}

export async function DELETE(req, res) {
  try {
    await connectDB()

    const id = req.nextUrl.searchParams.get('id')

    const ProjectToDelete = await Project.findOneAndDelete({ IdProyecto: id })

    if (!ProjectToDelete) {
      return NextResponse.json(
        {
          error: 'El proyecto no existe',
        },
        {
          status: 404,
        }
      )
    }

    return NextResponse.json(
      {
        message: 'Proyecto eliminado correctamente',
      },
      {
        status: 201,
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    )
  }
}
