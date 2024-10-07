import ChatRoomService from '../../../services/chatRooms/chatRoomService';
//import { PubSub } from 'graphql-subscriptions'; // Importer PubSub

//const pubSub = new PubSub(); // Créer une instance de PubSub

interface ChatInput {
    title: string;
    toId:string;
}
interface User{
    id:string
    username:string
}

interface ChatRoom {
    id: string;
    title: string;
}

const chatResolver = {
    Query: {
        getChats: async () => {
            return await ChatRoomService.getAll();
        },
    },
    Mutation: {
        createChat: async (_: unknown, { input }: { input: ChatInput },{user}:{ user:User }) => {
            if (!user) {
                throw new Error("Unauthorized");
            }
            const fromId:string = user.id; 
           
            const chatData = {
                title: input.title,
                fromId: fromId,
                toId: input.toId,
            };
            return await ChatRoomService.create(chatData); 
        },
    },
    ChatRoom: {
        messages: async (parent: ChatRoom) => {
            return await ChatRoomService.chatMessages(parent.id);
        },
    },
    // Subscription: {
    //     messageAdded: {
    //         subscribe: () => pubSub.asyncIterator('MESSAGE_ADDED'), // Renvoie l'itérateur pour la subscription
    //     },
    // },
};

export default chatResolver;
