var answer = document.getElementById('answer');
var attempt = document.getElementById('attempt');
var max_input = document.getElementById('max_input');
var max_attempt = document.getElementById('max_attempt');
var max_inputs = max_input.value;
var max_attempts = max_attempt.value;
const MAX_INPUT_UPPER = 15;
const MAX_ATTEMPT_UPPER = 100;
const RESULTS_DIV = document.getElementById('results').innerHTML;
const CODE_CLASS_NAME = codeElement = document.getElementById('code').className;

if (answer.value == '' || attempt.value == '')
    setHiddenFields();

function guess() {
    input = document.getElementById('user-guess');

    //add functionality to guess function here
    var myinput = input.value;
    myinput = validateInput(myinput);
    if (myinput != '')
    {
        //        console.log(myinput);
        attempts = Number(attempt.value);
        if (getResults(myinput, answer.value))
        {
            setMessage("You Won the Game in " + attempts + " guesses!!!!!!!");
            showAnswer(true);
            showReplay();
        }
        else
        {
            if (attempts >= max_attempts)
            {
                setMessage("You Lost the Game in " + attempts + " guesses!!!!!!!\nThe correct number is " + answer.value + "!");
                showAnswer(false);
                showReplay();
            }
            else
            {
                attempt.value = attempts + 1;
                setMessage("Incorrect, try again.");
            }
        }
    }
}

//implement new functions here

function showAnswer(winner) {
    codeElement = document.getElementById('code');
    codeElement.innerHTML = answer.value;
    if (winner)
        codeElement.className = codeElement.className + " success";
    else
        codeElement.className = codeElement.className + " failure";
}

function hideAnswer() {
    codeElement = document.getElementById('code');
    codeElement.innerHTML = "<strong>" + "?".repeat(max_inputs) + "</strong>";
    codeElement.className = CODE_CLASS_NAME;
}

function showReplay() {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
}

function hideReplay() {
    document.getElementById('guessing-div').style.display = 'block';
    document.getElementById('replay-div').style.display = 'none';
}

function resetGame() {
    setHiddenFields();
    hideReplay();
    hideAnswer();
    setMessage("");
    document.getElementById('user-guess').value = '';
    document.getElementById('results').innerHTML = RESULTS_DIV;
}

function validateInput(input) {
    //    console.log(input);
    //    console.log(input.length);
    //    console.log(max_inputs);
    if (input[0] == '-' || input[0] == '+')
        input = input.slice(1);
    if (input.length != max_inputs) {
        setMessage("Guesses must be exactly " + max_inputs + " digits");
        return '';
    }
    return input;
}

function setHiddenFields() {
    if (Number(max_input.value) > 0 && Number(max_input.value) <= MAX_INPUT_UPPER)
        max_inputs = max_input.value;
    else {
        max_inputs = max_input.value = max_input.defaultValue;
    }
    if (Number(max_attempt.value) > 0 && Number(max_attempt.value) <= MAX_ATTEMPT_UPPER)
        max_attempts = max_attempt.value;
    else {
        max_attempts = max_attempt.value = max_attempt.defaultValue;
    }
    //    console.log(max_inputs);
    //    console.log(MAX_ATTEMPTS);
    //    answer.value = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    var seed = 1;
    for (var i = 0; i < max_inputs; i++) {
        seed = seed * 10;
    }
    //    console.log(seed);
    answer.value = (Math.floor(Math.random() * seed) + seed).toString().substring(1);
    //    console.log(answer.value);
    attempt.value = '1';
}

function setMessage(text) {
    document.getElementById('message').innerHTML = text;
}

function getResults(input, answer) {
    correctDigits = 0;
    resultsDiv = document.getElementById('results').innerHTML;
    newrow = '<div class="row"><span class="col-md-6">' + input + '</span>'
    newicons = '';
    for (i=0; i < input.length; i++)
    {
        //        console.log(input[i]);
        index = answer.indexOf(input[i]);
        //        console.log(index);
        if (index == -1)
            newicons += '<span class="glyphicon glyphicon-remove"></span>';
        else if (answer[i] == input[i]) {
            correctDigits++;
            newicons += '<span class="glyphicon glyphicon-ok"></span>';
        }
        else
            newicons += '<span class="glyphicon glyphicon-transfer"></span>';
    }
    newrow += newicons;
    newrow += '</div>'
    document.getElementById('results').innerHTML = resultsDiv + newrow;
    return (correctDigits == input.length);
}
