// plan - use fetch to interact with the missions API to retrieve and submit launch codes
//
// retrieve infomation with API
// write async function
// variable containing the fetch statement
// try / catch 



// async function so that we can use the await keyword
/* async function submitCode() {
  try {
    let logs =  await fetch("/api")
    let data = await logs.json();
      console.log(data)
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

submitCode(); // calls the function above to run your code */



 // Your investigation code should go here
    // Leave your lines of code in when you find something out, so that you can always come back to it and see how you got there

    // First, register the service worker
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
    // Your investigation code should go here
    // Leave your lines of code in when you find something out, so that you can always come back to it and see how you got there
    const response = await fetch("/api/logs");
    const data = await response.json();
    console.log(data);
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