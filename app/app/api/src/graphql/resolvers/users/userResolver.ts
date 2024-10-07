import UserService from '../../../services/users/userService';
interface UserInput {
    username: string;
    password: string;
}

const userResolver = {
    Query: {
        getUser: async (_:unknown,{userId}:{userId:string}) => {
            return await UserService.getById(userId);
        },
        getUsers: async ()=>{
            return await UserService.getAll();
        }
    },
    Mutation: {
        createUser: async (_:unknown,{input}:{input:UserInput}) => {
            // Logic to create a user
            return await  UserService.create(input);

        },
        login: async (_:unknown,{loginData}:{loginData:UserInput}) => {
            
            return await  UserService.login(loginData);

        },
    },
};

export default userResolver;