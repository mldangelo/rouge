# ROUGE.js

A TypeScript implementation of the Recall-Oriented Understudy for Gisting Evaluation (ROUGE) evaluation metric for summaries. This package implements the following metrics:

- n-gram (ROUGE-N)
- Longest Common Subsequence (ROUGE-L)
- Skip Bigram (ROUGE-S)

## Rationale

ROUGE is a standard metric for evaluating the performance of auto-summarization algorithms. However, aside from [MEAD](http://www.summarization.com/mead/) (written in Perl), obtaining a copy of ROUGE typically requires navigating a barely functional [webpage](http://www.isi.edu/licensed-sw/see/rouge/), filling out [forms](http://www.berouge.com/Pages/DownloadROUGE.aspx), and signing a legal release. These steps exist for good reasons, but they can be frustrating when all one wants to do is benchmark an algorithm.

Fortunately, the [paper](http://www.aclweb.org/anthology/W04-1013) describing ROUGE is publicly available. This repository translates the equations in the paper into a more user-friendly format. No more forms—just straightforward usage.

## Quick Start

This package is available on NPM:

```shell
npm install --save rouge
```

To use it, simply import the package:

```typescript
import * as rouge from "rouge";
```

To run the tests:

```shell
npm test
```

This will display colorful output in your CLI. You'll need [Jest](https://jestjs.io/) installed.

## Usage

ROUGE.js provides three functions:

- **ROUGE-N**: `rouge.n(cand, ref, opts)`
- **ROUGE-L**: `rouge.l(cand, ref, opts)`
- **ROUGE-S**: `rouge.s(cand, ref, opts)`

All functions take a candidate string, a reference string, and a configuration object specifying additional options. Documentation for the options is provided inline in `src/rouge.ts`. Type signatures are specified and checked using TypeScript.

Example of evaluating ROUGE-L using an averaged-F1 score instead of the DUC-F1:

```typescript
import { l as rougeL } from "rouge";

const ref = "police killed the gunman";
const cand = "police kill the gunman";

rougeL(cand, ref, { beta: 0.5 });
```

The main functions rely on a set of utility functions specified in `src/utils.ts`. These perform tasks such as evaluating skip bigrams, string tokenization, sentence segmentation, and set intersections.

Example of applying jackknife resampling as described in the original paper:

```typescript
import { n as rougeN } from "rouge";
import { jackKnife } from "rouge/utils";

const ref = "police killed the gunman";
const cands = [
  "police kill the gunman",
  "the gunman kill police",
  "the gunman police killed",
];

// Standard evaluation taking the arithmetic mean
jackKnife(cands, ref, rougeN);

// A function that returns the max value in an array
const distMax = (arr: number[]): number => Math.max(...arr);

// Modified evaluation taking the distribution maximum
jackKnife(cands, ref, rougeN, distMax);
```

## Versioning

Development follows Semantic Versioning guidelines to ensure transparency and backward compatibility.

Releases are numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

- Breaking backward compatibility increments the major version (and resets minor and patch versions)
- New additions without breaking backward compatibility increment the minor version (and reset the patch version)
- Bug fixes and miscellaneous changes increment the patch version

For more information on SemVer, visit [semver.org](http://semver.org/).

## Bug Tracking and Feature Requests

Have a bug or a feature request? [Please open a new issue](https://github.com/mldangelo/rouge/issues).

Before opening any issue, please search for existing issues and read the [Issue Guidelines](CONTRIBUTING.md).

## Contributing

Please submit all pull requests against \*-wip branches. All code should pass ESLint validation. Note that files in `src` are written in TypeScript and transpiled to corresponding files in `dist` using esbuild.

The amount of data available for writing tests is unfortunately inadequate. I've tried to be as thorough as possible, but errors may still exist. The gold standard is the DUC dataset, but it is form-walled and legal-release-walled, which is infuriating. If you have data in the form of a candidate summary, reference(s), and a verified ROUGE score you do not mind sharing, I would love to add it to the test harness.

## License

MIT
