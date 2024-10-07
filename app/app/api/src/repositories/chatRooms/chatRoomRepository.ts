import ChatRoom from '../../models/chatRooms/chatRoomModel';

class ChatRoomRepository {
    
        // Crée un nouveau ChatRoom ou retourne le chatRoom existant
        static async create(data: { title: string; fromId: string; toId: string }) {
            try {
                // Récupère le chatRoom existant
                const chat = await this.getChat(data.fromId, data.toId);
                if (!chat) {
                    // Crée un nouveau chatRoom s'il n'existe pas
                    const newChatRoom = new ChatRoom(data);
                    return await newChatRoom.save();
                }
                return chat; // Retourne le chatRoom existant
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Error creating ChatRoom: ${error.message}`);
                }
                throw new Error('Unknown error occurred while creating ChatRoom');
            }
        }
    
        // Récupère un chatRoom existant en fonction des utilisateurs
        static async getChat(fromId: string, toId: string) {
            try {
                // Recherche un chatRoom où les deux utilisateurs sont présents
                const chat = await ChatRoom.findOne({ users: { $all: [fromId, toId] } }).populate('users');
                if (!chat) {
                    return null; // Aucun chatRoom trouvé
                }
                return chat; // Retourne le chatRoom existant
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Error fetching ChatRoom: ${error.message}`);
                }
                throw new Error('Unknown error occurred while fetching ChatRoom');
            }
        }
    
    
    static async getById(id: string) {
        try {
            const chat = await ChatRoom.findById(id);
            if (chat) {
                return chat;
            } else {
                throw new Error('ChatRoom not found');
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error fetching ChatRoom by ID: ${error.message}`);
            }
            throw new Error('Unknown error occurred while fetching ChatRoom by ID');
        }
    }

    static async getAll() {
        try {
            const chats = await ChatRoom.find({});
            return chats;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error fetching ChatRooms: ${error.message}`);
            }
            throw new Error('Unknown error occurred while fetching ChatRooms');
        }
    }

  

   
}

export default ChatRoomRepository;
