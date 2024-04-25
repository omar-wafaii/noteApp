import React from 'react'
import Link from 'next/link'

function RouteButton({ name, route, id }) {

  if (id) {
    return (
      <div><button className="robutton" >

        <Link href={{ pathname: `/${route}`, query: { id: `${id}` } }}>{route}</Link>
      </button></div>

    )
  } else {
    return (
      <div><button className="robutton" >
        <Link href={{ pathname: `/${route}` }}>{name}</Link>
      </button>
      </div>
    )
  }

}

export default RouteButton;