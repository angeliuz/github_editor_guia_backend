let Plantilla = {
    objetos:{},
    rutaCssBloques:'../assets/css/bloques/',
    rutaScriptBloques:'../assets/js/bloques/',
    _arrScript:{},
    _arrCss:{},
    cargarObjetos:function(cb){
        
        let version = App.version;
        let css_titulo_padre = Plantilla.rutaCssBloques+'padres/titulo_padre_clase.css?v='+version;
        let css_listado_padre = Plantilla.rutaCssBloques+'padres/listado_padre_clase.css?v='+version;
        let css_imagen_padre = Plantilla.rutaCssBloques+'padres/col_imagen_clase.css?v='+version;
        let dataParametros = {
            version:version,
            css_titulo_padre:css_titulo_padre,
            css_listado_padre:css_listado_padre,
            css_imagen_padre:css_imagen_padre
        } 

        let dataPlantillas = [];
        let menus = {};
        for(let i=0; i<Render.menu.length; i++){
             menus[Render.menu[i].id] = Render.menu[i];
             dataPlantillas[Render.menu[i].id] = new Array();
        }
        let totalPlantillas = 0;

        function cargarPadres(cb){
            let contador_css = 0;
            let contador_script = 0;
            let total = 3;
            Plantilla.loadCss(css_titulo_padre,function(){
                contador_css++;
                finalizar();
            });
            Plantilla.loadCss(css_listado_padre,function(){
                contador_css++;
                finalizar();
            })

            Plantilla.loadCss(css_imagen_padre,function(){
                contador_css++;
                finalizar();
            });

            Plantilla.loadScript(Plantilla.rutaScriptBloques+'padres/Titulo.js?v='+version,function(){
                contador_script++;
                finalizar();
            });

            Plantilla.loadScript(Plantilla.rutaScriptBloques+'padres/Listado.js?v='+version,function(){
                contador_script++;
                finalizar();
            });

            Plantilla.loadScript(Plantilla.rutaScriptBloques+'padres/Imagen.js?v='+version,function(){
                contador_script++;
                finalizar();
            });

            function finalizar(){
                if(contador_css==total && contador_script==total){
                    cb();
                    return;
                }
                return;
            }

                              
        }

        function cargarArregloPlantillas(cb){
             let contador_script = 0;
             let total = 7;
             Plantilla.loadScript(Plantilla.rutaScriptBloques+'titulos/CargaTitulos.js?v='+version,function(){
                let data  = CargaTitulos.cargar(dataParametros);
                dataPlantillas[CargaTitulos.key] = data;
                totalPlantillas+= data.length;
                contador_script++;
                finalizar();
             });
             Plantilla.loadScript(Plantilla.rutaScriptBloques+'textos/CargaTextos.js?v='+version,function(){
                let data  = CargaTextos.cargar(dataParametros);
                dataPlantillas[CargaTextos.key] = data;
                totalPlantillas+= data.length;
                contador_script++;
                finalizar();
             })
             Plantilla.loadScript(Plantilla.rutaScriptBloques+'imagenes/CargaImagenes.js?v='+version,function(){
                let data  = CargaImagenes.cargar(dataParametros);
                dataPlantillas[CargaImagenes.key] = data;
                totalPlantillas+= data.length;
                contador_script++;
                finalizar();
             })
             Plantilla.loadScript(Plantilla.rutaScriptBloques+'listados/CargaListados.js?v='+version,function(){
                let data  = CargaListados.cargar(dataParametros);
                dataPlantillas[CargaListados.key] = data;
                totalPlantillas+= data.length;
                contador_script++;
                finalizar();
             })
             Plantilla.loadScript(Plantilla.rutaScriptBloques+'rotulos/CargaRotulos.js?v='+version,function(){

                let data  = CargaRotulos.cargar(dataParametros);
                dataPlantillas[CargaRotulos.key] = data;
                totalPlantillas+= data.length;
                contador_script++;
                finalizar();
             })
             Plantilla.loadScript(Plantilla.rutaScriptBloques+'col_imagenes/CargaColimagenes.js?v='+version,function(){

                let data  = CargaColimagenes.cargar(dataParametros);
                dataPlantillas[CargaColimagenes.key] = data;
                totalPlantillas+= data.length;
                contador_script++;
                finalizar();
             })
             Plantilla.loadScript(Plantilla.rutaScriptBloques+'cabeceras/CargaCabeceras.js?v='+version,function(){

                let data  = CargaCabeceras.cargar(dataParametros);
                dataPlantillas[CargaCabeceras.key] = data;
                totalPlantillas+= data.length;
                contador_script++;
                finalizar();
             })
             function finalizar(){

                if(contador_script==total){

                    cb();
                    return;
                }
                return;
            }
        }

        function cargaFinal(cb){

                let procesados_css = 0;
                let procesados = 0;



                for(let i=0; i<Render.menu.length; i++){

                    let plantillas = dataPlantillas[Render.menu[i].id];


                    for(let c=0; c<plantillas.length; c++){
                        
                        let data = plantillas[c];
                        //console.log(data);
                        Plantilla.loadCss(data.css,function(){
                            procesados_css++;
                            finalizar(cb);
                        });
                        Plantilla.loadScript(data.script,function(){
                            Plantilla.objetos[data.data.obj().id] = data.data.obj;
                            Render.menu[i].plantillas[c] = data.data;
                            procesados++;
                            finalizar(cb);
                        });
                    }

                }

                function finalizar(cb){
                    console.log(procesados);
                    if(procesados==totalPlantillas && procesados_css==totalPlantillas){
                        cb();
                        return;
                    }
                    return;
                }
                


        }

        cargarPadres(function(){

            cargarArregloPlantillas(function(){

                    cargaFinal(function(){
                        cb();
                    })

            });

        })

      

       
        
        

    

    },
    renderDrag:function(){

        //return '<div class="item_handle drag_handler"><i class="fas fa-th"></i></div>'
        return '<div class="drag_handler" title="Arrastrar"><i class="fas fa-th"></i></div><div class="remove_item" title="Eliminar"><i class="fas fa-trash-alt"></i></div>';
        //return '<div class="item_handle drag_handler"><i class="item_handle drag_handler_icon"></i></div>';

    },
    
    getPlantilla:function(data){
       
         let plantilla = null;
                
        try{
          //plantilla = Plantilla.categorias[data.categoria].plantillas[data.indice].obj();

          console.log(Plantilla.objetos);
          plantilla = Plantilla.objetos[data.plantilla_id]();
        }
        catch(err){
          console.log(err)
        }

        if(plantilla==null){
             console.log(data);
            return;
        }

        plantilla.setData(data);
        return plantilla;
    
    },
    loadScript:function(scriptName, callback){

         if (!Plantilla._arrScript[scriptName]) {
          Plantilla._arrScript[scriptName] = true;
          var body    = document.getElementsByTagName('body')[0];
          var script    = document.createElement('script');
          script.type   = 'text/javascript';
          script.src    = scriptName;
          // then bind the event to the callback function
          // there are several events for cross browser compatibility
          // script.onreadystatechange = callback;
          script.onload = callback;
          // fire the loading
          body.appendChild(script);
        } else if (callback) {
          callback();
        }

    },
    loadCss:function(scriptCss, callback){

         if (!Plantilla._arrCss[scriptCss]) {
          Plantilla._arrCss[scriptCss] = true;
          var head    = document.getElementsByTagName('head')[0];
          var css    = document.createElement('link');
          css.rel   = 'stylesheet';
          css.href    = scriptCss;
          // then bind the event to the callback function
          // there are several events for cross browser compatibility
          // script.onreadystatechange = callback;
          css.onload = callback;
          // fire the loading
          head.appendChild(css);
        } else if (callback) {
          callback();
        }

    }
}