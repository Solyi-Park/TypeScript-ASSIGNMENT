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
    }
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
