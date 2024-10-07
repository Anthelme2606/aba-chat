import mongoose, { Schema, Document } from 'mongoose';

// Interface pour le message
interface IMessage extends Document {
    content: string;
    sender: Schema.Types.ObjectId; 
    chatId: Schema.Types.ObjectId; 
    read: boolean; 
    createdAt: Date; 
    updatedAt: Date; 
}

const MessageSchema = new Schema<IMessage>({
    content: { type: String, required: true }, 
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    chatId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true }, 
    read: { type: Boolean, default: false }, 
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } // Spécifie les noms des champs pour createdAt et updatedAt
});

// Modèle du message
const Message = mongoose.model<IMessage>('Message', MessageSchema);

// Exportation du modèle
export default Message;
