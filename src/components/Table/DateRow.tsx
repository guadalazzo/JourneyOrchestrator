import { useEffect, useState } from 'react';
import './DateRow.scss';
import { convertToDate, daysTo } from '../../utils';

export default function DateRow({ date }: { date: string }) {
  const [remainingDays, setRemainginDays] = useState('');
  const [departed, setDeparted] = useState(false);

  useEffect(() => {
    const currentDate = convertToDate(date);
    const now = new Date();
    const days = daysTo(now, currentDate);
    if (days <= 0) {
      setDeparted(true);
    } else {
      setRemainginDays(days.toString());
    }
  }, [date]);

  return (
    <div className={departed ? 'departed' : ''}>
      <p>{date}</p>
      {remainingDays && <em>In {remainingDays} days</em>}
      {departed && <em>Departed</em>}
    </div>
  );
}
