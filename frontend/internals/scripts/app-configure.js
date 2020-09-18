require('shelljs/global');

const appConf = process.argv[2] || 'dev';

// eslint-disable-next-line no-undef
cp(`internals/app-configurations/config.${appConf}.js`, 'app/config.js');
