import { Link } from 'react-router';
import { formatTime } from '../shared/format';
import { type Locale } from '../shared/i18n/locale';
import { useLocale } from '../shared/i18n/LocaleContext';
import { type Messages } from '../shared/i18n/messages';
import { type Application } from '../shared/types';
import { useMyAccounts } from './api';

type StepState = 'done' | 'waiting' | 'failed';

interface Step {
  title: string;
  detail: string;
  state: StepState;
}

function steps(
  application: Application,
  accountNumber: string | null,
  t: Messages['timeline'],
  locale: Locale,
): Step[] {
  const sent: Step = { title: t.sent, detail: formatTime(application.registeredAt, locale), state: 'done' };
  if (application.status === 'Rejected') {
    return [sent, { title: t.rejected, detail: application.rejectionReason ?? '', state: 'failed' }];
  }
  if (application.status === 'PendingReview') {
    return [
      sent,
      { title: t.underReview, detail: t.underReviewDetail, state: 'waiting' },
      { title: t.accountOpening, detail: t.accountOpeningDetail, state: 'waiting' },
    ];
  }
  return [
    sent,
    {
      title: t.approved,
      detail: application.reviewedAt ? formatTime(application.reviewedAt, locale) : '',
      state: 'done',
    },
    accountNumber
      ? { title: t.accountOpen, detail: t.accountOpenDetail(accountNumber), state: 'done' }
      : { title: t.openingAccount, detail: t.openingAccountDetail, state: 'waiting' },
  ];
}

export function ApplicationTimeline({ application }: { application: Application }) {
  const { locale, t } = useLocale();
  const accounts = useMyAccounts(application.status === 'Approved');
  const account = accounts.data?.[0];
  const accountNumber = account ? `${account.branch}/${account.number}` : null;

  return (
    <section className="panel timeline-panel" aria-labelledby="timeline-title">
      <h2 id="timeline-title">{t.timeline.title}</h2>
      <ol className="timeline">
        {steps(application, accountNumber, t.timeline, locale).map((step) => (
          <li key={step.title} className={`timeline-step timeline-${step.state}`}>
            <strong>{step.title}</strong>
            <span className="muted">{step.detail}</span>
          </li>
        ))}
      </ol>
      {accountNumber && (
        <Link to="/accounts" className="button primary">
          {t.timeline.goToAccount}
        </Link>
      )}
    </section>
  );
}
