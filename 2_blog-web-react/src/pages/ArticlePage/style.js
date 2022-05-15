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
  min-height: 100px;
  @media screen and (max-width: 1040px) {
    display: none;
  }
  > ul {
    position: fixed;
  }
`

