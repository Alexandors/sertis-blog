import React, {
  createContext, useContext, useState, useMemo,
} from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { DEFAULT_LOCALE } from 'containers/app/constants';

const LocaleContext = createContext();

export const LocaleProvider = ({ messages, children, locale }) => {
  const [currentLocale, setCurrentLocale] = useState(locale);
  const localeValue = useMemo(() => ({ locale: currentLocale, setLocale: setCurrentLocale }), [currentLocale]);
  return (
    <LocaleContext.Provider value={localeValue}>
      <IntlProvider locale={localeValue.locale} messages={messages[localeValue.locale]}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

LocaleProvider.propTypes = {
  children: PropTypes.element,
  messages: PropTypes.object,
  locale: PropTypes.string,
};

LocaleProvider.defaultProps = {
  messages: {},
  locale: DEFAULT_LOCALE,
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (_.isNil(context)) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
