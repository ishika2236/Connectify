import React, { useState } from 'react';
import { Button, Input, Stack, Box, Text } from "@chakra-ui/react";
import { Field } from "../ui/field";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
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

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;  // Returns true if no errors
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(`http://localhost:8080/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        mode: "cors",
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Login successful', result);
        localStorage.setItem('token', result.token);
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Login failed");
      }
    } catch (error) {
      setErrorMessage("Error submitting form: " + error.message);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bg="gray.800"
      p={4}
    >
      <form onSubmit={onSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <Stack gap="4" align="flex-end">
          {errorMessage && (
            <Text color="red.500" fontSize="sm" textAlign="right">
              {errorMessage}
            </Text>
          )}

          <Field
            label="Name"
            invalid={!!errors.name}
            errorText={errors.name}
          >
            <Input
              name="name"  
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              focusBorderColor="teal.400"
              border="1px solid"
              borderColor="gray.500"
              _focus={{ borderColor: "teal.400" }}
            />
          </Field>

          <Field
            label="Email"
            invalid={!!errors.email}
            errorText={errors.email}
          >
            <Input
              name="email"  // Match the name in the state (email)
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              focusBorderColor="teal.400"
              border="1px solid"
              borderColor="gray.500"
              _focus={{ borderColor: "teal.400" }}
            />
          </Field>

          <Field
            label="Password"
            invalid={!!errors.password}
            errorText={errors.password}
          >
            <Input
              name="password"  // Match the name in the state (password)
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              focusBorderColor="teal.400"
              border="1px solid"
              borderColor="gray.500"
              _focus={{ borderColor: "teal.400" }}
              type="password"
            />
          </Field>

          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            _hover={{ bg: "teal.600" }}
            _active={{ bg: "teal.700" }}
            border="1px solid"
            borderColor="teal.400"
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
