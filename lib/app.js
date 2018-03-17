	var fbRef = null;
	var storageRef = null;
	//var spaceRef = null;
	
	function openFireBase(){
		fbRef = firebase.database().ref();		
		storageRef = firebase.storage().ref();
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
		if(event.target.id == "home"){
			openFireBase();
			getQuotes();
		}
		if(event.target.id == "Crazy"){
			getQuotesItems("Crazy");
		}
		if(event.target.id == "Funny"){
			getQuotesItems("Funny");
		}
		if(event.target.id == "Romantic"){
			getQuotesItems("Romantic");
		}
		if(event.target.id == "Spiritual"){
			getQuotesItems("Spiritual");
		}		
	});
	
	/*
	document.addEventListener('init', function(event) {
	  var page = event.target;

	  if (page.id === 'home') {
			//openFireBase();
			//getQuotes();		  
		page.querySelector('#push-button').onclick = function() {
		  document.querySelector('#myNavigator').pushPage('page2.html', {data: {title: 'Page 2'}});
		};
	  } else if (page.id === 'page2') {
		page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
	  }
	});
	*/


	

	var imgURL;	
	
	function getQuotes() {
		var list = document.getElementById("quoteCategory");
		fbRef = firebase.database().ref().child("category");

		//var spaceRef = storageRef.child('pics/icons8-shark-48.png');
		storageRef.child('pics/icons8-shark-48.png').getDownloadURL().then(function(url) {
			 imgURL = url;
			 //alert(url + "--" + test);
			 //document.querySelector('img').src = test;
		 }).catch(function(error) {
		 });		
		
		fbRef.on("child_added", function(snapshot) {
			//var newVal = "<ons-list-item onclick=\"fn.load('Crazy.html')\" modifier=\"chevron\" tappable><div class=\"left\"><img class=\"list-item__thumbnail\" src=\"http://placekitten.com/g/40/40\"></div><div class=\"center\"><span class=\"list-item__title\">"+ snapshot.key +"</span><span class=\"list-item__subtitle\">Quotes " + snapshot.numChildren() + "</span></div></ons-list-item>";
			var newVal = "<ons-list-item onclick=\"fn.load('" + 
				snapshot.key + ".html')\" modifier=\"chevron\" tappable><div class=\"left\"><img class=\"list-item__thumbnail\" src=\"" + imgURL + "\"></div><div class=\"center\"><span class=\"list-item__title\">"+ snapshot.key +"</span><span class=\"list-item__subtitle\">Quotes " + snapshot.numChildren() + "</span></div></ons-list-item>";														
			list.innerHTML += newVal;
			//alert(imgURL);
		});			
	}
	
	function getQuotesItems(category) {
		//alert(category);
		var cat = category+"Category";
		var theDiv = document.getElementById(cat);
		
		fbRef = firebase.database().ref().child('category/' + category + '/');
		
		fbRef.on("child_added", function(snapshot) {
		var newVal = "<ons-card><div class=\"title\"> " + snapshot.val().author + "</div><div class=\"content\">" + 
			snapshot.val().body + "</div><br/><div align=\"right\"><ons-icon icon=\"md-thumb-up\" style=\"color: #155a96\"></ons-icon>&nbsp;&nbsp;&nbsp;" + 
			"<ons-icon icon=\"md-thumb-down\" style=\"color: #155a96\"></ons-icon>&nbsp;&nbsp;&nbsp;" + 
			"<ons-icon icon=\"md-favorite\" style=\"color: #155a96\"></ons-icon>&nbsp;&nbsp;&nbsp;" + 
			"<ons-icon icon=\"md-share\" style=\"color: #155a96\"></ons-icon></div></ons-card>";
			
			theDiv.innerHTML += newVal;
		});			
	}	
	
	function addQuote ()
	{
		var theQuote = document.getElementById("quote").value
		var theAuthor = document.getElementById("author").value
		var list = document.getElementById('QuoteList');
		var test = "";

		var theCategory = document.getElementsByName('theCategory');
		var cat_value;
		for(var i = 0; i < theCategory.length; i++){
			if(theCategory[i].checked){
				cat_value = theCategory[i].value;
				test = theCategory[i];
			}
		}		
		
		var quoteData = {
		author: theAuthor,
		body: theQuote,
		starCount: 0,
		like : 0,
		dislike : 0
		};		
		
		var newPostKey = firebase.database().ref().child('category/' + cat_value).push().key;
		//fbRef.push().set(value);
		//alert(cat_value);
		
		var updates = {};
		//updates['/category/Crazy/' + newPostKey] = quoteData;
		
		updates['/category/' + cat_value + '/' + newPostKey] = quoteData;
		
		//	var p = firebase.database().ref().update(updates);
		// 	above is used for catching the Promise, if succeeded or failed
		//	alert(p);
		firebase.database().ref().update(updates);
		
		var newVal = "<ons-list-item modifier=\"chevron\" tappable>" + theQuote + "</ons-list-item>";
		list.innerHTML += newVal;		
		
		document.getElementById("quote").value = "";
		document.getElementById("author").value	= "";
		//fn.load('home.html');		
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
