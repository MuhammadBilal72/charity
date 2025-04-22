import { useState, useContext } from "react";
import API from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-10 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input className="input mb-2" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input className="input mb-4" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <button className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
