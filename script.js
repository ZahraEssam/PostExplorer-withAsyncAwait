async function loadPosts() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const posts = await res.json();

        posts.slice(0, 5).forEach(async post => {
            const postDiv = document.createElement("div");
            postDiv.className = "post";
            postDiv.innerHTML = `
            <div class="post-header">
                <div class="avatar"></div>
                <div>
                    <div class="username">User ${post.userId}</div>
                    <div class="time">Just now</div>
                </div>
            </div>

            <div class="post-content">
                <strong>${post.title}</strong>
                <p>${post.body}</p>
            </div>

            <div class="comments">Loading comments...</div>
            `;
            postsContainer.appendChild(postDiv);

            try {
                const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
                const comments = await commentsRes.json();
                const commentsDiv = postDiv.querySelector(".comments");
                commentsDiv.innerHTML = "";
                comments.forEach(comment => {
                    const commentDiv = document.createElement("div");
                    commentDiv.className = "comment";
                    commentDiv.innerHTML = `<strong>${comment.name}:</strong> ${comment.body}`;
                    commentsDiv.appendChild(commentDiv);
                });
            } catch(err) {
                const commentsDiv = postDiv.querySelector(".comments");
                commentsDiv.textContent = "Error loading comments";
                console.error(err);
            }
        });
    } catch(err) {
        console.error("Error loading posts:", err);
    }
}

loadPosts();
