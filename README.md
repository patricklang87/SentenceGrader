<h1 align="center">Sentence Accuracy Assesser</h1>

<p align="center">This program, written in vanilla JavaScript, it designed to help auto-grade student sentences on an foreign language test. I was inspired to write the program after using the automatic grading function on Sakai's "Tests and Quizzes". Sakai can do a lot, but it cannot assess the degree to which a student's response resembles an entire sentence, beyond establishing whether the response matches the key perfectly. This program will be appilcable in situations where the range of acceptable answers is limited, but the instructor wants more flexibilty than the status of "perfect match" or "not a perfect match". Its key components will be a modified levenstein calculator, used to detect where unrecognized words are misspellings, and an organizing algorithm, meant to calculate the minimal number of word reorderings required to transform the a user submission into an acceptable submission. It generally works, but there are still some bugs to work out.</p>

## Links

- [Repo](https://github.com/patricklang87/js_assess_2 "Sentence Accuracy Assesser Repo") 


## Try it out

- This project runs in the frontend and has been deployed to GitHub Pages.
- To try it out, go to the deployment. For each question, you are expected to put all provided words in order, adding correct punctuation and applying necessary morphological changes. When you check your response, the program scores your sentence for accuracy.
- The final section of the page allows you to try with your own example sentence, choosing how you wish to weigh various errors.

## Built with

- JavaScript
- HTML
- NPM
- Node
- NPM

## Potential Future Updates

- [ ] Fix remaining assessment bugs.
- [ ] This project is conceived as part of potential broader project on collaborative digital textbook production.
 
## Author

**Patrick Lang**

- [Profile](https://github.com/patricklang87 "Patrick Lang")
- [Email](mailto:patricklang87@gmail.com?subject=SentenceAssesser "Sentence Assesser")
