class Rotulo7 extends Titulo {
  id = "ro_007";

  data = {
    nombre: "Rótulo 7",
    data: {
      plantilla_id: this.id,
      categoria: 0,
      indice: 1,
      texto: "Rótulo",
    },
  };
  static getId() {
    return this.id;
  }
  constructor() {
    super();
  }

  setData(data) {
    this.data.data.texto = data.texto;
  }

  render() {
    let html = Plantilla.renderDrag();

    html += '<div class="d-flex w-100 justify-content-center fs-6 fw-600 text-center f-nunito">';
    html += '  <div data-texto="texto" class="bgc-boros color-white min-width-50 pp-5 text-input">' + this.data.data.texto + "</div>";
    html += "</div>";

    return html;
  }

  renderMenu() {
    let html = "";
    html += '<div class="d-flex w-100 justify-content-center fs-6 fw-600 text-center f-nunito">';
    html += ' <div class=" bgc-boros color-white min-width-50 pp-5">Ave</div>';
    html += "</div>";
    return html;
  }
}
