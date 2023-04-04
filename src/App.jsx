import { useState } from 'react'

function App() {
  const [items, setItems] = useState([]);
  const [formState, setFormState] = useState({
    text: "",
  });
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setItems([
      ...items,
      {
        id: Date.now(),
        text: formState.text,
        done: false,
        createdAt: Date.now(),
      },
    ]);
    setFormState({ ...formState, text: '' });
  }

  const itemComponents = items.sort((a, b) => {
    if(sort === "createdAtAsc") {
      return a.createdAt - b.createdAt;
    }
    
    return b.createdAt - a.createdAt;
  })
  .map(item => {
    const handleChange = () => {
      setItems(items.map(newItem => {
        if (newItem.id === item.id) {
          return { ...newItem, done: !item.done };
        }
        return newItem;
      }));
    };

    const handleClick = () => {
      setItems(items.filter(newItem => {
        return newItem.id !== item.id;
      }));
    };

    return (
      <div key={item.id}>
        <input type="checkbox" checked={item.done} onChange={handleChange} />
        {item.text} ({new Date(item.createdAt).toUTCString()})
        <button onClick={handleClick}>X</button>
      </div>
    );
  });

  return (
    <div>
      <h1>TODO APP</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="text" onChange={handleChange}
          value={formState.text} />
        <button type="submit">Add item</button>
      </form>
      <select onChange={handleSortChange} defaultValue={sort} >
        <option value="createdAtAsc">Created at (Ascdending)</option>
        <option value="createdAtDesc">Created at (Descending)</option>
      </select>
      {itemComponents}
    </div>
  )
}

export default App
