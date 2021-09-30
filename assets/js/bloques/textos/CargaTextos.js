class CargaTextos  {
  static key = 'te';
  static cargar(datacss){
        let version = datacss.version;
        let css_titulo_padre = datacss.css_titulo_padre;
        let css_listado_padre = datacss.css_listado_padre;
        let css_imagen_padre = datacss.css_imagen_padre;
        let data = [  
              {
                css: css_titulo_padre,
                script: Plantilla.rutaScriptBloques + "textos/Texto1.js?v=" + version,
                data: {
                  nombre: "Texto1",
                  imagen: "textos/img_001.png",
                  obj: function () {
                    return new Texto1();
                  },
                },
              },
              {
                css: css_titulo_padre,
                script: Plantilla.rutaScriptBloques + "textos/Texto2.js?v=" + version,
                data: {
                  nombre: "Texto2",
                  imagen: "textos/img_002.png",
                  obj: function () {
                    return new Texto2();
                  },
                },
              }
        ];

        return data;
  }
  


}