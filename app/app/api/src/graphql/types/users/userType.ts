const userTypes = `
    type User {
        id: ID!
        username: String!
        createdAt:String
        updatedAt:String
        
    }
        type AuthData {
        user:User!
        token:String!
        }


    input UserInput {
        username: String!
        password: String!
    }
        input LoginInput {
        username: String!
        password: String!
    }
    type Query {
        getUser(userId: String!): User
        getUsers: [User]
    }
    type Mutation {
        createUser(input: UserInput!): User
        login(loginData:LoginInput):AuthData
        updateUser(id: Int!, input: UserInput!): User
    }

   
`;

export default userTypes;
