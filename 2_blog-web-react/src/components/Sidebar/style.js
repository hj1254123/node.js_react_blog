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
  transform: ${props => props.isShow ? 'translateX(0%)' : 'translateX(-100%)'};
`






