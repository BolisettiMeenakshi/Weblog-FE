import React, { useState, useEffect } from 'react';

const Posts = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/posts/');
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleCreatePost = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            alert("⚠️ Please login first.");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/posts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                }),
            });

            if (response.ok) {
                alert("✅ Post created successfully!");
                setTitle('');
                setContent('');
                fetchPosts();
            } else {
                alert("❌ Failed to create post. Check your token.");
            }
        } catch (error) {
            console.error('Error creating post:', error);
            alert('⚠️ Server error.');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Poppins, sans-serif' }}>
            <h2>Create a Post</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="4"
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            ></textarea>
            <button
                onClick={handleCreatePost}
                style={{
                    padding: '10px 20px', backgroundColor: '#4a90e2',
                    color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'
                }}
            >
                Create Post
            </button>

            <h2 style={{ marginTop: '30px' }}>All Posts</h2>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', margin: '10px 0' }}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </div>
                ))
            ) : (
                <p>No posts yet.</p>
            )}
        </div>
    );
};

export default Posts;
