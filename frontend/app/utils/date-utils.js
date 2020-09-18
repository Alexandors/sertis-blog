import _ from "lodash";
import moment from 'moment';

export const dateTimeFormat = 'YYYY-MM-DD HH:mm';

export const getFormattedDate = (date) => {
  if (_.isEmpty(date)) return '';
  return moment(date).format(dateTimeFormat);
};
