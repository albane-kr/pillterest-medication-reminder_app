'use client'

import { useEffect } from "react"
import { useAuthContext } from "@/../backend/context/authContext"
import { useRouter } from "next/navigation"

export default function Admin() {
    const { user,
        setUser,
        isLoggedIn,
        setIsLoggedIn } = useAuthContext()
    const router = useRouter()

    useEffect( () => {
        if (user == null) router.push('/')
    }, [router, user])

    return (<h1>Only logged in users can view this page</h1>);
};