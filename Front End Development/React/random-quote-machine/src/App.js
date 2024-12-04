import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

// 本地引言數據
const quotes = [
  { content: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { content: "Get busy living or get busy dying.", author: "Stephen King" },
  { content: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
  { content: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas Edison" },
  { content: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein" },
  { content: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
  { content: "Money and success don’t change people; they merely amplify what is already there.", author: "Will Smith" },
  { content: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
  { content: "Not how long, but how well you have lived is the main thing.", author: "Seneca" }
];

// 隨機獲取引言
const fetchQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length); // 隨機索引
  const randomQuote = quotes[randomIndex];
  setQuote(randomQuote.content);
  setAuthor(randomQuote.author);
};

  useEffect(() => {
    fetchQuote(); // 初次加載時獲取隨機引言
  }, []);

  return (
    <div className="App">
      <div id="quote-box">
        <p id="text">"{quote}"</p>
        <p id="author">- {author}</p>
        <button id="new-quote" onClick={fetchQuote}>
          New Quote
        </button>
        <a
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text="${quote}" - ${author}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Tweet
        </a>
      </div>
    </div>
  );
};

export default App;

