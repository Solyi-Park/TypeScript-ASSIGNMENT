import { useSelector } from "react-redux";
import { Input } from "../components/Input";
import { TodoList } from "../components/todoList";
import { useState } from "react";
import uuid from "react-uuid";
import { addTodo } from "../redux/todosSlice";
import { RootState, useAppDispatch } from "../redux/store";

const Home = () => {
  const dispatch = useAppDispatch();
  const todos: CardType[] = useSelector((state: RootState) => state.todos)
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
    <>
      <Input
        handleChangeTitle={handleChangeTitle}
        handleChangeContent={handleChangeContent}
        handleOnSubmit={handleOnSubmit}
        title={title}
        content={content}
      />
      <TodoList listIsDone={false} todos={todos} />
      <TodoList listIsDone={true} todos={todos} />
    </>
  );
};

export default Home;
