"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../firebaseConfig'; // Import Firestore instance
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions

const companyTypes = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Other"
];

const modulesAvailable = [
  "CRM", "HR", "Inventory", "Accounting", "Sales", "Project Management", "Support", "Production"
];

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password: string) => {
  return password.length >= 6;
};

const LoginPage = () => {
  const auth = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Registration form states
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [ntnNumber, setNtnNumber] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [customCompanyType, setCustomCompanyType] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [modulesRequired, setModulesRequired] = useState<string[]>([]);
  const [preferredLanguage, setPreferredLanguage] = useState('');
  const [preferredCurrency, setPreferredCurrency] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [businessGoals, setBusinessGoals] = useState('');

  useEffect(() => {
    if (auth.user) {
      router.push('/dashboard');
    }
  }, [auth.user, router]);

  const handleAuthAction = async () => {
    setError(null); // Clear any previous errors
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long');
      return;
    }
    try {
      if (isLogin && auth?.login) {
        const response = await auth.login(email, password);
        console.log('Login Response:', response);
        router.push('/dashboard');
      } else if (!isLogin && auth?.signup) {
        if (!businessName || !address || !phone || !website || !ntnNumber || !companySize || !region || !city || !country || !preferredLanguage || !preferredCurrency || !timeZone || !businessGoals || (companyType === "Other" && !customCompanyType)) {
          setError('Please fill in all required fields');
          return;
        }
        const response = await auth.signup(email, password);
        console.log('Sign Up Response:', response);
        const user = response.user;

        // Save additional business details to Firestore
        await saveBusinessDetails(user.uid, {
          businessName,
          address,
          phone,
          website,
          ntnNumber,
          companySize,
          companyType: companyType === "Other" ? customCompanyType : companyType,
          region,
          city,
          country,
          modulesRequired,
          preferredLanguage,
          preferredCurrency,
          timeZone,
          businessGoals
        });

        router.push('/dashboard');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(`Error during ${isLogin ? 'login' : 'signup'}: ${err.message}`);
      } else {
        setError(`Error during ${isLogin ? 'login' : 'signup'}`);
      }
      console.error(`Error during ${isLogin ? 'login' : 'signup'}:`, err);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const toggleModule = (module: string) => {
    if (modulesRequired.includes(module)) {
      setModulesRequired(modulesRequired.filter(m => m !== module));
    } else {
      setModulesRequired([...modulesRequired, module]);
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-96">
      {isLogin ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            onClick={handleAuthAction}
            className="w-full p-2 mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold rounded"
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className="w-full p-2 text-gray-600"
          >
            Don't have an account? Signup
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Register Your Business</h1>

          {step === 1 && (
            <div>
              <h2 className="text-xl mb-4">Company Details</h2>
              <input
                type="text"
                placeholder="Business Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
              />
              <input
                type="text"
                placeholder="Business Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
              />
              <input
                type="text"
                placeholder="Website URL"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
              />
              <div className="mb-4">
                <label className="block mb-2">Company Type</label>
                <select
                  value={companyType}
                  onChange={(e) => setCompanyType(e.target.value)}
                  className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
                >
                  {companyTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {companyType === "Other" && (
                  <input
                    type="text"
                    placeholder="Specify Company Type"
                    value={customCompanyType}
                    onChange={(e) => setCustomCompanyType(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
                  />
                )}
              </div>
              <button onClick={nextStep} className="w-full p-2 mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold rounded">
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl mb-4">Business Information</h2>
              <input
                type="text"
                placeholder="NTN Number"
                value={ntnNumber}
                onChange={(e) => setNtnNumber(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
              />
              <input
                type="text"
                placeholder="Company Size"
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
              />
              <input
                type="text"
                placeholder="Region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
              />
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
              />
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
              />
              <label className="block mb-2">Modules Required</label>
              <div className="mb-4">
                {modulesAvailable.map(module => (
                  <label key={module} className="block mb-2">
                    <input
                      type="checkbox"
                      checked={modulesRequired.includes(module)}
                      onChange={() => toggleModule(module)}
                      className="mr-2"
                    />
                    {module}
                  </label>
                ))}
              </div>
              <button onClick={nextStep} className="w-full p-2 mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold rounded">
                Next
              </button>
              <button onClick={prevStep} className="w-full p-2 mb-4 bg-gray-300 text-black font-bold rounded">
                Previous
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl mb-4">Account Details</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
              />
              <div className="mb-4">
                <label className="block mb-2">Preferred Language</label>
                <input
                  type="text"
                  placeholder="Preferred Language"
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                  className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Preferred Currency</label>
                <input
                  type="text"
                  placeholder="Preferred Currency"
                  value={preferredCurrency}
                  onChange={(e) => setPreferredCurrency(e.target.value)}
                  className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Time Zone</label>
                <input
                  type="text"
                  placeholder="Time Zone"
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Business Goals</label>
                <textarea
                  placeholder="Business Goals"
                  value={businessGoals}
                  onChange={(e) => setBusinessGoals(e.target.value)}
                  className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
                ></textarea>
              </div>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <div className="flex justify-between">
                <button onClick={prevStep} className="p-2 bg-gray-300 text-black font-bold rounded">
                  Previous
                </button>
                <button onClick={handleAuthAction} className="p-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold rounded">
                  Register
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-center mt-4">
            <span className={`h-2 w-2 rounded-full mx-1 ${step === 1 ? 'bg-gray-800' : 'bg-gray-300'}`}></span>
            <span className={`h-2 w-2 rounded-full mx-1 ${step === 2 ? 'bg-gray-800' : 'bg-gray-300'}`}></span>
            <span className={`h-2 w-2 rounded-full mx-1 ${step === 3 ? 'bg-gray-800' : 'bg-gray-300'}`}></span>
          </div>

          <button
            onClick={() => setIsLogin(true)}
            className="w-full p-2 mt-4 text-gray-600"
          >
            Already have an account? Login
          </button>
        </>
      )}
    </div>
  );
};

const saveBusinessDetails = async (uid: string, details: any) => {
  try {
    await setDoc(doc(db, 'businesses', uid), details);
  } catch (error) {
    console.error('Error saving business details:', error);
  }
};

export default LoginPage;
