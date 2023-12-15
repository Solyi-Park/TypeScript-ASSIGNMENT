import styled from "styled-components";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import uuid from "react-uuid";
import { addTodo } from "../redux/todosSlice";

export const Input = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCard: CardType = {
      id: uuid(),
      title,
      content,
      isDone: false,
    };
    dispatch(addTodo(newCard));
  };
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
