export const INITIAL_MAX_PAGES = 2;
export const DEFAULT_ZOOM_LEVEL = 100;

// Create multiple pages
export function createMultiplePages({
  doc,
  // startPage = 1,
  // totalPages,
  pageList = [],
  // rotation = 0,
  canvasPrefix = "canvas",
  showPageNumber = false,
  pageNumberClassname = "",
  pdfElement = "pdf-viewer",
  canvasClassname = "react__pdf--preview-canvas",
  reset = false
}) {
  const viewer = document.getElementById(pdfElement);

  if (reset) {
    viewer.innerHTML = "";
  }

  for (const page of pageList) {
    const canvas = document.createElement("canvas");
    canvas.id = `${canvasPrefix}_${page.pageNumber}`;
    canvas.setAttribute("page-number", page.pageNumber);
    canvas.setAttribute("rotation", page.rotation);
    canvas.className = `mb-10 ${canvasClassname}`;
    viewer.appendChild(canvas);

    // Display the page number
    const pageNumberElement = document.createElement("div");
    pageNumberElement.className = pageNumberClassname;
    pageNumberElement.innerText = `Page ${page.pageNumber}`;
    if (showPageNumber) {
      viewer.appendChild(pageNumberElement);
    }
    renderPage({
      doc,
      canvas,
      pageNumber: page.pageNumber,
      rotation: page.rotation
    });
  }
}

// Render a single page
export function renderPage({ doc, canvas, pageNumber, rotation }) {
  doc
    .getPage(pageNumber)
    .then(page => {
      const context = canvas.getContext("2d");
      const viewport = page.getViewport({
        scale: 2,
        rotation
      });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      page.render({
        canvasContext: context,
        viewport: viewport
      });
    })
    .catch(e => console.error(e));
}

export function range(start, end) {
  return [...Array(end + 1).keys()].filter(
    value => end >= value && start <= value
  );
}
