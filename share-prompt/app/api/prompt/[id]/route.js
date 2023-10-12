import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET endpoint for 'Prompt Update Component'
export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate("creator")
        if (!prompt) {
            return new Response("Prompt not found!", { status: 404 })
        }

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 })
    }
}

// PATCH endpoint for 'Prompt Update Component'
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json()

    try {
        await connectToDB()

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id)

        if (!existingPrompt) {
            return new Response("Prompt not found!", { status: 404 })
        }

        // If Prompt found, update the prompt with new data
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        // Save updated existingPrompt object
        await existingPrompt.save()
        return new Response("Successfully updated the prompts", { status: 200 })

    } catch (error) {
        return new Response("Error Updating Prompt!", { status: 500 })
    }
}

// DELETE endpoint for 'Prompt Update Component'
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB()

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndRemove(params.id)
        return new Response("Prompt deleted successfully", { status: 200 })

    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 })
    }
}