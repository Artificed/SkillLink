import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface SignInFormProps {
  // Add your sign in function prop here
  signIn?: (email: string, password: string) => Promise<void>;
}

const SignInPage = ({ signIn }: SignInFormProps) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signIn) {
      setLoading(true);
      try {
        await signIn(formData.email, formData.password);
        navigate('/dashboard');
      } catch (error) {
        setError('Invalid email or password');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fff5f0] flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back!!</h1>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@gmail.com"
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200 pl-10"
                  required
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200 pl-10 pr-10"
                  required
                />
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              <div className="text-right">
                <Link to="/auth/forgot-password" className="text-sm text-[#b17551] hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#FFE4D6] text-[#b17551] py-3 rounded-full font-medium 
                ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#ffd6c2]'} 
                transition-colors`}
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#fff5f0] text-gray-500">or</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-50"
              >
                <img src="/google-icon.svg" alt="Google" className="w-6 h-6" />
              </button>
              <button
                type="button"
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-50"
              >
                <img src="/facebook-icon.svg" alt="Facebook" className="w-6 h-6" />
              </button>
              <button
                type="button"
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-50"
              >
                <img src="/apple-icon.svg" alt="Apple" className="w-6 h-6" />
              </button>
            </div>
            {/* Sign Up Link */}
            <div className="text-center text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#b17551] hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#fff5f0] items-center justify-center p-8">
        <div className="relative w-full max-w-lg">
          <div className="relative bg-[#FFE4D6] rounded-[40px] p-8">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              {/* Background Circles */}
              <circle cx="200" cy="200" r="150" fill="#FFD6C2" />
              <circle cx="200" cy="200" r="100" fill="#FFEBE0" />
              
              {/* Desk */}
              <rect x="100" y="250" width="200" height="20" fill="#B17551" />
              <rect x="120" y="270" width="160" height="10" fill="#8B5E3C" />
              
              {/* Laptop */}
              <rect x="150" y="200" width="100" height="60" fill="#4A4A4A" />
              <rect x="150" y="245" width="100" height="5" fill="#2D2D2D" />
              
              {/* Character */}
              <circle cx="200" cy="150" r="30" fill="#B17551" /> {/* Head */}
              <rect x="185" y="180" width="30" height="40" fill="#FFFFFF" /> {/* Body */}
              <circle cx="200" cy="130" r="15" fill="#FFFFFF" /> {/* Headphones */}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;