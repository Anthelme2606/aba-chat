import Message from "../../models/messages/messageModel";

// Interface pour les données de message
interface MessageData {
  sender: string; // ID de l'utilisateur qui envoie le message
  chatId: string; // ID de la conversation
  content: string; // Contenu du message
}

class MessageRepository {
  // Créer un message
  static async create(data: MessageData) {
    try {
      const newMessage = await Message.create(data);
      return newMessage;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating message: ${error.message}`);
      }
      throw new Error("Unknown error occurred while creating message");
    }
  }
  static async getAll() {
    try {
      const all = await Message.find({}).sort({ createdAt: 1 }); // 1 pour tri croissant
      return all;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error: ${error.message}`);
      }
      throw new Error("Unknown error occurred while fetching");
    }
  }
  static async getByChat(chatId:string){
    try{
      return await Message.find({ chatId }).sort({ createdAt: 1 }); 
   
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error: ${error.message}`);
      }
      throw new Error("Unknown error occurred while fetching");
    }
  }
  

  // Obtenir le dernier message d'une conversation
  static async lastMessage(chatId: string) {
    try {
      const lastMessage = await Message.findOne({ chatId })
        .sort({ createdAt: -1 }) // Tri par date de création décroissante
        .exec();
      return lastMessage;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error retrieving last message: ${error.message}`);
      }
      throw new Error("Unknown error occurred while retrieving last message");
    }
  }

  // Compter le nombre de messages non lus
  static async countUnreadMessages(chatId: string, userId: string) {
    try {
      const count = await Message.countDocuments({
        chatId,
        sender: userId, // Vérifie les messages envoyés par l'utilisateur
        read: false, // Messages non lus
      });
      return count;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error counting unread messages: ${error.message}`);
      }
      throw new Error("Unknown error occurred while counting unread messages");
    }
  }

  // Mettre à jour son propre message
  static async updateOwnMessage(messageId: string, content: string) {
    try {
      const updatedMessage = await Message.findByIdAndUpdate(
        messageId,
        { content },
        { new: true } 
      ).exec();
      return updatedMessage;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating message: ${error.message}`);
      }
      throw new Error("Unknown error occurred while updating message");
    }
  }

  // Supprimer son propre message
  static async deleteOwnMessage(messageId: string) {
    try {
      const deletedMessage = await Message.findByIdAndDelete(messageId).exec();
      return deletedMessage;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting message: ${error.message}`);
      }
      throw new Error("Unknown error occurred while deleting message");
    }
  }

  // Répondre à un message
  static async replyMessage(
    oldMessageId:string,
    messageId: string,
    replyData: MessageData
  ) {
    try {
      
      const replyMessage = await Message.create({
        ...replyData,
        replyTo: messageId, // Lier la réponse à l'ID du message d'origine
      });
      return replyMessage;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error replying to message: ${error.message}`);
      }
      throw new Error("Unknown error occurred while replying to message");
    }
  }
}

export default MessageRepository;
