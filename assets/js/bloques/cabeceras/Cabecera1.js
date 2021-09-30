class Cabecera1 {
  page_id = null;
  bloque_id = null;
  clase_padre = 'cabecera_padre_clase';
  id = 'cb_001';
  bloque=null;
  bloques_db = null;
  bloque_db = null;
  inputs=null;
  procesando = false;
  data = {
        nombre:'Nombre,curso,fecha',
        data:{
            plantilla_id:this.id,
            categoria:0,
            indice:2,
            texto_1:'Nombre:',
            texto_2:'Fecha:',
            texto_3:'Curso:',
        }
  };

  static getInstance(){
    return new this();
  }

  constructor (){
  };
  setData(data){

    this.data.data.texto_1 = data.texto_1;
    this.data.data.texto_2 = data.texto_2;
    this.data.data.texto_3 = data.texto_3;

  };
  activar(page_id,bloque){
    this.page_id = page_id;
    this.bloque = bloque;
    this.bloques_db = Firestore.paginas_db.doc(this.page_id).collection('bloques');
    this.bloque_db = this.bloques_db.doc(bloque[0].id);
    this.elementos()
    this.initListeners();



    

  }
  add(page_id,bloque,cb){

    this.page_id = page_id;
    this.bloque = bloque;

    this.bloques_db = Firestore.paginas_db.doc(this.page_id).collection('bloques');
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
      parent.bloque.addClass(parent.clase_padre);
      parent.bloque.addClass(parent.id);

      parent.bloque_id = doc.id;
      cb(doc_item);
    });
  }
 
  render(){
    let html = Plantilla.renderDrag();
    html+='<div class="p-2 w-100">';
    html+='     <div class="w-100 psp-120 pep-50">';
    html+='         <div class="row mt-2 ms-5 pb-0">';
    html+='                 <div class="col-8">';
    html+='                     <div class="d-flex">';
    html+='                         <div class="pt-2 fs-6 fw-normal f-nunito text-input" data-texto="texto_1" contenteditable="true">'+this.data.data.texto_1+'</div>';
    html+='                         <div class="pt-2 flex-grow-1 border-bottom border-secondary">&nbsp;</div>';
    html+='                     </div>';
    html+='                 </div>';
    html+='                 <div class="col-4">';
    html+='                     <div class="d-flex">';
    html+='                         <div class="pt-2 fs-6 fw-normal f-nunito text-input" data-texto="texto_2" contenteditable="true">'+this.data.data.texto_2+'</div>';
    html+='                         <div class="p-2 flex-grow-1 border-bottom border-secondary">&nbsp;</div>';
    html+='                     </div>';
    html+='                 </div>';
    html+='                 <div class="col-8">';
    html+='                     <div class="d-flex">';
    html+='                         <div class="hp-30 flex-grow-1 border-bottom border-secondary">&nbsp;</div>';
    html+='                     </div>';
    html+='                 </div>';
    html+='                 <div class="col-4">';
    html+='                     <div class="d-flex">';
    html+='                         <div class="hp-30 pt-2 bd-highlight fs-6 fw-normal f-nunito text-input" data-texto="texto_3" contenteditable="true">'+this.data.data.texto_3+'</div>';
    html+='                         <div class="hp-30 flex-grow-1 border-bottom border-secondary">&nbsp;</div>';
    html+='                     </div>';
    html+='                 </div>';
    html+='         </div>';
    html+='     </div>';
    html+='</div>';
    return  html;
  }

  renderMenu(){
    return this.data.nombre;
  }

  
}