import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteTodo, switchTodo } from "../redux/todosSlice";
import { RootState } from "../redux/store";


export const TodoList = ({listIsDone}: {listIsDone: boolean}) => {
  const dispatch = useDispatch();
  const todos: CardType[] = useSelector((state: RootState) => state.todos)
  const handleCompleteButtonClick = (item: CardType): void => {
    dispatch(switchTodo(item));
  };

  const handleDeleteButtonClick = (item: CardType) => {
    dispatch(deleteTodo(item));
  };

  return (
    <Container>
      <div>
        <h1>{listIsDone ? "Done List" : "Working List"}</h1>
        <CardBox>
          {todos
            .filter((todo) => {
              return todo.isDone === listIsDone;
            })
            .map((item) => {
              return (
                <Card key={item.id}>
                  <h2>{item.title}</h2>
                  <p>{item.content}</p>
                  <div>
                    <button onClick={() => handleCompleteButtonClick(item)}>
                      {item.isDone ? "취소" : "완료"}
                    </button>
                    <button onClick={() => handleDeleteButtonClick(item)}>
                      삭제
                    </button>
                  </div>
                </Card>
              );
            })}
        </CardBox>
      </div>
    </Container>
  );
};

const Container = styled.div`
  background-color: #6979f0;
  padding: 10px;
`;
const CardBox = styled.div`
  max-width: 1200px;
  width: 95%;
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.li`
  width: 230px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #111;
  padding: 10px;
  margin: 10px;
  list-style-type: none;
`;
