const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');
const listQuestions = document.getElementById('list-questions');
listQuestions.style.visibility = 'hidden';

searchButton.addEventListener('click', async () => {
    listQuestions.innerHTML = '';
    const search = searchText.value.replace(' ', '+');
    const url = `/api/question/search/?searchText=${search}`;
    const response = await fetch(url, { method: 'GET' });
    const { questions } = await response.json();


    for (let i = 0; i < questions.length; i++) {
        const qelement = document.createElement('div');
        qelement.id = `question1`;

        const qtitle = document.createElement('h2');
        qtitle.textContent = questions[i].title; // question.title;Question title
        qtitle.class = 'qtitle';

        qelement.addEventListener('click', () => {
            window.location.href = `/singleQuestion.html?id=${questions[i].id}`;
        });

        qelement.appendChild(qtitle);
        listQuestions.appendChild(qelement);
    }
    listQuestions.style.visibility = 'visible';
});
