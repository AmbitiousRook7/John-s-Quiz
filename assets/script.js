// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', (event) => {
  // Button and element selectors
  const startBtn = document.getElementById('start-btn');
  const generalKnowledgeBtn = document.getElementById('general-knowledge-btn');
  const musicBtn = document.getElementById('music-btn');
  const nextBtn = document.getElementById('next-btn');
  const resultsBtn = document.getElementById('results-btn');
  const restartBtn = document.getElementById('restart-btn');
  const optionsContainer = document.getElementById('options');
  const scoreDisplay = document.getElementById('score');
  const finalScoreDisplay = document.getElementById('final-score');

  // Quiz state variables
  let currentQuestionIndex = 0;
  let score = 0;
  let questions = [];

  // Function to shuffle array (Fisher-Yates Shuffle)
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  //General knowledge questions for the user to answer
const generalKnowledgeQuestions = [
    { question: "What is the capital of France?", answers: ["Paris", "London", "Rome", "Berlin"], correct: 0 },
    { question: "Who composed the Four Seasons?", answers: ["Mozart", "Beethoven", "Vivaldi", "Bach"], correct: 2 },
    { question: "Which planet is known as the red planet?", answers: ["Earth", "Venus", "Jupiter", "Mars"], correct: 3 },
    { question: "What is the largest mammal in the world?", answers: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], correct: 1 },
    { question: "Who wrote the play Romeo and Juliet?", answers: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], correct: 1 },
    { question: "What is the chemical symbol for gold?", answers: ["Au", "Ag", "Fe", "O"], correct: 0 },
    { question: "Which country is the largest by land area?", answers: ["China", "United States", "Canada", "Russia"], correct: 3 },
    { question: "What is the main ingredient in sushi?", answers: ["Rice", "Chicken", "Bread", "Pasta"], correct: 0 },
    { question: "Which of these is a famous painting by Leonardo da Vinci?", answers: ["The Starry Night", "The Scream", "Mona Lisa", "The Night Watch"], correct: 2 },
    { question: "Which element is credited with the discovery of radioactivity?", answers: ["Radium", "Uranium", "Polonium", "Thorium"], correct: 1 }
  ];
  
  //Music questions for the user to answer
  const musicQuestions = [
    { question: "Who is known as the King of Pop?", answers: ["Elvis Presley", "Michael Jackson", "Prince", "Justin Bieber"], correct: 1 },
    { question: "Which band released the hit song Hey Jude?", answers: ["The Beatles", "The Rolling Stones", "Led Zeppelin", "Queen"], correct: 0 },
    { question: "Which legendary guitarist is known for playing the solo in Stairway to Heaven?", answers: ["Jimmy Page", "Eric Clapton", "Jimi Hendrix", "Eddie Van Halen"], correct: 0 },
    { question: "What instrument does Yo-Yo Ma play?", answers: ["Violin", "Cello", "Flute", "Piano"], correct: 1 },
    { question: "Which iconic singer-songwriter released the album Rumours with their band?", answers: ["Bob Dylan", "Fleetwood Mac", "Elton John", "Joni Mitchell"], correct: 1 },
    { question: "Who sang the hit song I Will Always Love You, which was featured in the movie The Bodyguard?", answers: ["Whitney Houston", "Mariah Carey", "Celine Dion", "Adele"], correct: 0 },
    { question: "Which rock band is famous for their song Bohemian Rhapsody?", answers: ["The Rolling Stones", "Queen", "Pink Floyd", "Led Zeppelin"], correct: 1 },
    { question: "What is the name of the fictional band in the movie Almost Famous?", answers: ["Stillwater", "The Wonders", "Spinal Tap", "The Commitments"], correct: 0 },
    { question: "Who composed the classical piece Fur Elise?", answers: ["Ludwig van Beethoven", "Wolfgang Amadeus Mozart", "Johann Sebastian Bach", "Franz Schubert"], correct: 0 },
    { question: "Which artist is known for the hit song Like a Prayer?", answers: ["Madonna", "Cher", "Tina Turner", "Janet Jackson"], correct: 0 }
  ];

  // Shuffle questions for random order
  shuffle(generalKnowledgeQuestions);
  shuffle(musicQuestions);

  // Event listeners for buttons
  startBtn.addEventListener('click', () => {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-type-screen').classList.remove('hidden');
  });

  generalKnowledgeBtn.addEventListener('click', () => {
    questions = generalKnowledgeQuestions;
    startGame();
  });

  musicBtn.addEventListener('click', () => {
    questions = musicQuestions;
    startGame();
  });

  // Function to start the game
  function startGame() {
    document.getElementById('game-type-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    showQuestion();
  }

  // Function to show a question
  function showQuestion() {
    resetState();
    const question = questions[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;
    question.answers.forEach((answer, index) => {
      const button = document.createElement('button');
      button.textContent = answer;
      button.addEventListener('click', (e) => selectAnswer(e, index));
      optionsContainer.appendChild(button);
    });
  }

  // Function to reset the state before showing new question
  function resetState() {
    nextBtn.classList.add('hidden');
    resultsBtn.classList.add('hidden');
    while (optionsContainer.firstChild) {
      optionsContainer.removeChild(optionsContainer.firstChild);
    }
  }

  // Function to handle answer selection
  function selectAnswer(event, index) {
    const question = questions[currentQuestionIndex];
    // Disable all answer buttons and show the correct and incorrect colors
    const buttons = optionsContainer.querySelectorAll('button');
    buttons.forEach((button, buttonIndex) => {
      button.disabled = true;
      if (buttonIndex === question.correct) {
        button.classList.add('correct'); // Add 'correct' class for styling
      } else {
        button.classList.add('incorrect'); // Add 'incorrect' class for styling
      }
    });

    // Check if the selected answer is correct
    if (index === question.correct) {
      score++; // Increment score only if the answer is correct
      scoreDisplay.textContent = score;
    }
    // Show the next button if there are more questions, otherwise show results button
    if (questions.length > currentQuestionIndex + 1) {
      nextBtn.classList.remove('hidden');
    } else {
      resultsBtn.classList.remove('hidden');
    }
  }
  // Event listener for the 'Next' button click
  nextBtn.addEventListener('click', () => {
    currentQuestionIndex++; // Move to the next question
    showQuestion(); // Display the next question
  });

  // Event listener for the 'Results' button click
  resultsBtn.addEventListener('click', showResults);

  // Event listener for the 'Restart' button click
  restartBtn.addEventListener('click', restartGame);

  // Function to show the results screen
  function showResults() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('results-screen').classList.remove('hidden');
    finalScoreDisplay.textContent = `You scored ${score} out of ${questions.length}.`;

    // Provide feedback based on the score
    if (score < 5) {
      finalScoreDisplay.textContent += " Try again to score higher."; // Encourage to try again
    } else if (score === 10) {
      finalScoreDisplay.textContent += " Top Marks! Congratulations!"; // Congratulate for perfect score
    } else {
      finalScoreDisplay.textContent += " Well Done!"; // Praise for a good score
    }
  }

  // Function to restart the game
  function restartGame() {
    document.getElementById('results-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
    score = 0; // Reset score
    currentQuestionIndex = 0; // Reset question index
    scoreDisplay.textContent = score; // Update score display
    showQuestion(); // Show the first question
  }
});
