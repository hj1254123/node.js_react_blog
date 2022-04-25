import styled from 'styled-components'

export const PageNavWrapper = styled.div`
  margin-top: 30px;
  ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    li {
      line-height: 34px;
      font-size: 14px;
      padding: 0 14px;
      color: #727272;
      border-radius: 3px;
      cursor: pointer;
      transition: all .4s;
      &.active {
        background-color: #3f51b5 !important;
        color: #fff !important;
      }
      :hover {
        color: #3f51b5;
        background: #dadada;
      }
    }
  }
`