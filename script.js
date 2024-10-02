let posts = [];
let currentPostIndex = null;

document.getElementById('postForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const date = new Date().toLocaleDateString();

    const newPost = { title, content, date, comments: [] };
    posts.push(newPost);
    displayPosts();
    this.reset();
});

function displayPosts() {
    const postList = document.getElementById('postList');
    postList.innerHTML = '';
    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `<strong>${post.title}</strong><p>${post.content.substring(0, 50)}...</p>`;
        postElement.addEventListener('click', () => showPostDetail(index));
        postList.appendChild(postElement);
    });
}

function showPostDetail(index) {
    const postDetail = document.getElementById('postDetail');
    const postTitle = document.getElementById('postTitle');
    const postDate = document.getElementById('postDate');
    const postContent = document.getElementById('postContent');
    const commentsList = document.getElementById('commentsList');
    
    postTitle.innerText = posts[index].title;
    postDate.innerText = posts[index].date;
    postContent.innerText = posts[index].content;
    
    commentsList.innerHTML = '';
    posts[index].comments.forEach(comment => {
        const commentElement = document.createElement('p');
        commentElement.innerText = comment;
        commentsList.appendChild(commentElement);
    });

    currentPostIndex = index;
    postDetail.classList.remove('hidden');
    document.querySelector('.container').classList.add('hidden');

    document.getElementById('commentForm').onsubmit = function (e) {
        e.preventDefault();
        const comment = document.getElementById('comment').value;
        posts[currentPostIndex].comments.push(comment);
        showPostDetail(currentPostIndex);
        this.reset();
    }
}

function goBack() {
    document.getElementById('postDetail').classList.add('hidden');
    document.querySelector('.container').classList.remove('hidden');
}
