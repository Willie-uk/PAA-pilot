import { type JSX } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Footer from "../paa/Footer";
import { useAuthStore } from "../store/authStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Analysis(): JSX.Element {
  const user = useAuthStore((state) => state.user);

  const lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Patients Helped in 2025",
        data: [120, 150, 300, 450, 600, 750, 900],
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const barChartData = {
    labels: ["Nurses", "Physiotherapists", "Caregivers"],
    datasets: [
      {
        label: "Most requested in %",
        data: [10, 30, 90],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const staggeredItems = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Container className="py-5 bg-light">
      <motion.div initial="hidden" animate="show" variants={staggerContainer}>
        <motion.h1 className="text-center mt-4" variants={staggeredItems}>
          Patient Assist App general analysis
        </motion.h1>
        <motion.p
          className="text-center mb-4 text-secondary"
          variants={staggeredItems}
        >
          Hi {user?.name}, this is an Analysis of Application Growth and its
          Impact
        </motion.p>
        <motion.p className="text-center mb-5" variants={staggeredItems}>
          Over the past year, this platform has transformed healthcare delivery
          by connecting skilled professionals with patients and families in
          need. Our app has made a positive impact on the lives of many, helping
          to ensure timely and personalized care for patients from the comfort
          of their homes.
        </motion.p>

        <Row className="mb-5">
          <Col md={6}>
            <motion.div variants={staggeredItems}>
              <Card className="p-4 shadow-sm rounded-5 mb-3">
                <h5 className="text-center">Patients Helped Over Time</h5>
                <Line data={lineChartData} />
              </Card>
            </motion.div>
          </Col>
          <Col md={6}>
            <motion.div variants={staggeredItems}>
              <Card className="p-4 shadow-sm rounded-5">
                <h5 className="text-center">
                  General Distribution of Medical Professionals
                </h5>
                <Bar data={barChartData} />
              </Card>
            </motion.div>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={4}>
            <motion.div variants={staggeredItems}>
              <Card
                className="p-4 shadow-sm text-center mb-3 rounded-5"
                style={{
                  color: "#fff",
                  background:
                    "linear-gradient(165deg, #2c4735 0%, #1d243e 60%, #101124 90%)",
                }}
              >
                <h3>
                  <CountUp start={0} end={1200} duration={2.5} />+
                </h3>
                <p>Patients Served</p>
              </Card>
            </motion.div>
          </Col>
          <Col md={4}>
            <motion.div variants={staggeredItems}>
              <Card
                className="p-4 shadow-sm text-center mb-3 rounded-5"
                style={{
                  color: "#fff",
                  background:
                    "linear-gradient(170deg, #3b3b58 0%, #252545 60%, #161628 100%)",
                }}
              >
                <h3>
                  <CountUp start={0} end={100} duration={2.5} />+
                </h3>
                <p>Medical Professionals Signed Up</p>
              </Card>
            </motion.div>
          </Col>
          <Col md={4}>
            <motion.div variants={staggeredItems}>
              <Card
                className="p-4 shadow-sm text-center mb-3 rounded-5"
                style={{
                  color: "#fff",
                  background:
                    "linear-gradient(160deg, #343a40 0%, #222831 70%, #0d1117 100%)",
                }}
              >
                <h3>
                  <CountUp start={0} end={2500} duration={2.5} />+
                </h3>
                <p>Successful Consultations</p>
              </Card>
            </motion.div>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={4}>
            <motion.div variants={staggeredItems}>
              <Card className="p-4 shadow-sm mb-3 rounded-4">
                <h5 className="text-center">Service Availability (Nurses)</h5>
                <ProgressBar now={10} label="10%" />
              </Card>
            </motion.div>
          </Col>
          <Col md={4}>
            <motion.div variants={staggeredItems}>
              <Card className="p-4 shadow-sm mb-3 rounded-4">
                <h5 className="text-center">
                  Service Availability (Physiotherapists)
                </h5>
                <ProgressBar now={30} label="30%" />
              </Card>
            </motion.div>
          </Col>
          <Col md={4}>
            <motion.div variants={staggeredItems}>
              <Card className="p-4 shadow-sm mb-3 rounded-4">
                <h5 className="text-center">
                  Service Availability (Caregivers)
                </h5>
                <ProgressBar now={90} label="90%" />
              </Card>
            </motion.div>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <motion.div variants={staggeredItems}>
              <Card
                className="p-4 shadow-sm text-center bg-dark text-white"
                style={{ borderRadius: "30px" }}
              >
                <h4>"This platform has been a game-changer for our family."</h4>
                <p>- A Satisfied Family Member</p>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </motion.div>
      <Footer />
    </Container>
  );
}

export default Analysis;
