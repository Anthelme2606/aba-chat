import mongoose, { Schema, Document } from 'mongoose';

interface IUserConversation extends Document {
    user: Schema.Types.ObjectId;
    conversation: Schema.Types.ObjectId;
}

const UserConversationSchema = new Schema<IUserConversation>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    conversation: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true }
});

const UserConversation = mongoose.model<IUserConversation>('UserConversation', UserConversationSchema);
export default UserConversation;
