import {HttpServer} from '../server/httpServer';
export interface Controller {
    initialize(httpsServer:HttpServer): void;

}