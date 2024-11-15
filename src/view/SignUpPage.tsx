import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Phone, Lock, User as UserIcon } from 'lucide-react';
import { User } from '../models/User';
import { Link } from 'react-router-dom';


// Type untuk data yang dikirim ke createUser (tanpa userId dan createdAt)
type CreateUserData = Omit<User, 'userId' | 'createdAt'>;

interface SignUpFormProps {
  createUser: (
    userData: Omit<User, 'userId' | 'createdAt'>,
    onSuccess: () => void,
    onError: (error: string) => void
  ) => Promise<void>;
}

const SignUpPage = ({ createUser }: SignUpFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CreateUserData>({
    email: '',
    password: '',
    phoneNumber: '',
    fullName: '',
    role: 'student', // Default role
    courses: [], // Initialize empty courses array
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const userId = `user_${Date.now()}`; // Temporary userId generator

    try {
      await createUser(
        formData,
        () => {
          setLoading(false);
          alert('Account created successfully!');
          // Reset form
          setFormData({
            email: '',
            password: '',
            phoneNumber: '',
            fullName: '',
            role: 'student',
            courses: [],
          });
        },
        (errorMsg) => {
          setLoading(false);
          setError(errorMsg);
        }
      );
    } catch (err) {
      setLoading(false);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-[#fff5f0] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl flex gap-8 items-center">
        {/* Left side - Decorative SVG */}
        <div className="hidden lg:block w-1/2">
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
              
              {/* Books */}
              <rect x="270" y="220" width="40" height="30" fill="#FF9B7B" />
              <rect x="275" y="215" width="30" height="5" fill="#B17551" />
              <rect x="90" y="220" width="40" height="30" fill="#B17551" />
              
              {/* Coffee Cup */}
              <circle cx="300" cy="200" r="15" fill="#4A4A4A" />
              <rect x="285" y="190" width="30" height="20" fill="#2D2D2D" />
              
              {/* Decorative Elements */}
              <circle cx="100" cy="100" r="20" fill="#FF9B7B" opacity="0.6" />
              <circle cx="300" cy="150" r="15" fill="#B17551" opacity="0.6" />
              <circle cx="150" cy="80" r="25" fill="#FFD6C2" opacity="0.6" />
              
              <path d="M50,150 Q200,50 350,150" stroke="#B17551" fill="none" strokeWidth="2" opacity="0.4" />
              <path d="M50,180 Q200,80 350,180" stroke="#FF9B7B" fill="none" strokeWidth="2" opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 max-w-md">
          <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Create Account</h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200 pl-10"
                  required
                />
                <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

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

            {/* Phone Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Phone Number</label>
              <div className="relative">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200 pl-10"
                  required
                />
                <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200"
                required
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#FFE4D6] text-[#b17551] py-3 rounded-full font-medium 
                ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#ffd6c2]'} 
                transition-colors`}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            {/* Sign In Link */}
            <div className="text-center space-y-2">
              <div className="text-gray-400">- or -</div>
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/signin" className="text-[#b17551] hover:underline">Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;