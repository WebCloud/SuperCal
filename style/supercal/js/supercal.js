$(function(){
	var date = "";
	var lastClass = "";
	
	
	$("#cal-legends .filter").click(function(e){
		$(this).toggleClass("close").next().slideToggle("slow");	
		e.preventDefault();
	});
	
	$('input[type=radio].switch, input[type=checkbox].switch').hide().after('<span class="switch-replace"></span>').next().click(function(e) {
		return false;
	});
	$('input[type=radio].mini-switch, input[type=checkbox].mini-switch').hide().after('<span class="mini-switch-replace"></span>').next().click(function(e) {
		return false;
	});
	
	$('.open-cal-events').live("click",function(e){
		$(this).next().slideToggle("1");
		e.preventDefault();
	});
	
	//constructing the jquery ui calendar with some data on it
	$("#calendar").datepicker({
		beforeShowDay: function(date){
		   var dt = parseInt(date.getDate());
		   var code = "";
		   //putting some demo color highlights on some random calendar dates
		   //adding some specific classes on some dates (sessions, holydays, birthdays) to mark down some filters
		   if((dt<20 && dt>10)&&dt%2!=0){code+="A";}
		   if((dt<30 && dt>20)&&dt%2!=0){code+="B";}
		   if((dt<14 && dt>1)&&dt%2!=0){code+="C";}
		   if(code.length>1){return [true, 'multi'];} 
		   else{ 
			   if(code == "A"){return [true, 'sessions'];}
			   if(code == "B"){return [true, 'holydays'];}
			   if(code == "C"){return [true, 'birthdays'];}
		   }
		   return [true, ''];
		},
		onSelect: function(selDate){
			if(date==""){
				//no date selected before!
				if($.datepicker.formatDate( "mm/dd/yy", new Date() ) == selDate){
					//the date selected is equals to today's date
					if($("#cal-events").css("display") == "none"){
						//the #cal-events is not being shown, i'm going to slideToggle it!
						$("#cal-legends li").removeClass("transparent").children("input[type=checkbox]").removeAttr("checked");
						$("#cal-events").slideToggle("1");
					}
					else{
						//Open the calendar's day and simulate some data from that day
						//this data can be picked from a url/json with ajax and than injected with the folowing structure
						$("#cal-events").fadeOut("slow",function(){
							$("#cal-events").html("<h3>"+selDate+"</h3><ul><li><a href=\"#column3\" class=\"open-cal-events\">Some Event</a><ul><li><a href=\"#\">some link for this event</a></li><li><a href=\"#\">other link</a></li></ul></li></ul>");
							$("#cal-legends li").removeClass("transparent").children("input[type=checkbox]").removeAttr("checked");
							$("#cal-events").fadeIn("slow");
						});
					}
				} else {
					//the date selected is not equals to today's date
					if($("#cal-events").css("display") == "none"){
						//the #cal-events is not being shown, i'm going to slideToggle it!
						$("#cal-legends li").removeClass("transparent").children("input[type=checkbox]").removeAttr("checked");
						$("#cal-events").slideToggle("1");
					}
					else{
						//Open the calendar's day and simulate some data from that day
						//this data can be picked from a url/json with ajax and than injected with the folowing structure
						$("#cal-events").fadeOut("slow",function(){
							$("#cal-events").html("<h3>"+selDate+"</h3><ul><li><a href=\"#column3\" class=\"open-cal-events\">Some Event</a><ul><li><a href=\"#\">some link for this event</a></li><li><a href=\"#\">other link</a></li></ul></li></ul>");
							$("#cal-legends li").removeClass("transparent").children("input[type=checkbox]").removeAttr("checked");
							$("#cal-events").fadeIn("slow");
						});
					}
				}
			} else {
				//we had a date selected before
				if(date != selDate && $("#cal-events").css("display") != "none"){
					//the selected date is not equals to the date selected before, and the #cal-events is being shown. I'm going to fade in and out it!
					//Open the calendar's day and simulate some data from that day
					//this data can be picked from a url/json with ajax and than injected with the folowing structure
					$("#cal-events").fadeOut("slow",function(){
						$("#cal-events").html("<h3>"+selDate+"</h3><ul><li><a href=\"#column3\" class=\"open-cal-events\">Some Event</a><ul><li><a href=\"#\">some link for this event</a></li><li><a href=\"#\">other link</a></li></ul></li></ul>");
						$("#cal-legends li").removeClass("transparent").children("input[type=checkbox]").removeAttr("checked");
						$("#cal-events").fadeIn("slow");
					});
				}
				else{
					//the selected date is equals to de date selected befor, i'm going to slideToggle it to close #cal-events
					//Open the calendar's day and simulate some data from that day
					//this data can be picked from a url/json with ajax and than injected with the folowing structure
					$("#cal-events").html("<h3>"+selDate+"</h3><ul><li><a href=\"#column3\" class=\"open-cal-events\">Some Event</a><ul><li><a href=\"#\">some link for this event</a></li><li><a href=\"#\">other link</a></li></ul></li></ul>");
					$("#cal-legends li").removeClass("transparent").children("input[type=checkbox]").removeAttr("checked");
					$("#cal-events").slideToggle("1");
				}
			}
			date = selDate;
			
		}}
	);
	
	$("#cal-legends li").click(function(){
		var curClass = "";
		if($(this).children("input[type=checkbox]").attr("checked")){$(this).children("input[type=checkbox]").removeAttr("checked");}
		else{$(this).children("input[type=checkbox]").attr("checked",true);}
		if($(this).hasClass("transparent")) $(this).removeClass("transparent");
		curClass = $(this).attr("class");
		
		$("#cal-legends ul li").each(function(){
			if((curClass != lastClass)&&(!$(this).hasClass(curClass))){$(this).addClass("transparent");$(this).children("input[type=checkbox]").removeAttr("checked");}
			if((curClass == lastClass)&&(!$(this).hasClass(curClass))){$(this).toggleClass("transparent");$(this).children("input[type=checkbox]").removeAttr("checked");}
		});
		
		$(".ui-datepicker td").each(function(index){
			if((curClass != lastClass)&&(!$(this).hasClass(curClass) && !$(this).hasClass("transparent"))){$(this).toggleClass("transparent");}
			if((curClass == lastClass)&&(!$(this).hasClass(curClass))){$(this).toggleClass("transparent");}
			if($(this).hasClass(curClass) && $(this).hasClass("transparent")){$(this).toggleClass("transparent");}
		});
		lastClass = $(this).attr("class");
	});
});