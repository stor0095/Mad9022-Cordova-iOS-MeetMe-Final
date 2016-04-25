// MAD9022 Final Meet Me iOS Cordova App
// Submitted by: Geemakun Storey
// April 20, 2016 

var app = {
    modal: null,
    db: null,
    profile: {},
    months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady);
    },
    onDeviceReady: function() {
        //navigator.splashscreen.hide();
        
        //console.log("device is ready");
        app.modal = window.modal;
        document.querySelector("#menu").addEventListener("click", app.navigate);
        document.getElementById("madlibLink").addEventListener("click", app.navigate);
        document.getElementById("btnScan").addEventListener("click", app.scan);
        document.getElementById("btnEdit").addEventListener("click", app.showWizard);
        
        // Query Selectors for the exit buttons in the modal
        document.querySelector("#exitBtn").addEventListener("click", app.modal.hide);
        document.querySelector("#exitBtn2").addEventListener("click", app.modal.hide);
        document.querySelector("#exitBtn3").addEventListener("click", app.modal.hide);
        document.querySelector("#exitBtn4").addEventListener("click", app.modal.hide);          document.querySelector("#exitBtn5").addEventListener("click", app.modal.hide);
        
        history.replaceState({"page":"profile"}, null, "#profile");
        document.querySelector("[data-href=profile]").click();
        window.addEventListener("popstate", app.popPop);
        
      /*//console.log("test the sqlitePlugin");
        window.sqlitePlugin.echoTest(function(){
            console.log("sqlite plugin supported");
        }, function(){
            console.warn("sqlite plugin NOT supported");
        });*/
        app.setupDB();
        
    },
    navigate: function(ev){
        ev.preventDefault();
        //the ul is the currentTarget, the target could be <li>, <a>, or <i>
        //we need to access the data-href from the anchor tag
        var ct, tagname, id, pages, tabs;
        ct = ev.target;
        tagname = ct.tagName.toLowerCase();
        //console.log("tagname " + tagname);
        if(tagname == 'a'){
            id = ct.getAttribute("data-href");
        }else if(tagname == 'i'){
            id = ct.parentElement.getAttribute("data-href");
        }else{
            //li
            if(ct.hasAttribute("data-href")){
                id  = ct.getAttribute("data-href");
            }else{
                id = ct.querySelector("a").getAttribute("data-href");
            }
        }
        //add to history
        history.pushState({"page":id}, null, "#"+id);
        //switch the page view
        pages = document.querySelectorAll("[data-role=page]");
        tabs = document.querySelectorAll("#menu li");
        [].forEach.call(pages, function(item, index){
            item.classList.remove("active-page");
            if(item.id == id){
                item.classList.add("active-page");
            }
        });
        [].forEach.call(tabs, function(item, index){
            item.classList.remove("active-tab");
            if(item.querySelector("a").getAttribute("data-href")==id){
                item.classList.add("active-tab");
            }
        });
        // Declared variables to change header text and current menu icon
        var header =  document.getElementById("meetMe");
        var profile = document.getElementById("href1");
        var scan = document.getElementById("href2");
        var contacts = document.getElementById("href3");
        
        if (id == "profile"){
            // Change header text
            header.innerHTML = "Meet Me";
            profile.className = "current";
            scan.classList.remove("current");
            contacts.classList.remove("current");
            
        }
        if(id=="contacts"){
            // Change header text
            header.innerHTML = "Contacts";
            profile.classList.remove("current");
            scan.classList.remove("current");
            contacts.className = "current";
            
            console.log("get contacts list ready");
            //call the fetch contacts page
            app.fetchContacts();
            
        }
        if(id=="scan"){
            //console.log("get profile ready and qr code");
            //call the fetch profile function
            app.fetchProfile();
            // Change header text
            header.innerHTML = "Scan";
            profile.classList.remove("current");
            scan.className = "current";
            contacts.classList.remove("current");
        

        }
        if(id=="madlib"){
            header.innerHTML = "How You Met";
            contacts.classList.remove("current");
            scan.classList.remove("current");
            profile.classList.remove("current");
            //load the madlib story for the contact
            var contact = ct.getAttribute("data-id");
            // call the load story function
            app.loadStory(contact);
        }
    },
    setupDB: function(){
        //connect to the db, create the tables, load the profile if one exists, create the QRcode from the profile 
        console.log("about to openDatabase");
        app.db = sqlitePlugin.openDatabase({name: 'DBmeetcute.2', iosDatabaseLocation: 'default'}, 
            function(db){
                //set up the tables
                console.log("create the tables IF NOT EXISTS");
                db.transaction(function(tx){
                   tx.executeSql('CREATE TABLE IF NOT EXISTS profile(item_id INTEGER PRIMARY KEY AUTOINCREMENT, item_name TEXT, item_value TEXT)');
                   tx.executeSql('CREATE TABLE IF NOT EXISTS madlibs(madlib_id INTEGER PRIMARY KEY AUTOINCREMENT, full_name TEXT, madlib_text TEXT)');
                    console.log("TABLES CREATED");
                }, function(err){
                    console.log("error with the tx trying to create the tables. " + JSON.stringify(err) );
                });
            
                //now go get the profile info for home page
                app.fetchProfile();
            }, 
            function(err){
                console.log('Open database ERROR: ' + JSON.stringify(err));
            });
    },
    saveProfile: function(){
        //called by clicking on the LAST button in the modal wizard
        //console.log("save Profile");
        
        //save all the info from the modal into local variables
        var name = document.getElementById("txtName").value;
        var email = document.getElementById("txtEmail").value;
        var sex = document.getElementById("txtSex").value;
        var drink = document.getElementById("txtBeverage").value;
        var food = document.getElementById("txtFood").value;
        var clothes = document.getElementById("txtClothing").value;
        var time = document.getElementById("txtTimeOfDay").value;
        var socialMedia = document.getElementById("txtSocial").value;
        var transport = document.getElementById("txtTransport").value;
        var number = document.getElementById("txtNumber").value;
        var facial = document.getElementById("txtFacial").value;
        
        // Delete the profile
        if(app.db == null){
            app.db = sqlitePlugin.openDatabase({
               name: 'DBmeetcute.2',
               iosDatabaseLocation: 'default'
            });
        }
        //app.profile = {};
        app.db.executeSql('DELETE FROM profile', []);
        
        app.db.transaction(function(tx){
            tx.executeSql('INSERT INTO profile (item_name, item_value) VALUES (?, ?)', ['full_name', name], function(){
            }, function(err){
                // Error
                console.log(err.message);
            });
            tx.executeSql('INSERT INTO profile (item_name, item_value) VALUES (?, ?)', ['email', email], function(){
            }, function(err){
                // Error
                console.log(err.message);
            });
        
            tx.executeSql('INSERT INTO profile (item_name, item_value) VALUES (?, ?)',['sex', sex], function(){
            }, function(err){
                // Error
                console.log(err.message);
            });
            tx.executeSql('INSERT INTO profile (item_name, item_value) VALUES (?, ?)',['drink', drink], function(){
            }, function(err){
                // Error
                console.log(err.message);
            });
            tx.executeSql('INSERT INTO profile (item_name, item_value) VALUES (?, ?)',['food', food], function(){
            }, function(err){
                // Error
                console.log(err.message);
            });
            tx.executeSql('INSERT INTO profile (item_name, item_value) VALUES (?, ?)',['clothes', clothes], function(){
            }, function(err){
                // Error
                console.log(err.message);
            });
            tx.executeSql('INSERT INTO profile (item_name, item_value) VALUES (?, ?)',['time', time], function(){
            }, function(err){
                // Error
                console.log(err.message);
            });
            tx.executeSql('INSERT INTO profile (item_name, item_value) VALUES (?, ?)',['social', socialMedia], function(){
            }, function(err){
                // Error
                console.log(err.message);
            });
            tx.executeSql('INSERT INTO profile (item_name, item_value) VALUES (?, ?)',['transport', transport], function(){
            }, function(err){
                // Error
                console.log(err.message);
            });
            tx.executeSql('INSERT INTO profile (item_name, item_value) VALUES (?, ?)',['number', number], function(){
            }, function(err){
                // Error
                console.log(err.message);
            });
            tx.executeSql('INSERT INTO profile (item_name, item_value) VALUES (?, ?)',['facial', facial], function(){
            }, function(err){
                // Error
                console.log(err.message);
            });
        }, function(err){
            // Error
            console.log("Failed adding transcation profile");
        }, function(){
           // Succuess fetch profile
            app.fetchProfile();
        });
                
    },
    fetchProfile: function(){
        //fetch all the profile info from profile table
        if(app.db == null){
            app.db = sqlitePlugin.openDatabase({
               name: 'DBmeetcute.2',
                iosDatabaseLocation: 'default'
            });
        }
      app.db.executeSql('SELECT item_name, item_value FROM profile ORDER BY item_id',[],
          function(results){
          var numRows = results.rows.length;
          app.profile = {};
          for (var i=0; i < numRows; i++){
              app.profile[results.rows.item(i).item_name] = results.rows.item(i).item_value;
          }
          app.createQR();
          // Update the profile
        document.getElementById("name").textContent = "Name: " + app.profile['full_name'];
        document.getElementById("email").textContent = "Email: " + app.profile['email'];
        document.getElementById("gender").textContent = "Sex: " + app.profile['sex'];
        document.getElementById("beverage").textContent = "Drink: " + app.profile['drink'];
        document.getElementById("food").textContent = "Food: " + app.profile['food'];
        document.getElementById("clothing").textContent = "Clothes: " + app.profile['clothes'];
        document.getElementById("time").textContent = "Time: " + app.profile['time'];
        document.getElementById("social").textContent = "Social: " + app.profile['social'];
        document.getElementById("transport").textContent = "Transport: " + app.profile['transport'];
        document.getElementById("number").textContent = "Number: " + app.profile['number'];
        document.getElementById("facial").textContent = "Facial: " + app.profile['facial'];
      },function(error){
          console.log("Failed to get results back" + error.message);
      });

    },
    createQR: function(){
        //build the string to display as QR Code from app.profile
        document.getElementById("qr").innerHTML = "";
        var qrString = "";
        // Loop through the profile array to get all the data
        for (prop in app.profile){
            qrString += app.profile[prop] + ";";
        };
        //console.log("QR CODE string: " + qrString);
        //update the QR caode using new QRCode( ) method
        var qrcode =  new QRCode(document.getElementById("qr"), {
            text: qrString,
            width: 175,
            height: 175,
            colorDark: "#ff2d55",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    },
    showWizard: function(ev){
        //call the modal init method
        modal.init();
        app.modal.reset();
    },
    fetchContacts: function(){
        // Make sure the database is open
        if(app.db == null){
            app.db = sqlitePlugin.openDatabase({
               name: 'DBmeetcute.2',
                iosDatabaseLocation: 'default'
            });
        }
        //select all the madlib_id, full_name form madlibs tabl        
        app.db.executeSql('SELECT madlib_id, full_name FROM madlibs ORDER BY full_name', [], function(results){
            var numberContacts = results.rows.length;
            var ul = document.getElementById("list");
            ul.innerHTML = "";
            // If no contacts, let the user know
            if (numberContacts == 0){
                var li = document.createElement("li");
                li.className = "list-item";
                li.textContent = "No contacts yet! Scan a friends QR code!";
                li.setAttribute("data-id", 0);
                ul.appendChild(li);
            } else{
                //loop through results and build the list for contacts page
                // Add click event for each li to call app.navigate
                 for (var i = 0; i < numberContacts; i++){
                    var li = document.createElement("li");
                    li.className = "list-item";
                    li.textContent = results.rows.item(i).full_name;
                    li.setAttribute("data-id", results.rows.item(i).madlib_id);
                    li.setAttribute("data-href", "madlib");
                    li.addEventListener("click", app.navigate);
                    ul.appendChild(li);
                    // Add an arrow and delete button to list item
                    var arrow = document.createElement("i");
                    var deleteContact = document.createElement("i");
                    arrow.className = "fa fa-arrow-circle-right fa-lg";
                    deleteContact.className = "fa fa-minus-circle fa-lg";
                    
                    deleteContact.addEventListener("click", function(ev){
                        ev.preventDefault();
                        // Stops the li click events
                        ev.stopPropagation();
                        //console.log("Deleting contact..");
                        var listItem = this.parentNode;
                        //get data-id attirbute
                        var madlib_id = listItem.getAttribute("data-id");
                        app.db.executeSql('DELETE FROM madlibs WHERE madlib_id=?', [madlib_id], function(results){
                            // Delete success
                            console.log("Deleted Contact!");
                        });
                        // Remove contact
                        listItem.parentNode.removeChild(listItem);
                    }); 
                     
                   li.appendChild(arrow);
                   li.appendChild(deleteContact);
                }
            }
        }, function(error){
            console.log("Failed to get results back" + error.message);
        });
    },
    scan: function(ev){
        ev.preventDefault();
        //call the plugin barcodeScanner.scan() method
	cordova.plugins.barcodeScanner.scan(
		function (result) {
            //console.log(typeof data);
          //  var splitQR = result.split(";");
            //extract the string from the QRCode
            if(!result.canceled){
                var qrString = result.text;
                //alert(qrString);
                var partsQR = qrString.split(";")
                
                var name = partsQR[0];
                var email = partsQR[1];
                var gender = partsQR[2];
                var drink = partsQR[3];
                var food = partsQR[4];
                var clothes = partsQR[5];
                var time = partsQR[6];
                var social = partsQR[7];
                var transport = partsQR[8];
                var number = partsQR[9];
                var facial = partsQR[10];
                // Get todays date
                var date = new Date();
                var today = date.getDate() + " " + app.months[date.getMonth()];
                
                // Generate random number then store in database
                //build a madlib by randomly picking a value from app.profile OR data from QRCode
                // Could redo these if/else statements and use ternary operator to make it cleaner
                if(Math.round(Math.random()) == 0 ){
                    // we are 0
                    document.querySelector("#story [data-ref=transport]").textContent = app.profile.transport;
                }else {
                    //we are 1
                    document.querySelector("#story [data-ref=transport]").textContent = transport;
                }
                if(Math.round(Math.random()) == 0 ){
                    // we are 0
                    document.querySelector("#story [data-ref=user-a]").textContent = app.profile.full_name;
                }else {
                    //we are 1
                    document.querySelector("#story [data-ref=user-a]").textContent = app.profile.full_name;
                }
                if(Math.round(Math.random()) == 0 ){
                    // we are 0
                    document.querySelector("#story [data-ref=user-b]").textContent = name;
                }else {
                    //we are 1
                    document.querySelector("#story [data-ref=user-b]").textContent = name;
                }
                if(Math.round(Math.random()) == 0 ){
                    // we are 0
                    document.querySelector("#story [data-ref=date]").textContent = today;
                }else {
                    //we are 1
                    document.querySelector("#story [data-ref=date]").textContent = today;
                }
                if(Math.round(Math.random()) == 0 ){
                    // we are 0
                    document.querySelector("#story [data-ref=beverage-1]").textContent = app.profile.drink;
                }else {
                    //we are 1
                    document.querySelector("#story [data-ref=beverage-1]").textContent = drink;
                }
                if(Math.round(Math.random()) == 0 ){
                    // we are 0
                    document.querySelector("#story [data-ref=user-rand-1-1]").textContent = app.profile.full_name;
                }else {
                    //we are 1
                    document.querySelector("#story [data-ref=user-rand-1-1]").textContent = app.profile.full_name;
                }
                if(Math.round(Math.random()) == 0 ){
                    // we are 0
                    document.querySelector("#story [data-ref=gender-1]").textContent = app.profile.sex;
                }else {
                    //we are 1
                    document.querySelector("#story [data-ref=gender-1]").textContent = gender;
                }
                if(Math.round(Math.random()) == 0 ){
                    // we are 0
                    document.querySelector("#story [data-ref=beverage-2]").textContent = app.profile.drink;
                }else {
                    //we are 1
                    document.querySelector("#story [data-ref=beverage-2]").textContent = drink;
                }
                if(Math.round(Math.random()) == 0 ){
                    // we are 0
                    document.querySelector("#story [data-ref=user-rand-2-1]").textContent = name;
                }else {
                    //we are 1
                    document.querySelector("#story [data-ref=user-rand-2-1]").textContent = name;
                }
                if(Math.round(Math.random()) == 0 ){
                    // we are 0
                    document.querySelector("#story [data-ref=clothing]").textContent = app.profile.clothes;
                }else {
                    //we are 1
                    document.querySelector("#story [data-ref=clothing]").textContent = clothes;
                }
                if(Math.round(Math.random()) == 0 ){
                    // we are 0
                    document.querySelector("#story [data-ref=user-rand-2-2]").textContent = app.profile.full_name;
                }else {
                    //we are 1
                    document.querySelector("#story [data-ref=user-rand-2-2]").textContent = name;
                }
                if(Math.round(Math.random()) == 0 ){
                    // we are 0
                    document.querySelector("#story [data-ref=user-rand-1-2]").textContent = app.profile.full_name;
                }else {
                    //we are 1
                    document.querySelector("#story [data-ref=user-rand-1-2]").textContent = name;
                }
                if(Math.round(Math.random()) == 0 ){
                    // we are 0
                    document.querySelector("#story [data-ref=facial]").textContent = app.profile.facial;
                }else {
                    //we are 1
                    document.querySelector("#story [data-ref=facial]").textContent = facial;
                }
                if(Math.round(Math.random()) == 0 ){
                    // we are 0
                    document.querySelector("#story [data-ref=social]").textContent = app.profile.social;
                }else {
                    //we are 1
                    document.querySelector("#story [data-ref=social]").textContent = social;
                }
                if(Math.round(Math.random()) == 0 ){
                    // we are 0
                    document.querySelector("#story [data-ref=time]").textContent = app.profile.time;
                }else {
                    //we are 1
                    document.querySelector("#story [data-ref=time]").textContent = time;
                }
                if(Math.round(Math.random()) == 0 ){
                    // we are 0
                    document.querySelector("#story [data-ref=number]").textContent = app.profile.number;
                }else {
                    //we are 1
                    document.querySelector("#story [data-ref=number]").textContent = number;
                }
                if(Math.round(Math.random()) == 0 ){
                    // we are 0
                    document.querySelector("#story [data-ref=food]").textContent = app.profile.food;
                }else {
                    //we are 1
                    document.querySelector("#story [data-ref=food]").textContent = food;
                }
                // Get madlib story
                var madLibStorey = document.getElementById("story").innerHTML;
        if(app.db == null){
            app.db = sqlitePlugin.openDatabase({
               name: 'DBmeetcute.2',
                iosDatabaseLocation: 'default'
            });
        }
        //insert the new madlib into the madlibs table (creating a new contact)
        app.db.transaction(function(tx){
            tx.executeSql('INSERT INTO madlibs(full_name, madlib_text) VALUES(?, ?)', [name, madLibStorey], function(){
                document.getElementById("madlibLink").click();
            }, function(err){
                // Error
                console.log(err.message);
               // console.log("ERROR 1 :Failed adding transcation madlibs...");
            });
            }, function(err){
            // Error
            console.log("Failed adding transcation madlibs...");
        }, function(){
           // Succuess
            console.log("Success Inserting Into Madlibs Table");
            //alert(madLibStorey);
            
//            app.loadStory();
        });
                
            }else {
                
                console.log("Scan Cancelled");
                
            }//end of !result.cancelled if statement
		}, 
		function (error) {
			alert("Scanning failed: " + error.message);
            console.log("Dcanning failed: " + error);
            
		}
	);        
    },
    loadStory: function(contact_id){
       if (app.db == null) {
         app.db = sqlitePlugin.openDatabase({
                name: app.appDatabaseName,
                iosDatabaseLocation: 'default'
            });
        }
        //use the contact_id as the madlib_id from madlibs table
        app.db.executeSql('SELECT madlib_text FROM madlibs WHERE madlib_id=?', [contact_id], function(results){
            //select the madlib_txt and display as the new madlib
            var story = results.rows.item(0).madlib_text;
            document.getElementById("story").innerHTML = story;
        },function(error){
            console.log("Failure to display story because: " + error);
        })
        
        
    },
    popPop: function(ev){
        //handle the back button
        ev.preventDefault();
        var hash = location.hash.replace("#",""); //history.state.page;
        var pages = document.querySelectorAll("[data-role=page]");
        var tabs = document.querySelectorAll("#menu li");
        [].forEach.call(pages, function(p, index){
            p.classList.remove("active-page");
            if(p.id == hash){
                p.classList.add("active-page");
            }
        });
        [].forEach.call(tabs, function(item, index){
            item.classList.remove("active-tab");
            if(item.querySelector("a").getAttribute("data-href")==hash){
                item.classList.add("active-tab");
            }
        });
    }
    
};

var modal = {
  numSteps:0,
  overlay: null,
  activeStep: 0,
  self: null,
  init: function(){
    //console.log("clicked show modal button");
    //set up modal then show it
    modal.self = document.querySelector(".modal");
    modal.overlay = document.querySelector(".overlay");
    modal.numSteps = document.querySelectorAll(".modal-step").length;
    //set up button listeners
    modal.prepareSteps();
    modal.setActive(0);
    modal.show();
  },
  show: function(){
    modal.overlay.style.display = 'block';
    modal.self.style.display = 'block';
  },
  hide: function(){
    modal.self.style.display = 'none';
    modal.overlay.style.display = 'none';
  },
  saveInfo: function(){
    //this function will use AJAX or SQL statement to save data from the modal steps
    window.app.saveProfile();
    //when successfully complete, hide the modal
    //we could hide the modal and leave the overlay and show an animated spinner
    modal.hide();
      app.fetchProfile();
  },
  setActive: function(num){
    modal.activeStep = num;
    [].forEach.call(document.querySelectorAll(".modal-step"), function(item, index){
      //set active step
      if(index == num){
        item.classList.add("active-step");
      }else{
        item.classList.remove("active-step");
      }
    });
  },
  prepareSteps: function(){
    [].forEach.call(document.querySelectorAll(".modal-step"), function(item, index){
      //add listener for each button
      var btn = item.querySelector("button");
      btn.addEventListener("click", modal.nextStep);
      //set text on final button to save/complete/close/done/finish
      if( index == (modal.numSteps-1) ){
//        btn.textContent = "Complete"
      }
    });
  },
  nextStep: function(ev){
    modal.activeStep++;
    if(modal.activeStep < modal.numSteps){
      modal.setActive(modal.activeStep);
    }else{
      //we are done this is the final step
        console.log("last step");
        modal.saveInfo();
    }
  },
  reset: function(){

  }
}

app.initialize();