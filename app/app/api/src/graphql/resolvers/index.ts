import { mergeResolvers } from '@graphql-tools/merge';
import userResolver from './users/userResolver';
import messageResolver from './messages/messageResolver';
import chatResolver from './chatRooms/chatResolver';
// Import other resolvers as needed

const resolvers = mergeResolvers([userResolver ,
    messageResolver,
    chatResolver,
    
    /*, other resolvers */]);

export default resolvers;
