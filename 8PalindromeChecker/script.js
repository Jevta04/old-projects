
function checkPalindrome() {
    let input = document.getElementById("word");
    let word = input.value;
    let backwardWord = word.split('').reverse().join('');
    return backwardWord === word;
}

function showResult(isPalindrome) {
    let result = document.createElement("h2");
    if (!isPalindrome) {
        result.textContent = `A word ${word.value} is not a palindrome!`;
        result.style.color = 'red';
        document.body.append(result);
    }
    else {
        result.textContent = `A word ${word.value} is a palindrome!`;
        result.style.color = "green";
        document.body.append(result);
    }
    setTimeout(() => document.body.lastChild.remove(),5000);
}