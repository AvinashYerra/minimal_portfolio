fetch('blogs/blogs.json')
    .then(res => res.json())
    .then(blogs => {
        const container = document.getElementById('blog-list');
        blogs.forEach(blog => {
            const blogItem = document.createElement('div');
            blogItem.innerHTML = `
                <h3><a href="blogs/${blog.path}">${blog.title}</a></h3>
                <small>Date posted: ${blog.date}</small>
            `;
            container.appendChild(blogItem);
        });
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
            const li = document.createElement('li');
            li.textContent = `${edu.degree}, ${edu.institute} (${edu.year})`;
            document.getElementById('education-list').appendChild(li);
        });

        data.experience.forEach(exp => {
            const li = document.createElement('li');
            li.textContent = `${exp.role} at ${exp.company} (${exp.duration})`;
            document.getElementById('experience-list').appendChild(li);
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
