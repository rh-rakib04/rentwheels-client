import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const axios = useAxios();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { createUser, updateUserProfile, signInWithGoogle, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_KEY;

  const onSubmit = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Creating your account...");

    try {
      // 1. Upload Image to ImgBB
      const imageFile = data.photo[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        formData
      );
      
      if (!imgResponse.data.success) throw new Error("Image upload failed");
      const photoURL = imgResponse.data.data.url;

      // 2. Create User in Firebase
      const result = await createUser(data.email, data.password);

      // 3. Update Firebase Profile - PASSING STRINGS ONLY
      // This prevents the "Scalar Field" error
      await updateUserProfile(data.name, photoURL);

      // 4. Save User Info to MongoDB
      const userInfo = {
        name: data.name,
        email: data.email.toLowerCase(),
        image: photoURL,
        role: "user"
      };

      await axios.post("/users", userInfo);

      // 5. Manually sync the local user state
      setUser({ ...result.user, displayName: data.name, photoURL });

      toast.success("Welcome to RentWheels!", { id: toastId });
      navigate("/");
    } catch (error) {
      console.error(error);
      const msg = error.code === "auth/email-already-in-use" 
        ? "Email already exists!" 
        : error.message;
      toast.error(msg || "Registration failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const userInfo = {
        name: user.displayName,
        email: user.email.toLowerCase(),
        image: user.photoURL,
        role: "user"
      };

      await axios.post("/users", userInfo);
      toast.success("Signed in with Google!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4">
      <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-3xl p-8 w-full max-w-md border border-slate-200 dark:border-zinc-800">
        <h1 className="text-3xl font-black italic uppercase tracking-tighter text-center mb-2 text-slate-800 dark:text-white">
          Join <span className="text-yellow-500">RentWheels</span>
        </h1>
        <p className="text-center text-slate-500 dark:text-zinc-500 mb-8 text-xs font-bold uppercase tracking-widest">
          Start your premium journey
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 ml-1">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required", minLength: { value: 3, message: "Too short" }})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-black text-white focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.name.message}</p>}
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 ml-1">Profile Picture</label>
            <input
              type="file"
              {...register("photo", { required: "Photo is required" })}
              className="w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-yellow-500 file:text-black hover:file:bg-yellow-400 cursor-pointer"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 ml-1">Email Address</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-black text-white focus:ring-2 focus:ring-yellow-500 outline-none"
              placeholder="john@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 ml-1">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message: "At least 6 chars, uppercase & lowercase",
                  },
                })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-black text-white focus:ring-2 focus:ring-yellow-500 outline-none"
              />
              <span onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500">
                {show ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.password.message}</p>}
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-widest py-4 rounded-xl shadow-lg transition-all flex justify-center items-center disabled:opacity-50"
          >
            {loading ? <TbFidgetSpinner className="animate-spin text-2xl" /> : "Create Account"}
          </button>
        </form>

        <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800"></div></div>
            <span className="relative px-4 bg-white dark:bg-slate-900 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Social Entry</span>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-transparent text-white py-3 rounded-xl font-bold border border-zinc-800 hover:bg-zinc-800/50 transition-all text-sm"
        >
          <FcGoogle size={20} /> Sign in with Google
        </button>

        <p className="text-[11px] font-bold text-center mt-8 text-zinc-500 uppercase tracking-tight">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-yellow-500 hover:underline ml-1">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;