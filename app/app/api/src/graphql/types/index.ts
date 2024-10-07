import { gql } from 'apollo-server-express';
import userTypes from './users/userType';
import chatTypes from './chatRooms/chatType';
import messageTypes from './messages/messageType';
// Import other type definitions as needed

const typeDefs = gql`
    ${userTypes}
    ${chatTypes}
    ${messageTypes}
    # Include other type definitions
`;

export default typeDefs;
