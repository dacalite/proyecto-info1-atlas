import mongoose, { Schema } from 'mongoose'
import {
  allowedFrameworks,
  allowedLanguages,
  allowedTypes,
} from '@/utils/allowedTypes'

const ProjectSchema = new Schema(
  {
    IdProyecto: { type: String, required: true, unique: true },
    IdAplicacion: { type: String, required: true, unique: true },
    TipoAplicacion: { type: String, required: true , enum: allowedTypes},
    Framework: { type: String, required: true, enum: allowedFrameworks },
    NombreArchivo: { type: String, required: true },
    Lenguaje: { type: String, required: true, enum: allowedLanguages },
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
