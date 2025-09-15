'use client'

import TodoApp from "./writing";

function App() {
  return <TodoApp />
  // const [todos, setTodos] = useState([]);
  // const [inputValue, setInputValue] = useState('');
  // const [filter, setFilter] = useState('all');

  // const addTodo = () => {
  //   if (inputValue.trim()) {
  //     setTodos([...todos, {
  //       id: Date.now(),
  //       text: inputValue,
  //       completed: false
  //     }]);
  //     setInputValue('');
  //   }
  // };

  // const toggleTodo = (id) => {
  //   setTodos(todos.map(todo =>
  //     todo.id === id ? { ...todo, completed: !todo.completed } : todo
  //   ));
  // };

  // const deleteTodo = (id) => {
  //   setTodos(todos.filter(todo => todo.id !== id));
  // };

  // const filteredTodos = todos.filter(todo => {
  //   if (filter === 'completed') return todo.completed;
  //   if (filter === 'active') return !todo.completed;
  //   return true;
  // });

  // return (
  //   <div className="todo-app">
  //     <h1>Todo List</h1>

  //     <div className="todo-input">
  //       <input
  //         type="text"
  //         value={inputValue}
  //         onChange={(e) => setInputValue(e.target.value)}
  //         onKeyPress={(e) => e.key === 'Enter' && addTodo()}
  //         placeholder="Add a new task..."
  //       />
  //       <button onClick={addTodo}>Add</button>
  //     </div>

  //     <div className="filter-buttons">
  //       <button onClick={() => setFilter('all')}>All</button>
  //       <button onClick={() => setFilter('active')}>Active</button>
  //       <button onClick={() => setFilter('completed')}>Completed</button>
  //     </div>

  //     <ul className="todo-list">
  //       {filteredTodos.map(todo => (
  //         <li key={todo.id} className={todo.completed ? 'completed' : ''}>
  //           <input
  //             type="checkbox"
  //             checked={todo.completed}
  //             onChange={() => toggleTodo(todo.id)}
  //           />
  //           <span>{todo.text}</span>
  //           <button onClick={() => deleteTodo(todo.id)}>Delete</button>
  //         </li>
  //       ))}
  //     </ul>

  //     <div className="todo-stats">
  //       {todos.filter(todo => !todo.completed).length} items left
  //     </div>
  //   </div>
  // );
}

export default App;