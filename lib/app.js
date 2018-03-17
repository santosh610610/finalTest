	var fbRef = null;
	function openFireBase(){
		fbRef = firebase.database().ref();		
	}
		

	document.addEventListener('init', function(event) {
	  var page = event.target;
	  if (page.matches('#helloworld-page')) {
		page.querySelector('ons-toolbar .center').innerHTML = 'Quotes App';
		page.querySelector('ons-button').onclick = function() {
		  ons.notification.alert('Hello world!');
		};
	  }
	});


	window.fn = {};

	window.fn.open = function() {
	  var menu = document.getElementById('menu');
	  menu.open();
	};

	window.fn.load = function(page) {
	var content = document.getElementById('content');
	var menu = document.getElementById('menu');
			  
	  content.load(page)
		.then(menu.close.bind(menu));
	}

	document.addEventListener('init', function(event){
		if(event.target.id === "home"){
			alert("I am here");
			openFireBase();
			getQuotes();
		}
		if(event.target.id === "Crazy"){
			getQuotesItems("Crazy");
		}
		if(event.target.id === "Funny"){
			getQuotesItems("Funny");
		}
		if(event.target.id === "Romantic"){
			getQuotesItems("Romantic");
		}
		if(event.target.id === "Spiritual"){
			getQuotesItems("Spiritual");
		}		
	});

	
	function getQuotes() {
		var list = document.getElementById("quoteCategory");
		fbRef = firebase.database().ref().child("category");
		
		fbRef.on("child_added", function(snapshot) {
			//var newVal = "<ons-list-item onclick=\"fn.load('Crazy.html')\" modifier=\"chevron\" tappable><div class=\"left\"><img class=\"list-item__thumbnail\" src=\"http://placekitten.com/g/40/40\"></div><div class=\"center\"><span class=\"list-item__title\">"+ snapshot.key +"</span><span class=\"list-item__subtitle\">Quotes " + snapshot.numChildren() + "</span></div></ons-list-item>";
			var newVal = "<ons-list-item onclick=\"fn.load('" + 
							snapshot.key + ".html')\" modifier=\"chevron\" tappable><div class=\"left\"><img class=\"list-item__thumbnail\" src=\"http://placekitten.com/g/40/40\"></div><div class=\"center\"><span class=\"list-item__title\">"+ snapshot.key +"</span><span class=\"list-item__subtitle\">Quotes " + snapshot.numChildren() + "</span></div></ons-list-item>";														
			list.innerHTML += newVal;
		});			
	}
	
	function getQuotesItems(category) {
		//alert(category);
		var cat = category+"Category";
		var theDiv = document.getElementById(cat);
		
		fbRef = firebase.database().ref().child('category/' + category + '/');
		
		fbRef.on("child_added", function(snapshot) {
			var newVal = "<ons-card><div class=\"title\">Quotes</div><div class=\"content\">" + 
				snapshot.val() + "</div><br/><div align=\"right\"><ons-icon icon=\"md-thumb-up\" style=\"color: #155a96\"></ons-icon>&nbsp;&nbsp;&nbsp;" + 
				"<ons-icon icon=\"md-thumb-down\" style=\"color: #155a96\"></ons-icon>&nbsp;&nbsp;&nbsp;" + 
				"<ons-icon icon=\"md-favorite\" style=\"color: #155a96\"></ons-icon>&nbsp;&nbsp;&nbsp;" + 
				"<ons-icon icon=\"md-share\" style=\"color: #155a96\"></ons-icon></div></ons-card>";
			
			theDiv.innerHTML += newVal;
		});			
	}	
	
	function addItems ()
	{
		var textbox = document.getElementById("item");
		var value = textbox.value;
		var list = document.getElementById('shoppinglist2');
		
		fbRef = firebase.database().ref();
		fbRef.push().set(value);
		
		var newVal = "<ons-list-item modifier=\"chevron\" tappable>" + value + "</ons-list-item>";
		list.innerHTML += newVal;		
		
		textbox.value ="";
		//fn.load('home.html');		
	}
