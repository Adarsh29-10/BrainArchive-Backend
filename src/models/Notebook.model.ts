import { Schema, model, Document, Types } from 'mongoose'
import { BlockType } from '../types/blocks.types';

interface IBlock {
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
        type: {
            type: String,
            required: true,
            enum: ['heading','heading1', 'paragraph', 'document', 'image', 'video', 'code', 'link', 'bullet' ]
        },
        content: {
            type: String,
            required: true,
            trim: true,
            default: "",
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        _id: true
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