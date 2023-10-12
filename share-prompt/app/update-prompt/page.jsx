"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@components/Form'

const UpdatePrompt = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const promptId = searchParams.get("id")

    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    })

    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }
        if (promptId) {
            getPromptDetails()
        }
    }, [promptId])

    const updatePrompt = () => {

    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default UpdatePrompt
