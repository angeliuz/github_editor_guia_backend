class Titulo7 extends Titulo {

  id = 'ti_007';
  data = {
        nombre:'Título 7',
        data:{
                plantilla_id:this.id,
                categoria:0,
                indice:3,
                texto:'Título',
        }
  };
  static getId(){
    return this.id;
  }
  constructor (){
    super();
  
  };
  setData(data){

    this.data.data.texto = data.texto;

  };
 
 
  render(){
    let html = Plantilla.renderDrag();
    html+='<div class="p-0 w-100">';
    html+='  <div class="d-block msp-100">';
    html+='    <div data-texto="texto" class="text-input border-bottom  d-inline-flex fs-6 f-nunito fw-700 border-bottom color-info">';
    html+=this.data.data.texto;
    html+='    </div>';
    html+='  </div>';
    html+='</div>';


    return  html;
  }


}