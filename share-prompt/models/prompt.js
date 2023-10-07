import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId, // Login User's ID
        ref: 'User', // OneToMany Relationship => 'One User can have many prompts'
    },
    prompt: {
        type: String,
        require: [true, 'Prompt is required.'],
    },
    tag: {
        type: String,
        require: [true, 'Tag is required.'],
    }
})

const Prompt = models.Prompt || model('Prompt', PromptSchema)

export default Prompt