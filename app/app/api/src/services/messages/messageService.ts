import ChatRoomRepository from '../../repositories/chatRooms/chatRoomRepository';
import MessageRepository from '../../repositories/messages/messageRepository';
import UserRepository from '../../repositories/users/userRepository';
class MessageService {

    static async create(data: { sender: string; content: string ;chatId:string;}){

        try{
         return await MessageRepository.create(data);
        }catch(error){
            throw error;
        }
    }

    static async getChat(id:string){

        try{
         return await ChatRoomRepository.getById(id);
        }catch(error){
            throw error;
        }
    }
    static async getUser(id:string){

        try{
         return await UserRepository.getById(id);
        }catch(error){
            throw error;
        }
    }
    static async getAll(){

        try{
         return await MessageRepository.getAll();
        }catch(error){
            throw error;
        }
    }


}

export default MessageService;