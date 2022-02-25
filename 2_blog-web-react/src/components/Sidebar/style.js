import styled from 'styled-components';

const pre = 'slidebar-move'

export const SlidebarWrapper = styled.aside`
  width: 240px;
  background-color: lightBlue;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  transition: .4s cubic-bezier(.18, .81, .3, .89);
  &.${pre}-enter {
    transform: translateX(-100%);
  }
  &.${pre}-enter-active {
    transform: translateX(0%);
  }
  &.${pre}-enter-done {
    transform: translateX(0%);
  }
  &.${pre}-exit {
    transform: translateX(0%);
  }
  &.${pre}-exit-active {
    transform: translateX(-100%);
  }
  &.${pre}-exit-done {
    transform: translateX(-100%);
  }
`






