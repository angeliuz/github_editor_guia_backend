class Titulo {
  page_id = null;
  bloque_id = null;
  clase_padre = 'titulo_padre_clase';
  id = 'ti_';
  bloque=null;
  bloques_db = null;
  bloque_db = null;
  inputs=null;
  procesando = false;
  data = {
        nombre:'Título solo',
        data:{
                plantilla_id:this.id,
                categoria:0,
                indice:0,
                texto:'Título'
        }
  };

  constructor (){
  };
  static getInstance(){
    return new this();
  }
  setData(data){

    this.data.data.texto = data.texto;

  };
  activar(page_id,bloque){
    this.page_id = page_id;
    this.bloque = bloque;
    this.bloques_db = Firestore.paginas_db.doc(this.page_id).collection(Firestore.bloques_name);
    this.bloque_db = this.bloques_db.doc(bloque[0].id);
    this.elementos()
    this.initListeners();



    

  }
  add(page_id,bloque,cb){

    this.page_id = page_id;
    this.bloque = bloque;

    this.bloques_db = Firestore.paginas_db.doc(this.page_id).collection(Firestore.bloques_name);
    this.save(cb);
  };

  save(cb){
    this.bloque.addClass('item');
    this.bloque.removeClass('item-plantilla');
    this.bloque.html(Render.renderLoadingItem());
    let parent = this;
    this.firestoreSave(function(doc){
        parent.bloque_db = parent.bloques_db.doc(doc.id);
        parent.bloque.attr('data-docid',doc.id);
        parent.bloque.attr('data-pageid',parent.page_id);
        parent.bloque.removeAttr('data-plantilla_id');
        parent.bloque.removeAttr('data-indice');
        parent.bloque.html(parent.render());

        parent.elementos()
        parent.initListeners();

        cb();
    });

  };

  elementos(){
    this.inputs = this.bloque.find('.text-input');
  }
  initListeners(){
    let parent = this;

    let inputs = this.inputs;
    for(let i=0; i<inputs.length; i++){
      this.addListener(inputs[i]);
      let editor = new MediumEditor($(inputs[i]),EditorTexto.config());
    }

  }
  addListener(input){
        let parent = this;
        input.addEventListener("input", function() {

          
          let texto = $(this).data("texto");

          if(!texto){
            return;
          }
    
          let data = {};
          data[texto] = $(this).html();

          parent.bloque_db.update(data)


      }, false);
  }

  firestoreSave(cb){
    let parent = this
    this.bloques_db.add(this.data.data).then((doc) =>{
      let doc_item = doc;
      parent.bloque.attr('id',doc.id)
      parent.bloque.addClass(parent.id);
      parent.bloque_id = doc.id;
      cb(doc_item);
    });
  }
 
  render(){
    let html = Plantilla.renderDrag();
    html+='<div class="p-0 w-100">';
    html+='     <div class="d-block w-100">';
    html+='         <div class="row p-0 m-0">';
    html+='             <div data-texto="texto" class="col fs-2 f-livvic fw-600 d-flex justify-content-center color-secondary text-input">';
    html+='                 '+this.data.data.texto+'';
    html+='             </div>';
    html+='         </div>';
    html+='     </div>';
    html+='</div>';
    return  html;
  }

  renderMenu(){
    return this.data.nombre;
  }

}