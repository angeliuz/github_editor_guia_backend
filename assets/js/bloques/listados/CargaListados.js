class CargaListados  {
  static key = 'li';
  static cargar(datacss){
        let version = datacss.version;
        let css_titulo_padre = datacss.css_titulo_padre;
        let css_listado_padre = datacss.css_listado_padre;
        let css_imagen_padre = datacss.css_imagen_padre;
        let data = [  
              {
                  css: css_listado_padre,
                  script: Plantilla.rutaScriptBloques + "listados/Listado1.js?v=" + version,
                  data: {
                    nombre: "listado 1",
                    imagen: "listados/lista001.png",
                    obj: function () {
                      return new Listado1();
                    },
                  },
                },
                {
                  css: Plantilla.rutaCssBloques + "listados/li_002.css?v=" + version,
                  script: Plantilla.rutaScriptBloques + "listados/Listado2.js?v=" + version,
                  data: {
                    nombre: "listado 2",
                    imagen: "listados/lista002.png",
                    obj: function () {
                      return new Listado2();
                    },
                  },
                },
                {
                  css: css_listado_padre,
                  script: Plantilla.rutaScriptBloques + "listados/Listado3.js?v=" + version,
                  data: {
                    nombre: "listado 3",
                    imagen: "listados/lista003.png",
                    obj: function () {
                      return new Listado3();
                    },
                  },
                },
                {
                  css: css_listado_padre,
                  script: Plantilla.rutaScriptBloques + "listados/Listado4.js?v=" + version,
                  data: {
                    nombre: "listado 4",
                    imagen: "listados/lista004.png",
                    obj: function () {
                      return new Listado4();
                    },
                  },
                },
                {
                  css: css_listado_padre,
                  script: Plantilla.rutaScriptBloques + "listados/Listado5.js?v=" + version,
                  data: {
                    nombre: "listado 5",
                    imagen: "listados/lista005.png",
                    obj: function () {
                      return new Listado5();
                    },
                  },
                },
                {
                  css: css_listado_padre,
                  script: Plantilla.rutaScriptBloques + "listados/Listado6.js?v=" + version,
                  data: {
                    nombre: "listado 6",
                    imagen: "listados/lista006.png",
                    obj: function () {
                      return new Listado6();
                    },
                  },
                },
                {
                  css: css_listado_padre,
                  script: Plantilla.rutaScriptBloques + "listados/Listado7.js?v=" + version,
                  data: {
                    nombre: "listado 7",
                    imagen: "listados/lista007.png",
                    obj: function () {
                      return new Listado7();
                    },
                  },
                },
                {
                  css: css_listado_padre,
                  script: Plantilla.rutaScriptBloques + "listados/Listado8.js?v=" + version,
                  data: {
                    nombre: "listado 8",
                    imagen: "listados/lista008.png",
                    obj: function () {
                      return new Listado8();
                    },
                  },
                },
                {
                  css: css_listado_padre,
                  script: Plantilla.rutaScriptBloques + "listados/Listado9.js?v=" + version,
                  data: {
                    nombre: "listado 9",
                    imagen: "listados/lista009.png",
                    obj: function () {
                      return new Listado9();
                    },
                  },
                },

                {
                  css: css_listado_padre,
                  script: Plantilla.rutaScriptBloques + "listados/Listado10.js?v=" + version,
                  data: {
                    nombre: "listado 10",
                    imagen: "listados/lista010.png",
                    obj: function () {
                      return new Listado10();
                    },
                  },
                },

                {
                  css: Plantilla.rutaCssBloques + "listados/li_011.css?v=" + version,
                  script: Plantilla.rutaScriptBloques + "listados/Listado11.js?v=" + version,
                  data: {
                    nombre: "listado 11",
                    imagen: "listados/lista011.png",
                    obj: function () {
                      return new Listado11();
                    },
                  },
                },
                {
                  css: css_listado_padre,
                  script: Plantilla.rutaScriptBloques + "listados/Listado12.js?v=" + version,
                  data: {
                    nombre: "listado 12",
                    imagen: "listados/lista012.png",
                    obj: function () {
                      return new Listado12();
                    },
                  },
                },
                {
                  css: Plantilla.rutaCssBloques + "listados/li_013.css?v=" + version,
                  script: Plantilla.rutaScriptBloques + "listados/Listado13.js?v=" + version,
                  data: {
                    nombre: "listado 13",
                    imagen: "listados/lista013.png",
                    obj: function () {
                      return new Listado13();
                    },
                  },
                }
        ];

        return data;
  }
  


}