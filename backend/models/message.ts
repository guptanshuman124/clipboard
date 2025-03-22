import mongoose  , { Schema , Document } from 'mongoose';

interface Imessage extends Document {
    message: string;
    uniqueCode : string;
    createdAt: Date;
}

const messageSchema: Schema = new Schema({
    message: { type: String, required: true },
    uniqueCode: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<Imessage>('Message', messageSchema);