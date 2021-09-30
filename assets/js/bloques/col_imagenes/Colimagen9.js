class Colimagen9 extends Imagen {
  
  id = 'ci_009';
  border = '';
  data = {
        nombre:'Dos columnas borde gris rotulo',
        data:{
           plantilla_id:this.id,
           categoria:2,
           indice:1,
        },
        columnas:[
                {   
                    titulo:'Texto', 
                    porcentaje:'60',  
                    ruta:Render.elementos.sin_imagen,
                    orden:0,
                    is_texto:'',
                    alineacion:this.alignToImage[1]
                },
                {   
                    titulo:'', 
                    porcentaje:'60',  
                    ruta:Render.elementos.sin_imagen,
                    orden:1,
                    is_texto:'',
                    alineacion:this.alignToImage[1]
                }
        ]
  };
  static getId(){
    return this.id;
  }
  constructor (){
    super();
  };

  firestoreSave(cb){
    let parent = this
    this.bloques_db.add(this.data.data).then((doc) =>{
      let doc_item = doc;
      parent.bloque.attr('id',doc.id)
      parent.bloque.addClass(parent.clase_padre);
      parent.bloque.addClass(parent.id);
      parent.bloque_id = doc.id;
      parent.columnas_db = parent.bloques_db.doc(doc.id).collection('columnas');
      let cols = [];

      parent.columnas_db.add(this.data.columnas[0]).then((col)=>{
        parent.data.columnas[0].doc_id = col.id
          parent.columnas_db.add(this.data.columnas[1]).then((col)=>{
            parent.data.columnas[1].doc_id = col.id
            
                      cb(doc_item,[]);
              
          });
        });
      
             
      
      });
  }



  renderColumna(data,i){

    let border = '';
    
    if(i!=this.data.columnas.length-1 && i!=-1){
      border = this.border;
    }

    let html = '';
    html+='          <div data-docid="'+data.doc_id+'" class="col f-nunito fw-400 color-hardDark mbp-30 d-flex justify-content-center '+border+' col-img">';
    html+='            <div class="row p-0 m-0" style="position:relative;">';
    html+=this.renderDelete();
    html+='              <div class="col-12 p-0 m-0">';
    html+='              </div>';
    html+='              <div class="col-12 p-2 m-0">';
    html+='                 <div class="d-block border border-2 rounded-p-10 border-color-lightDark">'
    html+='                   <div class="d-flex align-content-stretch flex-wrap w-100">'
    html+='                     <div class="d-flex p-2 mtp-3 w-100 '+data.alineacion+' mhp-150" style="position:relative;">';
    html+=this.renderLoading()
    html+=this.renderNav(data);
    html+=this.renderForm()
    html+='                         <img src="'+data.ruta+'" class="img-columna" width="'+data.porcentaje+'%">';
    html+='                     </div>';
    html+='                   <div data-texto="texto" class="d-flex pt-2 pb-1 mb-3 ms-10 w-80 justify-content-center border-bottom border-secondary fs-6 text-input">'+data.titulo+'</div>'
    html+='              </div>';
    html+='              </div>';
    html+='              </div>';
    html+='            </div>';
    html+='          </div>';

    return html;

  }

 

  render(){
    let html = Plantilla.renderDrag();

    html+='<div class="p-0 w-100">';
    html+='  <div class="d-block msp-100 mep-50">';
    html+='    <div class="row p-0 m-0 row-column" style="position:relative;">';
    html+=this.renderAdd();
    for(let i=0; i<this.data.columnas.length; i++){

        html+= this.renderColumna(this.data.columnas[i],i);    
    }

    


    html+='    </div>';
    html+='  </div>';
    html+='</div>';

    return  html;

  }





  
}