let Evento = {
  
    init:function(){
      $(document).on('change', '#'+Render.elementos.select_componentes,  function(){

          let value = $(this).val();
          if(!value){
            return;
          }

          Plantilla.renderPlantillas(value);


      });
      
      $(document).on('click', '.remove_item',  function(){

          let item = $(this).parent();
      

          let contenedor = item.parent();
          let doc_id = item.data("docid");
          let page_id = item.parents('.sheet')[0].id;
          item.html(Render.renderLoadingItem());

        Firestore.deleteItem(page_id,doc_id,function(doc){
            item.remove();
            DragAndDrop.ordenar(contenedor,page_id);

          });
      });
      $(document).on('click', '.remove_page',  function(){

          let page = $(this).parent();
          let page_id = page[0].id;
          page.html(Render.renderRemoveLoadingPage());
          Firestore.deletePagina(page_id,function(doc){
            page.remove();
            App.ordenarPaginas();
            Libro.paginasActuales = Libro.paginasActuales-1;

          });
          /*Firestore.deleteItem(page_id,doc_id,function(doc){
            item.remove();
            DragAndDrop.ordenar(contenedor,page_id);

          });*/
      });
      $(document).on('click', '.config_page',  function(){

          let page = $(this).parent();
          let page_id = page[0].id;
          Libro.paginaSeleccionadaId = page_id;
          $('#sidebar-config').toggleClass('mostrar');
          
          /*Firestore.deleteItem(page_id,doc_id,function(doc){
            item.remove();
            DragAndDrop.ordenar(contenedor,page_id);

          });*/
      });

      $(document).on('click', '.btn_modelo_pagina',  function(){

          if(!Libro.paginaSeleccionadaId){
            return;
          }
          let pagina = $('#'+Libro.paginaSeleccionadaId);

          let panel = pagina.find('.hpanel');
          panel.removeClass('fondo-page1');
          panel.removeClass('fondo-page2');
          panel.removeClass('fondo-page3');
          let modelo = $(this).data('clase');
          panel.addClass(modelo);
          //$('#sidebar-config').toggleClass('mostrar');
          
      });

      $(document).on('click', '#boton_componentes',  function(){
          let body = $('body')
          let sidebar = $('#sidebar');
          sidebar.toggleClass('slide-out');
          body.toggleClass('slide-out');
          
          
      });
      $(document).on('click', '#btn_cerrar_sidebar',  function(){

          let sidebar = $('#sidebar');
          let body = $('body')
          sidebar.toggleClass('slide-out');
          body.toggleClass('slide-out');

          
          
      });

      $(window).scroll(function() {
        
          if($(window).scrollTop() == $(document).height() - $(window).height()) {
                 // ajax call get data from server and append to the div
                 //alert('Hola');
                 if(Libro.paginasActual>=Libro.totalPaginas){
                  $('#add-button-page').show();
                  return;
                 }
                 Firestore.loadPagina(Libro.paginasActual,function(){

                 });
          }
      });
      

      
      

     $(document).on('mouseover', '.drag_handler',  function(){
       console.log('mouseover')
       let parent = $(this).parent();
       parent.append('<div class="over"></div>');
     });

     $(document).on('mouseout', '.drag_handler',  function(){
        let parent = $(this).parent();
        parent.find('.over').remove();
     });

     $(document).on('mouseover', '.remove_item',  function(){
       console.log('mouseover')
       let parent = $(this).parent();
       parent.append('<div class="over remove"></div>');
     });

     $(document).on('mouseout', '.remove_item',  function(){
        let parent = $(this).parent();
        parent.find('.over').remove();
     });

     $(document).on('click', '#add-button-page',  function(){
       
          Render.renderLoadingPage();



          let numero = Libro.paginasActual+1;
     
          let modelo = 'fondo-page1';
          let cabecera = 'hp-80';
          if(numero>1){
            modelo = 'fondo-page3';
            cabecera = 'hp-60';
          }

          let data = {
            numero:numero,
            modelo:modelo,
            cabecera:cabecera
          };
          Firestore.addPagina(data,function(doc){
              let dataRender = {
                page_id:doc.id,
                numero:numero,
                modelo:modelo,
                cabecera:cabecera,
                bloques:[]
              }
              Libro.paginasActuales = numero;
              Firestore.pages_data.push(dataRender);
              console.log(Firestore.pages_data);
              Render.deleteLoadingPage();
              Render.renderPagina(dataRender);

              let pagina = document.getElementById(doc.id);

              pagina.scrollIntoView();

            


          



              DragAndDrop.addContainerItem(doc.id);

          });
     });

    },
    eventosPagina:function(id){

        let container = window.document.getElementById('items_'+id);

        for(let i=0; i<Render.menu.length; i++){   
          let plantillas = Render.menu[i].plantillas;
          for(let c=0; c<plantillas.length; c++){ 

              let plantilla = plantillas[c].obj();
              let find = container.getElementsByClassName(plantilla.id);
              if(find){
                  for(let j=0; j<find.length; j++){
                      let pl = plantillas[c].obj();
                      pl.activar(id,$(find[j]));
                  }
              }
              else{
                find = null;
              }
          }
           
        }

        /*let findPl001 = container.getElementsByClassName("pl_001");
        for(let i=0; i<findPl001.length; i++){
            let pl = new PL001();
            pl.activar(id,$(findPl001[i]));
        }

        let findPl002 = container.getElementsByClassName("pl_002");
        for(let i=0; i<findPl002.length; i++){
            let pl = new PL002();
            pl.activar(id,$(findPl002[i]));
        }

        let findPl004 = container.getElementsByClassName("pl_004");
        for(let i=0; i<findPl004.length; i++){
            let pl = new PL004();
            pl.activar(id,$(findPl004[i]));
        }
        let findPl003 = container.getElementsByClassName("pl_003");
        
        for(let i=0; i<findPl003.length; i++){
            let pl = new PL003();
            pl.activar(id,$(findPl003[i]));
        }

        let findPl005 = container.getElementsByClassName("pl_005");
        for(let i=0; i<findPl005.length; i++){
            let pl = new PL005();
            pl.activar(id,$(findPl005[i]));
        }*/


    }
}