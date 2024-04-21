import "../styles/contact.css";

function Contact() {
  return (
    <div className="contact-container">
      <div className="glassy-card">
        <div className="contact-card">
          <img src="/images/team_member_1.jpeg" alt="Team Member 1" />
          <h2>Rahil Ganatra</h2>
          <p>Backend Developer</p>
          <p>Email: rahilganatra@gmail.com</p>
          <p>
            GitHub:{" "}
            <a
              href="https://github.com/grahil-24"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rahil Ganatra
            </a>
          </p>
          <p>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/johndoe"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rahil Ganatra
            </a>
          </p>
        </div>
      </div>
      <div className="glassy-card">
        <div className="contact-card">
          <img src="/images/team_member_2.jpeg" alt="Team Member 2" />
          <h2>Vaidik Pandya</h2>
          <p>Web Developer</p>
          <p>Email: vaidik24pandya@gmail.com</p>
          <p>
            GitHub:{" "}
            <a
              href="https://github.com/vaidik24"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vaidik24
            </a>
          </p>
          <p>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/vaidik-pandya/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vaidik24
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
