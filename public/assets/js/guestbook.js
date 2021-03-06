let guestbookEntries = [                              					  // 1 - We create a set of fake data to begin with //
    {
        Message: "This site is full of super funny !! I'd visit it again and again just for the gifs xDD",
        Date: "Sep 15, 2018 12:50"
    }
];

function postGuestbook(guestbookDeserialized){                          // 12 - make the appearance of the guestbook as a function to later use it
    const guestbook = document.querySelector("#book");      			// 2 - this tells us which place we are going to put stuff into, in this case is the UL with ID book
    guestbook.innerHTML = null;                             			// 15 - We realize the list must be empty before we print it

    for (let currentEntry of guestbookDeserialized){             			// 3 - we will first create a list that displays all the previously stored messages //
        let postImage = document.createElement("div");
        let postMessage = document.createElement("div");      			// 4 - here we create a new html element with a newMessage variable, in this case a li //
        let postDate = document.createElement("div");

		postImage.classList.add("col-2", "imageGuest");
		postMessage.classList.add("col-7", "messageGuest");
		postDate.classList.add("col-3", "dateGuest");

        postImage.style.backgroundImage="url(assets/img/image_guestbook2.png)"; 
        postMessage.innerHTML = currentEntry.Message;       			// 5 - this tells the class or id or whatever html element that inside itself there must be certain information //
        postDate.innerHTML = currentEntry.Date;

        guestbook.append(postImage);
        guestbook.append(postMessage);                       			// 6 - I am saying that on the ID that we identified before, we will now append the created LI
        guestbook.append(postDate);
    }
};

function writeDate(todayDate){
	return todayDate.toString().slice(4, 21).replace(" 2", ", 2");		// 17 - Function that converts the date on a string in the format we want //
};

function store(guestData){														// 19 - Function to store in local storage
	let guestbookSerialized = JSON.stringify(guestData);
    localStorage.setItem("myBook", guestbookSerialized);
};

function showStored(){													// 20 - Function to call back the stored data

	let guestbookDeserialized = JSON.parse(localStorage.getItem("myBook"));
	if(guestbookDeserialized !== null){
		guestbookEntries = guestbookDeserialized;
		postGuestbook(guestbookDeserialized);
	} else {
			postGuestbook(guestbookEntries);
	}

};

//postGuestbook();                                            			// 14 - You realize there is no list to begin with so you put the list before any changes

//store(guestbookEntries);
showStored();

let buttonGuestbook = document.querySelector("#buttonGuestbook");    	// 7 - Tell to get the element button
buttonGuestbook.addEventListener("click", function(){               // 8 - Add event click to the element button

//    let newMessage = prompt("Write a new message: ");               	// 9 - Ask user the info, I have to change this to a get string from Text-area field
    let newMessage = document.querySelector("textarea").value;          // 9 - Info comes from the textarea box and .value gets the inside of the box
    let today = new Date();

    let newEntry = {                                            		// 10 - Create a new entry for the guestbookEntries with a message as the received info
        Message: newMessage,
        Date: writeDate(today)											// 16 - Define a new date for each entry that calls a function to write the proper date
    };

    guestbookEntries.push(newEntry);                            		// 11 - Put the new entry as part of the Guestbook array
 //   postGuestbook();                                            		// 13 - Make the list appear once the data is asked and can be added to show

	store(guestbookEntries);
	showStored();

    document.querySelector("textarea").value = null;					// 18 - Empty the textarea box after the message has been sent
    
});