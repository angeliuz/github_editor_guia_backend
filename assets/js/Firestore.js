function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

let Firestore = {
  procesando: false,
  pages_data: [],
  libro_db: null,
  paginas_db: null,
  paginas_db_orden: null,
  bloques_name: "bloques",
  config: Config.firestore,
  init: function (cb) {
    let libro_id = sessionStorage.getItem("libro_id");

    console.log(getUrlParameter("uid"));

    if (!libro_id) {
      //cb(false);
      //return;
      if (getUrlParameter("uid") == "tamara") {
        libro_id = "6156152be9f3c"; // ID FIRESTORE DESARROLLO
      }
      if (getUrlParameter("uid") == "david") {
        libro_id = "61562c97c6234"; // ID FIRESTORE DESARROLLO
      }
      if (getUrlParameter("uid") == "erik") {
        libro_id = "61562cb45745c"; // ID FIRESTORE DESARROLLO
      }
      if (getUrlParameter("uid") == "cristian") {
        libro_id = "61562cdce2220"; // ID FIRESTORE DESARROLLO
      }
      if (getUrlParameter("uid") == "claudia") {
        libro_id = "61562d084f678"; // ID FIRESTORE DESARROLLO
      }
      if (getUrlParameter("uid") == "jorge") {
        libro_id = "61562d1ca3f83"; // ID FIRESTORE DESARROLLO
      }
    }
    firebase.initializeApp(Firestore.config);
    const db = firebase.firestore();
    Firestore.libro_db = db.collection("libros").doc(libro_id);
    console.log(Firestore.libro_db);
    Firestore.paginas_db = Firestore.libro_db.collection("paginas");
    // Firestore.paginas_db = db.collection('libros').doc('1614e1e39c8d2c').collection('paginas');
    Firestore.paginas_db_orden = Firestore.paginas_db.orderBy("numero");

    Firestore.libro_db.get().then((doc) => {
      if (doc.exists) {
        let data = doc.data();
        cb(data);
      }
    });

    return true;
  },

  getBloques: function (pagina_id, cb) {
    let bloques_db = Firestore.paginas_db.doc(pagina_id).collection(Firestore.bloques_name);
    let bloques_db_orden = bloques_db.orderBy("orden");

    bloques_db_orden.get().then((doc) => {
      let items = [];
      let total = doc.docs.length;

      let cont = 1;
      if (total == 0) {
        cb([]);
        return;
      }
      doc.forEach(function (bl) {
        let data = {};
        data.data = bl.data();
        data.doc_id = bl.id;
        let bloque = bloques_db.doc(bl.id);

        let columnas = Firestore.getColumnas(bloque, function (col) {
          data.columnas = col;

          let opciones = Firestore.getOpciones(bloque, function (opc) {
            data.opciones = opc;
            items.push(data);
            if (cont == total) {
              cb(items);
            }
            cont++;
          });
        });

        /*let opciones = bloque.collection('opciones').orderBy('orden');
            let columnas = bloque.collection('columnas');
            let opci = [] ;
            let col = [] ;*/

        /////////////Opciones
        /* opciones.get().then((op) =>{
                if(!op.empty){
                  op.forEach(function(doc) {
                    let d = doc.data();
                    d.doc_id = doc.id;
                    opci.push(d);
                  });
                }
                data.opciones = opci;
                items.push(data);
                if(cont==total){
                    cb(items)
                }
                cont++;



              });*/

        /////////////Columnas
        /*columnas.get().then((op) =>{

                if(!op.empty){
                  op.forEach(function(doc) {
                    let d = doc.data();
                    d.doc_id = doc.id;
                    col.push(d);
                  });
                }
                data.columnas = col;
                items.push(data);
                if(cont==total){
                    console.log(data);
                    cb(items)
                }
                cont++;
              });*/
      });
    });
  },

  getColumnas: function (bloque, cb) {
    let columnas = bloque.collection("columnas").orderBy("orden");
    let col = [];
    try {
      columnas.get().then((op) => {
        if (!op.empty) {
          op.forEach(function (doc) {
            let d = doc.data();
            d.doc_id = doc.id;
            col.push(d);
          });
        }

        cb(col);
      });
    } catch (err) {
      cb(col);
    }
  },
  getOpciones: function (bloque, cb) {
    let opciones = bloque.collection("opciones").orderBy("orden");
    let opc = [];
    try {
      opciones.get().then((op) => {
        if (!op.empty) {
          op.forEach(function (doc) {
            let d = doc.data();
            d.doc_id = doc.id;
            opc.push(d);
          });
        }

        cb(opc);
      });
    } catch (err) {
      cb(opc);
    }
  },

  getData: function (cb) {
    Firestore.paginas_db_orden.get().then((doc) => {
      if (doc.docs.length == 0) {
        cb([]);
        return;
      }
      Libro.docPaginas = doc.docs;
      console.log(Libro.docPaginas);
      Libro.totalPaginas = doc.docs.length;

      Firestore.loadPagina(Libro.paginasActual, cb);

      /* Render.renderLoadingPage();
            let cont_page = 0;
            let pages_data = [];
            let pagina_actual = doc.docs[cont_page];
            cargarPagina();
             function cargarPagina(){
                pages_data[cont_page] = {
                    page_id:pagina_actual.id,
                    numero:pagina_actual.data().numero,
                    modelo:pagina_actual.data().modelo,
                    cabecera:pagina_actual.data().cabecera,
                    bloques:[]
                }
                Firestore.getBloques(pagina_actual.id,function(items){
                    pages_data[cont_page].bloques = items;
                    Render.deleteLoadingPage();
                    console.log(items);
                    Render.renderPagina(pages_data[cont_page]);
                    DragAndDrop.addContainerItem(pagina_actual.id);
                    Evento.eventosPagina(pagina_actual.id);
                    //DragAndDrop.addContainerItemListado(null,pagina_actual.id);
                    cont_page++;
                    pagina_actual = doc.docs[cont_page];
                    //if(cont_page>doc.docs.length-1){
                    if(cont_page==1){
                        Firestore.pages_data = pages_data;
                        Libro.paginasActuales = doc.docs.length;
                        cb(pages_data);
                        return;
                    }
                    else{
                        cargarPagina();
                    }
                 })
             }*/
    });
  },
  loadPagina: function (indice, cb) {
    if (Firestore.procesando) {
      return;
    }
    Firestore.procesando = true;
    let pagina_actual = Libro.docPaginas[indice];
    let data = {
      page_id: pagina_actual.id,
      numero: pagina_actual.data().numero,
      modelo: pagina_actual.data().modelo,
      cabecera: pagina_actual.data().cabecera,
      bloques: [],
    };
    Render.renderLoadingPage();
    Firestore.getBloques(pagina_actual.id, function (items) {
      data.bloques = items;
      Render.deleteLoadingPage();
      Render.renderPagina(data);
      DragAndDrop.addContainerItem(pagina_actual.id);
      Evento.eventosPagina(pagina_actual.id);
      Libro.paginasActual = Libro.paginasActual + 1;
      Firestore.procesando = false;
      cb();
    });
  },
  updateItem: function (pagina_id, bloque_id, data) {
    let bloques_db = Firestore.paginas_db.doc(pagina_id).collection(Firestore.bloques_name);
    bloques_db.doc(bloque_id).update(data);
  },
  deleteItem: function (pagina_id, bloque_id, cb) {
    let bloques_db = Firestore.paginas_db.doc(pagina_id).collection(Firestore.bloques_name);
    bloques_db
      .doc(bloque_id)
      .delete()
      .then((doc) => {
        cb(doc);
      });
  },
  addItem: function (pagina_id, data, opciones, cb) {
    let bloques_db = Firestore.paginas_db.doc(pagina_id).collection(Firestore.bloques_name);
    bloques_db.add(data).then((doc) => {
      let doc_item = doc;
      console.log(opciones);
      if (opciones) {
        let ids = [];
        bloques_db
          .doc(doc.id)
          .collection("opciones")
          .add(opciones[0])
          .then((op) => {
            ids.push(op.id);
            bloques_db
              .doc(doc.id)
              .collection("opciones")
              .add(opciones[1])
              .then((op) => {
                ids.push(op.id);
                bloques_db
                  .doc(doc.id)
                  .collection("opciones")
                  .add(opciones[2])
                  .then((op) => {
                    ids.push(op.id);
                    cb(doc_item, ids);
                  });
              });
          });
      } else {
        cb(doc, []);
      }
    });
  },
  updateItemListado: function (pagina_id, bloque_id, op_id, data) {
    let bloques_db = Firestore.paginas_db.doc(pagina_id).collection(Firestore.bloques_name);
    bloques_db.doc(bloque_id).collection("opciones").doc(op_id).update(data);
  },
  updatePagina: function (pagina_id, data) {
    let bloques_db = Firestore.paginas_db.doc(pagina_id);
    bloques_db.update(data);
  },
  addPagina: function (data, cb) {
    Firestore.paginas_db.add(data).then((doc) => {
      cb(doc);
    });
  },
  deletePagina: function (pagina_id, cb) {
    let bloques_db = Firestore.paginas_db.doc(pagina_id);
    bloques_db.delete().then((doc) => {
      cb(doc);
    });
  },
};
