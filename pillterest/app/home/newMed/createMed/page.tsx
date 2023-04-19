'use client'

import React from 'react'
import Link from 'next/link'

export default function Create() {
  return (
    <>
      <div>
        here will be the form to create new med
      </div>
      <Link href="/newMed">Go to New Med Form Page</Link>
    </>
  )
}
