const form = document.querySelector("form");
const resultsContainer = document.querySelector("#results");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const keyword = document.querySelector("#keyword").value;
  const apiUrl = `https://1g194kdtcj.execute-api.eu-west-1.amazonaws.com/prod/sentiments?keyword=${encodeURIComponent(keyword)}`;

  try {
    resultsContainer.innerHTML = "Fetching results...";
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.errorMessage) {
      resultsContainer.innerHTML = data.errorMessage;
      return;
    }

    displayArticles(data);
  } catch (error) {
    resultsContainer.innerHTML = "An error occurred while fetching the results.";
  }
});

function displayArticles(articles) {
  resultsContainer.innerHTML = "";

  for (const article of articles) {
    const articleElement = document.createElement("li");
    const articleLink = document.createElement("a");

    articleLink.href = article.url;
    articleLink.target = "_blank";
    articleLink.innerText = `${article.title} (Sentiment: ${article.sentiment})`;

    if (article.sentiment === 'POSITIVE') {
      articleLink.classList.add('positive');
    } else if (article.sentiment === 'NEGATIVE') {
      articleLink.classList.add('negative');
    } else {
      articleLink.classList.add('neutral');
    }

    articleElement.appendChild(articleLink);
    resultsContainer.appendChild(articleElement);
  }
}
