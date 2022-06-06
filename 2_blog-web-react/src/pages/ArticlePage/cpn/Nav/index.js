import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { NavWrapper } from './style'

const Nav = memo((props) => {
  const { prevID, nextID, prevTitle, nextTitle } = props.data
  console.log(prevID, nextID)
  return (
    <NavWrapper>
      <div className="prev">
        <Link to={'/article/' + prevID}>
          <div className="tips">
            <i>&lt;</i>
            Prev
          </div>
          <h4>{prevTitle}</h4>
        </Link>
      </div>
      <div className="next">
        <Link to={'/article/' + prevID}>
          <div className="tips">
            Next
            <i>&gt;</i>
          </div>
          <h4>{nextTitle}</h4>
        </Link>
      </div>
    </NavWrapper>
  )
})

export default Nav