class CargaImagenes  {
  static key = 'im';
  static cargar(datacss){
        let version = datacss.version;
        let css_titulo_padre = datacss.css_titulo_padre;
        let css_listado_padre = datacss.css_listado_padre;
        let css_imagen_padre = datacss.css_imagen_padre;
        let data = [ 
              {
                  css: css_imagen_padre,
                  script: Plantilla.rutaScriptBloques + "imagenes/ImagenSola.js?v=" + version,
                  data: {
                    nombre: "Imagen Sola",
                    imagen: "imagenes/img_1.png",
                    obj: function () {
                      return new ImagenSola();
                    },
                  },
                }, 
              {
                  css: css_imagen_padre,
                  script: Plantilla.rutaScriptBloques + "imagenes/Imagen1.js?v=" + version,
                  data: {
                    nombre: "Imagen1",
                    imagen: "imagenes/img_2.png",
                    obj: function () {
                      return new Imagen1();
                    },
                  },
                },
                {
                  css: css_imagen_padre,
                  script: Plantilla.rutaScriptBloques + "imagenes/Imagen2.js?v=" + version,
                  data: {
                    nombre: "Imagen2",
                    imagen: "imagenes/img_3.png",
                    obj: function () {
                      return new Imagen2();
                    },
                  },
                },
                {
                  css: css_imagen_padre,
                  script: Plantilla.rutaScriptBloques + "imagenes/Imagen3.js?v=" + version,
                  data: {
                    nombre: "Imagen3",
                    imagen: "imagenes/img_4.png",
                    obj: function () {
                      return new Imagen3();
                    },
                  },
                },
                {
                  css: css_imagen_padre,
                  script: Plantilla.rutaScriptBloques + "imagenes/Imagen4.js?v=" + version,
                  data: {
                    nombre: "Imagen4",
                    imagen: "imagenes/img_5.png",
                    obj: function () {
                      return new Imagen4();
                    },
                  },
                },
                {
                  css: css_imagen_padre,
                  script: Plantilla.rutaScriptBloques + "imagenes/Imagen5.js?v=" + version,
                  data: {
                    nombre: "Imagen5",
                    imagen: "imagenes/img_6.png",
                    obj: function () {
                      return new Imagen5();
                    },
                  },
                }
        ];

        return data;
  }
  


}