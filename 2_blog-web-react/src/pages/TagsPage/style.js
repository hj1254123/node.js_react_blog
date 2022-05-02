import styled from 'styled-components';

export const TagsWrapper = styled.div`
  min-height: calc(100vh);
`

export const TagNameNavWrapper = styled.nav`
  width: 100%;
  height: 100%;
  /* 收拢状态（默认） */
  .tagname-list {
    transition: all .4s;
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-end;
    white-space: nowrap;
    width: 960px;
    height: 100%;
    margin: 0 auto;
    background-color: #3f51b5;
    color: rgba(255, 255, 255, 0.8);
    overflow: hidden;
    @media screen and (max-width: 1040px) {
      width: 100%;
    }
    li {
      position: relative;
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      padding: 0 16px;
      cursor: pointer;
      transition: all .4s;
      &:hover {
        color: #fff;
      }
      /* 激活样式 */
      &.active::after {
        content: '';
        position: absolute;
        background: #ff4081;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
      }
    }
    /* 展开按钮 */
    button {
      position: absolute;
      right: 0px;
      top: 0px;
      font-size: 16px;
      height: 48px;
      line-height: 48px;
      padding: 0 16px;
      cursor: pointer;
      background-color: inherit;
      transform: rotate(180deg);
      color: inherit;
    }
  }
  /* 展开状态 */
  .tagname-list.unfold {
    background-color: #fff;
    flex-wrap: wrap;
    color: rgb(114, 114, 114);
    overflow: auto;
    height: auto;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
    li {
      color: #727272;
    }
    li.active {
      background-color: #ff4081;
      color: #fff;
      border-radius: 5px;
    }
    li.active::after {
      visibility: hidden;
    }
    li:hover {
      opacity: .7;
      text-decoration: underline;
    }
    button {
      transform: rotate(0deg);
    }
  }
`

export const Main = styled.div`
  width: 960px;
  margin: 0 auto;
  padding: 30px 0 40px;
  @media screen and (max-width: 1040px) {
    width: 100%;
    padding: 20px 16px
  }
`

