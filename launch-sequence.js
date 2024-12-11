// plan - use fetch to interact with the missions API to retrieve and submit launch codes
//
// retrieve infomation with API
// write async function
// variable containing the fetch statement
// try / catch 


// First, register the service worker, intercepts the requests
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js"
      );
      console.log("ServiceWorker registration successful:", registration.scope);
    } catch (error) {
      console.error("ServiceWorker registration failed:", error);
    }
  });
}

// async function so that we can use the await keyword
async function submitCode() {
  try {
    // gets log data
    const response = await fetch("/api/logs");
    const data = await response.json();
    console.log(data);

    // gets personnel data using the information from logs
    const personResponse = await fetch(`/api/personnel/${data[5].who}`);
    const personData = await personResponse.json();
    console.log(personData);

    // gets messages sent to the person
    const messageResponse = await fetch(`/api/messages?to=${personData.id}`);
    const messageData = await messageResponse.json();
    console.log(messageData[0].message);

    // gets specific personnel data (e.g., dog details)
    const dogResponse = await fetch("/api/personnel/11");
    const dogData = await dogResponse.json();
    console.log(dogData);

    // submits code
    const submitResponse = await fetch("/api/codes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: dogData.code }),
    });

    const submitResult = await submitResponse.json();
    console.log(submitResult);

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}


// Wait for service worker to be ready before making requests
navigator.serviceWorker.ready
  .then(() => {
    submitCode(); // calls the function above to run your code
  })
  .catch((error) => {
    console.error("Service Worker not ready:", error);
  });
    



/* async function messages() {
  try {
    const response = await fetch("/api/messages");
    const data = await response.json(); 
    const receiveMessages = DATA.logs.filter;
    messages => messages.to === 8;
    console.log(data, receiveMessages); 
  } catch (error) {

  }
}

messages(); */
