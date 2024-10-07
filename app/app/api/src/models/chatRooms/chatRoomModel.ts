import mongoose, { Schema, Document } from 'mongoose';

interface IConversation extends Document {
    title: string; // Ajout d'un titre pour la conversation
    messages: Schema.Types.ObjectId[];
    users: Schema.Types.ObjectId[];
    createdAt: Date; 
    updatedAt: Date; 
}

const ConversationSchema = new Schema<IConversation>({
    title: { type: String, required: true },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
},{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

const Conversation = mongoose.model<IConversation>('Conversation', ConversationSchema);
export default Conversation;
