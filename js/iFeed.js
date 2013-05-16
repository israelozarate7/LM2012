/*
* Basado en FeedEk jQuery RSS/ATOM Feed Plugin v1.1.2
* http://jquery-plugins.net/FeedEk/FeedEk.html
* Autor : Israel Ortiz de Zárate 
*/

var terremotos = new Array();

(function (e) 
{ 
	e.fn.iFeed = function (t) 
	{ 
		var n = { FeedUrl: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.atom", MaxCount: 20, ShowDesc: false, ShowPubDate: true, CharacterLimit: 0, TitleLinkTarget: "_blank" };
		 
		if (t) 
		{ e.extend(n, t) } 

		var r = e(this).attr("id"); 
		var i; 

		e("#" + r).empty().append('<div style="padding:3px;"><img src="loader.gif" /></div>'); 
		e.ajax(
		{ 
			url: "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=" + n.MaxCount + 
			"&output=json&q=" + encodeURIComponent(n.FeedUrl) + "&hl=en&callback=?", dataType: 
			"json", success: function (t) 
										{ 
											e("#" + r).empty();


											var s = ""; e.each(t.responseData.feed.entries, function (e, t) 
											{ 
												
												var posComa = t.title.indexOf(",");
												var tempTitulo;
												var tempZona = "x";
												
												if(posComa < 0 )
												{
													tempTitulo = t.title.substr(t.title.lastIndexOf("-")+1);
													tempZona= t.title.substr(t.title.indexOf("-")+2);
												}
												else
												{
													tempTitulo = t.title.substr(t.title.indexOf(",")+1);
													tempZona= t.title.substr(t.title.indexOf("-")+2, t.title.lastIndexOf(",")-8);
												}
												
												
												
												s += 
												//Relleno la tabla por campos en cada 'Entry'
												//País
												"<tr><td>"+  tempTitulo + "</td>";

												if (n.ShowPubDate) 
												{ 
													var mg = t.title.substr(2,4);
													var temp_mg = t.title.substr(2,4);
													
													//Pintar el valor si es superior de 4.0
													if (mg < 3)
													{
														temp_mg = "<td bgcolor=\"#2EFE2E\">" + temp_mg + "</td>";
													}
													else if (mg < 4)
													{
														temp_mg = "<td bgcolor=\"#C8FE2E\">" + temp_mg + "</td>";
													}
													else if (mg < 5)
													{
														temp_mg = "<td bgcolor=\"#FE9A2E\">" + temp_mg + "</td>";
													}
													else if (mg < 6)
													{
														temp_mg = "<td bgcolor=\"#FF0000\">" + temp_mg + "</td>";
													}													
													else
													{
														temp_mg = "<td>" + temp_mg + "</td>";
													}
													
													var temp_h = t.content.substring(t.content.indexOf("Time")+13);
													temp_h = temp_h.substr(0,temp_h.indexOf("UTC")+3);
													temp_h = temp_h.substr(temp_h.length-12,temp_h.length);
													
													i = new Date(t.publishedDate);
													s += 
													
													//Hora
													"<td>" + temp_h + "</td>"
													
													//Día
													+ "<td>" + i.toLocaleDateString() + "</td>"
													
													//Magnitud
													+ temp_mg + "<td>"
													//Zona
													+ tempZona +"</td>"
													
													
													
													if (t.content.substr(0,3)=="<p>")
													{
														var tempCoord;
														var temp_string = t.content.substring(t.content.indexOf("Location")+17);
														var tempUrl;
														var posDYFI= t.content.indexOf("#dyfi\"");
														
														
														if (posDYFI < 100)
														{
														tempUrl = t.content.substr(t.content.indexOf("\"http")+1,t.content.indexOf("#dyfi\"")-7);
														}
														else
														{
														tempUrl = t.link;
														}
														
																												
														s += 
														
														//Coordenadas
														"<td>"+ temp_string.substring(0,temp_string.indexOf("</dd>")) + "</td>" +
														
														//¿Lo has sentido?
														"<td><a href="+ tempUrl +"   </a>Informa</td>"												
													}
													else
													{
														var temp_string = t.content.substring(t.content.indexOf("Location")+17);
														s += 
														
														//Coordenadas
														"<td>"+ temp_string.substring(0,temp_string.indexOf("</dd>")) + "</td>" +
														
														//¿Lo has sentido?
														"<td><a href="+t.link +"   </a>Informa</td></tr>"
														
														tempUrl = t.link;
													}
													
												} 
											
												//Cada vez que finaliza la obtención de datos por terremoto, creo el objeto de tipo 'terremoto'
												var w = new terremoto(tempTitulo, temp_h, mg, tempZona, temp_string.substring(0,temp_string.indexOf("</dd>")), tempUrl);
												
												//Añado el objeto al array terremotos.
												terremotos.push(w);
												

											}
											
											
								
											);
											//alert (terremotos.length);
											//alert (terremotos[10].pais);

											e("#" + r).append('<table><thead><tr><th>País</th><th>Hora</th><th>Día</th><th>Magnitud</th><th>Zona</th><th>Coordenadas</th><th>¿Lo has sentido?</th></thead><tbody>' + s + "</tbody></table>") 
						
										} 
		}) 
	}
}
 )(jQuery)

//Clase terremoto, se crean los objetos dentro.
function terremoto(tempTitulo, temp_h, mg, tempZona, coord, tempUrl) 
{
    this.pais = tempTitulo
    this.hora = temp_h
    this.magnitud = mg
    this.zona = tempZona
	this.coordenadas = coord
    this.url = tempUrl
}
