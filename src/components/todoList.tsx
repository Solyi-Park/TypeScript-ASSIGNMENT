import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteTodo, getTodos, switchTodo } from "../api/todos";
import swal from "sweetalert";

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

  const handleDeleteButtonClick = async (item: CardType) => {
    const confirm = await swal({
      title: "삭제할까요?",
      icon: "warning",
      buttons: ["취소", "확인"],
      dangerMode: true,
    });
    if (confirm) {
      deleteTodoMutation.mutate(item);
    }
  };

  return (
    <Container>
      <h1>{listIsDone ? "Done List" : "Working List"}</h1>
      <CardBox>
        {data
          .filter((item) => {
            return item.isDone === listIsDone;
          })
          .map((item) => {
            return (
              <Card key={item.id}>
                <TextArea>
                  <h2>{item.title}</h2>
                  <p>{item.content}</p>
                </TextArea>
                <Buttons>
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
                </Buttons>
              </Card>
            );
          })}
      </CardBox>
    </Container>
  );
};

const Container = styled.div`
  margin: 20px;
  padding: 10px;
  & h1 {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 15px;
  }
`;
const CardBox = styled.div`
  max-width: 1200px;
  width: 95%;
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.li`
  position: relative;
  width: 230px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #b9c1fb;

  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  font-size: 16px;
  list-style-type: none;
  & h2 {
    font-size: 25px;
    font-weight: 400;
  }
`;

const Buttons = styled.div`
  position: absolute;
  margin-top: 120px;
   & button {
    padding: 5px 20px;
    margin-right: 5px;
    background-color: #fff;
    border-radius: 20px;
    border: none;
    font-size: 18px;
     &:hover {
      cursor: pointer;
      background-color: #6979f0;
      color: #fff;
      border: none;
     }
   } 
`

const TextArea = styled.div`
  overflow: hidden;
`