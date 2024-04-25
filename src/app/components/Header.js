import React from 'react'
import Link from 'next/link'

function Header() {
  return (
    <div className='header'>
        <div className='logo'><Link href={`/`}>Home</Link></div>
    </div>
  )
}

export default Header