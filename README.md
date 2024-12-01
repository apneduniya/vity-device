<h1 align="center">Vity Device 🤖</h1>

<p align="center">A telegram bot which will help you too connect your devices and automate its actions seamlessly between devices 🔥</p>

## 📋 Table of Contents
- [Demo](#-demo)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Steps to Run](#-steps-to-run)
- [Project structure](#%EF%B8%8F-project-structure)
- [Contributing](#-contributing)
- [Acknowledgments](#-acknowledgments)
- [License](#-license)

## 🎥 DEMO

[![demo video](https://img.youtube.com/vi/PL2cr0tVX1U/0.jpg)](https://www.youtube.com/watch?v=PL2cr0tVX1U)

## 📙 Features
This telegram bot agent can:

- Interact with nearly all apps and browsers.
- Integrated with **GPT-4o, Gemini Pro Vision, Claude 3 and LLaVa.**
- **Future plan:** Send response back to the commander
- **Future plan:** Connect mobile phones and tablets remotely.

## 🫳 Prerequisites
You should have

- [Python 3.11 or higher](https://www.python.org/downloads/)
- API key of any model from **GPT-4o, Gemini Pro Vision, Claude 3 and LLaVa.**

## 👣 Steps to Run
**Navigate to the Project Directory:**
Change to the directory where the project files are located. For example:
```shell
cd path/to/project/directory
```

1. Change the directory.

   ```bash
   cd host
   ```

2. Create a virtual environment.

   ```bash
   python3 virtualenv venv
   ```

3. Activate the virtual environment.

   ```bash
   source ./venv/bin/activate
   ```

4. Install dependencies from `requirements.txt`

   ```bash
   pip install -r requirements.txt
   ```

5. Configure environment variables

    1. Copy `.env.example` to `.env`.
    2. Fill in the `.env` file with the necessary environment variables.

6. Start the server

   ```bash
    python3 main.py
   ```

## 🏛️ Project structure

```bash
├── .env.local.example
├── .eslintrc.json
├── .gitignore
├── README.md
├── bun.lockb
├── components.json
├── host
│   ├── .env.example
│   ├── .gitignore
│   ├── agent.py
│   ├── listner.py
│   ├── main.py
│   ├── operate
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── exceptions.py
│   │   ├── main.py
│   │   ├── models
│   │   │   ├── __init__.py
│   │   │   ├── apis.py
│   │   │   ├── prompts.py
│   │   │   └── weights
│   │   │       ├── __init__.py
│   │   │       └── best.pt
│   │   ├── operate.py
│   │   └── utils
│   │       ├── __init__.py
│   │       ├── label.py
│   │       ├── misc.py
│   │       ├── ocr.py
│   │       ├── operating_system.py
│   │       ├── screenshot.py
│   │       └── style.py
│   ├── requirements.txt
│   ├── screenshots
│   ├── test.py
│   └── temp.py
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── prompt
│   │   │   │   └── route.ts
│   │   │   └── verify
│   │   │       └── route.ts
│   │   ├── favicon.ico
│   │   ├── fonts
│   │   │   ├── GeistMonoVF.woff
│   │   │   └── GeistVF.woff
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── blocks
│   │   │   ├── expandable-card-demo-grid.jsx
│   │   │   └── expandable-card-demo-standard.jsx
│   │   ├── common
│   │   │   ├── DotBackground.tsx
│   │   │   ├── InputWithButton.tsx
│   │   │   ├── Loader.tsx
│   │   │   └── PromptSuggestionButtton.tsx
│   │   ├── theme-provider.tsx
│   │   └── ui
│   │       ├── alert.tsx
│   │       ├── animated-modal.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       ├── flip-words.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── toast.tsx
│   │       └── toaster.tsx
│   ├── context
│   │   ├── PrivyProvider.tsx
│   │   └── UserAuthContext.tsx
│   ├── hooks
│   │   ├── use-outside-click.js
│   │   ├── use-toast.js
│   │   └── use-toast.ts
│   ├── lib
│   │   ├── ably.ts
│   │   └── utils.ts
│   ├── providers
│   │   └── index.tsx
│   └── utils
│       ├── api.ts
│       └── setTokenCookies.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 🤗 Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes.
4. Push your branch: `git push origin feature-name`.
5. Create a pull request.

## ✍ Acknowledgments
This project couldn't be there if they didn't be there!
- [CapxAI](https://www.capx.ai/)
- [Self Operating Computer](https://github.com/OthersideAI/self-operating-computer)

Even I had many issues while making this project and this was my first time to make a telegram bot but capxai team helped me to over come the issues, gave me suggestions and I am really thankful to it ❤️‍🩹!

## 🧾 License
This project is licensed under the [MIT License](LICENSE).


