class CargaTitulos  {
  static key = 'ti';
  static cargar(datacss){
        let version = datacss.version;
        let css_titulo_padre = datacss.css_titulo_padre;
        let css_listado_padre = datacss.css_listado_padre;
        let css_imagen_padre = datacss.css_imagen_padre;
        let data = [  
            {
              css: css_titulo_padre,
              script: Plantilla.rutaScriptBloques + "titulos/Titulo1.js?v=" + version,
              data: {
                nombre: "Título 1",
                imagen: "titulos/img_001.png",
                obj: function () {
                  return new Titulo1();
                },
              },
            },
            
            {
              css: css_titulo_padre,
              script: Plantilla.rutaScriptBloques + "titulos/Titulo3.js?v=" + version,
              data: {
                nombre: "Título 3",
                imagen: "titulos/img_003.png",
                obj: function () {
                  return new Titulo3();
                },
              },
            },
            {
              css: css_titulo_padre,
              script: Plantilla.rutaScriptBloques + "titulos/Titulo2.js?v=" + version,
              data: {
                nombre: "Título 2",
                imagen: "titulos/img_002.png",
                obj: function () {
                  return new Titulo2();
                },
              },
            },
            {
              css: css_titulo_padre,
              script: Plantilla.rutaScriptBloques + "titulos/Titulo4.js?v=" + version,
              data: {
                nombre: "Título 4",
                imagen: "titulos/img_001.png",
                obj: function () {
                  return new Titulo4();
                },
              },
            },
            // {
            //   css: css_titulo_padre,
            //   script: Plantilla.rutaScriptBloques + "titulos/Titulo12.js?v=" + version,
            //   menu: menus[CargaTitulos.key],
            //   data: {
            //     nombre: "Título 12",
            //     imagen: "titulos/img_012.png",
            //     obj: function () {
            //       return new Titulo12();
            //     },
            //   },
            // },
            {
              css: css_titulo_padre,
              script: Plantilla.rutaScriptBloques + "titulos/Titulo5.js?v=" + version,
              data: {
                nombre: "Título 5",
                imagen: "titulos/img_005.png",
                obj: function () {
                  return new Titulo5();
                },
              },
            },
            {
              css: css_titulo_padre,
              script: Plantilla.rutaScriptBloques + "titulos/Titulo6.js?v=" + version,
              data: {
                nombre: "Título 6",
                imagen: "titulos/img_006.png",
                obj: function () {
                  return new Titulo6();
                },
              },
            },
            {
              css: css_titulo_padre,
              script: Plantilla.rutaScriptBloques + "titulos/Titulo7.js?v=" + version,
              data: {
                nombre: "Título 7",
                imagen: "titulos/img_007.png",
                obj: function () {
                  return new Titulo7();
                },
              },
            },
            {
              css: css_titulo_padre,
              script: Plantilla.rutaScriptBloques + "titulos/Titulo8.js?v=" + version,
              data: {
                nombre: "Título 8",
                imagen: "titulos/img_008.png",
                obj: function () {
                  return new Titulo8();
                },
              },
            },
            {
              css: css_titulo_padre,
              script: Plantilla.rutaScriptBloques + "titulos/Titulo9.js?v=" + version,
              data: {
                nombre: "Título 9",
                imagen: "titulos/img_009.png",
                obj: function () {
                  return new Titulo9();
                },
              },
            },
            {
              css: css_titulo_padre,
              script: Plantilla.rutaScriptBloques + "titulos/Titulo10.js?v=" + version,
              data: {
                nombre: "Título 10",
                imagen: "titulos/img_010.png",
                obj: function () {
                  return new Titulo10();
                },
              },
            },
            {
              css: css_titulo_padre,
              script: Plantilla.rutaScriptBloques + "titulos/Titulo11.js?v=" + version,
              data: {
                nombre: "Título 11",
                imagen: "titulos/img_011.png",
                obj: function () {
                  return new Titulo11();
                },
              },
            }
        ];

        return data;
  }
  


}