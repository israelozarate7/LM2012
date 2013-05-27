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
		var n = { FeedUrl: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.atom", MaxCount: 50, ShowDesc: false, ShowPubDate: true, CharacterLimit: 0, TitleLinkTarget: "_blank" };
		 
		if (t) 
		{ e.extend(n, t) } 

		var r = e(this).attr("id"); 
		var i; 

		e("#" + r).empty().append('<div style="padding:3px;"><img src="img/loader.gif" /></div>');
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

												if (n.ShowPubDate) 
												{ 
													var mg = t.title.substr(2,4);
													var temp_mg = t.title.substr(2,4);

													
													var temp_h = t.content.substring(t.content.indexOf("Time")+13);
													temp_h = temp_h.substr(0,temp_h.indexOf("UTC")+3);
													temp_h = temp_h.substr(temp_h.length-12,temp_h.length);
													
													i = new Date(t.publishedDate);
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
											
													}
													else
													{
													    tempUrl = t.link;
														var temp_string = t.content.substring(t.content.indexOf("Location")+17);
													}
													
												} 
											
											
											    alert (tempUrl);
												//Cada vez que finaliza la obtención de datos por terremoto, creo el objeto de tipo 'terremoto'
												var fecha = i.toLocaleDateString();
												var w = new terremoto(tempTitulo, temp_h, fecha, mg, tempZona, temp_string.substring(0,temp_string.indexOf("</dd>")), tempUrl);
												
												//Añado el objeto al array terremotos.
												terremotos.push(w);
												

											}
											
											
								
											);
											//Al finalizar la creación de objetos de tipo terremoto creo la tabla.
											createTable();
											
										} 
		}) 
	}
}
 )(jQuery)


