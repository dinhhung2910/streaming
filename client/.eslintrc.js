module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    'babel/new-cap': 0,
    'new-cap': [0, {'newIsCap': false, 'capIsNew': false}],
    'no-console': 'off',
    'quotes': [
      'error',
      'single',
    ],
    'indent': ['error', 2],
    // we want to avoid useless spaces
    'no-multi-spaces': ['error'],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0,
  },
};
