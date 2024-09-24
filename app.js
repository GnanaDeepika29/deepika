// Load feed from localStorage when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadFeed();
});

// Create a new post
function createPost() {
    const content = document.getElementById('post-content').value;

    if (content.trim() === '') {
        alert("Post content is required!");
        return;
    }

    const post = {
        content: content,
        timestamp: new Date().toLocaleString(),
        likes: 0, // Initialize post with 0 likes
        comments: [] // Initialize post with an empty array for comments
    };

    // Save the post in localStorage
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    // Clear input fields
    document.getElementById('post-content').value = '';

    // Reload the feed
    loadFeed();
}

// Load the feed (all posts)
function loadFeed() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';

    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        // Post content and timestamp
        postDiv.innerHTML = `<p>${post.content} <small>(Posted on ${post.timestamp})</small></p>`;

        // Create like button
        const likeBtn = document.createElement('button');
        likeBtn.textContent = `Like (${post.likes})`;
        likeBtn.classList.add('like-btn');

        // Add functionality to increment likes
        likeBtn.onclick = function () {
            post.likes++; // Increment likes
            localStorage.setItem('posts', JSON.stringify(posts));
            loadFeed(); // Reload feed to show updated likes
        };

        // Create comment input
        const commentInput = document.createElement('input');
        commentInput.type = 'text';
        commentInput.placeholder = 'Add a comment...';
        commentInput.classList.add('comment-input');

        // Create comment button
        const commentBtn = document.createElement('button');
        commentBtn.textContent = 'Comment';
        commentBtn.classList.add('comment-btn');

        // Add functionality to add a comment
        commentBtn.onclick = function () {
            const commentContent = commentInput.value.trim();
            if (commentContent) {
                post.comments.push({
                    text: commentContent,
                    timestamp: new Date().toLocaleString()
                });
                localStorage.setItem('posts', JSON.stringify(posts));
                loadFeed(); // Reload feed to show updated comments
            }
            commentInput.value = ''; // Clear the input
        };

        // Create comments display section
        const commentsDiv = document.createElement('div');
        commentsDiv.classList.add('comments');

        post.comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.textContent = `${comment.text} (Commented on ${comment.timestamp})`;
            commentsDiv.appendChild(commentDiv);
        });

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');

        // Add functionality to delete post
        deleteBtn.onclick = function () {
            if (confirm("Are you sure you want to delete this post?")) {
                posts.splice(index, 1); // Remove post from array
                localStorage.setItem('posts', JSON.stringify(posts));
                loadFeed(); // Reload feed to reflect the deletion
            }
        };

        // Append elements to post div
        postDiv.appendChild(likeBtn);
        postDiv.appendChild(commentInput);
        postDiv.appendChild(commentBtn);
        postDiv.appendChild(commentsDiv);
        postDiv.appendChild(deleteBtn);
        feed.appendChild(postDiv);
    });
}
