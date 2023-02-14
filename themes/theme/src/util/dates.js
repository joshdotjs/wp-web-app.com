import fromUnixTime from 'date-fns/fromUnixTime'
import getUnixTime from 'date-fns/getUnixTime'

const timeStamp2Date = (time_stamp) => fromUnixTime(time_stamp).toDateString();
const timeStamp2Time = (time_stamp) => fromUnixTime(time_stamp).toLocaleTimeString();

// ==============================================

const date2TimeStamp = (js_date_obj) => getUnixTime(js_date_obj);

// ==============================================

function getDateXDaysAgo(numOfDays, date = new Date()) {
  const daysAgo = new Date(date.getTime());
  daysAgo.setDate(date.getDate() - numOfDays);
  return daysAgo;
}

// ==============================================

export { 
  timeStamp2Date, timeStamp2Time, 
  date2TimeStamp,
  getDateXDaysAgo 
};