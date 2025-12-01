fetch('blogs/blogs.json')
    .then(res => res.json())
    .then(blogs => {
        const container = document.getElementById('blog-list');

        // Group blogs by category
        const categories = {};
        blogs.forEach(blog => {
            if (!categories[blog.category]) {
                categories[blog.category] = [];
            }
            categories[blog.category].push(blog);
        });

        // Render categories with expandable sections
        for (const category in categories) {
            const categorySection = document.createElement('div');
            categorySection.classList.add('category-section');

            // Header with arrow
            const header = document.createElement('div');
            header.classList.add('category-header');
            header.innerHTML = `<h2>${category} <span class="arrow">▶</span></h2>`;

            // Hidden blog list container
            const blogList = document.createElement('div');
            blogList.classList.add('blog-items');
            blogList.style.display = "none";

            categories[category].forEach(blog => {
                const blogItem = document.createElement('div');
                blogItem.innerHTML = `
                    <h3><a href="./blogs/${blog.path}">${blog.title}</a></h3>
                    <small>Date posted: ${blog.date}</small>
                `;
                blogList.appendChild(blogItem);
            });

            // Toggle expand/collapse
            header.addEventListener('click', () => {
                const isOpen = blogList.style.display === "block";
                blogList.style.display = isOpen ? "none" : "block";
                header.querySelector('.arrow').textContent = isOpen ? '▶' : '▼';
            });

            categorySection.appendChild(header);
            categorySection.appendChild(blogList);
            container.appendChild(categorySection);
        }
    })
    .catch(err => console.error('Failed to load blogs:', err));





// Load personal info from data.json
fetch('data.json')
    .then(res => res.json())
    .then(data => {
        document.getElementById('name').innerText = data.about.name;
        document.getElementById('role').innerText = data.about.role;
        const emailEl = document.getElementById('email');
        emailEl.href = `mailto:${data.about.email}`;
        emailEl.innerText = data.about.email;

        data.skills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            document.getElementById('skills-list').appendChild(li);
        });

        data.education.forEach(edu => {
            const div = document.createElement('div');
            div.classList.add('education-item');
            div.innerHTML = `
                <div class="edu-main">
                    <span class="edu-degree">${edu.degree}</span>
                    <span class="edu-year">${edu.year}</span>
                </div>
                <div class="edu-institute">${edu.institute}</div>
            `;
            document.getElementById('education-list').appendChild(div);
        });

        data.experience.forEach(exp => {
            const div = document.createElement('div');
            div.classList.add('experience-item');
            div.innerHTML = `
                <div class="exp-main">
                    <span class="exp-role">${exp.role}</span>
                    <span class="exp-duration">${exp.duration}</span>
                </div>
                <div class="exp-company">${exp.company}</div>
            `;
            document.getElementById('experience-list').appendChild(div);
        });


        for (const [platform, link] of Object.entries(data.socials)) {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${link}" target="_blank">${platform}</a>`;
            document.getElementById('socials-list').appendChild(li);
        }
    });

// Dynamically load GitHub Repositories
const GITHUB_USERNAME = 'AvinashYerra'; 

fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
    .then(res => res.json())
    .then(repos => {
        const projectsContainer = document.getElementById('projects-list');
        const filteredRepos = repos.filter(repo => !repo.fork)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0,5);

        filteredRepos.forEach(repo => {
            const li = document.createElement('li');
            // li.innerHTML = `<strong>${repo.name}</strong>: ${repo.description || 'No description'} - <a href="${repo.html_url}" target="_blank">View on GitHub</a>`;
            li.innerHTML = `<strong>${repo.name}</strong> - <a href="${repo.html_url}" target="_blank">View on GitHub</a>`;
            projectsContainer.appendChild(li);
        });
    })
    .catch(err => console.error('Failed to fetch GitHub repos:', err));



    // DARK / LIGHT MODE
const toggleBtn = document.getElementById("theme-toggle");

// load saved mode
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";

    localStorage.setItem("theme", isDark ? "dark" : "light");
});
