class Colimagen2 extends Imagen {
  id = "ci_002";
  border = "";
  data = {
    nombre: "Cuatro columnas sin borde",
    data: {
      plantilla_id: this.id,
      categoria: 2,
      indice: 1,
    },
    columnas: [
      {
        titulo: "TÍtulo",
        porcentaje: "100",
        ruta: Render.elementos.sin_imagen,
        orden: 0,
        is_texto: "",
        alineacion: this.alignToImage[1],
      },
      {
        titulo: "TÍtulo",
        porcentaje: "100",
        ruta: Render.elementos.sin_imagen,
        orden: 1,
        is_texto: "",
        alineacion: this.alignToImage[1],
      },
      {
        titulo: "TÍtulo",
        porcentaje: "100",
        ruta: Render.elementos.sin_imagen,
        orden: 2,
        is_texto: "",
        alineacion: this.alignToImage[1],
      },
      {
        titulo: "TÍtulo",
        porcentaje: "100",
        ruta: Render.elementos.sin_imagen,
        orden: 3,
        is_texto: "",
        alineacion: this.alignToImage[1],
      },
    ],
  };

  static getId() {
    return this.id;
  }
  constructor() {
    super();
  }

  firestoreSave(cb) {
    let parent = this;
    this.bloques_db.add(this.data.data).then((doc) => {
      let doc_item = doc;
      parent.bloque.attr("id", doc.id);
      parent.bloque.addClass(parent.clase_padre);
      parent.bloque.addClass(parent.id);
      parent.bloque_id = doc.id;
      parent.columnas_db = parent.bloques_db.doc(doc.id).collection("columnas");
      let cols = [];

      parent.columnas_db.add(this.data.columnas[0]).then((col) => {
        parent.data.columnas[0].doc_id = col.id;
        parent.columnas_db.add(this.data.columnas[1]).then((col) => {
          parent.data.columnas[1].doc_id = col.id;
          parent.columnas_db.add(this.data.columnas[2]).then((col) => {
            parent.data.columnas[2].doc_id = col.id;
            parent.columnas_db.add(this.data.columnas[3]).then((col) => {
              parent.data.columnas[3].doc_id = col.id;
              cb(doc_item, []);
            });
          });
        });
      });
    });
  }

  renderColumna(data, i) {
    let border = "";

    if (i != this.data.columnas.length - 1 && i != -1) {
      border = this.border;
    }

    let html = "";

    html += '          <div data-docid="' + data.doc_id + '" class="col p-0 mb-2 mt-2 d-flex justify-content-center f-nunito color-hardDark ' + border + ' col-img">';
    html += '            <div class="row p-0 m-0" style="position:relative;">';
    html += this.renderDelete();
    html += '              <div class="col-12 p-0 m-0">';

    html += "              </div>";
    html += '              <div class="col-12 p-2 m-0">';
    html += '                <div class="d-flex w-100 ' + data.alineacion + ' p-0" style="position:relative;">';
    html += this.renderLoading();
    html += this.renderNav(data);
    html += this.renderForm();
    html += '                   <img src="' + data.ruta + '" class="img-columna" width="' + data.porcentaje + '%">';
    html += "                </div>";
    html += "              </div>";
    html += "            </div>";
    html += "          </div>";

    return html;
  }

  render() {
    let html = Plantilla.renderDrag();

    html += '<div class="p-0 w-100">';
    html += '  <div class="d-block msp-100 mep-40">';
    html += '    <div class="row p-0 m-0">';
    html += '      <div class="d-block p-0">';
    html += '        <div class="row p-0 m-0 row-column" style="position:relative;">';
    html += this.renderAdd();
    for (let i = 0; i < this.data.columnas.length; i++) {
      html += this.renderColumna(this.data.columnas[i], i);
    }

    html += "        </div>";
    html += "      </div>";
    html += "    </div>";
    html += "  </div>";
    html += "</div>";

    return html;
  }

  colBorder() {
    return;
  }
}
