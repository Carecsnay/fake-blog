async function readPost() {
    let postArea = document.querySelector('.posts');
    postArea.innerHTML = 'Loading... Please wait!';

    let request = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await request.json();

    if (json.length > 0) {
        postArea.innerHTML = '';

        for (let i of json) {
            let postDiv = document.createElement('div');
            let postTitle = document.createElement('h1');
            let postBody = document.createElement('p');

            postTitle.textContent = `(${i.id} / 100) - ${i.title}`;
            postBody.textContent = i.body;

            postArea.appendChild(postDiv);
            postDiv.appendChild(postTitle);
            postDiv.appendChild(postBody);

        }
    } else {
        postArea.innerHTML = 'No posts to display, please check your server connection!'
    }
}

async function addNewPost(title, body) {
    await fetch('https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                userId: 2,
                title: title,
                body: body
            })
        });
        document.querySelector('input.title').value = '';
        document.querySelector('.textArea').value = '';
        readPost();
}

let btn = document.querySelector('.insertBnt');
btn.addEventListener('click', () => {
    let title = document.querySelector('input.title').value;
    let body = document.querySelector('.textArea').value;

    if (title && body) {
        addNewPost(title, body)
    } else {
        alert('Please, fill all fields!');
    }
})

readPost(); 