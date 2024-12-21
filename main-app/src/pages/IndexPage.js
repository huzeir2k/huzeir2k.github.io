import React from 'react';
import './IndexPage.css';

const IndexPage = () => {
    return (
        <div className="index-page">
            {/* Header Section */}
            <header className="header">
                <h1>Huzeir Kurpejovic</h1>
                <p>Hi. I see that we're on the same page already!</p>
                <nav>
                    <ul className="nav-list">
                        <li><a href="#about">About</a></li>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#awards">Awards</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </header>

            {/* About Section */}
            <section id="about" className="section about">
                <h2>About Me</h2>
                <p>
                    I'm Huzeir Kurpejovic, a passionate developer dedicated to creating elegant, efficient, and innovative solutions.
                    With expertise in web and mobile applications, I thrive on turning ideas into functional, user-friendly products.
                </p>
            </section>

            {/* Projects Section */}
            <section id="projects" className="section projects">
                <h2>Projects</h2>
                <ul>
                    <li><strong>Project Name 1</strong>: A brief description of the project and its impact.</li>
                    <li><strong>Project Name 2</strong>: Another project showcasing your technical skills.</li>
                    <li><strong>Project Name 3</strong>: Something unique that sets you apart.</li>
                </ul>
            </section>

            {/* Awards Section */}
            <section id="awards" className="section awards">
                <h2>Awards</h2>
                <p>
                    Recognized for excellence in development and design, I have received the following accolades:
                </p>
                <ul>
                    <li><strong>Award Name 1</strong>: Description and relevance.</li>
                    <li><strong>Award Name 2</strong>: What it means to your career or skills.</li>
                </ul>
            </section>

            {/* Contact Section */}
            <section id="contact" className="section contact">
                <h2>Contact Me</h2>
                <p>If you would like to collaborate or just say hello, feel free to reach out!</p>
                <ul>
                    <li>Email: <a href="mailto:huzeir2k@gmail.com">huzeir2k@gmail.com</a></li>
                    <li>LinkedIn: <a href="https://www.linkedin.com/in/huzeir-kurpejovic-0ba057192/" target="_blank" rel="noopener noreferrer">linkedin.com/in/huzeirkurpejovic</a></li>
                    <li>GitHub: <a href="https://github.com/huzeir2k" target="_blank" rel="noopener noreferrer">github.com/huzeir2k</a></li>
                </ul>
            </section>
        </div>
    );
};

export default IndexPage;
