// This is the JavaScript part that connects to your backend API.

const postsContainer = document.getElementById('posts-container');
const createPostForm = document.getElementById('create-post-form');

// Function to fetch and display blog posts
async function fetchPosts() {
    try {
        const response = await fetch('http://localhost:3000/posts');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const posts = await response.json();

        postsContainer.innerHTML = '';

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post', 'card', 'mb-4');
            postElement.dataset.id = post._id; 

            let commentsHtml = '';
            if (post.comments && post.comments.length > 0) {
                commentsHtml = post.comments.map(comment => `
                    <div class="comment">
                        <p><strong>${comment.author}</strong>: ${comment.content}</p>
                    </div>
                `).join('');
            } else {
                commentsHtml = '<p>No comments yet.</p>';
            }

            postElement.innerHTML = `
                <div class="card-body">
                    <h2 class="card-title">${post.title}</h2>
                    <p class="card-subtitle mb-2 text-muted">by ${post.author}</p>
                    <p class="card-text">${post.content}</p>
                    <button class="btn btn-warning btn-sm edit-btn">Edit</button>
                    <button class="btn btn-danger btn-sm delete-btn">Delete</button>
                </div>
                <div class="card-footer bg-light">
                    <div class="comment-section">
                        <h6>Comments</h6>
                        ${commentsHtml}
                        <form class="comment-form">
                            <input type="text" class="form-control form-control-sm mb-2" placeholder="Your Name" required>
                            <textarea class="form-control form-control-sm mb-2" placeholder="Write a comment..." required></textarea>
                            <button type="submit" class="btn btn-secondary btn-sm">Submit Comment</button>
                        </form>
                    </div>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });

    } catch (error) {
        console.error('There was a problem fetching the posts:', error);
        postsContainer.innerHTML = '<p>Could not load blog posts. Please check if your server is running.</p>';
    }
}

// Function to handle deleting a post
async function deletePost(postId) {
    try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('Post deleted successfully!');
            fetchPosts(); 
        } else {
            console.error('Failed to delete post');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to handle updating a post
async function updatePost(postId, newContent) {
    try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: newContent })
        });

        if (response.ok) {
            console.log('Post updated successfully!');
            fetchPosts();
        } else {
            console.error('Failed to update post');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Handle the new post form submission
createPostForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;

    const newPost = {
        title: title,
        author: author,
        content: content
    };

    try {
        const response = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });

        if (response.ok) {
            createPostForm.reset();
            fetchPosts(); 
        } else {
            console.error('Failed to create post');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Add an event listener to the posts container for the buttons
postsContainer.addEventListener('click', async (e) => {
    // Handle Delete button click
    if (e.target.classList.contains('delete-btn')) {
        const postId = e.target.closest('.post').dataset.id;
        if (confirm('Are you sure you want to delete this post?')) {
            deletePost(postId);
        }
    }
    // Handle Edit button click
    if (e.target.classList.contains('edit-btn')) {
        const postId = e.target.closest('.post').dataset.id;
        const newContent = prompt('Enter the new content for this post:');
        if (newContent) {
            updatePost(postId, newContent);
        }
    }
    // Handle Comment form submission
    if (e.target.tagName === 'BUTTON' && e.target.closest('.comment-form')) {
        e.preventDefault();
        const commentForm = e.target.closest('.comment-form');
        const postId = commentForm.closest('.post').dataset.id;
        const author = commentForm.querySelector('input').value;
        const content = commentForm.querySelector('textarea').value;

        try {
            const response = await fetch(`http://localhost:3000/posts/${postId}`/comments, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ author, content })
            });

            if (response.ok) {
                commentForm.reset(); // Reset the comment form
                fetchPosts();
            } else {
                console.error('Failed to submit comment');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
});

// Initial call to fetch posts when the page loads
fetchPosts();