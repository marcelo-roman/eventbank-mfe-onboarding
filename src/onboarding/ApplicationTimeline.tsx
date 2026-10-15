import { Link } from 'react-router';
import { formatTime } from '../shared/format';
import { type Application } from '../shared/types';
import { useMyAccounts } from './api';

type StepState = 'done' | 'waiting' | 'failed';

interface Step {
  title: string;
  detail: string;
  state: StepState;
}

function steps(application: Application, accountNumber: string | null): Step[] {
  const sent: Step = { title: 'Application sent', detail: formatTime(application.registeredAt), state: 'done' };
  if (application.status === 'Rejected') {
    return [sent, { title: 'Not approved', detail: application.rejectionReason ?? '', state: 'failed' }];
  }
  if (application.status === 'PendingReview') {
    return [
      sent,
      { title: 'Under review', detail: 'An operator is checking your details.', state: 'waiting' },
      { title: 'Account opening', detail: 'Starts as soon as you are approved.', state: 'waiting' },
    ];
  }
  return [
    sent,
    { title: 'Approved', detail: application.reviewedAt ? formatTime(application.reviewedAt) : '', state: 'done' },
    accountNumber
      ? { title: 'Account open', detail: `Branch and account ${accountNumber}`, state: 'done' }
      : { title: 'Opening your account', detail: 'This takes a moment.', state: 'waiting' },
  ];
}

export function ApplicationTimeline({ application }: { application: Application }) {
  const accounts = useMyAccounts(application.status === 'Approved');
  const account = accounts.data?.[0];
  const accountNumber = account ? `${account.branch}/${account.number}` : null;

  return (
    <section className="panel timeline-panel" aria-labelledby="timeline-title">
      <h2 id="timeline-title">Your application</h2>
      <ol className="timeline">
        {steps(application, accountNumber).map((step) => (
          <li key={step.title} className={`timeline-step timeline-${step.state}`}>
            <strong>{step.title}</strong>
            <span className="muted">{step.detail}</span>
          </li>
        ))}
      </ol>
      {accountNumber && (
        <Link to="/accounts" className="button primary">
          Go to your account
        </Link>
      )}
    </section>
  );
}
