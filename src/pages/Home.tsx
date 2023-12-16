import { Input } from "../components/Input";
import { TodoList } from "../components/TodoList";


const Home = () => {
  return (
    <>
      <Input />
      <TodoList listIsDone={false} />
      <TodoList listIsDone={true} />
    </>
  );
};

export default Home;
