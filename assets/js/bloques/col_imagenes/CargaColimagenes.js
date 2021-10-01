class CargaColimagenes  {
  static key = 'co';

  static cargar(datacss){
        let version = datacss.version;
        let css_titulo_padre = datacss.css_titulo_padre;
        let css_listado_padre = datacss.css_listado_padre;
        let css_imagen_padre = datacss.css_imagen_padre;
        let data = [  
              {
                  css: css_imagen_padre,
                  script: Plantilla.rutaScriptBloques + "col_imagenes/Colimagen1.js?v=" + version,
                  data: {
                    nombre: "Col Imagen 1",
                    imagen: "col_imagenes/colimagen_1.png",
                    obj: function () {
                      return new Colimagen1();
                    },
                  },
                },
                {
                  css: css_imagen_padre,
                  script: Plantilla.rutaScriptBloques + "col_imagenes/Colimagen2.js?v=" + version,
                  data: {
                    nombre: "Col Imagen 2",
                    imagen: "col_imagenes/colimagen_2.png",
                    obj: function () {
                      return new Colimagen2();
                    },
                  },
                },
                {
                  css: css_imagen_padre,
                  script: Plantilla.rutaScriptBloques + "col_imagenes/Colimagen3.js?v=" + version,
                  data: {
                    nombre: "Col Imagen 3",
                    imagen: "col_imagenes/colimagen_3.png",
                    obj: function () {
                      return new Colimagen3();
                    },
                  },
                },
                {
                  css: css_imagen_padre,
                  script: Plantilla.rutaScriptBloques + "col_imagenes/Colimagen4.js?v=" + version,
                  data: {
                    nombre: "Col Imagen 4",
                    imagen: "col_imagenes/colimagen_4.png",
                    obj: function () {
                      return new Colimagen4();
                    },
                  },
                },
                {
                  css: css_imagen_padre,
                  script: Plantilla.rutaScriptBloques + "col_imagenes/Colimagen5.js?v=" + version,
                  data: {
                    nombre: "Col Imagen 5",
                    imagen: "col_imagenes/colimagen_5.png",
                    obj: function () {
                      return new Colimagen5();
                    },
                  },
                },
                {
                  css: css_imagen_padre,
                  script: Plantilla.rutaScriptBloques + "col_imagenes/Colimagen6.js?v=" + version,
                  data: {
                    nombre: "Col Imagen 6",
                    imagen: "col_imagenes/colimagen_6.png",
                    obj: function () {
                      return new Colimagen6();
                    },
                  },
                },
                {
                  css: css_imagen_padre,
                  script: Plantilla.rutaScriptBloques + "col_imagenes/Colimagen7.js?v=" + version,
                  data: {
                    nombre: "Col Imagen 7",
                    imagen: "col_imagenes/colimagen_7.png",
                    obj: function () {
                      return new Colimagen7();
                    },
                  },
                },
                {
                  css: css_imagen_padre,
                  script: Plantilla.rutaScriptBloques + "col_imagenes/Colimagen8.js?v=" + version,
                  data: {
                    nombre: "Col Imagen 8",
                    imagen: "col_imagenes/colimagen_8.png",
                    obj: function () {
                      return new Colimagen8();
                    },
                  },
                },
                {
                  css: css_imagen_padre,
                  script: Plantilla.rutaScriptBloques + "col_imagenes/Colimagen9.js?v=" + version,
                  data: {
                    nombre: "Col Imagen 9",
                    imagen: "col_imagenes/colimagen_9.png",
                    obj: function () {
                      return new Colimagen9();
                    },
                  },
                }
        ];

        return data;
  }
  


}