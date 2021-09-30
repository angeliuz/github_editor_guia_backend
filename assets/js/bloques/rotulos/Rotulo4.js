class Rotulo4 extends Titulo {

  id = 'ro_004';

  data = {
        nombre:'Rótulo 4',
        data:{
                plantilla_id:this.id,
                categoria:0,
                indice:1,
                texto:'Rótulo',
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

    html +='<div class="d-flex w-100 justify-content-center fs-6 fw-700 f-nunito">';
    html +='  <div data-texto="texto" class="rounded-3 px-2 bgc-cuaternary color-hardDark ptp-5 pbp-5 text-input">'+this.data.data.texto+'</div>';
    html +='</div>';

    return  html;

  }

  renderMenu(){
    let html ='';
    html +='<div class="d-flex w-100 justify-content-center fs-6 fw-700 f-nunito">';
    html +=' <div class="rounded-3 px-2 bgc-cuaternary color-hardDark ptp-5 pbp-5">Simple</div>';
    html +='</div>';
    return html;
  }


                   
             
              


}