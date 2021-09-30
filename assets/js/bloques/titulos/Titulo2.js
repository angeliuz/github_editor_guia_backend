class Titulo2 extends Titulo {

  id = 'ti_002';

  data = {
        nombre:'Título con clase',
        data:{
                plantilla_id:this.id,
                categoria:0,
                indice:1,
                texto_1:'Clase 1:',
                texto_2:'Título',
        }
  };
  static getId(){
    return this.id;
  }
  constructor (){
    super();
  
  };

  setData(data){

    this.data.data.texto_1 = data.texto_1;
    this.data.data.texto_2 = data.texto_2;

  };
 
 
  render(){
    let html = Plantilla.renderDrag();
    html+='<div class="p-0 w-100">';
    html+='     <div class="d-block w-100">';
    html+='       <div class="row p-0 m-0">';
    html+='         <div  class="col fs-2 f-livvic fw-600 d-flex justify-content-center" >';
    html+='           <span data-texto="texto_1" class="color-secondary text-input">'+this.data.data.texto_1+'</span>&nbsp;<span data-texto="texto_2" contenteditable="true" class="color-dark text-input">'+this.data.data.texto_2+'</span>';
    html+='         </div>';
    html+='       </div>';
    html+='     </div>';
    html+='</div>';
    return  html;

  }

  renderMenu(){
    let html = '';
    html+='<div class="p-0 w-100">';
    html+='     <div class="d-block w-100">';
    html+='       <div class="row p-0 m-0">';
    html+='         <div  class="col fs-2 f-livvic fw-600 d-flex justify-content-center" >';
    html+='           <span class="color-secondary">'+this.data.data.texto_1+'</span>&nbsp;<span class="color-dark text-input">'+this.data.data.texto_2+'</span>';
    html+='         </div>';
    html+='       </div>';
    html+='     </div>';
    html+='</div>';
    return  html;

  }



             
              


}