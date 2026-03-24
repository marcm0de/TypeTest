# TypeTest ⌨️

A clean, distraction-free typing speed test — inspired by [monkeytype](https://monkeytype.com).

![TypeTest](https://img.shields.io/badge/Built%20with-Next.js-black) ![License](https://img.shields.io/badge/License-MIT-yellow)

## Features

- **Real-time WPM & accuracy** — updates as you type
- **Character feedback** — green for correct, red for errors, blinking cursor
- **Timer modes** — 15s, 30s, 60s, 120s
- **Results breakdown** — WPM, accuracy %, correct/wrong characters
- **Keyboard heatmap** — see which keys trip you up
- **Test history** — last 20 tests stored locally
- **Personal best tracking** — celebrate new records
- **Dark/light mode** — toggle with one click
- **Zero dependencies on backend** — 100% client-side

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://zustand-demo.pmnd.rs) (state management)
- [Framer Motion](https://www.framer.com/motion) (animations)
- [Lucide React](https://lucide.dev) (icons)

## Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/TypeTest.git
cd TypeTest

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start typing.

## How It Works

1. Select a timer mode (15s, 30s, 60s, or 120s)
2. Start typing the displayed text — the timer begins on first keypress
3. Characters turn **green** (correct) or **red** (wrong) as you type
4. When time runs out (or you finish the text), see your results
5. Review your keyboard heatmap to identify weak keys
6. Check your history and try to beat your personal best

## Word Bank

The app uses a curated bank of 250+ common English words to generate random test paragraphs. Each test generates a fresh combination.

## License

[MIT](LICENSE) — do whatever you want with it.
