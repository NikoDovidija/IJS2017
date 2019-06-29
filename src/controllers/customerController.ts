import {Controller } from "./controller";
import { HttpServer } from "../server/httpServer";
import { Request, Response } from "restify";
import { CustomerService, customerService } from "../services/customerService";
import { Customer } from "../models/customer";
export class CustomerController implements Controller{

    initialize(httpsServer: HttpServer): void {
        httpsServer.get('/customers', this.list.bind(this))
        httpsServer.get('/customer/:id', this.getById.bind(this))
        httpsServer.post('/customer', this.create.bind(this))
        httpsServer.put('/customer/:id', this.update.bind(this))
        httpsServer.del('/customer/:id', this.remove.bind(this))
    }

    private async list(req: Request,res: Response): Promise<void>{
        res.send(await customerService.list());
    }

    private async getById(req: Request, res: Response): Promise<void> {
        let customer = await customerService.getById(req.params.id)
        res.send(customer ? 200 : 404,customer)
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await customerService.create(req.body));
    }

    private async update(req: Request, res: Response): Promise<void> {
        let customer = await customerService.update(req.params.id)
        res.send(customer ? 200 : 404, customer)
    }

    private async remove(req: Request, res: Response): Promise<void> {
        res.send(await customerService.deleteById(req.params.id));
    }
    
    
}