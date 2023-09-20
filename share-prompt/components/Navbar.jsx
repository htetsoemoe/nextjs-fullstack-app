"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth'

const Navbar = () => {
    const [isUserLogin, setIsUserLogin] = useState(true)

    const [providers, setProviders] = useState([])
    const [toggleDropdown, setToggleDropdown] = useState(false)

    return (
        <nav className='flex flex-between w-full mb-16 pt-3'>
            <Link href='/' className='flex gap-3 flex-center'>
                <Image
                    src='/assets/images/logo.svg'
                    alt='Promptopia Logo'
                    width={30}
                    height={30}
                    className='object-contain'
                />
                <p className="logo_text">Promptopia</p>
            </Link>

            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {isUserLogin ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href='/create-prompt' className='black_btn'>
                            Create Post
                        </Link>

                        <button type='button' onClick={signOut} className='outline_btn'>
                            Sign Out
                        </button>

                        <Link href='/profile'>
                            <Image
                                src='/assets/images/logo.svg'
                                alt='profile'
                                width={37}
                                height={37}
                                className='rounded-full'
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => { signIn }}
                                    className='black_btn'
                                >
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
                {isUserLogin ? (
                    <div className="flex">
                        <Image
                            src='/assets/images/logo.svg'
                            alt='profile'
                            width={37}
                            height={37}
                            className='rounded-full'
                            onClick={() => setToggleDropdown(!toggleDropdown)}
                        />

                        {/* If user clicks toggle */}
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href='/profile'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}>
                                    My Profile
                                </Link>
                                <Link
                                    href='/create-prompt'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}>
                                    Create Prompt
                                </Link>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setToggleDropdown(false)
                                        signOut()
                                    }}
                                    className="mt-5 w-full black_btn">
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => {
                                        signIn()
                                    }}
                                    className="black_btn">
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav >
    )
}

export default Navbar