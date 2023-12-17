import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __deleteTodo, __getTodos, __switchTodo } from "../redux/todosSlice";
import { RootState, useAppDispatch } from "../redux/store";
import { useEffect } from "react";
import { CardType } from "../types/global";

type todosType = {
  todos: CardType[];
  isLoading: boolean;
  isError: boolean;
};
export const TodoList = ({ listIsDone }: { listIsDone: boolean }) => {
  const dispatch = useAppDispatch(); 
  const { todos, isLoading, isError }: todosType = useSelector(
    (state: RootState) => state.todos
  );
  const fetchData = async () => {
    try {
      dispatch(__getTodos());
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div>로딩중입니다...!</div>;
  }

  if (isError) {
    return <div>오류가 발생하였습니다..!</div>
  }


  const handleCompleteButtonClick = async (item: CardType) => {
    dispatch(__switchTodo(item.id));
  };

  const handleDeleteButtonClick = async (item: CardType) => {
    dispatch(__deleteTodo(item.id));
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
                    <button
                      type="button"
                      onClick={() => handleCompleteButtonClick(item)}
                    >
                      {item.isDone ? "취소" : "완료"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteButtonClick(item)}
                    >
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
