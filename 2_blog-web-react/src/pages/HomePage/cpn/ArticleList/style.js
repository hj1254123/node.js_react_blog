import styled from 'styled-components'

export const ArticleListWrapper = styled.div`
  .item {
    padding: 16px 20px 0;
    margin-bottom: 30px;
    background-color: #fff;
    box-shadow: 0 1px 2px rgb(151 151 151 / 58%);
    border-radius: 3px;
    .date {
      display: block;
      color: #727272;
      font-size: 13px;
      height: 24px;
      line-height: 24px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    h3 {
      font-size: 24px;
      line-height: 32px;
      margin-bottom: 16px;
      font-weight: 400;
      a {
        color: #3f51b5;
        position: relative;
        display: inline-block;
        text-decoration: none;
        ::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background-color: #3f51b5;
          transition: all .4s;
          transform: scaleX(0);
        }
        :hover::after {
          transform: scaleX(1);
        }
      }
    }
    .introduction {
      line-height: 1.8;
      word-break: break-word;
      margin-bottom: 20px;
      p {
        display: inline;
      }
      a {
        display: inline-block;
        padding: 0 6px;
        font-weight: 500;
        color: #3f51b5;
        border-radius: 3px;
        text-decoration: none;
        :hover {
          background: #eaecf7;
        }
      }
    }
    .tags {
      border-top: 1px solid #ddd;
      padding: 12px 20px 8px 0px;
      ul {
        display: flex;
        flex-wrap: wrap;
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
            color: rgba(255, 255, 255 , .8);
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
    }
  }
  @media screen and (max-width: 760px) {
    .item {
      border-radius: 0px;
      box-shadow: none;
      margin-bottom: 16px;
      h3 {
        font-size: 20px;
        line-height: 24px;
      }
    }
  }
`