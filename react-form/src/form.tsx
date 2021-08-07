import React, { ReactElement, useEffect, useState } from 'react';

let id = 0;

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
  const [errors, setErrors] = useState({});
  const [errorSubmit, setErrorSubmit] = useState('');
  const [messageSubmit, setMessageSubmit] = useState(false);

  const validate = () => {
    setErrors({});
    if (!agree) {
      setErrors((state) => ({...state, agree}))
    }
    if (!/\w/.test(name)) {
      setErrors((state) => ({...state, name}))
    }
    if (!/\w/.test(surname)) {
      setErrors((state) => ({...state, surname}))
    }
    if (!/\w/.test(birth) ||
      ((new Date()).getFullYear() - (new Date(birth)).getFullYear()) < 4 ||
      ((new Date()).getFullYear() - (new Date(birth)).getFullYear()) > 120) {
      setErrors((state) => ({...state, birth}))
    }
    if (!/\w/.test(zip)) {
      setErrors((state) => ({...state, zip}))
    }
    if (!/\w/.test(delivery) || new Date(delivery) < new Date()) {
      setErrors((state) => ({...state, delivery}))
    }
    if (!/\w/.test(gender)) {
      setErrors((state) => ({...state, gender}))
    }
    if (!/\w/.test(notifications)) {
      setErrors((state) => ({...state, notifications}))
    }
  }
  useEffect(() => { validate() }, [agree, name, surname, birth, zip, delivery, gender, notifications])

  useEffect(() => { setTimeout(() => {
    setMessageSubmit(false)
  }, 2000) }, [messageSubmit]);

  const reset = () => {
    setName('');
    setSurname('');
    setBirth('');
    setCountry('Belarus');
    setAgree(false);
    setZip('');
    setDelivery('');
    setGender('');
    setNotifications('');
    setErrors({});
    setErrorSubmit('');
    setMessageSubmit(false);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      id += 1;
      setErrorSubmit('');
      setMessageSubmit(true);
      setCardsArray((state) => [...state, {name, surname, birth, country, agree, zip, delivery, gender, notifications, id}]);
      reset();
    } else setErrorSubmit(Object.keys(errors).join(', '));
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form__label">
        Name:
        <input type="text" className="form__input" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="form__label">
        Surname:
        <input type="text" className="form__input" value={surname} onChange={(e) => setSurname(e.target.value)} />
      </label>
      <label className="form__label">
        Birthday:
        <input type="date" className="form__input" value={birth} title="You have to be 5 - 124 years old" onChange={(e) => setBirth(e.target.value)} />
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
        <span>{agree === false  && <span className="error">...agree should be check!</span>}</span>
      </label>
      <label className="form__label form__label_submit">
        <input type="submit" className="form__input form__input_submit" value="Send"  />
      </label>
      <span className="error-submit">{errorSubmit && `Please, check this field(s): ${errorSubmit}` }</span> 
      <span className="error-submit">{messageSubmit && `New form has been created !!!` }</span> 
    </form>
  )
}

export default Form;
