import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

import postRoutes from "./routes/posts.js"

app.use('/posts', postRoutes)

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors());

const CONNECTION_URL = "mongodb+srv://test:test22@cluster0.rcivy.azure.mongodb.net/?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000

mongoose.set('strictQuery', false)

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Servak bezhit na ${PORT}`)))
.catch(err => console.log(err.message))



