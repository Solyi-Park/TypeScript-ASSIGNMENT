import axios from "axios";

const getTodos = async () => {
  const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todos`);
  return res.data;
};

const addTodo = async (newCard) => {
  const res = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/todos`,
    newCard
  );
  return res.data;
};

const deleteTodo = async (item) => {
  await axios.delete(
    `${process.env.REACT_APP_SERVER_URL}/todos/${item.id}`
  );
};

const switchTodo = async (item) => {
  const res = await axios.patch(
    `${process.env.REACT_APP_SERVER_URL}/todos/${item.id}`,
    { isDone: !item.isDone }
  );
  return res.data;
};

export { getTodos, addTodo, deleteTodo, switchTodo };
