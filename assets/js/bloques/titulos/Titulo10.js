class Titulo10 extends Titulo {

  id = 'ti_010';
  data = {
        nombre:'Título 10',
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
    html+='  <div class="d-block w-100">';
    html+='      <div class="row p-0 m-0">';
    html+='          <div class="col fsp-20 f-livvic d-flex justify-content-center">';
    html+='              <span data-texto="texto" class="text-input color-secondary">'+this.data.data.texto+'</span>';
    html+='          </div>';
    html+='      </div>';
    html+='  </div>';
    html+='</div>';
    return  html;
  }


}