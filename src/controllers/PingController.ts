import { Controller } from "./controller";
import { HttpServer } from '../server/httpServer'

export class PingController implements Controller {
    initialize(httpsServer: HttpServer): void {
        httpsServer.get('/ping',(req,res) => res.send(200,'hello'))
    }
}