import styled from 'styled-components';

const pre = 'slidebar-move'

export const SlidebarWrapper = styled.aside`
  width: 240px;
  background-color: lightBlue;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;
  transition: .4s cubic-bezier(.18, .81, .3, .89);
  &.${pre}-enter {
    transform: translateX(-100%);
  }
  &.${pre}-enter-active, &.${pre}-enter-done, &.${pre}-exit {
    transform: translateX(0%);
  }

  &.${pre}-exit-active, &.${pre}-exit-done {
    transform: translateX(-100%);
  }
  @media (max-width: 1240px) {
    transform: translateX(-100%);
  }
`






