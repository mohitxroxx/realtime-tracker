import express, { Request, Response } from 'express'
import cookieparser from 'cookie-parser'
import {Server} from "socket.io"
import http from "http"
import cors from "cors"
import path from "path"
import 'dotenv/config'

import connectDB from './config/db'
import routes from './router/routes'

//connectDB()
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieparser())

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))


const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req: Request, res: Response) => {
    res.render("index")
})

app.use('/api', routes)

const port: number = Number(process.env.PORT)

io.on("connection",function(socket){
    socket.on("send-location", function(data){
        io.emit("receive-location", {id: socket.id , ...data})
    })
    console.log("connected established")

    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id)
    })
})

server.listen(port, () => {
    console.log(`Server is up and Running at http://localhost:${port}`)
})
