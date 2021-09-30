class Titulo5 extends Titulo {

  id = 'ti_005';
  data = {
        nombre:'Título 5',
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
    html+='    <div class="d-block w-100">';
    html+='        <div class="row p-0 m-0">';
    html+='            <div class="col fs-4 f-livvic fw-600 d-flex justify-content-center">';
    html+='                <span data-texto="texto" class="color-hardDark text-input">'+this.data.data.texto+'</span>';
    html+='            </div>';
    html+='        </div>';
    html+='    </div>';
    html+='</div>';
    return  html;
  }


}