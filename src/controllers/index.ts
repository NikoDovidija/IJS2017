import { CustomerController } from "./customerController";
import { PingController } from "./PingController";
export const CONTROLLERS = [
    new CustomerController(),
    new PingController()
];