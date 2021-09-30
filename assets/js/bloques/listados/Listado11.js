class Listado11 extends Listado {
  
  id = 'li_011';
  data = {
        nombre:'Titulo, listado flecha color',
        data:{
            texto:'Título del listado:',
            plantilla_id:this.id,
            categoria:1,
            indice:1,
        },
        opciones:[
                {
                    orden:0,
                    texto:'Opción 1',
                },
                {
                    orden:1,
                    texto:'Opción 2',
                },
                {
                    orden:3,
                    texto:'Opción 3',
                }
        ]
  };

constructor (){
    super();
}; 



  render(){
    
      let html = Plantilla.renderDrag();
      html+='<div class="p-0 w-100">';
      html+='     <div class="d-block msp-70">';
      html+='         <div class="row p-0 m-0">';
      html+='             <div data-texto="texto" class="editable col-12 fs-5 f-nunito fw-400 color-2E psp-20 mb-2 justify-content-start text-input" contenteditable="true">';
      html+='                 '+this.data.data.texto+'';
      html+='             </div>';
      html+='             <div class="col-12 fs-5 f-nunito fw-200 psp-20 justify-content-start">';
      html+='                 <ul type="none" class="msp-20 p-0 arrastar">';   
                                    for(var i=0; i<this.data.opciones.length; i++){
      //html+='                         <li class="color-CC"><span class="color-2E"><span class="handle"><i class="fas fa-th"></i></span><span class="li-editable" contenteditable="true" data-docid="'+this.data.opciones[i].doc_id+'">'+this.data.opciones[i].texto+'</span></span><span class="remove-li" data-docid="'+this.data.opciones[i].doc_id+'"><i class="far fa-times-circle"></i></span></li>';
      html+= this.renderOpcion(this.data.opciones[i]);                                
                                     }
      html+='                 </ul>';
      html+='                 <div><a class="btn_add_item" href="javascript:void(0)">Añadir opción</a></div>'
      html+='             </div>';
      html+='         </div>';
      html+='     </div>';
      html+='</div>';

      return  html;
  };

  renderOpcion(opcion){
    return '<li class="color-primary opcion"><i class="fa-li fa fa-arrow-right color-primary fs-5 fw-600"></i><div class="handle"><i class="fas fa-th"></i></div><span class="color-hardDark"><div class="editable li-editable" contenteditable="true" data-docid="'+opcion.doc_id+'">'+opcion.texto+'</div></span><div class="remove-li" data-docid="'+opcion.doc_id+'"><i class="fas fa-trash-alt"></i></div></li>';
  }






  
}



              

                

            