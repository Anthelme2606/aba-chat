const chatTypes = `
    type ChatRoom {
        id: ID!
        title: String!
        messages:[Message]
        createdAt:String!
        updatedAt:String!
        
    }

    input ChatInput {
        title: String!
        toId:String!
   
    }
    type Query {
       
        getChats: [ChatRoom]
    }
    type Mutation {
        createChat(input: ChatInput!): ChatRoom
    
    }

   
`;

export default chatTypes;
