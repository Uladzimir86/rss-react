import React, { ReactElement, useState } from 'react';

const Form = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  return (
    <form className="form">
      <label className="form__label">
        Name:
        <input type="text" className="form__input" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="form__label">
        Surname:
        <input type="text" className="form__input" value={surname} onChange={(e) => setSurname(e.target.value)} />
      </label>
    </form>
  )
}

const App = (): ReactElement => <Form />

export default App;
