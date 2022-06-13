import styled from 'styled-components';

export const CommentWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 30px;
  margin-top: 40px;
  box-shadow: 0 0 4px rgb(0 0 0 / 20%);
  border-radius: 4px;
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
        min-height: 123px;
        font-size: .875em;
        padding: 10px 5px;
        color: #555;
        :focus {
          outline: none;
        }
        /* 允许编辑&为空&未被选中，添加伪元素 */
        &[contenteditable=true]:empty:not(:focus)::before {
          /* 从html标签取数据data-* */
          content: attr(data-text);
        }
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
        :hover {
          color: #fff;
          background: #3f51b5;
          border-color: #3f51b5;
          box-shadow: 0 2px 8px rgb(0 0 0 / 40%);
        }
      }
    }
  }
`
