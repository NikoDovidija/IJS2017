import { HttpServer } from "./httpServer";
import * as restify from 'restify';
import { CONTROLLERS } from "../controllers";

export class ApiServer implements HttpServer{
    private restify:restify.Server;

    get(url: string, requestHandler: restify.RequestHandler): void {
        this.addRoute('get',url,requestHandler);
    }
    post(url: string, requestHandler: restify.RequestHandler): void {
        this.addRoute('post', url, requestHandler);
    }
    put(url: string, requestHandler: restify.RequestHandler): void {
        this.addRoute('put', url, requestHandler);
    }
    del(url: string, requestHandler: restify.RequestHandler): void {
        this.addRoute('del', url, requestHandler);
    }
    private addRoute(method:'get' | 'post' | 'put' | 'del',url:string, requestHandler:restify.RequestHandler){
        this.restify[method](url, async (req,res,next)=>{
            try{
                await requestHandler(req,res,next);
            }catch(e){
                console.log(e);
                res.send(500,e);
            }
        });

        console.log(`added route ${method.toUpperCase()}: ${url}`);
    }

    public start(port:number){
        this.restify = restify.createServer();
        this.restify.use(restify.plugins.bodyParser());
        this.restify.use(restify.plugins.queryParser());

        CONTROLLERS.forEach(controller => controller.initialize(this))
        this.restify.listen(port,()=> console.log(`server is up and running on port ${port}`))
        // TODO controller init
    }
}