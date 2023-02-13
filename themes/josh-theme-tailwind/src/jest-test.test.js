const { generateText } = require('./jest-test');


// ==============================================

// test() is from test runner lib
test('should output name and age', () => {

  const x = 1;

  expect(x).toBe(1); // expect()) is from assertion lib


  const text = generateText('josh', 'b');
  expect(text).toBe('josh and b');
});