const Card = (article) => {
  const card = document.createElement("div");
  card.classList.add("card");


  const headline = document.createElement("div");
  headline.classList.add("headline");
  headline.textContent = article.headline;


  const author = document.createElement("div");
  author.classList.add("author");


  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");
  const authorPhoto = document.createElement("img");
  authorPhoto.src = article.authorPhoto;


  const authorName = document.createElement("span");
  authorName.textContent = `By ${article.authorName}`;


  imgContainer.appendChild(authorPhoto);
  author.appendChild(imgContainer);
  author.appendChild(authorName);


  card.appendChild(headline);
  card.appendChild(author);


  card.addEventListener("click", () => {
    console.log(article.headline);
  });

  return card;


  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
}




// TASK 6
// ---------------------
// Implement this function that takes a css selector as its only argument.
// It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
// However, the articles do not come organized in a single, neat array. Inspect the response closely!
// Create a card from each and every article object in the response, using the Card component.
// Append each card to the element in the DOM that matches the selector passed to the function.
//

import axios from 'axios';
const cardAppender = (selector) => {
  axios.get('http://localhost:5001/api/articles')
    .then((response) => {
      const articlesByCategory = response.data.articles;


      const targetElement = document.querySelector(selector);


      for (const category in articlesByCategory) {
        if (articlesByCategory.hasOwnProperty(category)) {
          const articles = articlesByCategory[category];


          articles.forEach((article) => {
            const card = Card(article);


            targetElement.appendChild(card);
          });
        }
      }
    })
    .catch((error) => {
      console.error('Error fetching articles:', error);
    });
};

export { Card, cardAppender };