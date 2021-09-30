let EditorTexto = {
    config:function(){

     return optionsEditor =  {
              toolbar: {
                      //buttons: ['bold', 'italic', 'underline','strikethrough','justifyLeft','justifyRight','justifyCenter','justifyFull','removeFormat'],
                      //buttons: ['bold', 'italic', 'underline','strikethrough','justifyRight','removeFormat','companysizes'],
                      buttons: ['bold', 'italic', 'underline', 'sizefont','textcolor','justifyLeft','justifyCenter','justifyRight','unorderedlist','removeFormat'],
                      allowMultiParagraphSelection: true,
                      //static:true,
                      //updateOnEmptySelection:true
              },
              buttonLabels: 'fontawesome',
              extensions: {
                  'highlighter': new App.highlighterButton(),
                  'sizefont': new App.fontButton(),
                  'colorPicker': mediumtextcolor.createInstance({
                    contentFA: '<i class="fas fa-eye-dropper"></i>'
                  })
                  /*'customHtml': new CustomHtml({
                      buttonText: "<hr>"
                    , htmlToInsert: "<hr class='someclass'>"
                  })*/
              },
              placeholder: {
                text: '',
                hideOnClick: false
              }
          }
          
         
         

        
    
          

    }
    
   
  
}