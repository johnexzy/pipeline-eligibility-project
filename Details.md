# How does this work
The API returns two (N and N+1) pages per request. With this data structure, I added page preloading to improve performance and experience when navigating pages.

On-loading the app, it is expected to display results of page 1. the ``startApp`` calls the ``fetchResource`` function and traverses the table with page 1 data.
```typescript
const startApp = async () => {
  // fetch page 1 on-start
  await fetchResource(1).then(() => {
    if (results) {
      traverseTable(1);
    }
  });
};
```
``fetchResource`` function
```typescript
/**
 * FetchResource from API
 * @param n - page number
 * @returns void
 */
const fetchResource = async (n: number): Promise<void> => {
  img.style.display = "inline";
  const req = await fetch(`${process.env.API_ENDPOINT}&page=${n}`);
  const res: MainResponseType = await req.json();
  img.style.display = "none";

  // save fetched data globally
  results = res.results[0];
};
```
the result variable is globally initialized
```typescript
// top level result response
let results: ResponseData | null = null;
```
The ``fetcNext`` function checks if the page exist (is already fetched; this is always the case under good network conditions), then clears the tbody and traverses the current page to the table.
```typescript
const fetchNext = async (pageNumber: number) => {
  if (results) {
    btn_next.setAttribute("data-nextbtn", `${pageNumber + 1}`);
    btn_prev.setAttribute("data-prevbtn", `${pageNumber - 1}`);
    if (results![pageNumber]) {
      table.removeChild(document.getElementsByTagName("tbody")[0]);
      traverseTable(pageNumber);

      await fetchResource(pageNumber + 1);
      btn_prev.disabled = false;
      return;
    }

    // triggers when the page number is not fetched
    await fetchResource(pageNumber).then(() => {
      if (results) {
        table.removeChild(document.getElementsByTagName("tbody")[0]);
        traverseTable(pageNumber);
      }
    });
  }
};

const fetchPrev = async (pageNumber: number): Promise<void> => {
  if (results && btn_prev.getAttribute("data-prevbtn") !== "0") {
    // disable previous button when current page is 1
    if (pageNumber == 1) btn_prev.disabled = true;

    // if page exists call traverseTable
    if (results![pageNumber]) {
      table.removeChild(document.getElementsByTagName("tbody")[0]);
      traverseTable(pageNumber);
      btn_next.setAttribute("data-nextbtn", `${pageNumber + 1}`);
      btn_prev.setAttribute("data-prevbtn", `${pageNumber - 1}`);
      return;
    }
    // fetch page, then traverseTable
    await fetchResource(pageNumber).then(() => {
      if (results) {
        table.removeChild(document.getElementsByTagName("tbody")[0]);
        traverseTable(pageNumber);
        btn_next.setAttribute("data-nextbtn", `${pageNumber + 1}`);
        btn_prev.setAttribute("data-prevbtn", `${pageNumber - 1}`);
      }
    });
  }
};
```
The ``traverseTable`` function as the name implies, accepts the page number as an argument then populates the the table with the data. It creates a ``tbody`` element with ``const tableBody = table.createTBody();`` then create subsequent elements such as tr and td repectively by looping through the data. 
```typescript
const traverseTable = (n: number): void => {
  // creates <tbody> element

  const tableBody = table.createTBody();
  const firstPage = results![n];
  const keys = ["row", "gender", "age"];
  // creating all cells
  for (const j of firstPage) {
    // creates a <tr> element
    const currentRow = document.createElement("tr");
    currentRow.setAttribute("data-entryid", j.id);
    for (const k of keys) {
      // creates a <td> element
      const currentCell = document.createElement("td");
      // creates a Text Node
      const currentText = document.createTextNode(j[k]);
      // appends the Text Node we created into the cell <td>
      currentCell.appendChild(currentText);
      // appends the cell <td> into the row <tr>
      currentRow.appendChild(currentCell);
    }
    // appends the row <tr> into <tbody>
    tableBody.appendChild(currentRow);
  }
  label.innerText = `Showing Page ${n}`;
};
```

onclick event listeners was registered on buttons
```typescript
// register event listeners on buttons
btn_next.addEventListener("click", () =>
  fetchNext(parseInt(btn_next.getAttribute("data-nextbtn")!))
);
btn_prev.addEventListener("click", () =>
  fetchPrev(parseInt(btn_prev.getAttribute("data-prevbtn")!))
);
```