import styled from 'styled-components'

export const HeaderWrapper = styled.header`
  margin-left: -240px;
  padding: 104px 16px 42px 256px;
  background-color: #3f51b5;
  color: #fff;
  text-shadow: 0 1px 1px rgba(0, 0, 0, .2);
  .content {
    width: 960px;
    margin: 0 auto;
    transition: all .4s;
    h1 {
      font-size: 44px;
      line-height: 54px;
      font-weight: 500;
      white-space: nowrap;
      text-overflow: ellipsis; 
      overflow: hidden;
      visibility: ${props => props.isShowTitle ? '' : 'hidden'};
    }
    span {
      display: block;
      padding-top: 6px;
      font-size: 16px;
      line-height: 24px;
      font-weight: 300;
      color: #c5cae9;
      visibility: ${props => props.isShowSpan ? '' : 'hidden'};
    }
    @media screen and (max-width: 1040px) {
      width: 100%;
      padding: 20px 16px;

    }
  }
  @media screen and (max-width: 760px) {
    margin: 0;
    min-height: auto;
    padding: 72px 16px 0;
    h1 {
      font-size: 24px !important;
      line-height: 30px !important;
    }
    span {
      font-size: 14px !important;
      line-height: 20px !important;
    }
  }

  /* 进入/初始渲染动画 */
  .header-appear {
    transform: translate(10%, 20%) scale(.6);
    opacity: 0;
  }

  .header-appear-active {
    transition: all .5s;
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }

  .solt {
    width: 100%;
    height: 42px;
    position: relative;
    margin-bottom: -42px;
  }
 
`