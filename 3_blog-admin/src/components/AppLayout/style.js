import styled from 'styled-components'

export const AppLayoutWrapper = styled.div`
  .layout-box {
    overflow: hidden;
    width: 100vw;
    height: 100vh;
  }
  .logo {
    background-color: #fff;
    width: 100%;
    text-align: center;
    img {
      width: 70%;
    }
  }
  .slider-menu {
    min-height: 100vh;
  }
  .site-layout {
    .header {
      display: flex;
      justify-content: space-between;
      padding: 0 25px;
      background-color: #fff;
      .userInfo {
        &:hover {
          cursor: pointer;
          opacity: .8;
        }
      }
    }
    .content {
      padding: 24px;
      min-height: 280px;
      overflow-y: auto;
    }
  }
`