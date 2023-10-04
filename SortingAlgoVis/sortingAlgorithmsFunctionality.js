// Setting the main Array.
let currentArray = [];


//**********************NOTE************************/
//DELAY BAR that controls the speed of the algorithms.
const delayInput = document.getElementById("delaySlider"); // Get the delay slider input element
const initialDelay = 100; // Set your desired initial delay value

let delay = initialDelay; // Initialize the delay variable with the initial value

// Set the initial value for the delay slider
delayInput.value = initialDelay;

// Add an event listener to update the delay variable when the slider changes
delayInput.addEventListener("input", function () {
    const newDelay = parseInt(delayInput.value);
    delay = newDelay; // Update the delay variable used in sorting functions
});
//*************************************************************************

//**********************NOTE************************/
//Generate the bars that will be sorted, and that appear in the middle container.
function generateBars(array) {
    console.log("generateBars called");
    const algorithmContainer = document.querySelector(".centered-container");
    algorithmContainer.innerHTML = "";

    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        const height = `${array[i]}px`;
        bar.style.height = height;
        algorithmContainer.appendChild(bar);
    }
}
//*************************************************************************



//**********************NOTE************************/
//These 2 blocks of code generate the Array and also Generate random indexes in the array.
function generateArray() {
    const arraySizeInput = document.getElementById("arraySizeInput");
    const size = parseInt(arraySizeInput.value);

    if (!isNaN(size) && size > 0) {
        currentArray = generateRandomArray(size); // Store the generated array in the global variable
        generateBars(currentArray);
        console.log("Generated Array:", currentArray);
    }
}

function generateRandomArray(size)
{
    const randomArray = []; //declare an array 

    for(i = 0; i < size; i++) //loop through the size of the array that was stated in the previous function.
    {
        const randomNumber = Math.floor(Math.random() * 450) + 1; // Generate random numbers for each index in the array
        randomArray.push(randomNumber); //push the numbers onto the random array. 
    }

    return randomArray;
}
//*************************************************************************


//**********************NOTE************************/
//function to get the current array so we can use it to sort it. Otherwise it will always generate a new array
function getCurrentArray() {
    const arraySizeInput = document.getElementById("arraySizeInput");
    const size = parseInt(arraySizeInput.value);

    if (!isNaN(size) && size > 0) {
        return generateRandomArray(size);
    }
    // Return an empty array or handle the case when size is invalid
    return [];
}
//*************************************************************************


//**********************NOTE************************/
// Event listener for the "Sort Array" button
//Using switch as in our HTML file we have a drop down menu that passes on the value of "selectedAlgorithm" so we know which algo has been selected.
function sortArray() {
    const algorithmSelect = document.getElementById("algorithmSelect");
    const selectedAlgorithm = algorithmSelect.value;
  
    if (currentArray.length > 0) {
      switch (selectedAlgorithm) {
        case "bubbleSort":
          bubbleSortWithDelay(currentArray);
          break;
        case "selectionSort":
          selectionSortWithDelay(currentArray, currentArray.length, delay);
          break;
        case "insertionSort":
            insertionSortWithDelay(currentArray, currentArray.length, delay);
            break;
        case "quickSort":
            quickSortWithDelay(currentArray, 0, currentArray.length - 1, delay);
            break;
        case "mergeSort":
            console.log("Calling mergeSort");
            mergeSort(currentArray, 0, currentArray.length - 1);
            break;
        case "bogoSort":
            bogoSortWithDelay(currentArray);
            break;
        case "heapSort":
            heapSortWithDelay(currentArray, 0, currentArray.length - 1);
            break;
        // Add cases for other sorting algorithms if needed
      }
      generateBars(currentArray);
      console.log(`Sorted Array (${selectedAlgorithm}):`, currentArray);
    }
}
//*************************************************************************


document.addEventListener("DOMContentLoaded", function() {
    const dropdownButton = document.getElementById("dropdownButton");
    const dropdownBar = document.getElementById("dropdownBar");

    // Toggle the visibility of the dropdown bar when the button is clicked
    dropdownButton.addEventListener("click", function() {
        if (dropdownBar.style.display === "none" || dropdownBar.style.display === "") {
            dropdownBar.style.display = "block";
        } else {
            dropdownBar.style.display = "none";
        }
    });
});


// Get the reset button element
const resetButton = document.getElementById("resetButton");

// Add an event listener to the reset button
resetButton.addEventListener("click", resetSorting);

function resetSorting() {
    // Stop the current animation (if any)
    clearTimeout(currentAnimation);

    // Determine the array size based on user input
    const arraySizeInput = document.getElementById("arraySizeInput");
    const size = parseInt(arraySizeInput.value);

    // Reset the currentArray to its original state or generate a new random array with the determined size
    currentArray = generateRandomArray(size);

    // Reset other variables as needed
    currentIndex = -1;

    // Regenerate the bars with the updated array
    generateBars(currentArray);
}