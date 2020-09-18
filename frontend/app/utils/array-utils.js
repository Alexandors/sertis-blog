import _ from 'lodash';

export const compareArray = (firstList, secondList) => _.isEqual(firstList.sort(), secondList.sort());
