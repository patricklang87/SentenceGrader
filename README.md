<h1 align="center">Sentence Accuracy Assesser</h1>

<p align="center">This program, written in vanilla JavaScript, is designed to help auto-grade student sentences on a foreign language test. I was inspired to write the program after using the automatic grading function on Sakai's "Tests and Quizzes". Sakai can do a lot, but it cannot assess the degree to which a student's response resembles an entire sentence, beyond establishing whether the response matches the key perfectly. This program will be applicable in situations where the range of acceptable answers is limited, but the instructor wants more flexibility than the status of "perfect match" or "not a perfect match". Its key components will be a modified Levenshtein calculator, used to detect where unrecognized words are misspellings, and an organizing algorithm, meant to calculate the minimal number of word reorderings required to transform a user submission into an acceptable submission. It generally works, but there are still some bugs to work out.</p>

## Links

- [Try it on GitHub Pages](https://patricklang87.github.io/SentenceGrader/)
- [Repo](https://github.com/patricklang87/SentenceGrader "Sentence Accuracy Assesser Repo")


## Try it out

- This project runs entirely in the browser. Open the [deployment](https://patricklang87.github.io/SentenceGrader/), or open `index.html` locally.
- For each question, you are expected to put all provided words in order, adding correct punctuation and applying necessary morphological changes. When you check your response, the program scores your sentence for accuracy.
- The final section of the page allows you to try with your own example sentence, choosing how you wish to weigh various errors.

## How grading works

Each response is compared with every key answer, and the closest one is used. The grader counts:

| Edit | Default penalty |
|---|---|
| Spelling autocorrection (Levenshtein distance) | 1 |
| Extra word deleted | 1 |
| Missing word inserted | 1 |
| Word moved to the right position | 1 |
| Capitalization fix | 0.5 |
| Punctuation fix | 0.5 |
| Extra penalty for any edit to the "weighted word" | per question |

The score is the question's points minus the weighted edits, with a minimum of 0. The custom question section of the page lets you change every weight.

## Run the tests

```bash
npm install
npm test
```

Jest (with the shared loader in `test-utils/loadPage.js`) loads `index.html` and each script into jsdom the same way the browser does. The tests cover tokenizing, every kind of edit and its penalty, weighted words, Cyrillic text, custom weights, and the demo page's English, German and custom questions. Tests run on every push and pull request via GitHub Actions.

## Built with

- JavaScript
- HTML
- CSS
- Jest + jsdom for tests

## Potential Future Updates

- [ ] Fix remaining assessment bugs (for example, a misspelled weighted word is currently counted as a deletion plus an insertion rather than an autocorrection).
- [ ] This project is conceived as part of potential broader project on collaborative digital textbook production.
 
## Author

**Patrick Lang**

- [Profile](https://github.com/patricklang87 "Patrick Lang")
- [Email](mailto:patricklang87@gmail.com?subject=SentenceAssesser "Sentence Assesser")
