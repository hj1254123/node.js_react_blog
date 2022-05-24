import styled from 'styled-components';
import 'github-markdown-css/github-markdown-light.css'

export const ArticleWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh);
`

export const Main = styled.div`

  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 45px;

  @media screen and (max-width: 1040px) {
    padding: 15px
  }
  /* 覆盖一些默认样式 */
  .markdown-body {
    flex: 1;
    position: relative;
    margin-top: -150px;
    padding: 35px;
    border-radius: 4px;
    min-height: 300px;
    h1 {
      border-bottom: none;
    }
    time {
      display: block;
      margin-top: 8px;
      font-size: 13px;
      font-weight: bold;
      color: #727272;
    }
    h2, h3, h4, h5, h6 {
      color: #3f51b5;
      ::before {
        content: '#';
        color: #c5cae9;
        padding-right: 5px;
        margin-left: -16px;
        visibility: hidden;
      }
    }
    h2:hover, h3:hover, h4:hover, h5:hover, h6:hover {
      ::before {
        visibility: visible;
      }
    }
    /* 解决点击toc跳转位置被顶栏遮挡问题，顶栏高56px */
    h2:target, h3:target {
      padding-top: 56px;
      margin-top: -48px; // 这里本该-56，但是由于margin重叠，上下差值为8px，所以为-48px
    }
    code, a {
      color: #ff4081;
    }
    pre code {
      color: inherit;
    }
  }
`

export const TOC = styled.aside`
  width: 180px;
  margin-left: 60px;

  @media screen and (max-width: 1040px) {
    display: none;
  }
  nav {
    width: inherit;
    position: sticky;
    top: 80px;
    h4 {
      font-size: 15px;
      font-weight: 600;
      color: #727272;
      padding-bottom: 10px;
      padding-left: 10px;
    }
    /* 目录列表 */
    ul {
      font-size: 14px;
      li {
      padding: 3px 0 3px 10px;
      line-height: 24px;
      }
      li.active {
        border-left: 2px solid #3f51b5;
        background-color: rgba(0, 0, 0, 0.06);
        a {
          font-weight: 600;
          color: #3f51b5;
        }
      }
      /* 二级目录 */
      ul {
        margin-left: -10px;
        li {
          padding-left: 20px;
        }
      }

    }
  }
  nav.fixed {
    position: fixed;
    top: 60px;
    max-height: calc(100vh - 60px);
    overflow-y: auto;
  }

  
`

