class Rotulo3 extends Titulo {

  id = 'ro_003';

  data = {
        nombre:'Rótulo 3',
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

    html +='<div class="d-flex w-100 justify-content-center fs-6 fw-600 text-center f-nunito">';
    html +='  <div data-texto="texto" class="rounded-set-6 wp-110 pt-1 pb-1 bgc-rotulo-01 color-white text-input">'+this.data.data.texto+'</div>';
    html +='</div>';

    return  html;

  }

  renderMenu(){
    let html ='';
    html +='<div class="d-flex w-100 justify-content-center fs-6 fw-600 text-center f-nunito">';
    html +=' <div class="rounded-set-6 wp-110 pt-1 pb-1 bgc-rotulo-01 color-white">Simple</div>';
    html +='</div>';
    return html;
  }


                   
             
              


}