class Listado13 extends Listado {
  
  id = 'li_013';
  data = {
        nombre:'Titulo bullet, listado con caja',
        data:{
            texto_1:'1',
            texto_2:'Título del listado:',
            plantilla_id:this.id,
            categoria:1,
            indice:1,
        },
        opciones:[
                {
                    orden:0,
                    texto:'Texto <div class="caja-texto">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> texto',
                },
                {
                    orden:1,
                    texto:'Texto <div class="caja-texto">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> texto',
                },
                {
                    orden:3,
                    texto:'Texto <div class="caja-texto">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> texto',
                }
        ]
  };

constructor (){
    super();
}; 

render(){
    
      let html = Plantilla.renderDrag();
      html+='<div class="p-0 w-100">';
      html+='  <div class="d-block ">';
      html+='    <div class="row p-0 m-0">';
      html+='      <div class="col psp-70 justify-content-start f-nunito fs-5 fw-300 color-2E px-85 ">';
      html+='        <div class="d-flex w-100 ">';
      html+='          <div class="p-2">';
      html+='            <div data-texto="texto_1" class="text-input bgc-primary rounded-circle text-center wp-30 hp-30 color-white ptp-2 fw-700 fs-5">'+this.data.data.texto_1+'</div>';
      html+='          </div>';
      html+='          <div data-texto="texto_2" class="editable text-input p-2 flex-grow-1 ">'+this.data.data.texto_2+'</div>';
      html+='        </div>';
      html+='        <div class="col-12 fs-5 f-nunito fw-200 psp-20 justify-content-start">';
      html+='          <ul class="msp-60 p-0 arrastar">';
      for(var i=0; i<this.data.opciones.length; i++){
      html+= this.renderOpcion(this.data.opciones[i]);                                
      }
      html+='          </ul>';
      html+='                 <div class="mt-2"><a class="btn_add_item" href="javascript:void(0)">Añadir opción</a></div>'
      html+='        </div>';
      html+='      </div>';
      html+='    </div>';
      html+='  </div>';
      html+='</div>';


     /* html+='<div class="p-0 w-100">';
      html+='     <div class="d-block msp-70">';
      html+='         <div class="row p-0 m-0">';
      html+='             <div data-texto="texto" class="editable col-12 fs-5 f-nunito fw-400 color-2E psp-20 mb-2 justify-content-start text-input" contenteditable="true">';
      html+='                 '+this.data.data.texto+'';
      html+='             </div>';
      html+='             <div class="col-12 fs-5 f-nunito fw-200 psp-20 justify-content-start">';
      html+='                 <ul class="msp-20 p-0 arrastar">';   
                                    for(var i=0; i<this.data.opciones.length; i++){
      html+= this.renderOpcion(this.data.opciones[i]);                                
                                     }
      html+='                 </ul>';
      html+='                 <div class="mt-2"><a class="btn_add_item" href="javascript:void(0)">Añadir opción</a></div>'
      html+='             </div>';
      html+='         </div>';
      html+='     </div>';
      html+='</div>';*/

      return  html;
  };

  renderOpcion(opcion){
    return '<li class="color-primary opcion pt-3"><div class="handle"><i class="fas fa-th"></i></div><span class="color-hardDark"><div class="editable li-editable" contenteditable="true" data-docid="'+opcion.doc_id+'">'+opcion.texto+'</div></span><div class="remove-li" data-docid="'+opcion.doc_id+'"><i class="fas fa-trash-alt"></i></div></li>';
  }








  
}



              

                

            