import styled from 'styled-components';

export const ArticleCardListWrapper = styled.div`
  width: 100%;
  margin-bottom: 35px;
  h3 {
    color: #3f51b5;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 13px;
    @media screen and (max-width: 760px) {
      padding-left: 15px;
    }
  }
  .article-list {
    ul {
      display: flex;
      flex-wrap: wrap;
      .article-card {
        width: 50%;
        padding-right: 20px;
        margin-bottom: 20px;
        @media screen and (max-width: 760px) {
          width: 100%;
          padding-right: 0;
        }
      }
    }
  }
`

