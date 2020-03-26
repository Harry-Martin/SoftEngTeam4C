const questionId = window.location.href.split('?id=').pop();

window.addEventListener('load', async () => {
    if (questionId === undefined || questionId === '') {
        return;
    }

    const qResponse = await fetch(`/api/question?id=${questionId}`);
    const aResponse = await fetch(`/api/question/answers?id=${questionId}`);

    const questionData = await qResponse.json();
    const answerData = await aResponse.json();

    if (questionData.success === false || answerData.success === false) {
        return;
    }

    const titleE = document.querySelector('#title');
    const textE = document.querySelector('#text');

    titleE.textContent = questionData.title;
    textE.textContent = questionData.text;

    const answerDiv = document.querySelector('#answers');

    // eslint-disable-next-line no-restricted-syntax
    for (const answer of answerData.answers) {
        const newP = document.createElement('p');
        newP.textContent = answer.text;
        answerDiv.appendChild(newP);
    }
});

const submitAnswerBtn = document.querySelector('#submit-answer-button');
submitAnswerBtn.addEventListener('click', async () => {
    const answerText = document.getElementById('answer').value;

    const data = {
        question_id: Number(questionId),
        text: answerText,
    };
    const submit_response = await fetch('/api/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const returned = await submit_response.json();

    if (returned.success === true) {
        console.log(`Your answer has been submitted`);
        window.location.reload();
    } else {
        console.log('There has been an error');
    }
});
