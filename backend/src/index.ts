import 'dotenv/config'
import { httpServer } from "./app";
import connectDB from "./db";


connectDB()
    .then(() => {
        httpServer.listen(process.env.PORT, () => {
            console.log(`Server is listening on PORT ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(`MongoDB connection Error: ${error}`)
        process.exit(1)
    })
