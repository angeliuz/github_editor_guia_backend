class CargaRotulos  {
  static key = 'ro';
  static cargar(datacss){
        let version = datacss.version;
        let css_titulo_padre = datacss.css_titulo_padre;
        let css_listado_padre = datacss.css_listado_padre;
        let css_imagen_padre = datacss.css_imagen_padre;
        let data = [  
              {
                  css: css_titulo_padre,
                  script: Plantilla.rutaScriptBloques + "rotulos/Rotulo1.js?v=" + version,
                  data: {
                    nombre: "Rotulo 1",
                    imagen: "rotulos/01.png",
                    obj: function () {
                      return new Rotulo1();
                    },
                  },
                },
                {
                  css: css_titulo_padre,
                  script: Plantilla.rutaScriptBloques + "rotulos/Rotulo2.js?v=" + version,
                  data: {
                    nombre: "Rotulo 2",
                    imagen: "rotulos/02.png",
                    obj: function () {
                      return new Rotulo2();
                    },
                  },
                },
                {
                  css: css_titulo_padre,
                  script: Plantilla.rutaScriptBloques + "rotulos/Rotulo3.js?v=" + version,
                  data: {
                    nombre: "Rotulo 3",
                    imagen: "rotulos/03.png",
                    obj: function () {
                      return new Rotulo3();
                    },
                  },
                },
                {
                  css: css_titulo_padre,
                  script: Plantilla.rutaScriptBloques + "rotulos/Rotulo4.js?v=" + version,
                  data: {
                    nombre: "Rotulo 4",
                    imagen: "rotulos/04.png",
                    obj: function () {
                      return new Rotulo4();
                    },
                  },
                },
                {
                  css: css_titulo_padre,
                  script: Plantilla.rutaScriptBloques + "rotulos/Rotulo5.js?v=" + version,
                  data: {
                    nombre: "Rotulo 5",
                    imagen: "rotulos/05.png",
                    obj: function () {
                      return new Rotulo5();
                    },
                  },
                },
                {
                  css: css_titulo_padre,
                  script: Plantilla.rutaScriptBloques + "rotulos/Rotulo6.js?v=" + version,
                  data: {
                    nombre: "Rotulo 6",
                    imagen: "rotulos/06.png",
                    obj: function () {
                      return new Rotulo6();
                    },
                  },
                },
                {
                  css: css_titulo_padre,
                  script: Plantilla.rutaScriptBloques + "rotulos/Rotulo7.js?v=" + version,
                  data: {
                    nombre: "Rotulo 7",
                    imagen: "rotulos/07.png",
                    obj: function () {
                      return new Rotulo7();
                    },
                  },
                },
                {
                  css: css_titulo_padre,
                  script: Plantilla.rutaScriptBloques + "rotulos/Rotulo8.js?v=" + version,
                  data: {
                    nombre: "Rotulo 8",
                    imagen: "rotulos/08.png",
                    obj: function () {
                      return new Rotulo8();
                    },
                  },
                },
                {
                  css: css_titulo_padre,
                  script: Plantilla.rutaScriptBloques + "rotulos/Rotulo9.js?v=" + version,
                  data: {
                    nombre: "Rotulo 9",
                    imagen: "rotulos/09.png",
                    obj: function () {
                      return new Rotulo9();
                    },
                  },
                },
                {
                  css: css_titulo_padre,
                  script: Plantilla.rutaScriptBloques + "rotulos/Rotulo10.js?v=" + version,
                  data: {
                    nombre: "Rotulo 10",
                    imagen: "rotulos/10.png",
                    obj: function () {
                      return new Rotulo10();
                    },
                  },
                },
                {
                  css: css_titulo_padre,
                  script: Plantilla.rutaScriptBloques + "rotulos/Rotulo11.js?v=" + version,
                  data: {
                    nombre: "Rotulo 11",
                    imagen: "rotulos/10.png",
                    obj: function () {
                      return new Rotulo11();
                    },
                  },
                }
        ];

        return data;
  }
  


}