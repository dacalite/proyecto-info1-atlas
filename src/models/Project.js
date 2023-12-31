import mongoose, { Schema } from 'mongoose'

const ProjectSchema = new Schema(
  {
    IdProyecto: { type: String, required: true, unique: true },
    IdAplicacion: { type: String, required: true, unique: true },
    TipoAplicacion: { type: String, required: true },
    Framework: { type: String, required: true },
    NombreArchivo: { type: String, required: true },
    Lenguaje: { type: String, required: true },
    Breakpoints: [{ type: Number, required: true }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const Project =
  mongoose.models.Project || mongoose.model('Project', ProjectSchema)

export default Project
