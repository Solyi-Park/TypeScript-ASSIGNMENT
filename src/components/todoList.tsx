import styled from "styled-components";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteTodo, getTodos, switchTodo } from "../api/todos";

export const TodoList = ({ listIsDone }: { listIsDone: boolean }) => {
  const {
    isLoading,
    isError,
    data = [],
  } = useQuery<CardType[]>("todos", getTodos);

  const queryClient = useQueryClient();
  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const switchTodoMutation = useMutation(switchTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  if (isLoading) {
    return <div>로딩중입니다...!</div>;
  }

  if (isError) {
    return <div>오류가 발생하였습니다...!</div>;
  }

  const handleCompleteButtonClick = async (item: CardType) => {
    switchTodoMutation.mutate(item);
  };


  const handleDeleteButtonClick = (item: CardType) => {
    deleteTodoMutation.mutate(item);
  };

  return (
    <Container>
      <div>
        <h1>{listIsDone ? "Done List" : "Working List"}</h1>
        <CardBox>
          {data
            .filter((item) => {
              return item.isDone === listIsDone;
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
