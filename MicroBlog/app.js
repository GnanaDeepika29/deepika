let posts = [];
function createPost() {
    const postText = document.getElementById('postText').value;
    const postImage = document.getElementById('postImage').files[0];
    
    if (!postText && !postImage) {
        alert("Post can't be empty!");
        return;
    }

    let reader = new FileReader();
    reader.onloadend = function () {
        const post = {
            id: posts.length,
            text: postText,
            image: reader.result,
            likes: 0,
            dislikes: 0,
            comments: []
        };
        posts.push(post);
        renderPosts();
    };

    if (postImage) {
        reader.readAsDataURL(postImage);
    } else {
        const post = {
            id: posts.length,
            text: postText,
            image: null,
            likes: 0,
            dislikes: 0,
            comments: []
        };
        posts.push(post);
        renderPosts();
    }

    document.getElementById('postText').value = '';
    document.getElementById('postImage').value = '';
}

function renderPosts() {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';
    posts.forEach((post) => {
        let postHtml = `
            <div class="post">
                <p>${post.text}</p>
                ${post.image ? `<img src="${post.image}" alt="Post Image">` : ''}
                <div class="actions">
                    <span class="likes" onclick="likePost(${post.id})">👍 ${post.likes}</span>
                    <span class="dislikes" onclick="dislikePost(${post.id})">👎 ${post.dislikes}</span>
                    <span class="comments" onclick="toggleComments(${post.id})">💬 Comment</span>
                </div>
                <div class="comment-section" id="comment-section-${post.id}" style="display: none;">
                    <div class="comment-box">
                        <input type="text" id="comment-input-${post.id}" placeholder="Add a comment">
                        <button onclick="addComment(${post.id})">Post</button>
                    </div>
                    <div class="comments-list" id="comments-list-${post.id}">
                        ${post.comments.map(comment => `<p>${comment}</p>`).join('')}
                    </div>
                </div>
            </div>
        `;
        postsContainer.innerHTML += postHtml;
    });
}

function likePost(postId) {
    posts[postId].likes++;
    renderPosts();
}

function dislikePost(postId) {
    posts[postId].dislikes++;
    renderPosts();
}

function toggleComments(postId) {
    const commentSection = document.getElementById(`comment-section-${postId}`);
    commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
}

function addComment(postId) {
    const commentInput = document.getElementById(`comment-input-${postId}`);
    const commentText = commentInput.value;
    if (commentText) {
        posts[postId].comments.push(commentText);
        commentInput.value = '';
        renderPosts();
    }
}
