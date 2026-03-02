import { Notebook } from "../modules/notebook/Notebook.model";
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';   

export const addSampleNotebook = async (userId: string) => {
    if (!userId) return;

    const notebook = await Notebook.create({
        userId: new mongoose.Types.ObjectId(userId),
        title: "Welcome to BrainArchive",
        description: "This is a sample notebook. Click on this.",
        blocks: [
            {
              "_id": uuidv4(),
              "type": "heading",
              "content": "Welcome to BrainArchive - Your Learning OS",
            },
            {
              "_id": uuidv4(),
              "type": "quotes",
              "content": "BrainArchive Isn't just a notes app. It's where your learning lives, grows, and connects over time.",
            },
            {
              "_id": uuidv4(),
              "type": "divider",
              "content": "",
            },
            {
              "_id": uuidv4(),
              "type": "heading1",
              "content": "What makes this different ?",
            },
            {
              "_id": uuidv4(),
              "type": "bullet",
              "content": "Every notebook is a learning session — not just a document.\nYour notes stay alive — revisit, update, build on them.\nShare your notes publicly — your notes can teach others.",
            },
            {
              "_id": uuidv4(),
              "type": "divider",
              "content": "",
            },
            {
              "_id": uuidv4(),
              "type": "heading1",
              "content": "Try these blocks right now👇",
            },
            {
              "_id": uuidv4(),
              "type": "heading2",
              "content": "1. Code block:",
            },
            {
              "_id": uuidv4(),
              "type": "code",
              "content": "const removeDuplicates = (nums) => {\r\n    let i=0;\r\n    for(let j=1; j<nums.length; j++){\r\n        if(nums[i] !== nums[j]){\r\n            i++;\r\n            nums[i] = nums[j];\r\n        }\r\n    }\r\n    return i+1;\r\n}",
            },
            {
              "_id": uuidv4(),
              "type": "heading2",
              "content": "2. List block — a checklist style:",
            },
            {
              "_id": uuidv4(),
              "type": "bullet",
              "content": "Create your first notebook\nImport a .md file you already have\nSet a notebook public and share the link",
            },
            {
              "_id": uuidv4(),
              "type": "heading2",
              "content": "3. Smart Features — .md block:",
            },
            {
              "_id": uuidv4(),
              "type": "paragraph",
              "content": "If you have any .md file and you want to add that notes here, so you can use this dot md converter block.",
            },
            {
              "_id": uuidv4(),
              "type": "divider",
              "content": "",
            },
            {
              "_id": uuidv4(),
              "type": "heading",
              "content": "What's coming soon 🚀",
            },
            {
              "_id": uuidv4(),
              "type": "quotes",
              "content": "AI that reads your notes and answers your questions. Analytics that show how your knowledge grows. You're early — and that matters.",
            }
        ],
        isPublic: false,
        totalTimeSpent: 0,
    })

}
