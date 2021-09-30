class Texto2 extends Titulo {

  id = 'te_002';

  data = {
        nombre:'Título con clase',
        data:{
                plantilla_id:this.id,
                categoria:0,
                indice:1,
                texto:'Muy lejos, más allá de las montañas de palabras, alejados de los países de las vocales y las consonantes, viven los textos simulados. Viven aislados en casas de letras, en la costa de la semántica, un gran océano de lenguas.',
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
    html+='<div class="msp-70 mep-20 d-flex justify-start f-nunito fsp-16 fw-300 color-2E">';
    html+='  <div data-texto="texto" class="px-4 text-input">'+this.data.data.texto+'</div>';
    html+='</div>';
    return  html;

  }

             
              


}