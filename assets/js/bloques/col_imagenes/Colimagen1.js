class Colimagen1 extends Imagen {
  page_id = null;
  bloque_id = null;
  clase_padre = "col_imagen_clase";
  id = "ci_001";
  border = "border-end border-color-primary border-3 border-right-dashed";
  bloque = null;
  bloques_db = null;
  bloque_db = null;
  columnas_db = null;
  btn_add = null;
  row_column = null;
  col_img = null;
  procesando = false;
  inputs = null;
  alignToImage = ["justify-content-start", "justify-content-center", "justify-content-end"];

  path = "../php/uploads/";
  estilos_titulos = {
    checked: "display:inherit",
    "": "display:none",
  };
  data = {
    nombre: "Dos columnas con borde y título",
    data: {
      plantilla_id: this.id,
      categoria: 2,
      indice: 0,
      texto: "",
    },
    columnas: [
      {
        titulo: "Título",
        porcentaje: "100",
        ruta: Render.elementos.sin_imagen,
        orden: 0,
        is_texto: "checked",
        alineacion: this.alignToImage[1],
      },
      {
        titulo: "Título",
        porcentaje: "100",
        ruta: Render.elementos.sin_imagen,
        orden: 1,
        is_texto: "checked",
        alineacion: this.alignToImage[1],
      } /*,
                {
                    titulo:'Titulo 2',
                    porcentaje:'100',    
                    ruta:'pagina_003/img1.svg',
                }*/,
      /*{
                    titulo:'Titulo 3',  
                    ruta:'./assets/images/images.svg',
                }*/
    ],
  };

  static getInstance() {
    return new this();
  }
  constructor() {
    super();
  }
  setData(data) {
    this.data.columnas = data.columnas;
    this.data.data.texto = data.texto;
  }
  activar(page_id, bloque) {
    this.page_id = page_id;
    this.bloque = bloque;
    this.bloques_db = Firestore.paginas_db.doc(this.page_id).collection("bloques");
    this.bloque_db = this.bloques_db.doc(bloque[0].id);
    this.columnas_db = this.bloque_db.collection("columnas");

    this.elementos();
    this.initListeners();
  }
  add(page_id, bloque, cb) {
    this.page_id = page_id;
    this.bloque = bloque;

    this.bloques_db = Firestore.paginas_db.doc(this.page_id).collection("bloques");
    this.save(cb);
  }

  save(cb) {
    this.bloque.addClass("item");
    this.bloque.removeClass("item-plantilla");
    this.bloque.html(Render.renderLoadingItem());
    let parent = this;
    this.firestoreSave(function (doc, cols) {
      parent.bloque_db = parent.bloques_db.doc(doc.id);
      parent.bloque.attr("data-docid", doc.id);
      parent.bloque.attr("data-pageid", parent.page_id);
      parent.bloque.removeAttr("data-plantilla_id");
      parent.bloque.removeAttr("data-indice");
      /* parent.data.columnas[0].doc_id = cols[0].id;
        parent.data.columnas[1].doc_id = cols[1].id;*/
      parent.bloque.html(parent.render());

      parent.elementos();
      parent.initListeners();

      cb();
    });
  }

  elementos() {
    this.col_img = this.bloque.find(".col-img");
    this.btn_add = this.bloque.find(".btn_add")[0];
    this.inputs = this.bloque.find(".text-input-bloque");
    this.row_column = this.bloque.find(".row-column")[0];
  }
  initListeners() {
    let parent = this;

    for (let i = 0; i < this.col_img.length; i++) {
      this.columnasChildren(this.col_img[i]);
    }

    let inputs = this.inputs;
    for (let i = 0; i < inputs.length; i++) {
      this.addListenerInput(inputs[i]);
      let editor = new MediumEditor($(inputs[i]), EditorTexto.config());
    }

    if (this.btn_add) {
      $(this.btn_add).click(function () {
        let data = parent.data.columnas[0];
        data.orden = parent.col_img.length;
        $(parent.row_column).append(parent.renderColumna(data, -1));
        parent.col_img = parent.bloque.find(".col-img");
        let indice = parent.col_img.length - 1;

        let columna = parent.col_img[indice];
        let loading = $(columna).find(".loading_005")[0];

        $(loading).show();
        parent.columnas_db.add(data).then((op) => {
          $(loading).hide();
          $(columna).attr("data-docid", op.id);
          parent.columnasChildren(columna);
          parent.colBorder();
        });
      });
    }
  }

  colBorder() {
    for (let i = 0; i < this.col_img.length; i++) {
      console.log(i);
      let border = this.border;
      if (i != this.col_img.length - 1) {
        $(this.col_img[i]).addClass(border);
      } else {
        $(this.col_img[i]).removeClass(border);
      }
    }
  }

  columnasChildren(columna) {
    let parent = this;
    let input_number = $(columna).find(".input-number")[0];
    let img = $(columna).find(".img-columna")[0];
    let nav = $(columna).find(".nav-image")[0];
    let range = $(columna).find(".input-range")[0];
    let form = $(columna).find(".form-upload")[0];
    let btn_file = $(columna).find(".btn-file")[0];
    let loading = $(columna).find(".loading_005")[0];
    let btn_delete = $(columna).find(".btn_delete")[0];
    let doc_id = $(columna).data("docid");
    let text_input = $(columna).find(".text-input")[0];
    let check_input = $(columna).find(".form-check-input")[0];
    let titulo_div = $(columna).find(".titulo-div")[0];
    let btn_left = $(columna).find(".btn-left")[0];
    let btn_center = $(columna).find(".btn-center")[0];
    let btn_right = $(columna).find(".btn-right")[0];

    let dropzone = new Dropzone(form, {
      url: "../php/upload.php",
      dictDefaultMessage: "",
      uploadMultiple: false,
      imageUpload: {
        maxFilesize: 10,
        maxFiles: 1,
        acceptedFiles: ".jpeg,.jpg,.png,.gif",
      },
    });

    new MediumEditor($(text_input), EditorTexto.config());

    dropzone.on("addedfile", function (file) {
      $(loading).show();
    });

    dropzone.on("success", function (file) {
      let response = file.xhr.responseText;
      let ruta = parent.path + response;

      this.removeFile(file);
      let data = {
        ruta: ruta,
      };
      //$(img).hide();

      parent.columnas_db
        .doc(doc_id)
        .update(data)
        .then((doc) => {
          $(loading).hide();
          $(img).attr("src", parent.path + response);
          //$(img).show();
        });
      //parent.bloque_db.update(data);
    });

    function limpiarClase(container, lis) {
      for (let i = 0; i < parent.alignToImage.length; i++) {
        container.removeClass(parent.alignToImage[i]);
      }

      for (let i = 0; i < lis.length; i++) {
        $(lis[i]).removeClass("active");
      }
    }

    if (btn_left) {
      $(btn_left).click(function () {
        let container = $(img).parent();
        let lis = $(this).parent().parent().find("li");
        limpiarClase(container, lis);
        let alineacion = parent.alignToImage[0];
        container.addClass(alineacion);
        $(this).parent().addClass("active");
        let data = {
          alineacion: alineacion,
        };
        parent.columnas_db
          .doc(doc_id)
          .update(data)
          .then((doc) => {});
      });
    }
    if (btn_center) {
      $(btn_center).click(function () {
        let container = $(img).parent();
        let lis = $(this).parent().parent().find("li");
        limpiarClase(container, lis);
        let alineacion = parent.alignToImage[1];
        container.addClass(alineacion);
        $(this).parent().addClass("active");
        let data = {
          alineacion: alineacion,
        };
        parent.columnas_db
          .doc(doc_id)
          .update(data)
          .then((doc) => {});
      });
    }
    if (btn_right) {
      $(btn_right).click(function () {
        let container = $(img).parent();
        let lis = $(this).parent().parent().find("li");
        limpiarClase(container, lis);
        let alineacion = parent.alignToImage[2];
        container.addClass(alineacion);
        $(this).parent().addClass("active");
        let data = {
          alineacion: alineacion,
        };
        parent.columnas_db
          .doc(doc_id)
          .update(data)
          .then((doc) => {});
      });
    }

    if (btn_delete) {
      let parent = this;
      $(btn_delete).click(function () {
        if (parent.procesando) {
          return;
        }
        parent.procesando = true;
        let col = $(this).parents(".col-img");
        $(loading).show();
        parent.columnas_db
          .doc(doc_id)
          .delete()
          .then((doc) => {
            col.remove();

            parent.ordenar(parent.bloque.find(".col-img"), function () {
              $(loading).hide();
              parent.col_img = parent.bloque.find(".col-img");
              parent.colBorder();
              parent.procesando = false;
            });
          });

        //col.remove();
        //parent.col_img = parent.bloque.find('.col-img');
        //parent.colBorder();
      });
    }

    $(btn_file).click(function () {
      $(form).get(0).dropzone.hiddenFileInput.click();
    });
    $(img).click(function () {
      $(nav).show();
      $(img).css("border", "2px dotted #3b9dff");
      $(img).data("seleccion", true);
    });
    $(img).mouseover(function () {
      let seleccion = $(img).data("seleccion");
      if (seleccion) {
        return;
      }

      $(nav).show();
      $(img).css("border", "1px dotted #cccccc");
    });
    $(img).mouseout(function () {
      let seleccion = $(img).data("seleccion");
      if (seleccion) {
        return;
      }
      $(nav).hide();
      $(img).css("border", "none");
    });
    $(nav).mouseover(function () {
      let seleccion = $(img).data("seleccion");
      if (seleccion) {
        return;
      }
      $(nav).show();
      $(img).css("border", "1px dotted #cccccc");
    });
    $(nav).mouseout(function () {
      let seleccion = $(img).data("seleccion");
      if (seleccion) {
        return;
      }
      $(nav).hide();
      $(img).css("border", "none");
    });
    $(document).click(function (e) {
      if ($(e.target).closest(img).length > 0) {
        return false;
      }
      $(img).data("seleccion", false);
      $(img).css("border", "none");
    });
    if (check_input) {
      check_input.addEventListener(
        "input",
        function () {
          let valor = "checked";
          if ($(this).is(":" + valor)) {
            $(titulo_div).show();
          } else {
            $(titulo_div).hide();
            valor = "";
          }
          let data = {
            is_texto: valor,
          };

          parent.columnas_db.doc(doc_id).update(data);
        },
        false
      );
    }
    if (text_input) {
      text_input.addEventListener(
        "input",
        function () {
          let texto = $(this).data("texto");

          if (!texto) {
            return;
          }

          let data = {};
          data[texto] = $(this).html();

          parent.columnas_db.doc(doc_id).update(data);
        },
        false
      );
    }

    input_number.addEventListener("input", function () {
      if (!this.value) {
        return;
      }
      if (this.value > 100) {
        this.value = 100;
      }
      if (this.value < 0) {
        this.value = 0;
      }
      let porcentaje = this.value + "%";

      let data = {
        porcentaje: this.value,
      };
      parent.columnas_db.doc(doc_id).update(data);

      $(range).val(this.value);
      $(img).css("width", porcentaje);
    });
    range.addEventListener(
      "input",
      function () {
        let porcentaje = this.value + "%";
        let valor = this.value;
        $(input_number).val(valor);

        $(img).css("width", porcentaje);
      },
      false
    );

    range.addEventListener(
      "change",
      function () {
        let porcentaje = this.value + "%";
        let valor = this.value;
        $(input_number).val(valor);

        $(img).css("width", porcentaje);
        let data = {
          porcentaje: valor,
        };
        parent.columnas_db.doc(doc_id).update(data);
      },
      false
    );

    /////////DragDIv
    let drag_divs = $(columna).find(".drag_div")[0];
    if (drag_divs) {
      let rangeGlobo = $(drag_divs).find(".input-range")[0];
      /* $(drag_divs).css('left',($(columna).width()-$(drag_divs).width())/2);
          $(drag_divs).css('top',($(columna).height()-$(drag_divs).height())/2);*/
      rangeGlobo.addEventListener(
        "input",
        function () {
          let porcentaje = this.value + "%";
          let valor = this.value;

          $(drag_divs).css("width", porcentaje);
        },
        false
      );
      rangeGlobo.addEventListener(
        "change",
        function () {
          let porcentaje = this.value + "%";
          let valor = this.value;

          $(drag_divs).css("width", porcentaje);

          let data = {
            ancho_globo: valor,
          };
          parent.columnas_db.doc(doc_id).update(data);
        },
        false
      );

      DragAndDrop.dragElement(drag_divs, function (pos_x, pos_y) {
        let data = {
          globo_pos_x: pos_x,
          globo_pos_y: pos_y,
        };
        parent.columnas_db.doc(doc_id).update(data);
      });
    }

    //DragAndDrop.dragElement(drag_divs);
  }

  addListenerInput(input) {
    let parent = this;
    input.addEventListener(
      "input",
      function () {
        let texto = $(this).data("texto");
        console.log(texto);

        if (!texto) {
          return;
        }

        let data = {};
        data[texto] = $(this).html();

        parent.bloque_db.update(data);
      },
      false
    );
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
        //cb(doc_item,col);
        parent.data.columnas[0].doc_id = col.id;
        parent.columnas_db.add(this.data.columnas[1]).then((col) => {
          parent.data.columnas[1].doc_id = col.id;
          cb(doc_item, cols);
        });
      });
    });
  }

  renderForm() {
    let html = '<form action="" class="dropzone form-upload">';
    html += '<div class="fallback">';
    html += '<input name="file" type="file"/>';
    html += "</div>";
    html += "</form>";
    return html;
  }
  renderLoading() {
    return '<div class="loading_005"><img src="../../../../assets/images/loaders/loader-02.svg"></div>';
  }

  renderAdd() {
    return '<div class="btn_add"><i class="fas fa-plus"></i></div>';
  }

  renderDelete() {
    return '<div class="btn_delete"><i class="fas fa-trash-alt"></i></div>';
  }

  renderDragGlobo() {
    return '<div class="btn_drag_globo"><i class="fas fa-arrows-alt"></i></div>';
  }
  renderRangeGlobo(data) {
    let porcentaje = data.ancho_globo;
    let html = '<div class="range-globo">';
    html += '<input type="range" class="form-range input-range" value="' + porcentaje + '"></div>';
    return html;
  }

  renderControlGlobo(data) {
    let html = "";
    html += '<div class="control-globo">';
    html += this.renderDragGlobo();
    html += this.renderRangeGlobo(data);
    html += "</div>";
    return html;
  }

  renderCheck(data) {
    let html = '<div class="ck_visible">';
    html += '<div class="form-check">';
    html += '  <input class="form-check-input" type="checkbox" value="" ' + data.is_texto + ">";
    html += "</div>";
    html += "</div>";
    return html;
  }

  getActiveButton(data, btn) {
    if (data.alineacion == this.alignToImage[0] && btn == "left") {
      return "active";
    }
    if (data.alineacion == this.alignToImage[1] && btn == "center") {
      return "active";
    }
    if (data.alineacion == this.alignToImage[2] && btn == "right") {
      return "active";
    }
    return "";
  }

  renderRange(data) {
    let html = '<div class="range-imagen">';
    html += '<input type="range" class="form-range input-range" value="' + data.porcentaje + '"></div>';
    return html;
  }
  renderNav(data) {
    let html = "";
    html += '<nav class="nav-image" aria-label="Page navigation">';
    html += '<ul class="menu">';
    html += '  <li class="menu-item"><a class="menu-link btn-file" href="javascript:void(0)"><i class="fas fa-image"></i></a></li>';
    html += '  <li class="menu-item"><a class="menu-link " href="javascript:void(0)"><input class="input-number form-control" min="0" max="100" value="' + data.porcentaje + '" type="number"></a></li>';
    html += '  <li class="menu-item ' + this.getActiveButton(data, "left") + '"><a class="menu-link btn-left" href="javascript:void(0)"><i class="fas fa-align-left"></i></a></li>';
    html += '  <li class="menu-item ' + this.getActiveButton(data, "center") + '"><a class="menu-link btn-center" href="javascript:void(0)"><i class="fas fa-align-center"></i></a></li>';
    html += '  <li class="menu-item ' + this.getActiveButton(data, "right") + '"><a class="menu-link btn-right" href="javascript:void(0)"><i class="fas fa-align-right"></i></a></li>';
    html += "</ul>";
    html += this.renderRange(data);
    html += "</nav>";
    return html;
  }
  renderColumna(data, i) {
    let border = "";

    if (i != this.data.columnas.length - 1 && i != -1) {
      border = this.border;
    }

    let html = "";
    /*html+='<div data-docid="'+data.doc_id+'" class="col p-0 mb-2 mt-2 d-flex justify-content-center f-nunito color-2E ps-20 '+border+' col-img">';
    html+=' <div class="row p-0 m-0" style="position:relative;">';
    html+=this.renderDelete();
    //html+=this.renderCheck(data);
    html+='   <div class="col-12 p-0 m-0 titulo-div" style="'+this.estilos_titulos[data.is_texto]+'">';
    html+='     <div data-texto="titulo" class="d-flex w-100 p-2 justify-content-center f-nunito fs-5 color-2F text-input">'+data.titulo+'</div>';
    html+='   </div>';
    html+='   <div class="col-12 p-2 m-0">';
    html+='     <div class="d-flex w-100 '+data.alineacion+' p-0" style="position:relative;">';
    html+=this.renderLoading()
    html+=this.renderNav(data);
    html+=this.renderForm()
    html+='       <img src="'+data.ruta+'" class="img-columna" width="'+data.porcentaje+'%">';
    html+='     </div>';
    html+='   </div>';
    html+=' </div>';
    html+='</div>';
    return html;*/

    html += '          <div data-docid="' + data.doc_id + '" class="col p-0 mb-2 mt-2 d-flex justify-content-center f-nunito color-hardDark ' + border + ' col-img">';
    html += '            <div class="row p-0 m-0" style="position:relative;">';
    html += this.renderDelete();
    html += '              <div class="col-12 p-0 m-0">';
    html += '                <div data-texto="titulo" class="text-input d-flex w-100 justify-content-center p-0 f-nunito fs-5 fw-400 color-secondary p-2">' + data.titulo + "</div>";
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
    html += '      <div class="d-block p-0 border border-3 rounded-p-10 border-color-primary">';
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

    /* html+='<div class="p-2 w-100" >';
    html+=' <div class="row  p-0 m-0">';
    html+='   <div class="col  p-0 m-0">';
    html+=      '<div class="d-block p-0 ms-90 me-50 border border-3 rounded-10 border-color-CC" style="position:relative;">';
     html+=this.renderAdd();
    html+='         <div class="row p-0 m-0 row-column">';

    console.log(this.data.columnas);
    for(let i=0; i<this.data.columnas.length; i++){

      html+= this.renderColumna(this.data.columnas[i],i);    

    }

    html+='         </div>';
    html+='      </div>';
    html+='   </div>';
    html+='  </div>';
    html+='</div>';
    return  html;*/
  }

  ordenar(lis, cb) {
    if (lis.length == 0) {
      cb();
      return;
    }

    let bloques_db = this.bloques_db;
    let columnas_db = this.columnas_db;
    let indice = 0;

    let orden = 0;

    update();

    function update() {
      let data = {
        orden: orden,
      };
      let op_id = $(lis[indice]).data("docid");
      columnas_db
        .doc(op_id)
        .update(data)
        .then((doc) => {
          if (indice < lis.length - 1) {
            orden++;
            indice++;
            update();
          } else {
            cb();
            return;
          }
        });
    }
  }
}
