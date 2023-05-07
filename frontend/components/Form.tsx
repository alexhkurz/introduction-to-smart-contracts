import { useState } from 'react';

export default function Form(props: {
  [x: string]: any;
  setValue: (value: React.SetStateAction<string>) => void;
}) {
  const { setValue, ...other } = props;

  const [input, setInput] = useState('');

  return (
    <form>
      <input
        {...other}
        type="text"
        value={input}
        onChange={(e) => {
          e.preventDefault();
          setInput(e.target.value);
          setValue(e.target.value);
        }}
      />
    </form>
  );
}
