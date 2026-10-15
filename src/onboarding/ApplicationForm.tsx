import { type SyntheticEvent, useState } from 'react';
import { useUser } from '../shared/auth';
import { ErrorMessage } from '../shared/ErrorMessage';
import { digits, maskCpf, maskPhone } from '../shared/masks';
import { useSubmitApplication } from './api';

export function ApplicationForm() {
  const user = useUser();
  const submit = useSubmitApplication();
  const [fullName, setFullName] = useState(user.name);
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');

  const send = (event: SyntheticEvent) => {
    event.preventDefault();
    submit.mutate({ fullName, cpf: digits(cpf), birthDate, phone: digits(phone) });
  };

  return (
    <form className="panel form application-form" onSubmit={send}>
      <h2>Tell us who you are</h2>
      <p className="muted">We use these details to open your account in your name. Your login is {user.email}.</p>
      <label className="field">
        <span>Full name, as on your documents</span>
        <input
          value={fullName}
          onChange={(event) => {
            setFullName(event.target.value);
          }}
          required
        />
      </label>
      <div className="field-row">
        <label className="field">
          <span>CPF</span>
          <input
            inputMode="numeric"
            value={cpf}
            onChange={(event) => {
              setCpf(maskCpf(event.target.value));
            }}
            placeholder="000.000.000-00"
            required
          />
        </label>
        <label className="field">
          <span>Birth date</span>
          <input
            type="date"
            value={birthDate}
            onChange={(event) => {
              setBirthDate(event.target.value);
            }}
            required
          />
        </label>
      </div>
      <label className="field">
        <span>Mobile phone</span>
        <input
          inputMode="tel"
          value={phone}
          onChange={(event) => {
            setPhone(maskPhone(event.target.value));
          }}
          placeholder="(11) 98765-4321"
          required
        />
      </label>
      <button type="submit" className="button primary" disabled={submit.isPending}>
        {submit.isPending ? 'Sending…' : 'Send application'}
      </button>
      <ErrorMessage error={submit.error} />
    </form>
  );
}
