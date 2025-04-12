# TailwindCSS - Gulp - SASS

[Download git]([https://](https://git-scm.com/downloads))

[Nodejs Download]([https://](https://nodejs.org/en/download))

Terminalを起動してコマンド入力する

```bash:
  git clone [gitURL]
```

## Install

```cmd:
  npm install
```

## Config file

### TailwindCSS

> ~/tailwind.config.js

### GULP

> ~/gulpfile.js

### TypeScript

> ~/tsconfig.json

## Browsers that we support

- defaults
- not IE 11
- maintained node versions

## Usage

### Directory

```code
  ├── .browserslistrc
  ├── .gitignore
  ├── gulpfile.js
  ├── package-lock.json
  ├── package.json
  ├── readme.md
  ├── tailwind.config.js
  ├── tsconfig.json
  ├── src
  │   ├── pages
  │   │   ├── common
  │   │   │   │...
  │   │   │
  │   │   ├── components
  │   │   │   │...
  │   │   │
  │   │   └── index.pug
  │   ├── scss
  │   │   └── index.scss
  │   ├── assets
  │   │   ├── doc
  │   │   ├── files
  │   │   └── img
  │   └── ts
  │      └── main.ts
  └── build
```

### Scripts

- Development

  > npm run dev

- Build Production

  > npm run build

## Reference

### Tailwind

- Documents (公式ドキュメント)
  <https://tailwindcss.com/>

- Tailwind Cheat Sheet (チートシート)
  <https://tailwindcomponents.com/cheatsheet/>
