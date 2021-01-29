import mongoose from 'mongoose'

export let connection: mongoose.Connection

export async function connect(): Promise<void> {
  if (connection) return

  const mongoURI = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/property-swap'

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  connection = mongoose.connection
  
  connection.once('open', () => console.log('Connection established successfully'));
  connection.on('disconnected', () => console.log('Successfully disconnected'));
  connection.on('error', err => console.log('Something went wrong!', err));
  
  await mongoose.connect(mongoURI, options)
}
async function disconnect(): Promise<void> {
  if (!connection) return 

  await mongoose.disconnect()
}

async function cleanup(): Promise<void> {
  for (const collection in connection.collections) {
    await connection.collections[collection].deleteMany({})
  }
}

module.exports = { connect, disconnect, cleanup }
