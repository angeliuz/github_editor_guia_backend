let Render = {
    carpeta_menu:'../assets/images/menu/',
    menu:[
        {
            id:'ti', 
            nombre:'Títulos',
            plantillas:[
            ]

        },
        {
            id:'te', 
            nombre:'Textos',
            plantillas:[
            ]

        },
        {   
            id:'im',
            nombre:'Imagenes',
            plantillas:[
            ]

        },
        {   
            id:'li',
            nombre:'Listas',
            plantillas:[
            ]

        },
        {   
            id:'ro',
            nombre:'Rótulos',
            plantillas:[
            ]

        },
        {
            id:'co',   
            nombre:'Columnas Imágenes',
            plantillas:[
            ]

        },
        {
            id:'ca',   
            nombre:'Cabeceras',
            plantillas:[ 
            ]

        }
    ],
    elementos:{
        container_plantillas:'container-plantillas',
        select_componentes:'select-componentes',
        drag_item:'drag_handler',
        container_items:'items-contenedor',
        sin_imagen:'../assets/images/sin_imagen.jpeg',
        container_menu:'menu-plantillas'
    },
    menuOrden:function(){
        function compare( a, b ) {
          if ( a.orden < b.orden ){
            return -1;
          }
          if ( a.orden > b.orden ){
            return 1;
          }
          return 0;
        }

        return Render.menu.sort( compare );
    },
    renderMenu:function(){

        let div = $('#'+Render.elementos.container_menu);
        let html = '';
        let menu = Render.menu;
        for(let i=0; i<menu.length; i++){ 

            //let option = '<option value="'+Plantilla.categorias[i].indice+'">'+Plantilla.categorias[i].nombre+'</option>';
            let id = 'header_'+i;
            let body_id = 'body_'+i;
            let data = menu[i];
            html +=Render.renderItemMenu(i,id,body_id,data);
            //select.append(option);
        }
        div.append(html);
     
        

    },
    renderItemMenu:function(i,id,body_id,data){
        let html='';
        let show = '';
        if(i==0){
            show = '';
        }
        html+='<div class="accordion-item">';
        html+=Render.renderHeaderMenu(id,body_id,data);
        html+=' <div id="'+body_id+'" class="accordion-collapse collapse '+show+'" aria-labelledby="flush-headingOne" data-bs-parent="#menu-plantillas">';
        html+=   '<div class="accordion-body '+Render.elementos.container_plantillas+'">';
        html+=Render.renderPlantilla(data);
        html+=   '</div>';
        html+=' </div>';
        html+='</div>';
        return html;
    },
    renderHeaderMenu:function(id,body_id,data){
        let html='';
        html+='<h2 class="accordion-header" id="'+id+'">';
        html+='  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#'+body_id+'" aria-expanded="false" aria-controls="'+body_id+'">';
        html+=data.nombre;
        html+='  </button>';
        html+='</h2>';
        return html;
    },
    renderPlantilla:function(data){
       
        let html='';    
        let plantillas = data.plantillas;

        for(let i=0; i<plantillas.length; i++){ 
            let imagen = plantillas[i].imagen;
            if(!imagen){
                imagen = 'titulo_1.png';
            }
            let plantilla = plantillas[i].obj();
            console.log(plantilla.id);
            html+='<div class="item-plantilla" data-plantilla_id="'+plantilla.id+'">';

            html+=   '<img src="'+Render.carpeta_menu+imagen+'" class="rounded mx-auto img-fluid d-block" alt="...">';
            //html+= plantilla.renderMenu();
            html+='</div>';
        }

        return html;
    },

    renderPaginas:function(data){

        let container = $('#wrapper');
        let html = '';
        for (let i=0; i<data.length; i++) {
            html += '<div id="'+data[i].page_id+'" class="sheet">';
            html += '    <div class="row m-0 p-0">';
            html += '        <div class="col-lg-12 m-0 p-0 ">';
            html += '            <div class="hpanel blog-article-box '+data[i].modelo+'">';
            html += Render.renderHeadingPage();
            html += Render.renderBodyPage(data[i]);
            html += Render.renderFooterPage();
            html += '           </div>';
            html += '       </div>';
            html += '      </div>';
            html += '</div>';
        }

        container.append(html);

    },
    renderPagina:function(data){


        let container = $('#wrapper');
        let html = '';
      
        html += '<div id="'+data.page_id+'" class="sheet">';
        html += Render.renderOpcionesPagina();
        html += '    <div class="row m-0 p-0">';
        html += '        <div class="col-lg-12 m-0 p-0 ">';
        html += '            <div class="hpanel blog-article-box '+data.modelo+'">';
        html += Render.renderHeadingPage(data);
        html += Render.renderBodyPage(data);
        html += Render.renderFooterPage();
        html += '           </div>';
        html += '       </div>';
        html += '      </div>';
        html += '</div>';
     

        container.append(html);

    },
    renderOpcionesPagina:function(){
        let html = '';
        html += '<div class="remove_page" title="Eliminar página"><i class="fas fa-minus-circle"></i></div>';
        //html += '<div class="config_page" title="Configurar página"><i class="fas fa-cog"></i></div>';
    
        return html;
    },
    renderLoadingItem:function(){
        return '<div class="loading"><img src="../assets/images/loaders/loader-02.svg"></div>';
    },
    renderLoadingPage:function(){
        let container = $('#wrapper');
        let html = '<div class="sheet loading-page"><img src="../assets/images/loaders/loader-02.svg"></div>';
        container.append(html);
    },
    renderRemoveLoadingPage:function(){
         return '<div class="sheet loading-page"><img src="../assets/images/loaders/loader-02.svg"></div>';
    },
    renderButtonAddPage(){
        let container = $('#nav');
        let html = '<div class="text-center div-add-button-page">';
        html+= '        <button id="add-button-page" type="button" class="btn btn-default btn-circle btn-xl"><i class="fas fa-plus"></i></button>';
        html+= '    </div>';
        container.append(html);
        if(Libro.totalPaginas==0){
          $('#add-button-page').show();  
        }
         
        
    },
    deleteLoadingPage:function(){
        let container = $('#wrapper');
        container.find('.sheet.loading-page').remove();
    },
    renderHeadingPage:function(data){
    let html = '';
    html+='<div class="panel-heading">';
    html+='     <div class="row mx-0 '+data.cabecera+'">';
    html+='         <div class="col d-flex align-items-end">';
    if(Libro.paginasActual==0){
        html+='             <div class="titulo1-deco-image f-livvic fw-500 fs-2 color-white float-start mb-2 ms-5">'+Libro.nombre;
        html+='             </div>';
    }
    html+='         </div>';
    html+='     </div>';
    html+='</div>';
    return html;
    },
    renderBodyPage:function(data){
        
        let html = '';
        html+='<div class="panel-body py-0 px-0">';
        html+='     <div class="flex-container">';
        html+='         <div class="d-flex w-100 align-content-stretch flex-wrap">';
        html+='             <div id="items_'+data.page_id+'" class="items-contenedor" data-pageid="'+data.page_id+'">';
        html+=Render.renderBloques(data);
        html+='             </div>';
        html+='         </div>';
        html+='     </div>';
        html+='</div>';
        return html;
    },
    renderFooterPage:function(page){
        let html = '';
        html+='<div class="panel-footer py-0 px-0">';
        html+='     <div class="d-flex bd-highlight mb-2 align-items-end">';
        html+='         <div class="pb-3 bd-highlight">';
        html+='             <div class="folio1 py-1 px-4 fs-4 fw-bold text-white text-end">1</div>';
        html+='         </div>';
        html+='         <div class="pb-3 bd-highlight">';
        html+='             <div class="p-2 fw-bold fs-6 color-4F">Matemática 4.º básico</div>';
        html+='         </div>';
        html+='         <div class="ms-auto p-0 bd-highlight">';
        html+='             <div class="py-2 pe-3 fw-bold fs-6 color-4F"><img src="../assets/images/logo_sm.png"></div>';
        html+='         </div>';
        html+='     </div>';
        html+='</div>';
        return html;
    },
    renderBloques:function(dataItem){
        let items = dataItem.bloques;
        let html ='';
        for(let i=0; i<items.length; i++){
            
          let doc_id = items[i].doc_id;
          let data = items[i].data
          data.opciones = items[i].opciones 
          data.columnas = items[i].columnas 

          
          let plantilla = Plantilla.getPlantilla(data);
        
          if(!plantilla){
            return '<div>Error</div>';
          }

          let item = '<div id="'+doc_id+'" class="item '+plantilla.clase_padre+' '+plantilla.id+'" data-pageid="'+dataItem.page_id+'" data-docid="'+doc_id+'">'+plantilla.render()+'</div>';
         
          html+=item
        }
        return html;
    }
}