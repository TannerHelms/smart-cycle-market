import { connect } from 'mongoose'

const uri = 'mongodb://localhost:27017/smart-cycle-market'

connect(uri).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log('Failed to connect to MongoDB: ', err.message)
})