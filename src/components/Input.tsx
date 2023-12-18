import styled from "styled-components";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addTodo } from "../api/todos";

export const Input = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
    onError: (err) => {
      console.log(err);
    },
  });

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
    mutation.mutate(newCard);
    setTitle("");
    setContent("");
  };

  return (
    <Container>
      <h1>MY TODO LIST</h1>
      <form onSubmit={handleOnSubmit}>
        <input
          value={title}
          onChange={handleChangeTitle}
          placeholder="제목을 입력해주세요."
        />
        <input
          value={content}
          onChange={handleChangeContent}
          placeholder="세부사항을 입력해주세요."
        />
        <button type="submit">추가하기</button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 30vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & h1 {
    margin-bottom: 50px;
    font-size: 30px;
    font-weight: 700;
    font-style: italic;
  }
  & input {
    width: 400px;
    height: 35px;
    margin-right: 10px;
    border: 1.5px solid #111;
    border-radius: 30px;
    padding: 5px 15px;
    font-size: 16px;
  }
  & button {
    padding: 13px 20px;
    font-size: 18px;
    background-color: transparent;
    border: none;
    font-weight: 600;
    &:hover {
      color: #6979f0;
      transition: 0.3s;
      cursor: pointer;
    }
  }
`;
