class CargaCabeceras  {
  static key = 'ca';
  static cargar(datacss){
        let version = datacss.version;
        let css_titulo_padre = datacss.css_titulo_padre;
        let css_listado_padre = datacss.css_listado_padre;
        let css_imagen_padre = datacss.css_imagen_padre;
        let data = [  
              {
                css:css_titulo_padre,
                script:Plantilla.rutaScriptBloques+'cabeceras/Cabecera1.js?v='+version,
                data:{
                    nombre:'Cabecera 1',
                    imagen:'titulo_1.png',
                    obj:function(){
                        return new Cabecera1();
                    }
                }
              }
        ];

        return data;
  }
  


}