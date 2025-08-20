import { useState, useEffect } from "react";
import { scanTodos, createTodo } from "./dynamo";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    async function fetchTodos() {
      try {
        const items = await scanTodos();
        setTodos(items);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    const item = {
      id: Date.now().toString(),
      Text: text,
      IsComplete: false,
    };
    try {
      await createTodo(item);
      setTodos([...todos, item]);
      setText("");
    } catch (err) {
      console.log(err.message);
    }
  };

  const changeHandlerText = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <div style={{ padding: 20 }}>
        <h1>Todo App</h1>
        <input
          value={text}
          onChange={changeHandlerText}
          style={{ marginRight: 8 }}
        />
        <button onClick={handleAddTodo}>Send Data</button>
        <ul style={{ marginTop: 16 }}>
          {todos.map((t) => (
            <li key={t.id}>{t.Text}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
