import { ErrorMessage } from '../shared/ErrorMessage';
import { ApplicationForm } from './ApplicationForm';
import { ApplicationTimeline } from './ApplicationTimeline';
import { useMyApplication } from './api';

export function OnboardingPage() {
  const application = useMyApplication();

  return (
    <div className="page">
      <header className="page-header">
        <h1>Open your account</h1>
        <p className="lede">
          Your application becomes a Customer in the Customers service. When an operator approves it, the Accounts
          service hears about it and opens your checking account on its own.
        </p>
      </header>
      {application.isPending && <p className="muted">Loading your application…</p>}
      <ErrorMessage error={application.error} />
      {application.data === null && <ApplicationForm />}
      {application.data && <ApplicationTimeline application={application.data} />}
    </div>
  );
}
