import { PropsWithChildren, ReactNode } from "react";
import styled from "styled-components";

export const Input = ({
  handleChangeTitle,
  handleChangeContent,
  handleOnSubmit,
  title,
  content,
}: PropsWithChildren<InputProps>) => {
  return (
    <Container>
      <h1>Todo list 등록하기</h1>
      <form onSubmit={handleOnSubmit}>
        제목&nbsp;
        <input value={title} onChange={handleChangeTitle} />
        내용&nbsp;
        <input value={content} onChange={handleChangeContent} />
        <button type="submit">등록</button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  background-color: #f29150;
`;
