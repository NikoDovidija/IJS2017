import { Customer } from "../models/customer";
import { DatabaseProvider} from '../db/index'
import { DeleteResult } from "typeorm";
export class CustomerService{

    public async getById(id:number): Promise<Customer> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Customer).findOne(id)
    }

    public async create(customer: Customer): Promise<void>{
        const connection = await DatabaseProvider.getConnection();
        await connection.getRepository(Customer).save(customer)
    }

    public async list(): Promise<Customer[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Customer).find();
    }

    public async update(customer: Customer): Promise<Customer> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(Customer);
        const entity = await repo.findOne(customer.id);
        entity.firstName = customer.firstName;
        entity.lastName = customer.lastName;
        return await repo.save(entity);
    }

    public async deleteById(id: number): Promise<void> {
        const connection = await DatabaseProvider.getConnection();
        await connection.getRepository(Customer).delete(id);
    }
}

export const customerService = new CustomerService();