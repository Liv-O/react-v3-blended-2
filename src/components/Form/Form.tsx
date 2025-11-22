import { FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';

import style from './Form.module.css';

interface formProps {
  onSubmit: (userInput: string) => void;
}

export default function Form({ onSubmit }: formProps) {
  const handleSubmit = (formData: FormData) => {
    const userInput = (formData.get('search') as string).trim();
    if (userInput === '') {
      toast.error('Please enter your search query.');
    } else {
      onSubmit(userInput);
    }
  };

  return (
    <form
      className={style.form}
      action={handleSubmit}>
      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        autoFocus
      />

      <button
        className={style.button}
        type="submit">
        <FiSearch size="16px" />
      </button>
    </form>
  );
}
