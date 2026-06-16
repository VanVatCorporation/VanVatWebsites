    const quotes = [
      // Vietnamese & Van Vat Corp originals
      { text: "Học không phải là nghĩa vụ, mà là cơ hội để phát triển chính mình.", author: "Tập đoàn Vạn Vật" },
      { text: "Người học hôm nay, là người dẫn đầu ngày mai.", author: "Tập đoàn Vạn Vật" },
      { text: "Mỗi sai lầm là một bài học quý giá trên con đường thành công.", author: "Tập đoàn Vạn Vật" },
      { text: "Học tập là hạt giống của tri thức, và tri thức là hạt giống của hạnh phúc.", author: "Tập đoàn Vạn Vật" },

      // Global inspiration
      { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
      { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
      { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
      { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
      { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
      { text: "Don’t let what you cannot do interfere with what you can do.", author: "John Wooden" },
      { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
      { text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.", author: "Brian Herbert" },
      { text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.", author: "George R.R. Martin" },
      { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
      { text: "The more that you read, the more things you will know. The more that you learn, the more places you’ll go.", author: "Dr. Seuss" },
      { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
      { text: "If you think education is expensive, try ignorance.", author: "Derek Bok" },
      { text: "Failure is simply the opportunity to begin again, this time more intelligently.", author: "Henry Ford" },
      { text: "The future belongs to those who prepare for it today.", author: "Malcolm X" }
    ];

    const quoteBox = document.getElementById("quoteBox");
    const quoteInner = document.getElementById("quoteInner");
    const quoteText = document.getElementById("quoteText");
    const quoteAuthor = document.getElementById("quoteAuthor");
    const quoteIcon = document.getElementById("quoteIcon");

    function setRandomQuote() {
      const random = quotes[Math.floor(Math.random() * quotes.length)];
      quoteText.textContent = `“${random.text}”`;
      quoteAuthor.textContent = `— ${random.author}`;
    }

    function triggerGlow() {
      quoteIcon.classList.remove("glow");
      void quoteIcon.offsetWidth; // restart animation
      quoteIcon.classList.add("glow");
    }

    // First load animation
    window.addEventListener("load", () => {
      requestAnimationFrame(() => {
        quoteBox.classList.remove("opacity-0", "translate-x-20");
        quoteBox.classList.add("opacity-100", "translate-x-0");
      });
      setRandomQuote();
      triggerGlow();
    });

    // Auto refresh every 10s with animation + glow
    setInterval(() => {
      // Slide out to left
      quoteInner.classList.add("opacity-0", "-translate-x-20");
      
      setTimeout(() => {
        setRandomQuote();
        triggerGlow();

        // Move back to right for re-entry
        quoteInner.classList.remove("-translate-x-20");
        quoteInner.classList.add("translate-x-20");

        setTimeout(() => {
          quoteInner.classList.remove("opacity-0", "translate-x-20");
          quoteInner.classList.add("opacity-100", "translate-x-0");
        }, 50);
      }, 600);
    }, 10000);