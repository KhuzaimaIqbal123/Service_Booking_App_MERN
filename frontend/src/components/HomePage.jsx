import React, { useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const services = [
    { name: "AC Repair", price: 1500, description: "Our AC repair service is designed to get your air conditioning unit up and running quickly and efficiently.", image: "../../Pictures/1.jpeg" },
    { name: "Car Wash", price: 500, description: "Our car wash service is designed to get your car clean and shiny in no time.", image: "../../Pictures/2.jpeg" },
    { name: "Computer Repair", price: 700, description: "Our computer repair service is designed to get your computer up and running quickly and efficiently", image: "../../Pictures/3.jpeg" },
    { name: "Bike Service", price: 400, description: "Our bike service is designed to get your bike in top working condition", image: "../../Pictures/4.jpeg" },
    { name: "House Cleaning", price: 2000, description: "Get your home sparkling clean with our house cleaning service.", image: "../../Pictures/5.jpeg" }
  ];

  const handleBookNow = async (service) => {
    if (!user) {
      alert("Please login first to book a service.");
      return navigate("/login");
    }
    try {
      const res = await API.post("/api/booking", {
        serviceName: service.name,
        price: service.price
      });
      alert(res.data.message || "Booking Successful!");
    } catch (err) {
      alert(err.response?.data?.message || "Booking Failed!");
    }
  };

  return (
    <div>
      <h1 style={styles.heading}>Service Booking App</h1>
      <div style={styles.container}>
        {services.map((service, index) => (
          <div key={index} style={styles.card}>
            <img src={service.image} alt={service.name} style={styles.image} />
            <h2 style={styles.title}>{service.name}</h2>
            <p style={styles.price}><strong>Price:</strong> {service.price} PKR</p>
            <p style={styles.description}>{service.description}</p>
            <button style={styles.button} onClick={() => handleBookNow(service)}>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
const styles = {
  heading: {
    textAlign: 'center',
    fontSize: '40px',
    color: 'darkslategray',
    marginTop: '40px',
    marginBottom: '30px',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
    justifyContent: 'center',
    padding: '20px'
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '250px',
    padding: '18px',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column'
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '5px',
    marginBottom: '10px'
  },
  title: {
    margin: '10px 0 15px 0',
    fontSize: '26px',
    fontWeight: 'bold'
  },
  price: {
    margin: '5px 0 15px 0',
    fontWeight: 'bold',
    fontSize: '17px',
    color: 'dimgray'
  },
  description: {
    margin: '5px 0 25px 0',
    fontSize: '15px'
  },
  button: {
    marginTop: 'auto',
    padding: '12px',
    backgroundColor: '#333',
    color: 'white',
    fontSize: '15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    alignSelf: 'center',
    minWidth: '120px',
    textAlign: 'center'
  }
};

export default HomePage;
