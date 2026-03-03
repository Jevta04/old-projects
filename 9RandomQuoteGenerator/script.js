const quotes = [
    "“Be the change that you wish to see in the world.” – Mahatma Gandhi",
    "“Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.” – Martin Luther King Jr.",
    "“Live as if you were to die tomorrow. Learn as if you were to live forever.” – Mahatma Gandhi",
    "“The best and most beautiful things in the world cannot be seen or even touched – they must be felt with the heart.” – Helen Keller",
    "“If it weren’t crazy, they wouldn’t call it a leap of faith.” – Eleanor Shellstrop",
    "“Do the best you can until you know better. Then when you know better, do better.” – Maya Angelou",
    "“There is nothing stronger than a broken woman who has rebuilt herself.” – Hannah Gadsby",
    "“It always seems impossible until it’s done.” – Nelson Mandela",
    "“If you are going through hell, keep going.” – Winston Churchill",
    "“Whatever you do, don’t wake up at 65 years old and think about what you should have done with your life.” – George Clooney"
];

function getRandomQuote() {
    let quoteh2 = document.createElement("h2");
    quoteh2.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    document.body.appendChild(quoteh2);
    setTimeout(() => document.body.lastChild.remove(), 3000);
}