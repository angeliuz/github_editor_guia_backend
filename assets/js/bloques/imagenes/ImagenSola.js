class ImagenSola extends Imagen {
  
  id = 'im_sola';
  border = '';
  data = {
        nombre:'Imagen sola',
        data:{
           plantilla_id:this.id,
           categoria:2,
           indice:1,
        },
        columnas:[
                {   
                    titulo:'Texto', 
                    porcentaje:'50',  
                    ruta:Render.elementos.sin_imagen,
                    orden:0,
                    is_texto:'',
                    alineacion:this.alignToImage[1]
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
    
   
    //html+= this.renderAlign();
    //html+= this.renderRange();
   html+='<div class="p-0 w-100">';
    html+='     <div class="d-block msp-70">';
    html+='         <div class="row p-0 m-0 row-column">';
    html+='             <div data-docid="'+data.doc_id+'" class="col-img col p-0 d-flex '+data.alineacion+' '+border+'" style="position:relative;">';
    html+=this.renderLoading()
    html+=this.renderNav(data);
    html+=this.renderForm()
    html+='                 <img class="img-columna" src="'+data.ruta+'" width="'+data.porcentaje+'%">';
    html+='             </div>';
    html+='         </div>';
    html+='     </div>';
    html+='</div>';
    /*html+='     <div class="d-block">';
    html+='         <div class="p-0 m-0 w-100">';
    html+='             <div class="image-contenedor" style="position:relative;width:'+this.data.data.porcentaje+'%;">';
    html+= this.renderNav();
    html+='                 <img class="img-main" src="'+this.data.data.ruta+'">';
    html+='             </div>';
    html+='         </div>';
    html+='     </div>';*/
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