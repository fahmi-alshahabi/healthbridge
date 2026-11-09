import { useNavigate } from "react-router-dom";

function Mainpage() {
  const navigate = useNavigate(); // Use the `useNavigate` hook

  const specialties = [
    "Dermatologist",
    "Cardiologist",
    "Gynecologist",
    "Neurologist",
    "Orthopedic",
    "Pediatrician",
    "Psychiatrist",
    "Surgeon",
    "Urologist",
  ];

  const handleClick = () => {
    navigate("/login"); // Navigate to the login page
  };
  const getImage = (specialty) => {
    try {
      return require(`../../images/${specialty.toLowerCase()}.png`); // Adjust the path if necessary
    } catch (e) {
      return require("../../images/default.png"); // Fallback image if there's an error (e.g., image not found)
    }
  };

  return (
    <div className="colour-main">
      <div className="layout p-1 register-b">
        {/* Header Bar */}
        <div className="header bg-white p-2 flex justify-between items-center">
          <div className="flex">
            <h2
              className="cursor-pointer"
              onClick={() => navigate("/mainpage")} // Call the `navigate` function
            >
              <strong className="text-primary">HEALTH</strong>
              <strong className="text-secondary"> BRIDGE</strong>
            </h2>
          </div>
          <div className="flex b gap-3 items-center">
            <h4
              class="uppercase cursor-pointer underline press-to-go-back"
              onClick={() => navigate("/contactmain")}
            >
              CONTACT
            </h4>
            <h4 class="uppercase cursor-pointer underline press-to-go-back">
              news
            </h4>
            <h4 class="uppercase cursor-pointer underline press-to-go-back">
              about
            </h4>
            <h4
              class="uppercase cursor-pointer underline press-to-go-back"
              onClick={() => navigate("/login")}
            >
              register/login &nbsp;
              <i class="ri-login-box-line"></i>
            </h4>
          </div>
        </div>
      </div>

      <div className="specialties-container">
        {specialties.map((specialty, index) => (
          <div key={index} className="specialty-box" onClick={handleClick}>
            <div className="specialty-image">
              {/* Use the dynamically imported image */}
              <img
                src={getImage(specialty)} // Dynamically set image source
                alt={specialty}
                className="specialty-img"
              />
            </div>
            <div className="specialty-title">
              <h4>{specialty}</h4>
            </div>
          </div>
        ))}
      </div>
      <div className="help-heading">
        <h3 className="color-white">We’re always here to help</h3>
      </div>

      <div className="contact-section help-card-color">
        <div className="contact-grid">
          <div className="contact-details">
            <h4>Contact Information</h4>
            <p>
              <strong>Call:</strong>
              <a href="07575753708"> 07575753708</a>
            </p>
            <br />
            <p>
              <strong>International Call:</strong>
              <a href="447575067708"> +447575067708</a>
            </p>
            <br />
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:  info@healthbridge.com">info@healthbridge.com</a>
            </p>
            <br />
            <p>
              <strong>Mail the CEO:</strong>{" "}
              <a href="ceo@healthbridge.com">ceo@healthbridge.com</a>
            </p>
            <br />
            <p>
              <strong>Address:</strong>
              <a href="https://maps.app.goo.gl/ghHrqNuuUwUje5xk6">
                {" "}
                38 College Green, Bristol BS1 5SP
              </a>
            </p>
          </div>

          <div className="patient-experience">
            <h4>Patient Experience Team</h4>
            <p>
              <strong>Hotline & WhatsApp:</strong>
              <a href="07575753708"> 07575753708</a>
            </p>
            <br />
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:feedback@theviewhospital.com">
                feedback@healthbridge.com
              </a>
            </p>
          </div>

          <div className="message-form">
            <h4>Drop a Message</h4>
            <form>
              <input
                type="text"
                placeholder="Your Name"
                className="form-input"
              />
              <input
                type="email"
                placeholder="Enter Email"
                className="form-input"
              />
              <input type="text" placeholder="Subject" className="form-input" />
              <textarea
                placeholder="Write Message"
                className="form-textarea"
              ></textarea>
              <button type="submit" className="form-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer">
        <h4 className="footer-text flex">
          Copyright© healthbridge Hospital, All Rights Reserved.
        </h4>
      </div>
    </div>
  );
}

export default Mainpage;
