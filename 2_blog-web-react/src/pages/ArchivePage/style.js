import styled from 'styled-components';

export const ArchiveWrapper = styled.div`
  min-height: calc(100vh);
`
export const Main = styled.div`
  width: 960px;
  margin: 0 auto;
  padding: 30px 0 40px;
  @media screen and (max-width: 1040px) {
    width: 100%;
    padding: 20px 16px
  }
  .month-list-box {
    width: 100%;
    margin-bottom: 35px;
    h3 {
      color: #3f51b5;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 13px;
    }
    .article-list {
      ul {
        display: flex;
        flex-wrap: wrap;
        .article-card {
          width: 50%;
          padding-right: 20px;
          margin-bottom: 20px;
        }
      }
    }
  }
`

