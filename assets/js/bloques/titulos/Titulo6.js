class Titulo6 extends Titulo {

  id = 'ti_006';
  data = {
        nombre:'Título 6',
        data:{
                plantilla_id:this.id,
                categoria:0,
                indice:3,
                texto_1:'Título',
                texto_2:'Subtítulo',
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
    html+='  <div class="d-block w-100">';
    html+='      <div class="row p-0 m-0">';
    html+='          <div data-texto="texto_1" class="text-input color-info col fs-3 f-livvic fw-600 text-center">';
    html+=this.data.data.texto_1;
    html+='          </div>';
    html+='          <span data-texto="texto_2" class="text-input d-block fs-5 f-livvic color-dark text-center">'+this.data.data.texto_2+' </span>';
    html+='      </div>';
    html+='  </div>';
    html+='</div>';
    return  html;
  }


}