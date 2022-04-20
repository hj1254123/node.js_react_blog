import React, { memo } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Header } from '../../components'
import { ArchiveWrapper, Main } from './style'

const ArchivePage = memo(() => {

  return (
    <ArchiveWrapper>
      <Header />
      <CSSTransition
        in={true}
        timeout={500}
        classNames='context'
        appear
      >
        <Main>
          archivepage
        </Main>
      </CSSTransition>

    </ArchiveWrapper>

  )
})

export default ArchivePage