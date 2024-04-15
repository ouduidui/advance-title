import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration';
import './index.css';

dayjs.extend(duration);

document.querySelector('#root')!.innerHTML = `
<div class="content">
  <h1>Vanilla Rsbuild</h1>
  <p>Start building amazing things with Rsbuild.</p>
</div>
`;


const searchParams = new URLSearchParams(window.location.search);

const type = searchParams.get('type')

const handleDateDiff = () => {
  const startDate = getDate(searchParams.get('start-date') || 'now')
  const endDate =  getDate(searchParams.get('end-date') || 'now')

  if(!startDate || !endDate) {
    console.error('invalid date')
    return;
  }

  const diff = endDate.diff(startDate, 'day', true);
  const duration = dayjs.duration(diff, 'days');
  const durations = [duration.years(), duration.months(), duration.days(), duration.hours(),duration.minutes(), duration.seconds()];
  
  let isStart = false;
  const text = ['年', '月', '天','小时', '分钟', '秒'].reduce((acc, cur, index) => {
    const count = durations[index];
    console.log(count)
    if(!isStart && count <= 0) {
      return acc;
    }

    isStart = true;
    acc += `${durations[index]}${cur}`
    return acc;
  }, '')
  document.title = `${text}`
}

const getDate = (dateStr: string) => {
  if(dateStr === 'now') {
    return dayjs()
  }
  const date = dayjs(dateStr)
  if(date.isValid()) {
    return date;
  }

  return null;
}

switch(type) {
  case 'date-diff':
    handleDateDiff()
}