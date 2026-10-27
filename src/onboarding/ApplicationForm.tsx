import { type SyntheticEvent, useState } from 'react';
import { useUser } from '../shared/auth';
import { ErrorMessage } from '../shared/ErrorMessage';
import { useLocale } from '../shared/i18n/LocaleContext';
import { digits, maskCpf, maskPhone } from '../shared/masks';
import { useSubmitApplication } from './api';

export function ApplicationForm() {
  const { t } = useLocale();
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
      <h2>{t.form.title}</h2>
      <p className="muted">{t.form.lede(user.email)}</p>
      <label className="field">
        <span>{t.form.fullName}</span>
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
          <span>{t.form.cpf}</span>
          <input
            inputMode="numeric"
            value={cpf}
            onChange={(event) => {
              setCpf(maskCpf(event.target.value));
            }}
            placeholder={t.form.cpfPlaceholder}
            required
          />
        </label>
        <label className="field">
          <span>{t.form.birthDate}</span>
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
        <span>{t.form.phone}</span>
        <input
          inputMode="tel"
          value={phone}
          onChange={(event) => {
            setPhone(maskPhone(event.target.value));
          }}
          placeholder={t.form.phonePlaceholder}
          required
        />
      </label>
      <button type="submit" className="button primary" disabled={submit.isPending}>
        {submit.isPending ? t.form.sending : t.form.send}
      </button>
      <ErrorMessage error={submit.error} />
    </form>
  );
}
