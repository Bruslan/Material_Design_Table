class Table {
  constructor(name, data, protocollString, id_String) {
    this.name = name;
    this.data = data;
    this.protocollString = protocollString;
    this.table;
    this.id_String = id_String;
    this.checkBoxDivID;
    this.searchField;
    this.menu;
    this.checkBoxState = { "0": "checked" };
  }

  appendRow(rowData) {
    //neue Zeile wird erstellt
    this.data.push(rowData);
    let newRow = this.createRow(rowData, true);
    newRow.setAttribute("id", this.data.length - 1);

    //hier muss eine id rein

    $(newRow.getElementsByClassName("protoCollButton")[0]).addClass(
      "noProtocoll disabled"
    );

    //hier wird die erste Zeile der Tabelle selected

    let oldRow = this.table
      .getElementsByTagName("tbody")[0]
      .getElementsByTagName("tr")[0];

    //Neue Zeile wird vor der ersten ursprünglichen Zeile der Ziel Tabelle eingefügt
    this.table.getElementsByTagName("tbody")[0].insertBefore(newRow, oldRow);
  }
  attachTo(targetId) {
    this.table = this.create();
    document.getElementById(targetId).appendChild(this.table);
  }
  create() {
    let tabelle = document.createElement("table");
    tabelle.setAttribute("id", this.name);

    tabelle.setAttribute("class", "table table-hover");

    let thead = this.createTableHead();
    tabelle.appendChild(thead);

    let tableBody = this.createTableBody();
    tabelle.appendChild(tableBody);

    return tabelle;
  }
  createRow(documentObj, buttons) {
    let tableBodyRow = document.createElement("tr");
    tableBodyRow.setAttribute("style", "vertical-align:middle");

    let columnNr = 0;
    for (let value in documentObj) {
      if (value != this.protocollString && value != this.id_String) {
        let tableBodyColumn = document.createElement("td");

        if (this.checkBoxState[columnNr] == "checked") {
          tableBodyColumn.setAttribute("class", "hidden");
        }

        tableBodyColumn.innerHTML = documentObj[value];
        tableBodyRow.appendChild(tableBodyColumn);
        columnNr++;
      }
    }

    if (buttons) {
      let buttonCollumn = document.createElement("td");
      buttonCollumn.setAttribute("class", "functionButtons");
      buttonCollumn.style.width = "120px";
      let editButton = this.createButton("edit", "editButton");
      editButton.setAttribute("data-toggle", "modal");
      //magic Number!!!
      editButton.setAttribute("data-target", "#exampleModalCenter");
      buttonCollumn.appendChild(editButton);

      let protocollButton = this.createButton("receipt", "protoCollButton");

      if (documentObj[this.protocollString].length == 0) {
        $(protocollButton).addClass("noProtocoll");
      }
      buttonCollumn.appendChild(protocollButton);
      let deleteButton = this.createButton("delete", "deleteButton");
      buttonCollumn.appendChild(deleteButton);

      tableBodyRow.appendChild(buttonCollumn);
    }

    return tableBodyRow;
  }
  createTableHead() {
    let tableHead = document.createElement("thead");
    let data = this.data[0];

    let colIndex = 0;
    for (let column in data) {
      if (column != this.protocollString && column != this.id_String) {
        let tableHeadColumn = document.createElement("th");
        if (this.checkBoxState[colIndex] == "checked") {
          tableHeadColumn.setAttribute("class", "hidden");
        }
        tableHeadColumn.innerHTML = column.toUpperCase();

        tableHead.appendChild(tableHeadColumn);
        colIndex++;
      }
    }

    return tableHead;
  }
  createCheckboxes(targetId) {
    let targetDiv = document.getElementById(targetId);
    this.checkBoxDivID = targetId;
    targetDiv.setAttribute("class", "row justify-content-md-center");
    let letswitch = "";
    let counter = 0;
    for (let columns in this.data[0]) {
      if (columns != this.protocollString && columns != this.id_String) {
        let checkBoxState = "checked";
        let checkBoxClass = "";
        if (this.checkBoxState[counter] == "checked") {
          checkBoxState = "";
          checkBoxClass = "checkboxUnchecked";
          console.log(checkBoxClass);
        }

        letswitch += `<span class=" bmd-form-group is-filled col-md-auto "><div class="switch"><label><input type="checkbox" class="checkboxButton" id = ${counter} ${checkBoxState}=""><span class="${checkBoxClass} bmd-switch-track"></span><p class="${columns.toUpperCase()}">${columns.toUpperCase()}</p></label></div></span>`;
        counter++;
      }
    }

    targetDiv.innerHTML = letswitch;
  }
  createButton(materialIconName, buttonClass) {
    let button = document.createElement("button");
    button.setAttribute(
      "class",
      `mdl-button mdl-js-button mdl-button--icon ${buttonClass}`
    );

    let i = document.createElement("i");
    i.setAttribute("class", "material-icons");

    i.innerHTML = materialIconName;

    button.appendChild(i);

    return button;
  }
  createTableBody() {
    let tableBody = document.createElement("tbody");

    //hier erstelle ich Rows für tableBody
    for (let i = 0; i < this.data.length; i++) {
      let tableBodyRow = this.createRow(this.data[i], true);
      tableBodyRow.setAttribute("id", i);

      tableBody.appendChild(tableBodyRow);
    }
    return tableBody;
  }
  createSearchField(targetId) {
    let searchDiv = document.getElementById(targetId);
    searchDiv.innerHTML = `<div>
    <form class="ml-4 m-0" action="#">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable is-upgraded" data-upgraded=",MaterialTextfield">
            <label class="mdl-button mdl-js-button mdl-button--icon " for="searchField" data-upgraded=",MaterialButton">
                <i id = "searchButton" class="material-icons">search</i>
            </label>



            <div class="mdl-textfield__expandable-holder">
                <input class="mdl-textfield__input" type="text" id="searchField">
                <label class="mdl-textfield__label" for="sample-expandable">Expandable Input</label>
            </div>

        </div>
    </form>
</div>`;
    this.searchField = searchDiv;
  }
  createMenu(targetId) {
    let targetDiv = document.getElementById(targetId);

    let menu = `

    <button id="demo-menu-lower-right" class="mdl-button mdl-js-button mdl-button--icon mdl-button--fab mdl-button--mini-fab" data-upgraded=",MaterialButton">
        <i class="material-icons">apps</i>
    </button>


    <div class="mdl-menu__container is-upgraded" style="right: 15px; top: 40px; width: 218.453px; height: 208px;"><div class="mdl-menu__outline mdl-menu--bottom-right" style="width: 218.453px; height: 208px;"></div><ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events" for="demo-menu-lower-right" data-upgraded=",MaterialMenu,MaterialRipple" style="clip: rect(0px, 218.453px, 0px, 218.453px);">
        <li class="mdl-list__item mdl-menu__item downloadCSV mdl-js-ripple-effect" tabindex="-1" data-upgraded=",MaterialRipple" style="">
            <span class="mdl-list__item-primary-content ">
                <i class="material-icons mdl-list__item-icon">save</i>
                Save CSV
            </span>
        <span class="mdl-menu__item-ripple-container"><span class="mdl-ripple"></span></span></li>
        <li class="mdl-list__item mdl-menu__item downloadExcel mdl-js-ripple-effect" tabindex="-1" data-upgraded=",MaterialRipple" style="">
            <span class="mdl-list__item-primary-content ">
                <i class="material-icons mdl-list__item-icon">list</i>
                Save Excel
            </span>
        <span class="mdl-menu__item-ripple-container"><span class="mdl-ripple"></span></span></li>
        <li class="mdl-list__item mdl-menu__item enableCheckboxes mdl-js-ripple-effect" tabindex="-1" data-upgraded=",MaterialRipple" style="">
            <span class="mdl-list__item-primary-content">
                <i class="material-icons mdl-list__item-icon">import_export</i>
                Export
            </span>
        <span class="mdl-menu__item-ripple-container"><span class="mdl-ripple"></span></span></li>
        <li class="mdl-list__item mdl-menu__item mdl-js-ripple-effect" tabindex="-1" data-upgraded=",MaterialRipple" style="">
            <span class="mdl-list__item-primary-content ">
                <i class="material-icons mdl-list__item-icon ">cloud</i>
                Das ist ein Download
            </span>
        <span class="mdl-menu__item-ripple-container"><span class="mdl-ripple"></span></span></li>

    </ul></div>

`;

    targetDiv.innerHTML = menu;
    this.menu = targetDiv;
  }
  deleteRow(rowNr) {
    this.table.deleteRow(rowNr);
  }
  downloadCSV(csv, filename) {
    let csvFile;
    let downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
  }
  exportToCSV(filename) {
    let csv = [];

    let head = this.table.querySelectorAll("table th:not(.hidden)");

    let rows = this.table.querySelectorAll("table tr");

    // cols = rows[i].querySelectorAll("td, th");
    let row = [];
    for (let j = 0; j < head.length; j++) row.push(head[j].innerText);

    csv.push(row.join(","));

    for (let i = 0; i < rows.length; i++) {
      let row = [],
        // cols = rows[i].querySelectorAll("td, th");

        cols = rows[i].querySelectorAll(
          "td:not(.hidden):not(.functionButtons), th:not(.hidden)"
        );

      for (var j = 0; j < cols.length; j++) row.push(cols[j].innerText);

      csv.push(row.join(","));
    }

    // Download CSV file
    this.downloadCSV(csv.join("\n"), filename);
  }
  editRow(row) {}
  exportToExcel(outputFileName) {}
  filterTable(searchField) {
    // Declare variables
    let input, filter, table, tr, td, i;

    input = searchField;

    filter = input.value.toUpperCase();
    table = this.table;
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (let i = 0; i < tr.length; i++) {
      let check = false;

      for (let j = 0; j < tr[i].getElementsByTagName("td").length; j++) {
        td = tr[i].getElementsByTagName("td")[j];
        if (td && !td.classList.contains("hidden")) {
          if (td.innerHTML.includes("</") == false) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
              check = true;
            }
          }
        }
      }

      if (check) {
        tr[i].style.display = "";
        if (tr[i].classList.contains("nodisplay")) {
          tr[i].classList.remove("nodisplay");
        }
        if (tr[i].getElementsByTagName("button").length != 0) {
          let button_id = tr[i].getElementsByTagName("button")[0].id;
          var protocol_elemets = table.getElementsByClassName(button_id);
          for (let j = 0; j < protocol_elemets.length; j++) {
            protocol_elemets[j].style.display = "";
            if (protocol_elemets[j].classList.contains("nodisplay")) {
              protocol_elemets[j].classList.remove("nodisplay");
            }
          }
        }
      } else {
        tr[i].style.display = "none";
        tr[i].classList.add("nodisplay");
      }
    }
  }
  prepareModal(modalFormID) {
    let modalForm = document.getElementById(modalFormID);

    for (let column in this.data[0]) {
      if (column != this.protocollString && column != this.id_String) {
        let formDiv = document.createElement("div");
        formDiv.setAttribute("class", "form-group");
        let formLabel = document.createElement("label");
        formLabel.setAttribute("class", "bmd-label-floating");
        formLabel.innerHTML = column;
        formDiv.appendChild(formLabel);
        let formInput = document.createElement("input");
        formInput.setAttribute("class", "form-control");
        formInput.setAttribute("name", column);

        formDiv.appendChild(formInput);
        let formSpan = document.createElement("span");
        formSpan.setAttribute("class", "bmd-help");

        formDiv.appendChild(formSpan);
        modalForm.appendChild(formDiv);
      }
    }
  }
  sortTable(n) {
    let table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
    table = this.table;
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 0; i < rows.length - 1; i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
  toggleProtocoll(referenzeRow) {
    //neue Zeile wird erstellt
    let currentRowID = referenzeRow.id;
    if (currentRowID) {
      let Protocoll = this.data[currentRowID][this.protocollString];

      for (let value in Protocoll) {
        //rekursiv, ich fange mit dem letzten objekt an, so dass das aktuellste zuerst kommt
        let newRow = this.createRow(
          Protocoll[Protocoll.length - 1 - value],
          false
        );
        newRow.setAttribute("class", "protocoll");

        referenzeRow.parentNode.insertBefore(newRow, referenzeRow.nextSibling);
      }
    }
  }
  toggleCheckBoxes(checkbox) {
    //die Column Name

    let checkBoxIndex = checkbox.id;

    if (
      this.checkBoxState[checkBoxIndex] &&
      this.checkBoxState[checkBoxIndex] == "checked"
    ) {
      delete this.checkBoxState[checkBoxIndex];
    } else {
      this.checkBoxState[checkBoxIndex] = "checked";
    }

    localStorage.setItem("testObject", JSON.stringify(this.checkBoxState));
    let tableHeads = this.table.getElementsByTagName("th");
    let tableRows = this.table.getElementsByTagName("tr");

    $(checkbox.parentNode.childNodes[1]).toggleClass("checkboxUnchecked");

    $(tableHeads[checkBoxIndex]).toggleClass("hidden");

    for (let tr = 0; tr < tableRows.length; tr++) {
      // $(tr[0]).toggleClass("hidden");
      $(tableRows[tr].getElementsByTagName("td")[checkBoxIndex]).toggleClass(
        "hidden"
      );
    }
  }
  toggleMenu() {
    $(this.menu.getElementsByClassName("mdl-menu__container")[0]).toggleClass(
      "is-visible"
    );
  }
  initializeModal() {}

  initializeTable() {
    this.table = this.create();
  }
}
