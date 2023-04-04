import { useState } from 'react'
import { TodoItem } from './components/TodoItem';
import { ToDoItemForm } from './components/ToDoItemForm';

function App() {
  const [items, setItems] = useState([]);
  const [sort, setSort] = useState("createdAtDesc");

  const handleSortChange = (event) => {
    setSort(event.target.value);
  }

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  }

  const handleCreateItem = (item) => {
    setItems([...items, item]);
  }

  const handleMarkItemAsDone = (id, done) => {
    setItems(items.map(newItem => {
      if(newItem.id === id) {
        return {...newItem, done: !done};
      }
      return newItem;
    }))
  }

  const handleDeleteItem = (id) => {
    setItems(items.filter(newItem => {
      return newItem.id !== id;
    }));
  };

  const itemComponents = items.sort((a, b) => {
    if(sort === "createdAtAsc") {
      return a.createdAt - b.createdAt;
    }
    
    return b.createdAt - a.createdAt;
  })
  .map(item => {
    return <TodoItem key={item.id} id={item.id} done={item.done} text={item.text} createdAt={item.createdAt} onDeleteItem={handleDeleteItem} onMarkItemAsDone={handleMarkItemAsDone} />
  });

  return (
     <div>
      <h1>TODO APP</h1>
      <ToDoItemForm onCreateItem={handleCreateItem} />
      <select onChange={handleSortChange} defaultValue={sort} >
        <option value="createdAtAsc">Created at (Ascdending)</option>
        <option value="createdAtDesc">Created at (Descending)</option>
      </select>
      {itemComponents}
    </div> 
  );
}

export default App
