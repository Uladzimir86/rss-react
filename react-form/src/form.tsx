import React, { ReactElement, useState } from 'react';

const Form = ({setCardsArray}: {setCardsArray: any}): ReactElement => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birth, setBirth] = useState('');
  const [country, setCountry] = useState('Belarus');
  const [agree, setAgree] = useState(false);
  const [zip, setZip] = useState('');
  const [delivery, setDelivery] = useState('');
  const [gender, setGender] = useState('');
  const [notifications, setNotifications] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setCardsArray((state) => [...state, {name, surname, birth, country, agree, zip, delivery, gender, notifications}])
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form__label">
        Name:{gender}
        <input type="text" className="form__input" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="form__label">
        Surname: {notifications}
        <input type="text" className="form__input" value={surname} onChange={(e) => setSurname(e.target.value)} />
      </label>
      <label className="form__label">
        Birthday:
        <input type="date" className="form__input" value={birth} onChange={(e) => setBirth(e.target.value)} />
      </label>
      <label className="form__label">
        Zip code:
        <input type="text" className="form__input" value={zip} onChange={(e) => setZip(e.target.value)} />
      </label>
      <label className="form__label">
        Delivery date:
        <input type="date" className="form__input" value={delivery} onChange={(e) => setDelivery(e.target.value)} />
      </label>
      <label className="form__label">
        Country:
        <select className="form__input" value={country} onChange={(e) => setCountry(e.target.value)} >
          <option value="Belarus">Belarus</option>
          <option value="Russia">Russia</option>
          <option value="Ukraine">Ukraine</option>
          <option value="Poland">Poland</option>
        </select>
      </label>
      <label className="form__label form__label_radio">
        Male
        <input type="radio" className="form__input_radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)} />
        Female
        <input type="radio" className="form__input_radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} />
      </label>
      <label className="form__label">
        <span className="form__text">
          Receive notifications about promotions:
        </span>
        Yes
        <input type="radio" className="form__input_radio" name="notifications" value="yes" onChange={(e) => setNotifications(e.target.value)} />
        No
        <input type="radio" className="form__input_radio" name="notifications" value="no" onChange={(e) => setNotifications(e.target.value)} />
      </label>
      <label className="form__label form__label_checkbox">
        I agree to the processing of data
        <input type="checkbox" className="form__input_checkbox" checked={agree} onChange={() => setAgree(prev => !prev)} />
      </label>
      <label className="form__label form__label_submit">
        <input type="submit" className="form__input form__input_submit" value="Send"  />
      </label>
    </form>
  )
}

export default Form;
