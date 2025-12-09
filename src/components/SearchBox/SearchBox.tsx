import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: (text: string) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };
  return (
    <input
      onChange={handleChange}
      defaultValue={value}
      className={css.input}
      type="text"
      placeholder="Search posts"
    />
  );
}
