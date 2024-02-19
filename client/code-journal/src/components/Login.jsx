import axios from "axios";
import React, { useState } from "react";

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleUsernameOrEmailChange = (e) => {
    setUsernameOrEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const apiUrl = "http://localhost:3000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {};

    if (usernameOrEmail.includes("@")) {
      requestBody.email = usernameOrEmail;
    } else {
      requestBody.username = usernameOrEmail;
    }

    requestBody.password = password;

    try {
      const response = await axios.post(
        `${apiUrl}/user/auth/login`,
        requestBody
      );

      if (response.status === 200) {
        console.log("Login successful");
        setError(null);
      } else {
        setError("Login failed");
      }
    } catch (error) {
      setError("Login failed");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
      >
        <h2 className="m-5 ml-24 justify-centre font-bold">Code Journal</h2>
        <div className="mb-4">
          <label
            htmlFor="usernameOrEmail"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username or Email:
          </label>
          <input
            type="text"
            id="usernameOrEmail"
            placeholder="Enter your username or email"
            value={usernameOrEmail}
            onChange={handleUsernameOrEmailChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>

        {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
      </form>
    </div>
  );
}
