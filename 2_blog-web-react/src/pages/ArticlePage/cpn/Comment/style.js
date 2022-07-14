import styled from 'styled-components';

export const CommentWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 30px;
  margin-top: 40px;
  box-shadow: 0 0 4px rgb(0 0 0 / 20%);
  border-radius: 4px;
  font-size: 16px;
  @media screen and (max-width: 760px){
    font-size: 14px;
  }
  .panel {
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 10px;
    .header {
      input {
        width: 50%;
        padding: 10px 5px;
        border-bottom: 1px dashed #dedede;
        font-size: .875em;
        color: #555;
        :focus {
          border-bottom: 1px solid #ff4081;
        }
        @media screen and (max-width: 760px) {
          width: 100%;
        }
      }
    }
    .edit {
      padding-top: 10px;
      .content {
        width: 100%;
        height: 200px;
        font-size: .875em;
        padding: 10px 5px;
        color: #555;
      }
    }
    .bottom {
      display: flex;
      justify-content: flex-end;
      padding: 10px 0;
      .submit {
        padding: 0.5em 1.25em;
        font-size: .875em;
        background-color: #fff;
        transition: all .4s;
        text-align: center;
        border: 1px solid #ededed;
        border-radius: 4px;
        vertical-align: middle;
        cursor: pointer;
        :hover:not([disabled]) {
          color: #fff;
          background: #3f51b5;
          border-color: #3f51b5;
          box-shadow: 0 2px 8px rgb(0 0 0 / 40%);
        }
      }
    }
  }

  .list {
    padding: 10px;
    .number-of-comments {
      width: 100%;
      height: 37px;
      font-size: .875em;
      margin: 25px 0;
      color: #555;
      span {
        font-weight: 600;
        font-size: 20px;
        margin-right: 3px;
      }
    }
    .item {
      display: flex;
      width: 100%;
      padding-bottom: 10px;
      border-bottom: 1px dashed #f5f5f5;
      margin: 20px 0;
      .icon {
        width: 3em;
        height: 3em;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: inherit;
          height: inherit;
        }
      }
      .info {
        flex: 1;
        padding-left: 10px;
        .username {
          color: #1abc9c;
          font-weight: 500;
          height: 30px;
          line-height: 30px;
        }
        .time {
          color: #b3b3b3;
          font-size: .875em;
          line-height: 17px;
        }
        .comment-content {
          color: #4a4a4a;
          line-height: 26px;
          font-size: .875em;
        }
      }
    }
  }
`
