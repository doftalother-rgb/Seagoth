function switchTab(pageId, element) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    const targetSection = document.getElementById(pageId);
    if (targetSection) {
        targetSection.classList.add('active'); 
    }

    if (element) {
        element.classList.add('active');
    }
}

function openModal() {
    const modal = document.getElementById('postModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeModal() {
    const modal = document.getElementById('postModal');
    if (modal) {
        modal.style.display = 'none';  
    }
}

function handleCreatePost(event) {
    event.preventDefault();

    const titleInput = document.getElementById('post-title');
    const communitySelect = document.getElementById('post-community');
    const textInput = document.getElementById('post-text');

    if (!titleInput || !textInput) return;

    const title = titleInput.value;
    const community = communitySelect.value;
    const text = textInput.value;

    const postsFeed = document.getElementById('postsFeed');

    const newPost = document.createElement('article');
    newPost.className = 'post-card';
    newPost.innerHTML = `
        <div class="post-header">
            <img src="https://i.pravatar.cc/100?img=68" alt="Avatar" class="avatar">
            <div>
                <h4 class="post-author">Вы</h4>
                <span class="post-time">Только что • ${community}</span>
            </div>
        </div>
        <h3 class="post-title">${escapeHtml(title)}</h3>
        <p class="post-content">${escapeHtml(text)}</p>
        <div class="post-footer">
            <button class="action-btn">❤️ 0</button>
            <button class="action-btn">💬 0 комментариев</button>
        </div>
    `;

    postsFeed.prepend(newPost);

    document.getElementById('createPostForm').reset();
    closeModal();
    
    const homeTab = document.querySelector('.nav-item');
    switchTab('home-page', homeTab);
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

window.handleCreatePost = async function(event) {
    event.preventDefault(); 

    const title = document.getElementById('post-title').value;
    const community = document.getElementById('post-community').value;
    const text = document.getElementById('post-text').value;

    const newPost = {
        title: title,
        community: community,
        text: text,
        author: "Аноним", 
        createdAt: Date.now()
    };

    await window.savePostToFirebase(newPost);

    document.getElementById('createPostForm').reset();

    if (typeof closeModal === 'function') {
        closeModal();
    }
};