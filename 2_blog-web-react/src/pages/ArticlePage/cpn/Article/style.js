import styled from 'styled-components';

export const ArticleWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 45px;

  @media screen and (max-width: 1040px) {
    padding: 15px;
  }
  @media screen and (max-width: 760px) {
    padding: 0;
  }
  .content {
    flex: 1;
    @media screen and (max-width: 1040px) {
      width: 100%;
    }
  }
  /* 文章内容 */
  .markdown-body {
    width: 100%;
    position: relative;
    margin-top: -150px;
    padding: 35px;
    border-radius: 4px;
    min-height: 300px;
    box-shadow: 0 10px 30px rgb(0 0 0 / 20%);

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

    /* 覆盖一些默认样式 */
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
    /* 解决点击toc跳转位置被顶栏遮挡问题，顶栏高56px */
    h2:target, h3:target {
      padding-top: 56px;
      margin-top: -48px; // 这里本该-56，但是由于margin重叠，上下差值为8px，所以为-48px
    }
    /* 中小屏适配 */
    @media screen and (max-width: 1040px) {
      /* width: 100%; */
    }
    
    @media screen and (max-width: 760px) {
      font-size: 14px;
      margin-top: 0;
      padding: 16px;
      h1 {
        display: none;
      }
      time {
        margin-top: -40px;
        padding: 20px 12px;
        background: #fff;
        box-shadow: 0 1px 4px 0 rgb(0 0 0 / 16%);
        border-radius: 2px
      }
    }
  }
`


export const Tag = styled.div`
  /* width: 100%; */
  /* position: relative; */
  margin: 0 -35px;
  padding: 12px 20px 8px 0px;
  border-top: 1px solid #ddd;

  @media screen and (max-width: 760px) {
    margin: 0 -16px;
  }
  ul {
      display: flex;
      flex-wrap: wrap;
      /* width: 100%; */
      margin-bottom: 0%;
      li {
        display: inline-block;
        margin: 0 8px 8px 0;
        border-radius: 2px;
        background-color: #8bc34a;
        transition: all .3s;
        :hover {
          a {
            color: #fff;
          }
          box-shadow: 0 4px 8px rgb(0 0 0 / 26%);
        }
        a {
          color: rgba(255, 255, 255 , .8) !important;
          line-height: 28px;
          padding: 0 16px;
          text-decoration: none;
        }
        :nth-child(n+1) {
          background: #8bc34a;
        }
        :nth-child(n+2) {
          background: #673ab7;
        }
        :nth-child(n+3) {
          background: #ff9800;
        }
        :nth-child(n+4) {
          background: #f44336;
        }
        :nth-child(n+5) {
          background: #00abc0;
        }
        :nth-child(n+6) {
          background: #2196f3;
        }
      }
    }
`
