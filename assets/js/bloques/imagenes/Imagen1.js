class Imagen1 extends Imagen {
  
  id = 'im_001';
  border = '';
  data = {
        nombre:'Imagen con bajada',
        data:{
           plantilla_id:this.id,
           categoria:2,
           indice:1,
        },
        columnas:[
                {   
                    titulo:'Bajada de imagen', 
                    porcentaje:'50',  
                    ruta:Render.elementos.sin_imagen,
                    orden:0,
                    is_texto:'',
                    alineacion:this.alignToImage[0]
                }
        ]
  };

  static getId(){
    return this.id;
  }

  constructor (){
    super();
  };

  firestoreSave(cb){
    let parent = this
    this.bloques_db.add(this.data.data).then((doc) =>{
      let doc_item = doc;
      parent.bloque.attr('id',doc.id)
      parent.bloque.addClass(parent.clase_padre);
      parent.bloque.addClass(parent.id);
      parent.bloque_id = doc.id;
      parent.columnas_db = parent.bloques_db.doc(doc.id).collection('columnas');
      let cols = [];

      parent.columnas_db.add(this.data.columnas[0]).then((col)=>{
        parent.data.columnas[0].doc_id = col.id
        cb(doc_item,[]);
      });
             
      
      });
  }








  render(){
    let html = Plantilla.renderDrag();

    let border = '';
    let data = this.data.columnas[0];
    

    html+='<div class="p-0 w-100">';
    html+='     <div class="d-block msp-70 mep-20">';
    html+='         <div class="row p-0 m-0 row-column">';
    html+='             <div data-docid="'+data.doc_id+'" class="col-img col '+border+'">';
    html+='<div class="pt-2 d-flex '+data.alineacion+'" style="position:relative;">';
    html+=this.renderLoading()
    html+=this.renderNav(data);
    html+=this.renderForm()
    html+='                 <img class="border border-0 border-secondary img-columna" src="'+data.ruta+'" width="'+data.porcentaje+'%">';
    html+='</div>';
    html+='<i class="color-primary fas fa-sort-up mt-1 me-1 d-inline-block align-top"></i>';
    html+='<div data-texto="titulo" class="d-inline-block  w-75 text-input">';
    html+=data.titulo;
    html+='    </div>';
    html+='             </div>';
    html+='         </div>';
    html+='     </div>';
    html+='</div>';

    return  html;
  }

  renderMenu(){
    let html = '';


    let data = this.data.columnas[0];
     
    

    html+='<div class="p-0 w-100">';
    html+='     <div class="d-block">';
    html+='         <div class="row p-0 m-0 row-column">';
    html+='             <div data-docid="'+data.doc_id+'" class="col ">';
    html+='<div class="d-flex">';
    html+=' <img class="border border-0 border-secondary" src="'+data.ruta+'" width="'+data.porcentaje+'%">';
    html+='</div>';
    html+='<i class="color-primary fas fa-sort-up mt-1 me-1 d-inline-block align-top"></i>';
    html+='<div  class="d-inline-block  w-75">';
    html+=data.titulo;
    html+='    </div>';
    html+='             </div>';
    html+='         </div>';
    html+='     </div>';
    html+='</div>';

    return  html;
  }

  colBorder(){
      return;
  }



  
}