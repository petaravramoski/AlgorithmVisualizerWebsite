function quickSortWithDelay(arr, low, high, delay) {
    let sorting = true; // Flag to indicate if sorting is in progress

    function partition(arr, low, high) {
        let pivot = arr[high];
        let i = low - 1;

        for (let j = low; j <= high - 1; j++) {
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap pivot to its correct position
        return i + 1; // Return the partition index
    }

    function quickSort(arr, low, high) {
        if (low < high && sorting) {
            let pi = partition(arr, low, high);
            generateBars(arr); // Generate bars to visualize the current state

            setTimeout(() => {
                quickSort(arr, low, pi - 1);
            }, delay);

            setTimeout(() => {
                quickSort(arr, pi + 1, high);
            }, delay);
        }
    }

    // Start the sorting process
    quickSort(arr, low, high);

    // Add an event listener to the reset button to reset the algorithm
    resetButton.addEventListener("click", () => {
        sorting = false; // Set the sorting flag to false to stop sorting
        generateBars(currentArray); // Generate new bars
    });
}