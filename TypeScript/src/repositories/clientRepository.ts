import AppDataSource from '../data-source';
import Client from '../entities/Client';

const clientRepository = AppDataSource.getRepository(Client);

export default clientRepository;
