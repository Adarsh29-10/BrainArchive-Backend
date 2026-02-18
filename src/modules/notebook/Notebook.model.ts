import { Schema, model, Document, Types, ObjectId } from 'mongoose'
import { BlockType } from '../../types/blocks.types';

interface IBlock {
    _id: string;
    type: BlockType;
    content: string;
    order: number
}
interface INotebook extends Document{
    userId: Types.ObjectId;
    title: string;
    description?: string;
    blocks: Types.DocumentArray<IBlock>;
    isPublic: boolean;
    lastActivityAt: Date | null;
    totalTimeSpent: number;
}

const blockSchema = new Schema<IBlock>(
    {
        _id: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: BlockType
        },
        content: {
            type: String,
            trim: true,
            default: "",
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        _id: false,
        timestamps: true  
    }
);

const notebookSchema = new Schema<INotebook>(
    {
        userId:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
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
        blocks: {
            type: [blockSchema],
            default: []
        },
        isPublic: {
            type: Boolean,
            default: false,
        },
        lastActivityAt: {
            type: Date,
            default: null,
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