import { connect } from 'mongoose'

console.log(process.env.DB_URL)

connect(process.env.DB_URL!!).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log('Failed to connect to MongoDB: ', err.message)
})