class Rotulo5 extends Titulo {

  id = 'ro_005';

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

    html +='<div class="d-flex w-100 justify-content-center fs-6 fw-700 text-center f-nunito">';
    html +='  <div data-texto="texto" class="rounded-3 wp-110 pt-1 pb-1 bgc-secondary color-hardDark text-input">'+this.data.data.texto+'</div>';
    html +='</div>';

    return  html;

  }

  renderMenu(){
    let html ='';
    html +='<div class="d-flex w-100 justify-content-center fs-6 fw-700 text-center f-nunito">';
    html +=' <div class="rounded-3 wp-110 pt-1 pb-1 bgc-secondary color-hardDark">Simple</div>';
    html +='</div>';
    return html;
  }


                   
             
              


}