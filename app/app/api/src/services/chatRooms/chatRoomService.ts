import ChatRoomRepository from '../../repositories/chatRooms/chatRoomRepository';
import MessageRepository from '../../repositories/messages/messageRepository';

class ChatRoomService {

    static async create(data: { title: string;fromId:string;toId:string}){

        try{
         return await ChatRoomRepository.create(data);
        }catch(error){
            throw error;
        }
    }
static async chatMessages(chatId:string){
    try{
        return await MessageRepository.getByChat(chatId);
       }catch(error){
           throw error;
       }
}
    static async getById(id:string){

        try{
         return await ChatRoomRepository.getById(id);
        }catch(error){
            throw error;
        }
    }
    static async getAll(){

        try{
         return await ChatRoomRepository.getAll();
        }catch(error){
            throw error;
        }
    }


}

export default ChatRoomService;