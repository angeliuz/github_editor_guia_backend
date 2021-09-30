class Imagen4 extends Imagen {
  
  id = 'im_004';
  border = '';
  data = {
        nombre:'Imagen con globo texto',
        data:{
           plantilla_id:this.id,
           categoria:2,
           indice:1,
        },
        columnas:[
                {   
                    titulo:'Muy lejos, más allá de las montañas de palabras, alejados de los países de las vocales y las consonantes, viven los textos simulados. Viven aislados en casas de letras, en la costa de la semántica, un gran océano de lenguas.', 
                    porcentaje:'80',  
                    ruta:Render.elementos.sin_imagen,
                    orden:0,
                    is_texto:'',
                    alineacion:this.alignToImage[1],
                    globo_pos_x:202,
                    globo_pos_y:148,
                    ancho_globo:50,
                    color_globo:'bgc-tertiary'
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
    html+='             <div data-docid="'+data.doc_id+'" class="col-img col position-relative  justify-content-center'+border+'">';
    html+='<div class="d-flex '+data.alineacion+'" style="position:relative;">';
    html+=this.renderLoading()
    html+=this.renderNav(data);
    html+=this.renderForm()
    html+='                 <img class="img-columna" src="'+data.ruta+'" width="'+data.porcentaje+'%">';
    html+='</div>';

    html+='<div class="'+data.color_globo+' color-dark position-absolute p-3 rounded-p-10  drag_div" style="width:'+data.ancho_globo+'%; left:'+data.globo_pos_x+'px; top:'+data.globo_pos_y+'px; ">';
    html+=this.renderControlGlobo(data);
    html+=' <div data-texto="titulo" class="justify-content-start f-nunito fw-300 fs-6 lh-sm text-input">';
    html+=  data.titulo;
    html+=' </div>';
    html+='</div>';
    html+='             </div>';
    html+='         </div>';
    html+='     </div>';
    html+='</div>';

    return  html;
  }

  renderMenu(){
    let html = '';

    let border = '';
    let data = this.data.columnas[0];
    data.porcentaje = '50'
    data.ancho_globo = 30;
    data.globo_pos_x = 90;
    data.globo_pos_y = 20;
    data.titulo = 'Texto'

    html+='<div class="p-0 w-100">';
    html+='     <div class="d-block">';
    html+='         <div class="row p-0 m-0 row-column">';
    html+='             <div data-docid="'+data.doc_id+'" class="col position-relative  justify-content-center">';
    html+='<div class="d-flex '+data.alineacion+'">';
    html+='                 <img class="img-columna" src="'+data.ruta+'" width="'+data.porcentaje+'%">';
    html+='</div>';
    html+='<div class="bgc-tertiary color-dark position-absolute p-3 rounded-p-10" style="width:'+data.ancho_globo+'%; left:'+data.globo_pos_x+'px; top:'+data.globo_pos_y+'px; ">';
    html+=' <div data-texto="titulo" class="justify-content-start f-nunito fw-300 fsp-10 lh-sm text-input">';
    html+=  data.titulo;
    html+=' </div>';
    html+='</div>';
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