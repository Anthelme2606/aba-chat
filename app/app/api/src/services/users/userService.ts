import UserRepository from '../../repositories/users/userRepository';

class UserService {

   
        static async create(data: { username: string; password: string }) {
            try {
               
                const existingUser = await UserRepository.getByUsername(data.username);
                if (existingUser) {
                    throw new Error('Username already taken');
                }
    
                
                const newUser = await UserRepository.create(data);
                return newUser;
            } catch (error) {
                
                throw error; 
            }
        }
    
    
    static async getAll(){
        return await UserRepository.getAll(); 
    }
    static async getById(id:string){
        return await UserRepository.getById(id); 
    }
    static async login(data:{username:string;password:string}){
        return await UserRepository.login(data); 
    }

}

export default UserService;