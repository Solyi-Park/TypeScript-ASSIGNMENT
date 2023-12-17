import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addTodo, deleteTodo, setTodo, switchTodo } from "../redux/todosSlice";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import axios from "axios";
import { CardType } from "../types/global";

export const TodoList = ({ listIsDone }: { listIsDone: boolean }) => {
  const dispatch = useDispatch();
  const todos: CardType[] = useSelector((state: RootState) => state.todos);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/todos");
      dispatch(setTodo(data));
      console.log(todos);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCompleteButtonClick = async (item: CardType) => {
    try {
      await axios.patch(`http://localhost:4000/todos/${item.id}`, {
        isDone: !item.isDone,
      });
      dispatch(switchTodo(item));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteButtonClick = async (item: CardType) => {
    try {
      await axios.delete(`http://localhost:4000/todos/${item.id}`);
      dispatch(deleteTodo(item));
      // 또 fetchData 여기서..?
    } catch (err) {
      console.log(err);
    }
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
