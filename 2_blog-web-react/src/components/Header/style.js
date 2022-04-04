import styled from 'styled-components'

export const HeaderWrapper = styled.header`
  width: 100%;
  padding: 104px 16px 48px 16px;
  background-color: #3f51b5;
  color: #fff;
  text-shadow: 0 1px 1px rgba(0, 0, 0, .2);
  .content {
    width: 960px;
    margin: 0 auto;
    transition: all .4s;
    h1 {
      font-size: 44px;
      line-height: 48px;
      font-weight: 500;
    }
    span {
      display: block;
      padding-top: 6px;
      font-size: 16px;
      line-height: 24px;
      font-weight: 300;
      color: #c5cae9;
    }
    @media screen and (max-width: 1040px) {
      width: 100%;
      padding: 20px 16px;

    }
  }
  @media screen and (max-width: 760px) {
    margin: 0;
    min-height: auto;
    padding: 72px 16px 20px;
    h1 {
      font-size: 24px !important;
      line-height: 30px !important;
    }
    span {
      font-size: 14px !important;
      line-height: 20px !important;
    }
  }
`