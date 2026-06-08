import bootstrap from "./app.controller";
import express, { Application } from "express"

// bootstrap()


const app: Application = express()
bootstrap(app)
export default app