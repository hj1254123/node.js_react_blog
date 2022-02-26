import styled from 'styled-components'

const pre = 'main-move'

export const Main = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center; 
  padding-left: 240px;
  transition: all .5s ease-in-out;
  &.${pre}-enter {
    padding-left: 0px;
  }
  &.${pre}-enter-active, &.${pre}-enter-done, &.${pre}-exit {
    padding-left: 240px;
  }

  &.${pre}-exit-active, &.${pre}-exit-done {
    padding-left: 0;
  }
  @media (max-width: 1240px) {
    padding-left: 0;
    .content {
      width: 100%;
    }
  }
`

export const Mask = styled.div`
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #000;
  opacity: 0;
  pointer-events: none; // 使鼠标事件失效
  transition: all .4s;
  &.on{
    visibility: visible;
    opacity: .5;
    pointer-events: auto;
  }
`