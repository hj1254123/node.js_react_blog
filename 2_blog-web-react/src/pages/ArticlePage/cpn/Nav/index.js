import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { NavWrapper } from './style'

const Nav = memo((props) => {
  {/* 由于前端展示文章为倒序，按钮需要颠倒 prevTitle 与 nextTitle */ }
  const { prevID, nextID, prevTitle, nextTitle } = props.data
  console.log(prevID, nextID)
  console.log(prevTitle, nextTitle)
  const isHiddenPrev = prevTitle === '' ? 'hidden' : ''
  const isHiddenNext = nextTitle === '' ? 'hidden' : ''
  return (
    <NavWrapper>
      <div className="prev">
        <Link to={'/article/' + nextID} style={{ visibility: isHiddenNext }}>
          <div className="tips">Prev</div>
          <h4>{nextTitle}</h4>
        </Link>
      </div>
      <div className="next">
        <Link to={'/article/' + prevID} style={{ visibility: isHiddenPrev }}>
          <div className="tips">Next</div>
          <h4>{prevTitle}</h4>
        </Link>
      </div>
    </NavWrapper>
  )
})

export default Nav