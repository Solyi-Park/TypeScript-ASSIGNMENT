import { useDispatch, useSelector } from "react-redux";
import { Input } from "../components/Input";
import { TodoList } from "../components/todoList";
import { useState } from "react";
import uuid from "react-uuid";
import { addTodo } from "../redux/todosSlice";

const Home = () => {
  const dispatch = useDispatch();
  const todos: CardType[] = useSelector(state => state)
  console.log(todos)
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [listIsDone, setListIsDone] = useState<boolean>(false);
  // const [cards, setCards] = useState<CardType[]>([]);

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
    dispatch(addTodo(newCard))
    // setCards([newCard, ...cards]);
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
      <TodoList listIsDone={false} cards={todos} setCards={setCards} />
      <TodoList listIsDone={true} cards={todos} setCards={setCards} />
    </>
  );
};

export default Home;
