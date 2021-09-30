class Rotulo9 extends Titulo {

  id = 'ro_009';

  data = {
        nombre:'Rótulo 9',
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

    html +='<div class="d-flex w-100 justify-content-center fs-6 fw-700 color-primary f-nunito">';
    html +='  <div data-texto="texto" class="border border-2 border-rounded px-4 rounded-p-5 border-color-lightDark bgc-rotulo-04">'+this.data.data.texto+'</div>';
    html +='</div>';

    return  html;

  }

  renderMenu(){
    let html ='';
    html +='<div class="d-flex w-100 justify-content-center fs-6 fw-700 color-primary f-nunito">';
    html +=' <div class="border border-2 border-rounded px-4 rounded-p-5 border-color-lightDark bgc-rotulo-04">Paso 3</div>';
    html +='</div>';
    return html;
  }


              


}