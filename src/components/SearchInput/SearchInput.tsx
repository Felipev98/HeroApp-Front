import styles from './SearchInput.module.css';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Buscar...',
  disabled = false,
}: SearchInputProps) {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.searchInput}
        disabled={disabled}
      />
    </div>
  );
}

