"use client"

import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()

  const [copied, setCopied] = useState("")
  //console.log(post);

  // Copy prompt text from prompt card using 'Clipboard API'
  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div className='prompt_card'>
      <div className="flex justify-between items-start gap-5">
        <div onClick={() => { }}
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
        >
          <Image
            src={post.creator.image}
            width={40}
            height={40}
            alt='user_image'
            className='rounded-full object-contain' />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <h3 className="font-satoshi text-sm text-gray-500">
              {post.creator.email}
            </h3>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"}
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12} />
        </div>
      </div>

      <p className="font-satoshi text-sm text-gray-700 my-5">
        {post.prompt}
      </p>
      <p
        onClick={() => handleTagClick && handleTagClick(post.tag)}
        className="font-inter text-sm blue_gradient cursor-pointer">
        #{post.tag}
      </p>

      {/* Edit and Delete Buttons */}
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}>
            Edit
          </p>
          <p className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard
