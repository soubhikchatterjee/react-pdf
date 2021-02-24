import React, { useEffect } from "react";
import * as PdfJs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// Styles
import "./preview.styles.scss";

function Preview({ url }) {
  // Set the worker
  PdfJs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  useEffect(() => {
    if (url) {
      const viewer = document.getElementById("pdf-viewer");

      PdfJs.getDocument(url)
        .promise.then(doc => {
          const totalPages = doc.numPages > 2 ? 2 : doc.numPages;
          for (let page = 1; page <= totalPages; page++) {
            const canvas = document.createElement("canvas");
            canvas.className = "react__pdf--preview-canvas mb-10";
            viewer.appendChild(canvas);
            renderPage(doc, canvas, page);
          }
        })
        .catch(e => console.error(e));
    }
  }, [url]);

  function renderPage(doc, canvas, pageNumber) {
    doc
      .getPage(pageNumber)
      .then(page => {
        const context = canvas.getContext("2d");
        const viewport = page.getViewport({ scale: 2, rotation: 360 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        page.render({
          canvasContext: context,
          viewport: viewport
        });
      })
      .catch(e => console.error(e));
  }

  return <div id="pdf-viewer" className="react__pdf--preview"></div>;
}

export default Preview;
