data = {
  content: [
    {
      id: "mongo",
      kennzeichen: "texadsfadfadfadfadfadfadfadsfadsft1",
      mitarbeiter: "text2",
      notzi: "text2",

      protocoll: [
        {
          id: "pongo",
          col1: "prot1",
          col2: "prot2",
          col3: "prot3"
        },
        {
          id: "pongo",
          col1: "prot1",
          col2: "prot2",
          col3: "prot3"
        },
        {
          id: "pongo",
          col1: "prot1",
          col2: "prot2",
          col3: "prot3"
        }
      ]
    }
  ]
};

newData = {
  id: "mongo",
  kennzeichen: "texadsfadfadfadfadfadfadfadsfadsft1",
  mitarbeiter: "text2",
  notzi: "text2",

  protocoll: []
};

function CreateTable(tbl) {
  tbl = new Table("TT", data["content"], "protocoll", "id");
  //füge die Tabelle in ein DomeElement ein
  let retrievedObject = localStorage.getItem("testObject");

  let checkBoxState = {};
  if (JSON.parse(retrievedObject) != null) {
    checkBoxState = JSON.parse(retrievedObject);
  }

  tbl.checkBoxState = checkBoxState;

  tbl.attachTo("weitereTabelle");
  tbl.createCheckboxes("Checkboxes");
  tbl.createSearchField("searchfield");
  tbl.appendRow(newData);
  tbl.prepareModal("modalForm");

  // tbl.createMenu("menuField");

  $(tbl.searchField).on("click", "#searchButton", function() {
    $(this.closest("div")).toggleClass("is-focused");
  });

  $(tbl).on("click", "th", function() {
    $("table tr.protocoll").remove();
    // console.log("ich habe es gecklickt");
    let col = $(this)
      .parent()
      .children()
      .index($(this));

    // console.log(col);
    tbl.sortTable(col);
  });

  $(tbl.searchField).on("keyup", "#searchField", function() {
    tbl.filterTable(this);
  });

  $(tbl.table).on("click", ".deleteButton", function() {
    let rowIndex = $(this).closest("tr")[0].rowIndex;
    tbl.deleteRow(rowIndex);
  });

  $(tbl.table).on("click", ".protoCollButton", function() {
    if ($(this).hasClass("pressed")) {
      $(tbl.table.getElementsByClassName("protocoll")).remove();
      $(this).removeClass("pressed");
    } else {
      $(".pressed").removeClass("pressed");
      $(tbl.table.getElementsByClassName("protocoll")).remove();
      let referenceRow = $(this).closest("tr")[0];

      tbl.toggleProtocoll(referenceRow);
      $(this).addClass("pressed");
    }
  });

  $(tbl.table).on("click", ".editButton", function() {
    //toggle die Modal buttons von Save auf Edit
    document.getElementById("addFahrzeuge").hidden = true;
    document.getElementById("editSave").hidden = false;

    //lese die rows des edit Buttons aus
    let currentRowsTds = $(this)
      .closest("tr")[0]
      .getElementsByTagName("td");

    //geben der Modal form die Id des current Rows
    let modalForm = document.getElementById("modalForm");

    modalForm.name = this.closest("tr").id;

    this.closest("tr").classList.add("wirdEditiert");
    //hier ist ein Problem
    console.log(modalForm.name);

    //befülle die Modal inputs mit den Daten aus den tds
    let inputFields = modalForm.getElementsByTagName("input");
    for (let td in currentRowsTds) {
      if (inputFields[td] != undefined) {
        let tdInhalt = currentRowsTds[td].innerHTML;
        inputFields[td].value = tdInhalt;
      }
    }
  });

  $(document).on("click", ".downloadCSV", function() {
    tbl.exportToCSV("test");
  });

  $("#addFahrzeuge").click(function() {
    let modalForm = document.getElementById("modalForm");

    let inputFields = modalForm.getElementsByTagName("input");

    let inputStruct = { protocoll: [] };
    for (let input = 0; input < inputFields.length; input++) {
      let inputValue = inputFields[input];
      inputStruct[inputFields[input].name] = inputValue.value;
    }

    tbl.appendRow(inputStruct);
  });

  $("#addButton").click(function() {
    //toggle die Buttons von edit auf add
    document.getElementById("addFahrzeuge").hidden = false;
    document.getElementById("editSave").hidden = true;

    let modalForm = document.getElementById("modalForm");
    modalForm.name = "";
  });

  $(document).on("click", ".checkboxButton", function() {
    tbl.toggleCheckBoxes(this);
  });
  $(document).on("click", "#editSave", function() {
    //suche die current Modal aus

    let modalForm = document.getElementById("modalForm");
    let modaId = modalForm.name;

    //die Input fields des modals
    let inputFields = modalForm.getElementsByTagName("input");
    let targetTr = tbl.table.querySelector(".wirdEditiert");

    // let targetTr = table.getElementById(modaId);

    let targetTds = targetTr.getElementsByTagName("td");

    //hier in die Datenbank einspeisen
    let inputStruct = {};
    for (let input = 0; input < inputFields.length; input++) {
      //setze die letzten Einträge in das Protocoll

      inputStruct[inputFields[input].name] = inputFields[input].value;

      let inputValue = inputFields[input];

      targetTds[input].innerHTML = inputValue.value;
    }

    tbl.data[modaId][tbl.protocollString].push(inputStruct);

    // hier entferne ich die Classe von Protocoll

    $(targetTr.getElementsByClassName("noProtocoll")).removeClass(
      "noProtocoll"
    );
    targetTr.classList.remove("modalForm");

    ///hier json_data hochschicken zu mongo DB

    $("#exampleModalCenter").modal("hide");
    tbl.editRow(inputStruct);
  });
}

$(document).ready(function() {
  // $("body").bootstrapMaterialDesign();

  // fetch("/getData")
  //   .then(function(response) {
  //     return response.json();
  //   })
  //   .then(function(myJson) {
  //     console.log(JSON.stringify(myJson));
  //   });

  CreateTable("Fahrzeugtabelle");
});
