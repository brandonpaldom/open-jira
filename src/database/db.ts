import mongoose from 'mongoose'

const mongoConnection = {
  isConnected: 0,
}

export const connect = async () => {
  if (mongoConnection.isConnected) {
    console.log('Using existing connection')
    return
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState

    if (mongoConnection.isConnected === 1) {
      console.log('Using existing connection')
      return
    }

    await mongoose.disconnect()
  }

  await mongoose.connect(process.env.MONGODB_URI as string)
  mongoConnection.isConnected = 1
  console.log('Connected to database', process.env.MONGODB_URI)
}

export const disconnect = async () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Not disconnecting from database in development mode')
    return
  }
  if (mongoConnection.isConnected === 0) {
    console.log('Not connected to database')
    return
  }

  mongoConnection.isConnected = 0

  await mongoose.disconnect()
  console.log('Disconnected from database')
}
