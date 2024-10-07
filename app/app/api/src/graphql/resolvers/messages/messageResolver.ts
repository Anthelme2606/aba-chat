import MessageService from '../../../services/messages/messageService';
import { PubSub } from 'graphql-subscriptions'; // Importer PubSub

const pubSub = new PubSub(); // Créer une instance de PubSub

interface MessageInput {
    sender: string;
    content: string;
    chatId: string;
}

interface Message {
    id: string;
    sender: string;
    content: string;
    chatId: string;
    userId: string;
}

const messageResolver = {
    Query: {
        getMessages: async () => {
            return await MessageService.getAll();
        },
    },
    Mutation: {
        createMessage: async (_: unknown, { input }: { input: MessageInput }) => {
            const message = await MessageService.create(input);
            
            
            pubSub.publish('MESSAGE_ADDED', { messageCreated: message });

            return message;
        },
    },
    Message: {
        chat: async (parent: Message) => {
            return await MessageService.getChat(parent.chatId);
        },
        user: async (parent: Message) => {
            return await MessageService.getUser(parent.sender);
        },
    },
    Subscription: {
        messageCreated: {
            subscribe: () => pubSub.asyncIterator('MESSAGE_ADDED'),
        },
    },
};

export default messageResolver;
