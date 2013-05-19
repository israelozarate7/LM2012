/*
* Autor : Israel Ortiz de Zárate 
*/

//Función que crea la tabla a partir de los datos del DropDown.
function crearTabla()
{
var num = document.getElementById("customDropdown1").value;
    $(document).ready(function () 
	{  
        $('#divTerremoto').iFeed({
            FeedUrl: 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.atom',
            MaxCount: num
        });
    });
}

//Función que elimina la tabla entera.
function deleteAllRows() {
	var Parent = document.getElementById("terremotoTable");
	while(Parent.hasChildNodes())
	{
	   Parent.removeChild(Parent.firstChild);
	}
}

//Funcion que crear tabla con datos de los objetos.
function createTable() {
	
	var i = 0;
	var statusMG5 = false;
	var statusMG4 = false;
	var registrosBOL = false;
	
	statusMG5 = document.getElementById("radio_mg5").checked;
	statusMG4 = document.getElementById("radio_mg4").checked;
	
	//Cabecera de la tabla a introducir.
	var cabecera = "<table id=\"terremotoTable\"><thead><tr><th>País</th><th>Hora</th><th>Día</th><th>Magnitud</th><th>Zona</th><th>Coordenadas</th><th>¿Lo has sentido?</th></thead><tbody>"
	var registros=""; 
	
	//Obtengo el valor del DropDown.
	var num = document.getElementById("customDropdown1").value;
	
	if (statusMG5 == false && statusMG4 == false)
	{
		//'Sin filtro'
		for (i;i<num;i++)
		{
			
			registrosBOL = true;
			registros += "<tr>"
			registros += "<td>" + terremotos[i].pais + "</td>";
			registros += "<td>" + terremotos[i].hora + "</td>";
			registros += "<td>" + terremotos[i].fecha + "</td>";
			
			if (terremotos[i].magnitud < 3)
			{
				registros += "<td bgcolor=\"#2EFE2E\">" + terremotos[i].magnitud + "</td>";
			}
			else if (terremotos[i].magnitud < 4)
			{
				registros += "<td bgcolor=\"#C8FE2E\">" + terremotos[i].magnitud + "</td>";
			}
			else if (terremotos[i].magnitud < 5)
			{
				registros += "<td bgcolor=\"#FE9A2E\">" + terremotos[i].magnitud + "</td>";
			}
			else if (terremotos[i].magnitud < 6)
			{
				registros += "<td bgcolor=\"#FF0000\">" + terremotos[i].magnitud + "</td>";
			}
			else if (terremotos[i].magnitud < 7)
			{
				registros += "<td bgcolor=\"#c91c31\">" + terremotos[i].magnitud + "</td>";
			}			
			else
			{
				registros += "<td>" + terremotos[i].magnitud + "</td>";
			}
			
			registros += "<td>" + terremotos[i].zona + "</td>";
			registros += "<td>" + terremotos[i].coordenadas + "</td>";
			registros += "<td><a href=" + terremotos[i].url + "   </a>Informa</td>";
			registros += "</tr>"
		}	
	}
	else
	{
		
		//Filtro magnitud superior a 5
		if (statusMG5 == true)
		{
		for (i;i<num;i++)
		{
			
			if (terremotos[i].magnitud > 5)
			{
				registrosBOL = true;
				registros += "<tr>"
				registros += "<td>" + terremotos[i].pais + "</td>";
				registros += "<td>" + terremotos[i].hora + "</td>";
				registros += "<td>" + terremotos[i].fecha + "</td>";
				
				if (terremotos[i].magnitud < 6)
				{
					registros += "<td bgcolor=\"#FF0000\">" + terremotos[i].magnitud + "</td>";
				}
				else
				{
				registros += "<td bgcolor=\"#c91c31\">" + terremotos[i].magnitud + "</td>";
				}			
		
			
				registros += "<td>" + terremotos[i].zona + "</td>";
				registros += "<td>" + terremotos[i].coordenadas + "</td>";
				registros += "<td><a href=" + terremotos[i].url + "   </a>Informa</td>";
				registros += "</tr>"			
			}

		}		
		}
		else
		{
		//Filtro magnitud superior a 4
		for (i;i<num;i++)
		{
			
			if (terremotos[i].magnitud > 4)
			{
				registrosBOL = true;
				registros += "<tr>"
				registros += "<td>" + terremotos[i].pais + "</td>";
				registros += "<td>" + terremotos[i].hora + "</td>";
				registros += "<td>" + terremotos[i].fecha + "</td>";
				
				if (terremotos[i].magnitud < 5)
				{
					registros += "<td bgcolor=\"#FE9A2E\">" + terremotos[i].magnitud + "</td>";
				}
				else if (terremotos[i].magnitud < 6)
				{
					registros += "<td bgcolor=\"#FF0000\">" + terremotos[i].magnitud + "</td>";
				}
				else
				{
				registros += "<td bgcolor=\"#c91c31\">" + terremotos[i].magnitud + "</td>";
				}			
		
			
				registros += "<td>" + terremotos[i].zona + "</td>";
				registros += "<td>" + terremotos[i].coordenadas + "</td>";
				registros += "<td><a href=" + terremotos[i].url + "   </a>Informa</td>";
				registros += "</tr>"			
			}

		}
		}
		
		
	
	
	}
	
	var contenedor = document.getElementById('divTerremoto'); 
	contenedor.innerHTML = cabecera + registros + "</tbody></table>";

	if (registrosBOL == false)
	{
		alert ("No se encuentran registros para el filtro seleccionado.");
	}

}

