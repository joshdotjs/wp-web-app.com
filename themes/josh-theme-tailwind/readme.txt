This combo-pack worked for me:
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^12.1.4",
    "@testing-library/user-event": "^13.5.0",


Running tests:
  nvm use 17        (fetch native to Node only since 17.5) -- NOTE: FETCH STILL FAILS
  node --version    (> 17.5)
  npm run t         (test:unit)
