# React project Messaging App
  -Live chat feature is coming soon.
  -Currently you have to reload page to get update.

[hosted on Netlify](https://tenzin-letschat.netlify.app) 

- This is a messaging app that allows users to send messages to each other.
- The app is built using MERN stack.

## Features

### Must-have features

- Users can sign up and log in.
- Users can see a list of other users.
- Users can send messages to each other.
- Users can see the messages they have sent and received.
- Users can edit messages they have sent.
- Users can delete messages they have sent.
- Users can see when a message has been sent and received.
- Users can see when messages have updated.

### Nice-to-have features

- Users can see when a message has been read.
- Users can see when a message has been deleted.
- Fancy login page.
- Users can see when a user is typing.
- Users can see when a user is online.
- Users can see when a user was last online.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
