class Rotulo10 extends Titulo {

  id = 'ro_010';

  data = {
        nombre:'Rótulo 10',
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

    html +='<div class="d-flex w-100 justify-content-center fsp-15 fw-600 color-hardDark text-center f-nunito">';
    html +='  <div data-texto="texto" class="border border-2 border-rounded wp-110 pt-1 pb-1 rounded-p-5 border-color-4 text-input">'+this.data.data.texto+'</div>';
    html +='</div>';

    return  html;

  }

  renderMenu(){
    let html ='';
    html +='<div class="d-flex w-100 justify-content-center fsp-15 fw-600 color-hardDark text-center f-nunito">';
    html +=' <div class="border border-2 border-rounded wp-110 pt-1 pb-1 rounded-p-5 border-color-4">Pato</div>';
    html +='</div>';
    return html;
  }



}