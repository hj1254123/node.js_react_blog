import styled from 'styled-components'

export const TopHeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 56px;
  background-color: #3f51b5;
  transition: all .4s;
  button {
    width: 56px;
    height: 100%;
    position: absolute;
    background-color: inherit;
    font-size: 18px;
    color: #fff;
    left: ${props => props.isShow ? '240px' : '0'};
    cursor: pointer;
    /* 小屏不显示关闭按钮（点击遮罩关闭） */
    @media (max-width: 1240px) {
      left: 0;
    }
  }
  div {
    flex: 1;
    color: #fff;
    font-weight: 400;
    text-align: center;
  }
  &.fixed {
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  }
`