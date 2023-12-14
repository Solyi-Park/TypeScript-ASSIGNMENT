interface CardType {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
};

interface InputProps {
    handleChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeContent: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    title: string;
    content: string;
  };

interface TodoListProps {
    listIsDone: boolean;
    cards: CardType[];
    setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
  }