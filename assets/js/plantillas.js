let plantillas = [

	{
		indice:0,
		nombre:'Nombre,curso,fecha',
		data:{
			plantilla_id:'pl_001',
			texto_1:'Nombre:',
			texto_2:'Fecha:',
			texto_3:'Curso:',
		}
	},
	{
		indice:1,
		nombre:'Título',
		data:{
			plantilla_id:'pl_002',
			texto:'Título'
		}
	},
	{
		indice:2,
		nombre:'Imagen',
		data:{
			plantilla_id:'pl_003',
			ruta:'page_ficha/img1.svg'
		}
	}

];


function renderPlantillas(){
	let contenedor = $('#container-plantillas');
	let html='';

	for(let i=0; i<plantillas.length; i++){	
		let plantilla_id = plantillas[i].plantilla_id;
		html+='<div class="item-plantilla" data-plantilla_id="'+plantilla_id+'" data-indice="'+plantillas[i].indice+'">';

	
		html += '<div class="d-flex justify-content-center">'+plantillas[i].nombre+'</div>';
		html+='</div>';
	}

	contenedor.html(html);
}


function renderDrag(){

	//return '<div class="item_handle drag_handler"><i class="fas fa-th"></i></div>'
	return '<div class="drag_handler" title="Arrastrar"><i class="fas fa-th"></i></div><div class="remove_item" title="Eliminar"><i class="fas fa-trash-alt"></i></div>';
	//return '<div class="item_handle drag_handler"><i class="item_handle drag_handler_icon"></i></div>';

}

function renderLoadingItem(){
	return '<div class="loading"><img src="../assets/images/loaders/loader-02.svg"></div>';
}
function renderLoadingPage(){
	return '<div class="loading-page"><img src="../assets/images/loaders/loader-02.svg"></div>';
}
function renderPlantilla1(texto_1,texto_2,texto_3){

let id = 'pl_001';


let html = renderDrag();
html+='<div class="p-2 w-100">';
html+='     <div class="w-100 ps-120 pe-50">';
html+='			<div class="row mt-2 ms-5 pb-0">';
html+='					<div class="col-8">';
html+='						<div class="d-flex">';
html+='							<div class="pt-2 fs-6 fw-normal f-nunito text-input" data-texto="texto_1" contenteditable="true">'+texto_1+'</div>';
html+='							<div class="pt-2 flex-grow-1 border-bottom border-secondary">&nbsp;</div>';
html+='						</div>';
html+='					</div>';
html+='					<div class="col-4">';
html+='						<div class="d-flex">';
html+='							<div class="pt-2 fs-6 fw-normal f-nunito text-input" data-texto="texto_2" contenteditable="true">'+texto_2+'</div>';
html+='							<div class="p-2 flex-grow-1 border-bottom border-secondary">&nbsp;</div>';
html+='						</div>';
html+='					</div>';
html+='					<div class="col-8">';
html+='						<div class="d-flex">';
html+='							<div class="hp-30 flex-grow-1 border-bottom border-secondary">&nbsp;</div>';
html+='						</div>';
html+='					</div>';
html+='					<div class="col-4">';
html+='						<div class="d-flex">';
html+='							<div class="hp-30 pt-2 bd-highlight fs-6 fw-normal f-nunito text-input" data-texto="texto_3" contenteditable="true">'+texto_3+'</div>';
html+='							<div class="hp-30 flex-grow-1 border-bottom border-secondary">&nbsp;</div>';
html+='						</div>';
html+='					</div>';
html+='			</div>';
html+='		</div>';
html+='</div>';


return  html;


}

function renderPlantilla2(texto){

let id = 'pl_002';
let html = renderDrag();
html+='<div class="p-0 w-100">';
html+='		<div class="d-block w-100">';
html+='			<div class="row p-0 m-0">';
html+='				<div data-texto="texto" class="col fs-2 f-livvic fw-600 d-flex justify-content-center color-2F text-input" contenteditable="true" >';
html+='					'+texto+'';
html+='				</div>';
html+='			</div>';
html+='		</div>';
html+='</div>';

return  html;

}

