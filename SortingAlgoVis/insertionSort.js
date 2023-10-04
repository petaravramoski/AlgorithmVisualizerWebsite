function insertionSortWithDelay(arr, n, delay) {
    let i, key, j;
    let sorting = true; // Flag to indicate if sorting is in progress

    function step() {
        if (i < n && sorting) {
            key = arr[i];
            j = i - 1;

            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
                generateBars(arr);
            }

            arr[j + 1] = key;
            i++;

            setTimeout(step, delay); // Call the step function with a delay
        }
    }

    i = 1; // Initialize i
    step(); // Start the sorting process

    // Add an event listener to the reset button to reset the algorithm
    resetButton.addEventListener("click", () => {
        i = 0; // Reset i
        sorting = false; // Set the sorting flag to false to stop sorting
        generateBars(currentArray); // Generate new bars
    });
}