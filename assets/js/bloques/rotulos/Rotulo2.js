class Rotulo2 extends Titulo {

  id = 'ro_002';

  data = {
        nombre:'Rótulo 2',
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

    html +='<div class="d-flex w-100 justify-content-center fs-6 fw-600 f-nunito">';
    html +='  <div data-texto="texto" class="rounded-set-6 px-4 bgc-quinary color-white text-input">'+this.data.data.texto+'</div>';
    html +='</div>';

    return  html;

  }

  renderMenu(){
    let html ='';
    html +='<div class="d-flex w-100 justify-content-center fs-6 fw-600 f-nunito">';
    html +=' <div class="rounded-set-6 px-4 bgc-quinary color-white">Simple</div>';
    html +='</div>';
    return html;
  }



                   
             
              


}