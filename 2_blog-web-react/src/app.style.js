import styled from 'styled-components'


export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center; 
  overflow: hidden;
  transition: all .4s cubic-bezier(.18, .81, .3, .89);
  .content {
    width: 960px;
    min-height: 700px;
    background-color: pink;
    @media (max-width: 1240px) {
      width: 100%;
    }
  }
  &.on {
    padding-left: 240px;
  }
  @media (max-width: 1240px) {
    padding-left: 0 !important;
  }
`

export const Mask = styled.div`
  visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #000;
  opacity: 0;
  pointer-events: none; // 使鼠标事件失效
  transition: all .4s;

  @media (max-width: 1240px) {
    &.on {
      visibility: visible;
      opacity: .5;
      pointer-events: auto;
    }
  }
`