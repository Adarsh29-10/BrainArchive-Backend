// import {Schema, Types, Document, model} from 'mongoose'

// interface IBlocks {
//     type:   'heading' | 'paragraph' | 'link' | 'document' | 'image' | 'code' | 'bullet';
//     content: string;
//     order: number
// }

// interface ILearningSession extends Document{
//     notebookId: Types.ObjectId;
//     title: string;
//     blocks: IBlocks[];
//     totalTimeSpent: number;
//     isCompleted: boolean;
// }

// const blockSchema = new Schema<IBlocks>(
//     { 
//         type: {
//             type: String,
//             required: true,
//             enum: ['heading', 'paragraph', 'document' , 'image', 'video','code' , 'link', 'bullet' ]
//         },
//         content: {
//             type: String,
//             required: true,
//             trim: true,
//             default: "",
//         },
//         order: {
//             type: Number,
//             required: true,
//             default: 0,
//         },
//     },
//     {
//         _id: true
//     }
// );

// const learningSessionSchema = new Schema<ILearningSession>(
//     {
//         notebookId: {
//             type: Schema.Types.ObjectId,
//             ref: 'Notebook',
//             required: true,
//         },
//         title: {
//             type: String,
//             required: true,
//             trim: true,
//             index: true,
//         },
//         blocks: {
//             type: [blockSchema],
//             default: []
//         },
//         totalTimeSpent: {
//             type: Number,
//             default: 0,
//         },
//         isCompleted: {
//             type: Boolean,
//             default: false
//         }
//     },
//     {
//         timestamps: true
//     }
// );

// export const LearningSession = model<ILearningSession>('LearningSession', learningSessionSchema );