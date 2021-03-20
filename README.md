# React PDF Viewer

[![Watch Demo](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&logoWidth=30)](https://www.youtube.com/watch?v=7P7DYkTOC0M)

View PDF files in your react project. Supports the following features:

- Zoom Pages
- Next and Prev buttons to navigate between pages
- Rotate a Page
- Page Scrolling
- Rearrange Pages
- Thumbnail Preview

[![Watch Demo](https://img.youtube.com/vi/7P7DYkTOC0M/0.jpg)](https://www.youtube.com/watch?v=7P7DYkTOC0M)

(click on the image above to watch video demo)

[Fullpage Screenshot!](https://i.imgur.com/dwVzAQE.png)

[Live Demo on Netlify](https://react-pdf-example.netlify.app/)

[Code Demo on CodeSandBox](https://codesandbox.io/s/react-pdf-15j2q)

[Code Example on Github](https://github.com/soubhikchatterjee/react-pdf-example)

---

## Install

> npm i @soubhikchatterjee/react-pdf

> npm i -D node-sass

### Usage

This module uses React/Redux to pass props/data from one component to another. Please follow the following setup instructions.

`/index.js`

```
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "@soubhikchatterjee/react-pdf/dist/store/store";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  rootElement
);
```

`/src/App.js`

```


import ReactPDF from "@soubhikchatterjee/react-pdf";

 <ReactPDF
      uniqueId={Math.random()}
      filename="sample.pdf"
      pdfUrl="https://example.com/sample.pdf"
   />
```
