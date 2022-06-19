import styled from 'styled-components'

export const TOCWrapper = styled.aside`
  width: 240px;
  padding-left: 60px;
  @media screen and (max-width: 1440px) {
    display: none;
  }
  nav {
    position: fixed;
    width: 180px;
    max-height: calc(100vh - 300px);
    overflow-y: auto;
    /* position: sticky;
    top: 80px; */
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
        padding: 3px 0;
        line-height: 24px;
        a {
          position: relative;
          display: inline-block;
          width: 100%;
          height: 100%;
          padding-left: 10px;
          padding-right: 10px;

        }
        a::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-left: 3px solid #3f51b5;
          background-color: rgba(0, 0, 0, 0.06);
          font-weight: 600;
          color: #3f51b5;
          visibility: hidden;
        }
        a.active::after {
          visibility: visible;
        }
      }

      /* 二级目录 */
      ul {
        li {
          padding-left: 10px;
          a::after {
            margin-left: -10px;
          }
        }
      }

    }
  }
  /* 考虑到兼容性，不用position: sticky; 改用下面的方式固定toc */
  nav.fixed {
    top: 80px;
    max-height: calc(100vh - 220px);
  }
`