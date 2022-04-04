import styled from 'styled-components'

export const FooterWrapper = styled.footer`
  width: 100%;
  height: 126px;
  color: rgba(255,255, 255, 0.6);
  font-size: 14px;
  a {
    border-bottom: 1px dotted rgba(255,255,255,0.5);
    color: inherit;
    opacity: .8;
    font-size: inherit;
    &:hover {
      text-decoration: none;
      border-bottom: 1px solid rgba(255,255,255,0.7);
      color: #fff;
    }
  }
  .top {
    height: 53px;
    padding: 16px;
    background-color: #3f51b5;
    text-align: center;
  }
  .bottom {
    height: 74px;
    padding: 16px;
    background-color: #303f9f;
    text-align: center;
    span {
      display: block;
      line-height: 1.6;
    }
  }
`