import React, { useState } from "react";
import API from '../api';
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/register", formData);
      alert(res.data.message || "User registered successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sign Up</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required style={styles.input} />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required style={styles.input} />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required style={styles.input} />
        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
}

const styles = {
  container: { maxWidth: '400px', margin: '80px auto', padding: '30px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' },
  heading: { marginBottom: '20px', fontSize: '28px', color: 'darkslategray' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' },
  button: { padding: '10px', fontSize: '16px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default SignupPage;
