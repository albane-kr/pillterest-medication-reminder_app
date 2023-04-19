'use client'

import React from 'react'
import Link from 'next/link'

export default function NewMed() {
  return (
    <>
      <div>
        here will be the form to add a new med
      </div>
      <Link href="/newMed/createMed">Go to Create Med Form Page</Link>
      <Link href="/">Link to Home Page</Link>
    </>
  )
}
