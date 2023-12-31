import mongoose from 'mongoose'

export async function connectDB() {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URL)
    if (connection.readyState === 1) {
      console.log('MongoDB connected')
      return Promise.resolve(true)
    }
  } catch (error) {
    console.error(error)
    return Promise.reject(false)
  }
}
