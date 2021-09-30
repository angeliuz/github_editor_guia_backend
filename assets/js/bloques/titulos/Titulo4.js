class Titulo4 extends Titulo {

  id = 'ti_004';
  data = {
        nombre:'Título lista',
        data:{
                plantilla_id:this.id,
                categoria:0,
                indice:3,
                texto:'Título'
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
    html+='    <div class="row p-0 m-0">';
    html+='      <div class="col-12 fs-5 f-nunito fw-200 psp-20 justify-content-start">';
    html+='        <ul class="msp-20 p-0 bullet-mat">';
    html+='          <li class="color-primary"><span data-texto="texto" class="color-dark text-input" contenteditable="true">'+this.data.data.texto+'</span></li>';
    html+='        </ul>';
    html+='      </div>';
    html+='    </div>';
    html+='  </div>';
    html+='</div>';
    return  html;
  }


}