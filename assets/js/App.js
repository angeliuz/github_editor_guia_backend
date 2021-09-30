let App = {
    version:'0.0.1',
    highlighterButton:MediumEditor.extensions.button.extend({
            name: 'highlighter',
            tagNames: ['span'],
            contentDefault: '<b>H</b>',
            contentFA: '<i class="fa fa-paint-brush"></i>',
            aria: 'Highlight',
            action: 'highlight',
            init: function () {
                MediumEditor.extensions.button.prototype.init.call(this);
                this.classApplier = rangy.createClassApplier('caja-texto', {
                    elementTagName: 'span',
                    normalize: true
                });
            },

            handleClick: function (event) {
                this.classApplier.toggleSelection();

                // Ensure the editor knows about an html change so watchers are notified
                // ie: <textarea> elements depend on the editableInput event to stay synchronized
                this.base.checkContentChanged();
            },
             isAlreadyApplied: function (node) {
                return node.nodeName.toLowerCase() === 'span';
              },

              isActive: function () {
                return this.button.classList.contains('medium-editor-button-active');
              },

              setInactive: function () {
                this.button.classList.remove('medium-editor-button-active');
              },

              setActive: function () {
                this.button.classList.add('medium-editor-button-active');
              }
    }),
    sizeFontButton:MediumEditor.extensions.button.extend({
            name: 'sizefont',
            tagNames: ['span'],
            contentDefault: '<b>H</b>',
            contentFA: '<i class="fa fa-paint-brush"></i>',
            aria: 'Sizefont',
            action: 'sizefont',
            fontSizes: ['', '10', '15', '20', '25', '30', '35', '40','45','50'],
            init: function () {
                //MediumEditor.extensions.button.prototype.init.call(this);
                this.button = this.document.createElement('button');
                this.button.classList.add('medium-editor-action');
                this.button.innerHTML = '';
                const select = this.document.createElement('select');
                select.className = 'medium-editor-toolbar-customfontsize-select';
                this.button.appendChild(select);
                this.fontSizes.forEach((item) => {
                  const option = this.document.createElement('option');
                  option.innerHTML = item;
                  option.value = item;
                  select.appendChild(option);
                });
                //this.on(select, 'change', event => this.handleFontSizeChange(event));
                this.on(select, 'change', this.handleFontSizeChange.bind(this));
            },

            handleClick: function (event) {
                event.preventDefault();
                event.stopPropagation();
                return false;
                //this.classApplier.toggleSelection();

                // Ensure the editor knows about an html change so watchers are notified
                // ie: <textarea> elements depend on the editableInput event to stay synchronized
                //this.base.checkContentChanged();
            },
            getSelect() {
                console.log($(this.button).parent().parent().parent());
              return this.getButton().querySelector('select.medium-editor-toolbar-customfontsize-select');
            },

            handleFontSizeChange: function(event) {
                  
                
                  let select = this.getSelect()
                  let size = select.options[select.selectedIndex].value;


                  this.classApplier = rangy.createClassApplier('fsp-'+size, {
                    elementTagName: 'span',
                    normalize: true,
                    elementProperties: {
                        style: {
                            fontSize: size
                        }
                    }
                  });
             
                  console.log(this.classApplier);
                  
                  this.classApplier.applyToSelection();
                  this.base.checkContentChanged();
                  /*if (size === '') {
                    this.clearFontSize();
                  } else {
                    this.execAction('fontSize', { value: size });
                  }*/
             },
             isAlreadyApplied: function (node) {
                return node.nodeName.toLowerCase() === 'span';
              },

              isActive: function () {
                return this.button.classList.contains('medium-editor-button-active');
              },

              setInactive: function () {
                this.button.classList.remove('medium-editor-button-active');
              },

              setActive: function () {
                this.button.classList.add('medium-editor-button-active');
              }
    }),
    fontButton:MediumEditor.extensions.form.extend({
          
        name: 'sizefont',
        action: 'sizeFont',
        aria: 'increase/decrease font size',
        contentDefault: '&#xB1;', // ±
        contentFA: '<i class="fa fa-text-height"></i>',
        fontSizes: ['', '1', '2', '3', '4', '5', '6', '7'],

        init: function () {
            
           
            MediumEditor.extensions.form.prototype.init.apply(this, arguments);
            this.getButton().innerHTML = '';
            const select = this.document.createElement('select');
            select.className = 'medium-editor-toolbar-customfontsize-select';
            select.id = 'medium-editor-toolbar-customfontsize-select'+this.getEditorId();
            this.getButton().appendChild(select);
            this.fontSizes.forEach((item) => {
              const option = this.document.createElement('option');
              option.innerHTML = item;
              option.value = item;
              select.appendChild(option);
            });

            this.on(select, 'change', event => this.handleFontSizeChange(event));
             
        },

        // Called when the button the toolbar is clicked
        // Overrides ButtonExtension.handleClick
        handleClick: function (event) {
            event.preventDefault();
            event.stopPropagation();

      
           /* if (!this.isDisplayed()) {
                // Get fontsize of current selection (convert to string since IE returns this as number)
                var fontSize = this.document.queryCommandValue('fontSize') + '';

                this.showForm(fontSize);
            }*/

            return false;
        },

        // Called by medium-editor to append form to the toolbar
        getForm: function () {
            if (!this.form) {
                this.form = this.createForm();
            }
            return this.form;
        },

        // Used by medium-editor when the default toolbar is to be displayed
        isDisplayed: function () {
            return this.getForm().style.display === 'block';
        },

        hideForm: function () {
            this.getForm().style.display = 'none';
            //this.getInput().value = '';
        },

        showForm: function (fontSize) {
            //var input = this.getInput();

          

            this.base.saveSelection();
            //this.hideToolbarDefaultActions();
            this.getForm().style.display = 'block';
            this.setToolbarPosition();

            //input.value = fontSize || '';
            //input.focus();
        },

        // Called by core when tearing down medium-editor (destroy)
        destroy: function () {
            if (!this.form) {
                return false;
            }

            if (this.form.parentNode) {
                this.form.parentNode.removeChild(this.form);
            }

            delete this.form;
        },

        // core methods

        doFormSave: function () {
            this.base.restoreSelection();
            this.base.checkSelection();
        },

        doFormCancel: function () {
            this.base.restoreSelection();
            this.clearFontSize();
            this.base.checkSelection();
        },

        // form creation and event handling
        createForm: function () {
            var doc = this.document,
                form = doc.createElement('div'),
                input = doc.createElement('input'),
                close = doc.createElement('a'),
                save = doc.createElement('a');

            // Font Size Form (div)
            form.className = 'medium-editor-toolbar-form-customfontsize';
            form.id = 'medium-editor-toolbar-form-fontsize-' + this.getEditorId();

            // Handle clicks on the form itself
            this.on(form, 'click', this.handleFormClick.bind(this));

            const select = this.document.createElement('select');
            select.classList.add('medium-editor-form-select');
            select.classList.add('select');
            form.appendChild(select);

            // Add font sizes
            this.fontSizes.forEach((item) => {
              const option = this.document.createElement('option');
              option.innerHTML = item;
              option.value = item;
              select.appendChild(option);
            });

            this.attachToEditables();

           /* this.on(select, 'change', event => this.handleFontSizeChange(event));
            // Add font size slider
            input.setAttribute('type', 'range');
            input.setAttribute('min', '1');
            input.setAttribute('max', '7');
            input.className = 'medium-editor-toolbar-input';
            form.appendChild(input);

            // Handle typing in the textbox
            this.on(input, 'change', this.handleSliderChange.bind(this));

            // Add save buton
            save.setAttribute('href', '#');
            save.className = 'medium-editor-toobar-save';
            save.innerHTML = this.getEditorOption('buttonLabels') === 'fontawesome' ?
                             '<i class="fa fa-check"></i>' :
                             '&#10003;';
            form.appendChild(save);

            // Handle save button clicks (capture)
            this.on(save, 'click', this.handleSaveClick.bind(this), true);

            // Add close button
            close.setAttribute('href', '#');
            close.className = 'medium-editor-toobar-close';
            close.innerHTML = this.getEditorOption('buttonLabels') === 'fontawesome' ?
                              '<i class="fa fa-times"></i>' :
                              '&times;';
            form.appendChild(close);

            // Handle close button clicks
            this.on(close, 'click', this.handleCloseClick.bind(this));*/

            return form;
        },
        attachToEditables() {
          this.subscribe('positionedToolbar', event => this.handlePositionedToolbar(event));
        },

        deattachFromEditables() {
          this.base.unsubscribe('positionedToolbar', event => this.handlePositionedToolbar(event));
        },

        getInput: function () {
            return this.getForm().querySelector('input.medium-editor-toolbar-input');
        },
        getSelect() {
          let select  = this.getButton().querySelector('select.medium-editor-toolbar-customfontsize-select');
          return select;
          //return this.getButton().querySelector('select.medium-editor-toolbar-customfontsize-select');
        },

        clearFontSize: function () {
            MediumEditor.selection.getSelectedElements(this.document).forEach(function (el) {
                if (el.nodeName.toLowerCase() === 'font' && el.hasAttribute('size')) {
                    el.removeAttribute('size');
                }
            });
        },
       
        handlePositionedToolbar(event) {
          // get the current selection when toolbar appear so we can retrieve the font used
          // by this selection
          const fontSize = this.document.queryCommandValue('fontSize') + '';
         
          this.updateSelection(fontSize);
        },
        updateSelection(value) {
            const select = this.getSelect();
            if(!select){
                return;
            }
            select.value = value || '';
        },
        handleFontSizeChange(event) {
          const size = this.getSelect().value;
          if (size === '') {
            this.clearFontSize();
          } else {
            this.execAction('fontSize', { value: size });
          }
        },

        handleSliderChange: function () {
            var size = this.getInput().value;
            if (size === '4') {
                this.clearFontSize();
            } else {
                this.execAction('fontSize', { value: size });
            }
        },

        handleFormClick: function (event) {
            // make sure not to hide form when clicking inside the form
            event.stopPropagation();
        },

        handleSaveClick: function (event) {
            // Clicking Save -> create the font size
            event.preventDefault();
            this.doFormSave();
        },

        handleCloseClick: function (event) {
            // Click Close -> close the form
            event.preventDefault();
            this.doFormCancel();
        }
          

    }),

    ordenarItem:function(div,page_id){

       let currentOrder = 0;
       div.find('.item').each(function() {
          let doc_id = $(this).data("docid");
          let nuevaData = {
            "orden": currentOrder,
          };
          Firestore.updateItem(page_id,doc_id,nuevaData);
          currentOrder++;
       })
    },
    ordenarPaginas:function(){
       let div = $('#wrapper');
       let pagina = 1;
       div.find('.sheet').each(function() {
          let doc_id = $(this)[0].id;
          let nuevaData = {
            "numero": pagina,
          };
          Firestore.updatePagina(doc_id,nuevaData);
          pagina++;
       })
    }
}