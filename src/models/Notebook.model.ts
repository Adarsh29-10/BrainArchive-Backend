import { Schema, model, Document, Types } from 'mongoose'

interface INotebook extends Document{
    userId: Types.ObjectId;
    title: string;
    description?: string;
    totalTimeSpent: number;
}

const notebookSchema = new Schema<INotebook>(
    {
        userId:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        description: {
            type: String,
            trim: true,
            maxlength: 500,
        },
        totalTimeSpent: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true
    }
);

export const Notebook = model<INotebook>('Notebook', notebookSchema )