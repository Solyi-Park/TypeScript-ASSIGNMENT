import React from "react";
import styled from "styled-components";

export const TodoList: React.FC<TodoListProps> = ({ listIsDone, cards, setCards }) => {
  
  
  const handleCompleteButtonClick = (item: CardType): void => {
    const newCard = cards.map(card => {
      return card.id === item.id ? {...card, isDone: !card.isDone} : card 
    })
    setCards(newCard);
  };

  const handleDeleteButtonClick = (item: CardType) => {
    const updateCards = cards.filter(card => card.id !== item.id)
    setCards(updateCards)
  };

  return (
    <Container>
      <div>
        <h1>{listIsDone ? "Done List" : "Working List"}</h1>
        <CardBox>
          {cards
            .filter((card) => {
              return card.isDone === listIsDone;
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
                    <button onClick={() => handleDeleteButtonClick(item)}>삭제</button>
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
