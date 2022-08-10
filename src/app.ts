import { MainResponseType, ResponseData } from "./types";

const startApp = async () => {
  // fetch page 1 on-start
  await fetchResource(1).then(() => {
    if (results) {
      traverseTable(1);
    }
  });
};

// top level result response
let results: ResponseData | null = null;

const table = document.getElementsByTagName("table")[0] as HTMLTableElement;
const btn_next = document.querySelector("#btn-nextbtn") as HTMLInputElement;
const btn_prev = document.querySelector("#btn-prevbtn") as HTMLInputElement;
const label = document
  .querySelector("#btn-group")!
  .getElementsByTagName("label")[0] as HTMLLabelElement;
const img = document.querySelector("#img_loader") as HTMLImageElement;

/**
 * Table DOM Manipulation. Populate fetched data to table
 * @param n page number
 * @returns void
 */
const traverseTable = (n: number) => {
  // creates <table> and <tbody> elements
 
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
    
/**
 * Handle Next Page
 * @param pageNumber 
 * @returns void
 */
const fetchNext = async (pageNumber: number) => {
  if (results) {
    table.removeChild(document.getElementsByTagName("tbody")[0]);
    if (results![pageNumber]) {
      traverseTable(pageNumber);
      btn_next.setAttribute("data-nextbtn", `${pageNumber + 1}`);
      btn_prev.setAttribute("data-prevbtn", `${pageNumber - 1}`);
      btn_prev.disabled = false;
      return;
      
    }
    await fetchResource(pageNumber).then(() => {
      if (results) {
        traverseTable(pageNumber);
        btn_next.setAttribute("data-nextbtn", `${pageNumber + 1}`);
        btn_prev.setAttribute("data-prevbtn", `${pageNumber - 1}`);
      }
    });
  }
};
const fetchPrev = async (pageNumber: number) => {
  if (results && btn_prev.getAttribute("data-prevbtn") !== "0") {
    table.removeChild(document.getElementsByTagName("tbody")[0]);
    if (pageNumber == 1) btn_prev.disabled = true;
    if (results![pageNumber]) {
      traverseTable(pageNumber);
      btn_next.setAttribute("data-nextbtn", `${pageNumber + 1}`);
      btn_prev.setAttribute("data-prevbtn", `${pageNumber - 1}`);
      return;
    }
    await fetchResource(pageNumber).then(() => {
      if (results) {
        traverseTable(pageNumber);
        btn_next.setAttribute("data-nextbtn", `${pageNumber + 1}`);
        btn_prev.setAttribute("data-prevbtn", `${pageNumber - 1}`);
      }
    });
  }
};
const fetchResource = async (n: number): Promise<void> => {
  img.style.display = "inline";
  const req = await fetch(`${process.env.API_ENDPOINT}&page=${n}`);
  const res: MainResponseType = await req.json();
  img.style.display = "none";
  results = res.results[0];
};

btn_next.addEventListener("click", () =>
  fetchNext(parseInt(btn_next.getAttribute("data-nextbtn")!))
);
btn_prev.addEventListener("click", () =>
  fetchPrev(parseInt(btn_prev.getAttribute("data-prevbtn")!))
);
document.addEventListener("DOMContentLoaded", startApp);

document.addEventListener('DOMContentLoaded', startApp);