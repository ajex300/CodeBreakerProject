var answer = document.getElementById('answer');
var attempt = document.getElementById('attempt');
const MAX_ATTEMPTS = 10;
const MAX_INPUT = 4;
const RESULTS_DIV = document.getElementById('results').innerHTML;

if (answer.value == '' || attempt.value == '')
    setHiddenFields();

function guess() {
    input = document.getElementById('user-guess');

    //add functionality to guess function here
    var myinput = input.value;
    console.log(myinput);
    myinput = validateInput(myinput);
    if (myinput != '')
    {
        attempts = Number(attempt.value);
        if (getResults(myinput, answer.value))
        {
            setMessage("You Won the Game in " + attempts + " guesses!!!!!!!");
            showAnswer(true);
            showReplay();
        }
        else
        {
            if (attempts >= MAX_ATTEMPTS)
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

function showReplay() {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
}

function resetGame() {
    setHiddenFields();
    document.getElementById('results').innerHTML = RESULTS_DIV;
}

function validateInput(input) {
    console.log(input);
    if (input.length < MAX_INPUT)
       return '';
    if (input[0] == '-' || input[0] == '+')
        input = input.slice(1);
    if (input.length != MAX_INPUT) {
        setMessage("Guesses must be exactly " + MAX_INPUT + " digits");
        return '';
    }
    return input;
}

function setHiddenFields() {
    answer.value = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    attempt.value = '1';
}

function setMessage(text)
{
    document.getElementById('message').innerHTML = text;
}

function getResults(input, answer)
{
    correct = 0;
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
            correct++;
            newicons += '<span class="glyphicon glyphicon-ok"></span>';
        }
        else
            newicons += '<span class="glyphicon glyphicon-transfer"></span>';
    }
    newrow += newicons;
    newrow += '</div>'
    document.getElementById('results').innerHTML = resultsDiv + newrow;
    return (correct == input.length);
}