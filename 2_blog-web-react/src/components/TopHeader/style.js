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
  z-index: 888;
  .top-button {
    width: 240px;
    height: 100%;
      button {
      width: 56px;
      height: 100%;
      position: absolute;
      background-color: inherit;
      font-size: 18px;
      font-weight: 600;
      color: #fff;
      cursor: pointer;
    }
    .icon-cha1 { // 关闭按钮
      transition: all .4s cubic-bezier(.18, .81, .3, .89);
      left: ${props => props.isShow ? '240px' : '-56px'};
      transform: ${props => props.isShow ? 'scale(1)' : 'scale(0)'};
      /* 小屏不显示关闭按钮（点击遮罩关闭） */
      @media (max-width: 1240px) {
        left: -56px;
      }
    }
  }
  .top-title {
    flex: 1;
    color: #fff;
    font-weight: 400;
    text-align: center;
    span {
      display: inline-block;
      transition: all .4s cubic-bezier(.18, .81, .3, .89);
      transform: ${props => props.isShow ? '' : 'translateX(-120px)'};
    }
  }

  &.fixed {
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  }

  /* 中小屏适配 */
  @media screen and (max-width: 1240px) {
    .top-button {
      width: 56px;
      /* button {
        position: static;
      } */
    }
    .top-title {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      span {
        display: inline;
      }
    }
  }
`