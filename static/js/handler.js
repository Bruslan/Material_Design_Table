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

$(document).ready(function() {
  // fetch("/getData")
  //   .then(function(response) {
  //     return response.json();
  //   })
  //   .then(function(myJson) {
  //     console.log(JSON.stringify(myJson));
  //   });
  tbl = new Table("TT", data["content"], "protocoll", "id");
  tbl2 = new Table("TT2", data["content"], "protocoll", "id");
  //füge die Tabelle in ein DomeElement ein

  initTable(tbl, "dieTabelle", "searchField", "modalForm");
  // $("body").bootstrapMaterialDesign();
  initTable(tbl2, "dieTabelle2", "searchField2");
  let newData = {
    id: "mongo",
    kennzeichen: "Hallo",
    mitarbeiter: "text2",
    notzi: "text2",

    protocoll: []
  };

  tbl.appendRow(newData);
});
