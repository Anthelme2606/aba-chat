const messageTypes = `
    type Message {
        id: ID!
        user: User!
        content: String!
        chat: ChatRoom!
        createdAt: String!
        updatedAt: String!
    }

    input MessageInput {
        sender: String!
        chatId: String!
        content: String!
    }

    type Query {
        getMessages: [Message]
    }

    type Mutation {
        createMessage(input: MessageInput!): Message
        updateUser(id: Int!, input: UserInput!): User
    }

    type Subscription {
        messageCreated: Message!  
    }
`;

export default messageTypes;
