import { useState } from "react";

export function ToDoItemForm(props) {
    const [formState, setFormState] = useState({ text: "" }); 

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onCreateItem({
            id: Date.now(),
            text: formState.text,
            done: false,
            createdAt: Date.now(),
        });
        setFormState({ ...formState, text: '' });
      }

    const handleChange = (event) => {
        setFormState({
          ...formState,
          [event.target.name]: event.target.value,
        });
      }

    return (
        <form onSubmit={handleSubmit}>
        <input type="text" name="text" onChange={handleChange}
          value={formState.text} />
        <button type="submit">Add item</button>
      </form>
    );
}