import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();
  const handleNavigateToLogin = () => {
    navigate("/mainpage");
  };
  return (
    <div className=" register-b flex justify-center items-center h-screen">
      <div className="w-800 bg-white h-800 p-2 form-container">
        <h2
          className="h2-r uppercase my-1 cursor-pointer"
          onClick={handleNavigateToLogin}
        >
          <strong className="text-primary">HEALTH</strong>
          <strong className="text-secondary">BRIDGE</strong>
        </h2>
        <hr className="mb-1" />
        {/* Contact Section */}
        <div className="flex flex-col items-start gap-6 contact-box">
          {/* Call Us */}
          <div className="flex items-center gap-4">
            <div className="contact-icons">
              <FaPhone size={24} color="white" />
            </div>
            <div className="contact-text">
              <p className="text-lg font-bold">&nbsp; Call us</p>
              <p className="text-sm text-gray-600 ">
                {" "}
                &nbsp;
                <a className="contactarf" href="07575753708">
                  07575753708
                </a>
              </p>
            </div>
          </div>
          <br />
          {/* For International Calls */}
          <div className="flex items-center gap-4">
            <div className="contact-icons">
              <FaPhone size={24} color="white" />
            </div>
            <div className="contact-text">
              <p className="text-lg font-bold">
                {" "}
                &nbsp;For International Calls
              </p>
              <p className="text-sm text-gray-600">
                &nbsp;{" "}
                <a className="contactarf" href="+447575067708">
                  +447575067708
                </a>
              </p>
            </div>
          </div>
          <br />
          {/* Email Us */}
          <div className="flex items-center gap-4">
            <div className="contact-icons">
              <FaEnvelope size={24} color="white" />
            </div>
            <div className="contact-text">
              <p className="text-lg font-bold">&nbsp; E-mail us</p>
              <p className="text-sm text-gray-600">
                &nbsp;{" "}
                <a className="contactarf" href="info@healthbridge.com">
                  info@healthbridge.com
                </a>
              </p>
            </div>
          </div>
          <br />
          {/* Email the CEO */}
          <div className="flex items-center gap-4">
            <div className="contact-icons">
              <FaEnvelope size={24} color="white" />
            </div>
            <div className="contact-text">
              <p className="text-lg font-bold">&nbsp; E-mail the CEO</p>
              <p className="text-sm text-gray-600">
                &nbsp;{" "}
                <a className="contactarf" href="ceo@healthbridge.com">
                  ceo@healthbridge.com
                </a>
              </p>
            </div>
          </div>
          <br />
          {/* Location */}
          <div className="flex items-center gap-4">
            <div className="contact-icons">
              <FaMapMarkerAlt size={24} color="white" />
            </div>
            <div className="contact-text">
              <p className="text-lg font-bold">&nbsp; Location</p>
              <p className="text-sm text-gray-600">
                &nbsp;{" "}
                <a
                  className="contactarf"
                  href="https://maps.app.goo.gl/ghHrqNuuUwUje5xk6"
                >
                  38 College Green, Bristol BS1 5SP
                </a>
              </p>
            </div>
          </div>
          <h4 className="press-to-go-back" onClick={handleNavigateToLogin}>
            press to go back
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Contact;
