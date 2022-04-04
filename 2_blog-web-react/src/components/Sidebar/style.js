import styled from 'styled-components';
import brandImg from '../../assets/img/brand.jpg'

export const SlidebarWrapper = styled.aside`
  width: 240px;
  position: fixed;
  background-color: #fff;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;
  transition: all .4s cubic-bezier(.18, .81, .3, .89);
  transform: ${props => props.isShow ? 'translateX(0)' : 'translateX(-100%)'};
`

export const BrandWrapper = styled.div`
  width: 100%;
  height: 210px;
  background-image: url(${brandImg});
  background-size: 100% 100%;
  .brand {
    width: 100%;
    height: 100%;
    background: rgba(63,81,181,0.5);
    padding: 40px 0 0 20px;
    .avatar {
    display: block;
    width: 80px;
    height: 80px;
    border: 2px solid #fff;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
      img {
        width: 100%;
      }
    }
    address {
      margin-top: 15px;
      color: #fff;
      font-style: normal;
      .nickname {
        font-size: 16px;
        line-height: 24px;
      }
      .mail {
        color: #c5cae9;
        font-size: 13px;
        line-height: 22px;
      }
    }
  }

`

export const NavWrapper = styled.div`
  width: 100%;
  min-height: 320px;
  ul {
    padding: 12px 0;
    a {
      display: block;
      height: 44px;
      line-height: 44px;
      padding: 0 20px;
      font-weight: 500;
      &.active {
        background-color: rgba(0,0,0,0.05);
      }
      &:hover {
        text-decoration: none;
        background-color: rgba(0,0,0,0.05);
      }
      i {
        display: inline-block;
        font-size: 22px;
        color: #666;
        margin-right: 20px;
      }
    }
  }
`






