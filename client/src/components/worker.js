onmessage = function (event) {
    const data = event.data;
    // Perform any data processing or computations here
    // For this example, we will simply pass the data back to the main thread
    postMessage(data);
};