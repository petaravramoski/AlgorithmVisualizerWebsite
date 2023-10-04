function swap(arr, xp, yp) {
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
}

function selectionSortWithDelay(arr, n, delay) {
    var i, j, min_idx;
    var sorting = true; // Flag to indicate if sorting is in progress

    function step() {
        if (i < n - 1 && sorting) {
            // Find the minimum element in the unsorted subarray
            min_idx = i;
            for (j = i + 1; j < n; j++) {
                if (arr[j] < arr[min_idx]) {
                    min_idx = j;
                }
            }

            // Swap the found minimum element with the first element
            swap(arr, min_idx, i);

            // Update the visualization here, you can call a function to update the bars
            generateBars(arr);

            // Increment i to expand the sorted subarray
            i++;

            // Continue sorting with the next element
            setTimeout(step, delay);
        }
    }

    // Initialize i, the boundary of the unsorted subarray
    i = 0;

    // Start the sorting process
    step();

    // Add an event listener to the reset button to reset the algorithm
    resetButton.addEventListener("click", () => {
        i = 0; // Reset i
        sorting = false; // Set the sorting flag to false to stop sorting
        generateBars(currentArray); // Generate new bars
    });
}