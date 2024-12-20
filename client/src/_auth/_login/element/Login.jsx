import React from "react";
import { Link } from "react-router-dom";
import cake from "../../../assets/background/cake.png";
import login_background from "../../../assets/background/login_background.jpg";
import { useState } from "react";
import { useMutation, QueryClient} from "@tanstack/react-query";
import { toast, Toaster } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const Login = () => {
  const [ setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const queryClient = useQueryClient();

  const { mutate: login, isError, error, isPending } = useMutation({
    mutationFn: async (formData) => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.error || "Failed to login");
            console.log(data);
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    onSuccess: () => {
        toast.success("Login successfully");
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
        toast.error(error.message);
    }
})

  const handleSubmit = (e) => {
    e.preventDefault(); // page won't reload
    console.log(formData);
    // signup(formData);
    // send verification email
    // login(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <section>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className="bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(${login_background})` }}
      >
        <div className=" flex items-center justify-center space-x-[60px]">
          <div className="flex flex-col w-[500px] h-[450px] items-center justify-center  mt-[100px]">
            <div className="bg-white w-full p-8 shadow-md rounded-[50px] bg-opacity-65 backdrop-blur-md">
              <div className=" flex flex-col justify-center items-center text-[40px] font-bold py-5">
                <p className="">Sign In</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    onChange={handleInputChange}
                    value={formData.username}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#41759B] focus:border-[#6aacdc]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleInputChange}
                    value={formData.password}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#41759B] focus:border-[#6aacdc]"
                    required
                  />
                  <Link to="/forgotpass">
                  <p className="text-sm text-gray-500 mt-2 px-2">
                    Forgot your password?
                  </p>
                  </Link>
                </div>

                <div className="flex flex-col justify-center  mt-5">
                  <button
                    type="submit"
                    className="w-full bg-[#41759B] text-white py-2 px-5 mb-1 rounded-lg  hover:bg-[#1c4f73] transition duration-200"
                    onClick={() => login(formData)}
                  >
                    Login
                  </button>
                  <Link to="/signup">
                    <button
                      type="submit"
                      className="w-full bg-white border border-[#41759B] text-[#41759B] py-[5px] px-5 rounded-lg shadow-md hover:text-white hover:bg-[#41759B] transition duration-200"
                    >
                      Sign Up
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Login;
