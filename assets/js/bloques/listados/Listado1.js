class Listado1 extends Listado {
  page_id = null;
  bloque_id = null;
  id = "li_001";
  clase_padre = "listado_padre_clase";
  bloque = null;
  bloques_db = null;
  opciones_db = null;
  procesando = false;
  data = {
    nombre: "Titulo, listado",
    data: {
      texto: "Título del listado:",
      plantilla_id: this.id,
      categoria: 1,
      indice: 0,
    },
    opciones: [
      {
        orden: 0,
        texto: "Opción 1",
      },
      {
        orden: 1,
        texto: "Opción 2",
      },
      {
        orden: 3,
        texto: "Opción 3",
      },
    ],
  };
  drake = dragula([], {
    moves: function (el, container, handle) {
      return handle.classList.contains("handle");
    },
  });

  constructor() {
    super();
  }
  static getInstance() {
    return new this();
  }
  setData(data) {
    this.data.data.texto = data.texto;
    this.data.opciones = data.opciones;
  }
  activar(page_id, bloque) {
    this.page_id = page_id;
    this.bloque = bloque;
    this.bloques_db = Firestore.paginas_db.doc(this.page_id).collection("bloques");
    this.opciones_db = this.bloques_db.doc(this.bloque[0].id).collection("opciones");
    this.initDrag();
    this.initListeners();
    console.log(this.bloque[0].id);
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
    this.firestoreSave(function (doc) {
      parent.bloque.attr("data-docid", doc.id);
      parent.bloque.attr("data-pageid", parent.page_id);
      parent.bloque.removeAttr("data-plantilla_id");
      parent.bloque.removeAttr("data-indice");
      parent.bloque.html(parent.render());
      parent.initDrag();
      parent.initListeners();

      cb();
    });
  }

  firestoreSave(cb) {
    let parent = this;
    console.log(this.data.data);
    this.bloques_db.add(this.data.data).then((doc) => {
      let doc_item = doc;
      parent.bloque.attr("id", doc.id);
      parent.bloque.addClass(parent.id);
      parent.bloque.addClass(parent.clase_padre);
      parent.bloque_id = doc.id;
      parent.opciones_db = parent.bloques_db.doc(doc.id).collection("opciones");

      parent.opciones_db.add(this.data.opciones[0]).then((op) => {
        parent.data.opciones[0].doc_id = op.id;
        parent.opciones_db.add(this.data.opciones[1]).then((op) => {
          parent.data.opciones[1].doc_id = op.id;
          parent.opciones_db.add(this.data.opciones[2]).then((op) => {
            parent.data.opciones[2].doc_id = op.id;
            cb(doc_item);
          });
        });
      });
    });
  }

  initDrag() {
    let parent = this;
    let opcionesArrastables = this.bloque.find(".arrastar");
    for (let i = 0; i < opcionesArrastables.length; i++) {
      this.drake.containers.push(opcionesArrastables[i]);
    }
    this.drake.on("drop", function (el, target, source, sibling) {
      let ul = source;
      let currentOrder = 0;
      let li_editables = $(ul).find(".li-editable");

      parent.ordenar(li_editables, function () {});
      /*for(let i=0; i<li_editables.length; i++){
              let doc_op_id = $(li_editables[i]).data('docid');
              let nuevaData = {
                "orden": currentOrder,
              };
             
              Firestore.updateItemListado(page_id,doc_id,doc_op_id,nuevaData);
              currentOrder++;
            }*/
    });
  }

  render() {
    let html = Plantilla.renderDrag();
    html += '<div class="p-0 w-100">';
    html += '     <div class="d-block msp-70">';
    html += '         <div class="row p-0 m-0">';
    html += '             <div data-texto="texto" class="editable col-12 fs-5 f-nunito fw-400 psp-20 mb-2 justify-content-start text-input" contenteditable="true">';
    html += "                " + this.data.data.texto + "";
    html += "             </div>";
    html += '             <div class="col-12 fs-5 f-nunito fw-200 psp-20 justify-content-start">';
    html += '                 <ul class="msp-20 p-0 arrastar">';
    for (var i = 0; i < this.data.opciones.length; i++) {
      //html+='                         <li class="color-CC"><span class="color-2E"><span class="handle"><i class="fas fa-th"></i></span><span class="li-editable" contenteditable="true" data-docid="'+this.data.opciones[i].doc_id+'">'+this.data.opciones[i].texto+'</span></span><span class="remove-li" data-docid="'+this.data.opciones[i].doc_id+'"><i class="far fa-times-circle"></i></span></li>';
      html += this.renderOpcion(this.data.opciones[i]);
    }
    html += "                 </ul>";
    html += '                 <div><a class="btn_add_item" href="javascript:void(0)">Añadir opción</a></div>';
    html += "             </div>";
    html += "         </div>";
    html += "     </div>";
    html += "</div>";

    return html;
  }

  renderOpcion(opcion) {
    return (
      '<li class="color-primary opcion"><div class="handle"><i class="fas fa-th"></i></div><span class="color-hardDark"><div class="editable li-editable" contenteditable="true" data-docid="' +
      opcion.doc_id +
      '">' +
      opcion.texto +
      '</div></span><div class="remove-li" data-docid="' +
      opcion.doc_id +
      '"><i class="fas fa-trash-alt"></i></div></li>'
    );
  }

  renderLoadingItem() {
    return '<img class="img-loading" src="../assets/images/loaders/loader-02.svg">';
  }

  initListeners() {
    let img = this.bloque.find(".btn-img-texto");

    $(img[0]).click(function () {
      alert("Imagen");
    });

    let parent = this;
    let inputs = this.bloque.find(".text-input");
    for (let i = 0; i < inputs.length; i++) {
      this.addInputListener(inputs[i]);
      new MediumEditor($(inputs[i]), EditorTexto.config());
    }
    let li_editables = this.bloque.find(".li-editable");

    for (let i = 0; i < li_editables.length; i++) {
      this.addInputListenerListado(li_editables[i]);
      new MediumEditor($(li_editables[i]), EditorTexto.config());
    }

    let addButtons = this.bloque.find(".btn_add_item");

    for (let i = 0; i < addButtons.length; i++) {
      $(addButtons[i]).click(function () {
        let orden = parseInt(parent.bloque.find(".li-editable").length);
        let data = {
          orden: orden,
          //texto:'Opción '+parseInt(orden+1)
          texto: parent.data.opciones[0].texto,
        };
        let button = $(this);
        let buttonHtml = button.html();
        button.html(parent.renderLoadingItem());

        parent.opciones_db.add(data).then((op) => {
          data.doc_id = op.id;

          let ul = parent.bloque.find(".arrastar")[0];
          $(ul).append(parent.renderOpcion(data));

          let li = $(ul).find(".opcion").last();
          let input = li.find(".li-editable");
          let remove = li.find(".remove-li");
          let handle = li.find(".handle");

          parent.addClickRemove(remove[0]);
          parent.addOverOutRemove(remove[0]);
          parent.addInputListenerListado(input[0]);
          parent.addOverOut(handle[0]);
          new MediumEditor($(input[0]), EditorTexto.config());

          button.html(buttonHtml);
        });
      });
    }

    let removeButtons = this.bloque.find(".remove-li");

    for (let i = 0; i < removeButtons.length; i++) {
      this.addClickRemove(removeButtons[i]);
      this.addOverOutRemove(removeButtons[i]);
    }

    let handles = this.bloque.find(".handle");

    for (let i = 0; i < handles.length; i++) {
      this.addOverOut(handles[i]);
    }
  }

  addClickRemove(button) {
    let parent = this;
    $(button).click(function () {
      let button = $(this);

      if (parent.procesando) {
        return;
      }
      button.hide();
      parent.procesando = true;
      let doc_id = $(this).data("docid");
      let li = $(this).parent();
      let html = li.find(".li-editable").html();
      li.html("Eliminando...");
      li.css("opacity", ".5");
      parent.opciones_db
        .doc(doc_id)
        .delete()
        .then((doc) => {
          let li_editables = parent.bloque.find(".li-editable");
          parent.ordenar(li_editables, function () {
            button.show();
            li.remove();
            parent.procesando = false;
          });
        });
    });
  }

  addInputListener(input) {
    let parent = this;
    input.addEventListener(
      "input",
      function () {
        //let doc_id = $(this).data("doc_id");
        let doc_id = parent.bloque.data("docid");
        let page_id = parent.page_id;
        let texto = $(this).data("texto");

        console.log(texto);

        if (!texto) {
          return;
        }

        let nuevaData = {};
        nuevaData[texto] = $(this).html();
        Firestore.updateItem(page_id, doc_id, nuevaData);
      },
      false
    );
  }
  addInputListenerListado(input) {
    let parent = this;
    console.log(input);
    input.addEventListener(
      "input",
      function () {
        let container = $(this);
        let html = $(this).html();

        let doc_id = parent.bloque.data("docid");
        let page_id = parent.page_id;
        let doc_op_id = $(this).data("docid");
        let nuevaData = {
          texto: html,
        };
        console.log(doc_id);
        Firestore.updateItemListado(page_id, doc_id, doc_op_id, nuevaData);
      },
      false
    );
  }

  addOverOut(handle) {
    $(handle).mouseover(function () {
      let parent = $(this).parent().find(".li-editable");
      parent.append('<div class="over"></div>');
    });

    $(handle).mouseout(function () {
      let parent = $(this).parent().find(".li-editable");
      parent.find(".over").remove();
    });
  }

  addOverOutRemove(remove) {
    $(remove).mouseover(function () {
      let parent = $(this).parent().find(".li-editable");
      parent.append('<div class="over remove"></div>');
    });

    $(remove).mouseout(function () {
      let parent = $(this).parent().find(".li-editable");
      parent.find(".over").remove();
    });
  }

  ordenar(lis, cb) {
    if (lis.length == 0) {
      cb();
      return;
    }

    let bloques_db = this.bloques_db;
    let opciones_db = this.opciones_db;
    let indice = 0;

    let orden = 0;

    update();

    function update() {
      let data = {
        orden: orden,
      };
      let op_id = $(lis[indice]).data("docid");
      opciones_db
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

  renderMenu() {
    let html = "";
    html += '<div class=" p-0 w-100">';
    html += '<div class="d-block">';
    html += '  <div class="row p-0 m-0">';
    html += '    <div class="col-12 fsp-10 f-nunito fw-400 color-hardDark psp-20 mb-2 d-flex justify-content-start">';
    html += "      Al finalizar estas clases habrás aprendido a:";
    html += "    </div>";
    html += '    <div class="col-12 fsp-10 f-nunito fw-200 psp-20 justify-content-start">';
    html += '      <ul class="msp-20 p-0 ">';
    html += '        <li class="color-primary"><span class="color-hardDark">Identificar vértices, aristas y caras en modelos o dibujos de figuras 3D.</span></li>';
    html += '        <li class="color-primary"><span class="color-hardDark">Identificar las vistas en redes de figuras regulares 3D.</span></li>';
    html += '        <li class="color-primary"><span class="color-hardDark">Dibujar las vistas de figuras 3D.</span></li>';
    html += "      </ul>";
    html += "    </div>";
    html += "  </div>";
    html += "</div>";
    html += "</div>";
    return html;
  }
}
