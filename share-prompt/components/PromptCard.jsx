"use client"

import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const [copied, setCopied] = useState("")
  console.log(post);
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
        <div className="copy_btn" onClick={() => { }}>
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
        {post.tag}
      </p>
    </div>
  )
}

export default PromptCard
