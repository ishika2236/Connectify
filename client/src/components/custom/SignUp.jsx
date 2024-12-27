import React, { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // if (!validate()) return;

    try {
      const response = await fetch(`http://localhost:8080/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Login successful", result);
        localStorage.setItem("token", result.token);
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Login failed");
      }
    } catch (error) {
      setErrorMessage("Error submitting form: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={onSubmit} style={styles.form}>
        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

        {/* Name Field */}
        <div >
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            
          />
          {/* {errors.name && <p style={styles.error}>{errors.name}</p>} */}
        </div>

        {/* Email Field */}
        <div >
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password Field */}
        <div >
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};


export default SignUp;
