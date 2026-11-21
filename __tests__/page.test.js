/** @jest-environment jsdom */
const { loadPage } = require('./loadPage');

// The page's scripts declare top-level consts, so they can only be loaded
// once per window — load the page once for this file.
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  expect(loadPage()).toEqual([]);
});

afterAll(() => console.log.mockRestore());

const submit = (language, answer) => {
  document.getElementById(`${language}-response`).value = answer;
  document.getElementById(`${language}-button`).click();
  return document.getElementById(`${language}-result`);
};

describe('demo page', () => {
  it('scores the English question and shows the closest correct answer', () => {
    const result = submit('english', 'My sister wants to try to eat helthily.');
    expect(result.style.display).toBe('grid');
    expect(result.textContent).toContain('Score: 3 out of 4');
    expect(result.textContent).toContain('Closest Correct Answer:');
    expect(result.textContent).toContain('Autocorrections: 1');
  });

  it('replaces the previous result when submitting again', () => {
    submit('german', 'Ich bin spät nach Hause gekommen.');
    const result = submit('german', 'Spät bin ich nach Hause gekommen.');
    expect(result.children).toHaveLength(1);
    expect(result.textContent).toContain('Score: 4 out of 4');
  });

  it('scores a custom sentence with custom weights', () => {
    document.getElementById('ans-key-1').value = 'The cat sleeps.';
    document.getElementById('ans-key-2').value = ''; // optional keys left blank
    document.getElementById('ans-key-3').value = '';
    document.getElementById('weighted-word').value = 'cat';
    document.getElementById('point-value').value = '10';
    document.getElementById('autocorrection-weight').value = '2';
    const result = submit('custom', 'The cat slepes.');
    expect(result.textContent).toContain('Score: 8 out of 10');
  });
});
