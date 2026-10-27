import { ErrorMessage } from '../shared/ErrorMessage';
import { useLocale } from '../shared/i18n/LocaleContext';
import { ApplicationForm } from './ApplicationForm';
import { ApplicationTimeline } from './ApplicationTimeline';
import { useMyApplication } from './api';

export function OnboardingPage() {
  const { t } = useLocale();
  const application = useMyApplication();

  return (
    <div className="page">
      <header className="page-header">
        <h1>{t.onboarding.title}</h1>
        <p className="lede">{t.onboarding.lede}</p>
      </header>
      {application.isPending && <p className="muted">{t.onboarding.loading}</p>}
      <ErrorMessage error={application.error} />
      {application.data === null && <ApplicationForm />}
      {application.data && <ApplicationTimeline application={application.data} />}
    </div>
  );
}
