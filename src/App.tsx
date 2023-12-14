import { Input } from "./components/input";
import { TodoList } from "./components/todoList";
import { useState } from "react";
import uuid from "react-uuid";

function App() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [listIsDone, setListIsDone] = useState<boolean>(false);
  const [cards, setCards] = useState<CardType[]>([]);

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
    setCards([newCard, ...cards]);
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
      <TodoList listIsDone={false} cards={cards} setCards={setCards} />
      <TodoList listIsDone={true} cards={cards} setCards={setCards} />
    </>
  );
}

export default App;
