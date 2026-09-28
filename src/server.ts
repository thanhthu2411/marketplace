import express from "express"
import path from "path"
import router from "./routes/routes.js"

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(process.cwd(), "public")));

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use("/", router)

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})