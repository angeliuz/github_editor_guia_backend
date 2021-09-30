class Titulo3 extends Titulo {

  id = 'ti_003';

  data = {
        nombre:'Título bullet pregunta',
        data:{
                plantilla_id:this.id,
                categoria:0,
                indice:2,
                texto_1:'1',
                texto_2:'¿Pregunta?',
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
    html+='  <div class="d-block msp-70">';
    html+='    <div class="row p-0 m-0">';
    html+='      <div class="col-12 fs-5 f-nunito fw-400 color-dark psp-20 mb-2 d-flex justify-content-start">';
    html+='        <div class="d-flex w-100">';
    html+='          <div class="p-2">';
    html+='           <div data-texto="texto_1" class="bgc-primary rounded-circle text-center color-white fw-700 bullet-30 text-input">'+this.data.data.texto_1+'</div>';
    html+='          </div>';
    html+='          <div data-texto="texto_2" class="p-2 flex-grow-1 text-input">'+this.data.data.texto_2+'</div>';
    html+='        </div>';
    html+='      </div>';
    html+='    </div>';
    html+='  </div>';
    html+='</div>';
    return  html;
  }

  renderMenu(){
    let html = '';
    html+='<div class="p-0 w-100">';
    html+='  <div class="d-block">';
    html+='    <div class="row p-0 m-0">';
    html+='      <div class="col-12 fs-5 f-nunito fw-400 color-dark psp-20 mb-2 d-flex justify-content-start">';
    html+='        <div class="d-flex w-100">';
    html+='          <div class="p-2">';
    html+='           <div  class="bgc-primary rounded-circle text-center color-white fw-700 bullet-30 ">'+this.data.data.texto_1+'</div>';
    html+='          </div>';
    html+='          <div  class="p-2 flex-grow-1">'+this.data.data.texto_2+'</div>';
    html+='        </div>';
    html+='      </div>';
    html+='    </div>';
    html+='  </div>';
    html+='</div>';
    return  html;
  }



              


}