function renderPlantilla3(ruta){

let id = 'pl_003';
let html = renderDrag();
html+='<div class="p-0 w-100">';
html+='		<div class="d-block ms-70">';
html+='			<div class="row p-0 m-0">';
html+='				<div class="col p-0 d-flex justify-content-center">';
html+='					<img src="'+ruta+'" width="100%">';
html+='				</div>';
html+='			</div>';
html+='		</div>';
html+='</div>';

return  html;

}



function renderPlantilla4(data){

let opciones = null;

try{
opciones = data.opciones;
}
catch(err){
}

let id = 'pl_004';
//let html = '<div class="item_handle drag_handler"><i class="item_handle drag_handler_icon"></i></div>';
let html = renderDrag();
html+='<div class="p-0 w-100">';
html+='		<div class="d-block ms-70">';
html+='			<div class="row p-0 m-0">';
html+='				<div data-texto="texto" class="col-12 fs-5 f-nunito fw-400 color-2E ps-20 mb-2 d-flex justify-content-start text-input" contenteditable="true">';
html+='					'+data.texto+'';
html+='				</div>';
html+='				<div class="col-12 fs-5 f-nunito fw-200 ps-20 justify-content-start">';
html+='					<ul class="ms-20 p-0 arrastar">';			
                              for(var i=0; i<opciones.length; i++){
html+='            				<li class="color-CC"><span class="color-2E"><span class="handle"><i class="fas fa-th"></i></span><span class="li-editable" contenteditable="true" data-docid="'+opciones[i].doc_id+'">'+opciones[i].texto+'</span></span></li>';
                               }
html+='					</ul>';
html+='				</div>';
html+='			</div>';
html+='		</div>';
html+='</div>';

return  html;

}



function renderHeadingPage(){
	let html = '';
	html+='<div class="panel-heading">';
	html+='		<div class="row mx-0 hp-80">';
	html+='			<div class="col d-flex align-items-end">';
	html+='				<div class="titulo1-deco-image f-livvic fw-500 fs-2 color-white float-start mb-2 ms-5"> Guía de trabajo';
	html+='				</div>';
	html+='			</div>';
	html+='		</div>';
	html+='</div>';
	return html;
}
function renderBodyPage(page){
	let html = '';
	html+='<div class="panel-body py-0 px-0">';
	html+='		<div class="flex-container">';
	html+='			<div class="d-flex w-100 align-content-stretch flex-wrap">';
	html+='				<div id="items-contenedor-'+page+'"></div>';
	html+='			</div>';
	html+='		</div>';
	html+='</div>';
	return html;
}
function renderFooterPage(page){
	let html = '';
	html+='<div class="panel-footer py-0 px-0">';
	html+='		<div class="d-flex bd-highlight mb-2 align-items-end">';
	html+='			<div class="pb-3 bd-highlight">';
	html+='				<div class="folio1 py-1 px-4 fs-4 fw-bold text-white text-end">1</div>';
	html+='			</div>';
	html+='			<div class="pb-3 bd-highlight">';
	html+='				<div class="p-2 fw-bold fs-6 color-4F">Matemática 4.º básico</div>';
	html+='			</div>';
	html+='			<div class="ms-auto p-0 bd-highlight">';
	html+='				<div class="py-2 pe-3 fw-bold fs-6 color-4F"><img src="../assets/images/logo_sm.png"></div>';
	html+='			</div>';
	html+='		</div>';
	html+='</div>';
	return html;
}
function getPlantilla(data){
	if(data.plantilla_id=='pl_001'){
		return renderPlantilla1(data.texto_1,data.texto_2,data.texto_3);
	}
	else if(data.plantilla_id=='pl_002'){
		return renderPlantilla2(data.texto);
	}
	else if(data.plantilla_id=='pl_003'){
		return renderPlantilla3(data.ruta);
	}
	else if(data.plantilla_id=='pl_004'){
		return renderPlantilla4(data);
	}
}