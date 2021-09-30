class Rotulo6 extends Titulo {
  id = "ro_006";

  data = {
    nombre: "Rótulo 6",
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

    html += '<div class="d-flex w-100 justify-content-center fs-6 fw-600 f-nunito">';
    html += '  <div data-texto="texto" class="bgc-vegeta color-white pp-5 min-width-50 text-input">' + this.data.data.texto + "</div>";
    html += "</div>";

    return html;
  }

  renderMenu() {
    let html = "";
    html += '<div class="d-flex w-100 justify-content-center fs-6 fw-600 f-nunito">';
    html += ' <div class="bgc-vegeta color-white pp-5 min-width-50">Pez</div>';
    html += "</div>";
    return html;
  }
}
