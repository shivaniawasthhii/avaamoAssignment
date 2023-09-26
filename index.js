//Declaring this fetchData globally so I can use thefetched data which
//is coming by task 1 , so I can use this to analyse for task 2
let fetchedData = "";
//Getting access to result container to render result
const resultContainer = document.getElementById("resultContainer");
// Genric Function to fetch the document from a URL
async function fetchDocument(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );
    }
    return await response.text();
  } catch (error) {
    console.error(error);
  }
}

// Button for task 1 to fetch the document
const fetchButton = document.getElementById("fetchButton");
fetchButton.addEventListener("click", () => {
  const url = "http://norvig.com/big.txt";
  fetchDocument(url).then((response) => {
    console.log("Document fetched:", response);
    resultContainer.textContent = response;
    //using this fetchedData in Task 2
    fetchedData = response;
  });
});

// Button for Task 2: Analyze the document
const analyzeButton = document.getElementById("analyzeButton");
analyzeButton.addEventListener("click", () => {
  // I am using if else statement here, becoz according to
  // problem I have to use fetched data by task1 so
  // in if statement I am using fetcheddata by task 1
  // and to avoid error if user doesnt click on 1st button
  // and directly jumps to 2nd button so url will still
  // fetch in else statement.
  if (fetchedData) {
    const wordCounts = analyzeDocument(fetchedData);
    resultContainer.textContent = "";
    console.log(JSON.stringify(wordCounts, null, 2));
    resultContainer.textContent = JSON.stringify(wordCounts, null, 2);

    // resultContainer.textContent = wordCounts;
  } else {
    const url = "http://norvig.com/big.txt";
    fetchDocument(url).then((response) => {
      const wordCounts = analyzeDocument(response);
      resultContainer.textContent = "";
      console.log(JSON.stringify(wordCounts, null, 2));
      resultContainer.textContent = JSON.stringify(wordCounts, null, 2);
    });
  }
});

// Function to analyze the document and count word occurrences
function analyzeDocument(response) {
  const words = response
    .toLowerCase()
    .split(/\s+/) // use regex to get diff words here.
    .filter((word) => word.length > 0 && /^[a-zA-Z]+$/.test(word)); // use regex to get only words not any numbers

  // Create an object to store word counts,use key value to get unique words
  const wordCounts = {};
  words.forEach((word) => {
    if (wordCounts.hasOwnProperty(word)) {
      wordCounts[word]++;
    } else {
      wordCounts[word] = 1;
    }
  });
  console.log(wordCounts);

  return wordCounts;
}

// Button for Task 3,display top 10 words in JSON format.
const displayButton = document.getElementById("displayButton");
displayButton.addEventListener("click", () => {
  const url = "http://norvig.com/big.txt";
  fetchDocument(url).then((response) => {
    const wordCounts = analyzeDocument(response);
    displayTop10Words(wordCounts);
  });
});

// function to display the top 10 words in JSON format
function displayTop10Words(wordCounts) {
  // Sort the word counts to get top 10
  const sortedWordCounts = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const top10Words = {};
  sortedWordCounts.forEach(([word, count]) => {
    top10Words[word] = count;
  });
  resultContainer.textContent = "";
  // display the top 10 words in JSON format
  console.log(JSON.stringify(top10Words, null, 2));
  resultContainer.textContent = JSON.stringify(top10Words, null, 2);
}
