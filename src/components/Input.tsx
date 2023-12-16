import styled from "styled-components";
import { useAppDispatch } from "../redux/store";
import { useState } from "react";
import { addTodo } from "../redux/todosSlice";
import axios from "axios";

export const Input = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCard: CardType = {
      id: "",
      title,
      content,
      isDone: false,
    };
    try {
      const { data } = await axios.post("http://localhost:4000/todos", newCard);

      // 혹시 이렇게 dispacth로 data를 바로 넘겨주지 않고 state로 관리를 해줘야하나?
      // setTodos(...todos, newCard) 요런식으로 해줘야하나?
      dispatch(addTodo(data));

      // fetchData가 여기에 들어가야하나?
    } catch (err) {
      console.log(err);
    }
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
