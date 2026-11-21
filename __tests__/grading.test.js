/** @jest-environment jsdom */
const { loadPage, pageGlobals } = require('../test-utils/loadPage');

let api;

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  const errors = loadPage();
  expect(errors).toEqual([]);
  api = pageGlobals('prepSentence', 'levCalc', 'findClosestKeyAns', 'scoreAnswer');
});

afterAll(() => console.log.mockRestore());

const english = ['My sister wants to try to eat healthily.', 'My sister tries to want to eat healthily.'];
const russian = ['Я не знаю, хочет ли она пойти в кино.', 'Я не знаю, хочет ли моя сестра пойти в кино.'];
const NO_WEIGHT = ['NONE', 0];

const grade = (key, answer, weightedWord = NO_WEIGHT) => {
  const outcome = api.findClosestKeyAns(key, answer, weightedWord);
  const [score] = api.scoreAnswer(outcome, weightedWord);
  const [, autocorrections, deletions, insertions, reorders, capitalization, punctuation, weighted] = outcome;
  return {
    score,
    edits: { autocorrections, deletions, insertions, reorders, capitalization, punctuation, weighted },
    corrected: outcome[0].map((part) => part.phrase).join(' '),
  };
};

const noEdits = { autocorrections: 0, deletions: 0, insertions: 0, reorders: 0, capitalization: 0, punctuation: 0, weighted: 0 };

describe('prepSentence', () => {
  it('splits words and punctuation into tokens', () => {
    expect(api.prepSentence('Hello, world!')).toEqual(['Hello', ',', 'world', '!']);
    expect(api.prepSentence('Я не знаю, хочет ли она.')).toEqual(['Я', 'не', 'знаю', ',', 'хочет', 'ли', 'она', '.']);
  });
});

describe('grading a response', () => {
  it.each(english)('gives full marks for an exact match with any key answer: %s', (answer) => {
    expect(grade(english, answer)).toEqual({ score: 4, edits: noEdits, corrected: expect.any(String) });
  });

  it('autocorrects a misspelled word for one point', () => {
    const result = grade(english, 'My sister wants to try to eat helthily.');
    expect(result.edits).toEqual({ ...noEdits, autocorrections: 1 });
    expect(result.score).toBe(3);
    expect(result.corrected).toBe('My sister wants to try to eat healthily .');
  });

  it('fixes capitalization for half a point', () => {
    const result = grade(english, 'my sister wants to try to eat healthily.');
    expect(result.edits).toEqual({ ...noEdits, capitalization: 1 });
    expect(result.score).toBe(3.5);
  });

  it('counts a word in the wrong place as one reordering', () => {
    const result = grade(english, 'My sister to try wants to eat healthily.');
    expect(result.edits).toEqual({ ...noEdits, reorders: 1 });
    expect(result.score).toBe(3);
  });

  it('removes an extra word', () => {
    const result = grade(english, 'My sister really wants to try to eat healthily.');
    expect(result.edits).toEqual({ ...noEdits, deletions: 1 });
    expect(result.corrected).toBe('My sister wants to try to eat healthily .');
  });

  it('inserts missing words', () => {
    const result = grade(english, 'My sister wants to eat healthily.');
    expect(result.edits).toEqual({ ...noEdits, insertions: 2 });
    expect(result.score).toBe(2);
  });

  it('treats missing final punctuation as a punctuation edit instead of crashing', () => {
    const result = grade(english, 'My sister wants to try to eat healthily');
    expect(result.edits).toEqual({ ...noEdits, punctuation: 1 });
    expect(result.score).toBe(3.5);
    expect(result.corrected).toBe('My sister wants to try to eat healthily .');
  });

  it('handles answers that stop early', () => {
    const result = grade(english, 'My sister wants to try to eat');
    expect(result.edits).toEqual({ ...noEdits, insertions: 1, punctuation: 1 });
    expect(result.score).toBe(2.5);
  });

  it('never scores below zero', () => {
    expect(grade(english, '').score).toBe(0);
  });

  it('applies the extra penalty for a missing weighted word', () => {
    const result = grade(russian, 'Я не знаю, хочет она пойти в кино.', ['ли', 0.5]);
    expect(result.edits).toEqual({ ...noEdits, insertions: 1, weighted: 1 });
    expect(result.score).toBe(2.5);
  });

  it('works for punctuation inside the sentence (Cyrillic)', () => {
    const result = grade(russian, 'Я не знаю хочет ли она пойти в кино.', ['ли', 0.5]);
    expect(result.edits).toEqual({ ...noEdits, punctuation: 1 });
    expect(result.corrected).toBe('Я не знаю , хочет ли она пойти в кино .');
  });
});

describe('scoreAnswer', () => {
  it('applies custom weights for each kind of edit', () => {
    // [phrase, spelling, deletions, insertions, order, capitalization, punctuation, weighted]
    const outcome = [[], 1, 1, 1, 1, 1, 1, 1];
    expect(api.scoreAnswer(outcome, ['x', 0.5], 10, 1, 2, 0.5, 3, 0.25, 0.25)).toEqual([2.5, 10]);
  });
});
