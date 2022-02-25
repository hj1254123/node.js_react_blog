import styled from 'styled-components'

const pre = 'main-move'

export const Main = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center; 
  padding-left: 240px;
  transition: .5s cubic-bezier(.18, .81, .3, .89);
  &.${pre}-enter {
    padding-left: 0px;
  }
  &.${pre}-enter-active {
    padding-left: 240px;
  }
  &.${pre}-enter-done {
    padding-left: 240px;
  }
  &.${pre}-exit {
    padding-left: 240px;
  }
  &.${pre}-exit-active {
    padding-left: 0;
  }

  &.${pre}-exit-done {
    padding-left: 0;
  }
`