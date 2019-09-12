import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          transition: all 0.2s ease-in-out;
          white-space: nowrap;
          background: #7159c1;
          color: #fff;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
          &:hover {
            padding: 5px 6px;
          }
        }
      }

      span {
        transition: all 0.2s ease-in-out;
        white-space: nowrap;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
        &:hover {
          padding: 5px 6px;
        }
        &.open {
          background: #0000ff;
          color: #fff;
        }
        &.closed {
          background: #ff0000;
          color: #fff;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const StateStatus = styled.div`
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  border: 1px solid #eee;

  h1 {
    flex: 1;
    font-weight: normal;
    margin: 10px auto;
  }
  div {
    margin-bottom: 10px;

    label {
      margin-left: 10px;
      strong {
        margin-left: 5px;
      }
    }
  }
`;

export const Pagination = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  margin-top: 15px;

  p {
    text-align: center;
  }

  button {
    transition: all 0.2s ease-in-out;
    background: #7159c1;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    border: 1px solid black;
    padding: 5px 10px;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      opacity: 0.6;
    }
  }
`;
