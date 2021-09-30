let DragAndDrop = {
    drakeItem:dragula([],{
          moves: function (el, container, handle) {
            /*if(container!==document.getElementById(Render.elementos.container_plantillas)){
              return handle.classList.contains(Render.elementos.drag_item);
            }*/
            if(!container.classList.contains(Render.elementos.container_plantillas)){
              return handle.classList.contains(Render.elementos.drag_item);
            }
            return el;
          },
          copy:  function (el, source) {
            // To copy only elements in left container, the right container can still be sorted
            //return source === document.getElementById(Render.elementos.container_plantillas);
            return source.classList.contains(Render.elementos.container_plantillas);
          },
          accepts: function (el, target) {
            //return target !== document.getElementById(Render.elementos.container_plantillas);
            return !target.classList.contains(Render.elementos.container_plantillas);
          }
    }),
    drakeItemListado:dragula([],{
          moves: function (el, container, handle) {
           return handle.classList.contains('handle');
          }
    }),
    controlarItemListado:function(){
        DragAndDrop.drakeItemListado.on('drop',function(el,target,source,sibling){
                let ul = source;
                let currentOrder = 0;
                $(ul).find('li').each(function() {

                  let doc_id = $(this).parents('.item').data("docid");
                  let page_id = $(this).parents('.item').data("pageid");
                  let doc_op_id = $(this).find('.li-editable').data('docid');
                  let nuevaData = {
                    "orden": currentOrder,
                  };
                  Firestore.updateItemListado(page_id,doc_id,doc_op_id,nuevaData);
                  currentOrder++;
                })
        })
    },
    controlarItem:function(){
        
        DragAndDrop.drakeItem.on('drop',function(el,target,source,sibling){
                
              let div =  target

              if(!div){
                return;
              }

              let page_id = $(div).data('pageid');

              if(source===target&& source!==document.getElementById(Render.elementos.container_plantillas)){
                DragAndDrop.ordenar($(div),page_id);
              }
              else{
                
                let plantilla_id = $(el).data('plantilla_id');
                //let indice = $(el).data('indice');
                //let categoria = $(el).data('categoria');
                let plantilla = null;
                
                try{
                  plantilla = Plantilla.objetos[plantilla_id]();
                }
                catch(err){

                }


                
                /*if(indice==0){
                    plantilla = new PL004();
                }
                else if(indice==1){
                    plantilla = new PL003();
                }
                else if(indice==2){
                    plantilla = new PL001();
                }
                else if(indice==3){
                    plantilla = new PL002();
                }
                else if(indice==4){
                    plantilla = new PL005();
                }
                else{
                    return;
                }*/

                if(plantilla==null){
                    return;
                }

                
                plantilla.add(page_id,$(el),function(){

                    DragAndDrop.ordenar($(div),page_id);

                });

                /* let data = plantilla.data.data;
               let opciones = plantilla.opciones;

                if(opciones){
                    data.opciones = opciones;
                }


                //let html = plantilla.render();
                let item = $(el);

               
              
                item.addClass('item');
                item.removeClass('item-plantilla');
                item.html(Render.renderLoadingItem());

                Firestore.addItem(page_id,data,opciones,function(doc,op){
                    
                    item.attr('data-docid',doc.id);
                    item.attr('data-pageid',page_id);
                    item.removeAttr('data-plantilla_id');
                    item.removeAttr('data-indice');

                    item.html(plantilla.render());

                    console.log(op);

                    /////////Ordenar
                    DragAndDrop.ordenar($(target),page_id);

                    /////////////////////Nuevos listeners
                    //EditorTexto.listenersNuevos(item.get(0),page_id,op);
                    let inputs = item.get(0).getElementsByClassName('text-input');
                    for(let i=0; i<inputs.length; i++){
                      EditorTexto.addListener(inputs[i]);
                    }



                    let inputsListado = item.get(0).getElementsByClassName('li-editable');
                    for(let i=0; i<inputsListado.length; i++){
                      try{
                        $(inputsListado[i]).attr('data-docid',op[i]);
                      }
                      catch(err){

                      }
                      EditorTexto.addListenerListado(inputsListado[i]);
                    }

                    //DragAndDrop.addContainerItemListado(item.get(0),page_id);


                });*/

                
              }
        })
        
    },
    addContainerItem:function(id){
        let container = window.document.getElementById('items_'+id);
        DragAndDrop.drakeItem.containers.push(container);
    },
    addContainerItemListado:function(item,id){
        let opcionesArrastables = document.getElementById('items_'+id).getElementsByClassName("arrastar");
        if(item){
           opcionesArrastables =  item.getElementsByClassName("arrastar");
        }

        for(let i=0; i<opcionesArrastables.length; i++){
            DragAndDrop.drakeItemListado.containers.push(opcionesArrastables[i]);
        }
    },
    init:function(){
        
        //////////////Container plantillas
        let container_plantillas = Render.elementos.container_plantillas;
        let container_plantillas_class = window.document.getElementsByClassName(container_plantillas);
        for(let i=0; i<container_plantillas_class.length; i++){
           DragAndDrop.drakeItem.containers.push(container_plantillas_class[i]);
        }
       

        

        DragAndDrop.controlarItem();
        DragAndDrop.controlarItemListado();

    },
    dragElement:function(elmnt,cb){

      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      let calx;
      let caly
      try{
        let header = $(elmnt).find('.btn_drag_globo')[0];
        if (header) {
          /* if present, the header is where you move the DIV from:*/
          header.onmousedown = dragMouseDown;
        } else {
          /* otherwise, move the DIV from anywhere inside the DIV:*/
          elmnt.onmousedown = dragMouseDown;
        }
      }
      catch(err){
        elmnt.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        
        let x = e.pageX - $(elmnt).offset().left;
        let y = e.pageY - $(elmnt).offset().top;

      
        //get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
 

        
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
    
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
      
       // console.log($(elmnt).offset().top - pos2);
       calx = (elmnt.offsetLeft-pos1);
       caly = (elmnt.offsetTop-pos2);
   
        elmnt.style.left = (calx) + "px";
        elmnt.style.top = (caly) + "px";
      }

      function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
        cb(calx,caly);
      }



    },
    ordenar:function(div,page_id){

       let currentOrder = 0;
       div.find('.item').each(function() {
          let doc_id = $(this).data("docid");
          let nuevaData = {
            "orden": currentOrder,
          };
          Firestore.updateItem(page_id,doc_id,nuevaData);
          currentOrder++;
       })
    }
}