import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import { useState, type JSX } from "react";

function Hero(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = () => {
    setIsLoading(true);

    // Simulate loading delay (optional)
    setTimeout(() => {
      setIsLoading(false);
      // Navigation handled by Link
    }, 2000);
  };

  return (
    <div className="px-4 py-1 my-5 text-center">
      <h1 className="display-5 fw-bold">Patient Assist</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Who is eligible to use this website/app?... Post surgical patients,
          patients with: critical / terminal illness, disability, amputees,
          elderly, children with special needs... etc, including those unable to
          do activities of daily living and other considerable factors.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link
            to="/paa/medic"
            onClick={handleClick}
            className="btn btn-outline-secondary btn-lg px-4 gap-3"
          >
            {isLoading ? <Loader className="animate-spin-loader" /> : "Join us"}
          </Link>
          <Link
            to="/paa/medic"
            onClick={handleClick}
            className="btn btn-warning btn-lg px-4"
          >
            {isLoading ? <Loader className="animate-spin-loader" /> : "Medics"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
