import React, { useState ,useEffect} from "react";
import supabase from "../../lib/supabaseClient";
import {  Card, CardContent, CardHeader, CardTitle  } from "../Ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Ui/Tabs";
import { Input } from "../Ui/Input";
import { Button } from "../Ui/Button";
import { Label } from "../Ui/Label"; 
import { Textarea } from '../Ui/Textarea';

export default function ManageUsers() {
  const [tab, setTab] = useState("therapist"); 
  const [step, setStep] = useState(1); 

  // Form state for therapist registration - certificate_url and license_certification_number removed
  const [therapistData, setTherapistData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    gender: "",
    date_of_birth: "",
    city_region: "",
    area_of_specialization: "",
    years_of_experience: "",
    languages_spoken: "", // This will be processed before sending
    personal_information: "",
    username: "",
    password: "",
    confirmPassword: "",
    assignedRole: "therapist", // Role assigned for this form
  });

  // Form state for manager registration - date_of_birth removed
  const [managerData, setManagerData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    gender: "",
    city_region: "",
    username: "",
    password: "",
    confirmPassword: "",
    assignedRole: "manager",
  });


  // Removed certificateFile state as it's no longer used for therapist form
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(null); 

  // Get the current user's role (for potential future access control)
  const [userRole, setUserRole] = useState(null);

  /*
   * Handles changes to form input fields for both therapist and manager forms.
   * Updates the respective data state.
   * @param {Object} e - The event object from the input change.
   */
  const handleChange = (e) => {
    const { name, value } = e.target; // Removed 'files', 'type' as file upload is removed for therapist
    setError(null); // Clear errors on input change

    if (tab === "therapist") {
      setTherapistData((prev) => ({ ...prev, [name]: value }));
    } else if (tab === "manager") {
      setManagerData((prev) => ({ ...prev, [name]: value }));
    }
  };

  /*
   * Handles moving to the next step of the therapist registration form.
   * Performs basic validation for required fields in step 1.
   */
  const handleNextTherapist = () => {
    setError(null);
    if (!therapistData.full_name.trim() && !therapistData.email.trim()) {
      setError("Please fill in Full Name and Email.");
      return;
    }
    setStep(2);
  };

  /**
   * Handles moving back to the previous step of the therapist registration form.
   */
  const handleBackTherapist = () => {
    setError(null);
    setStep(1);
  };

  /**
   * Fetches the current user's role from Supabase when the component mounts.
   * This is crucial for role-based access control if you plan to extend this.
   */
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const user = (await supabase.auth.getUser()).data?.user;
        if (!user) {
          // If no user is logged in, set role to null and return
          setUserRole(null);
          return;
        }
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profileError) {
          throw profileError;
        }

        setUserRole(profileData?.role);
        console.log("User Role (from profiles table):", profileData?.role); // Debugging line
      } catch (err) {
        setError(err.message + "Failed to fetch user role.");
        setUserRole(null); // Ensure userRole is reset on error
      }
    };

    fetchUserRole();
  }, []);
  /*
  * Submits the therapist registration form.
  * Handles user signup, certificate upload, and data insertion/update into 'profiles' and 'therapist_details'.
  */
 const handleSubmitTherapist = async () => {
   // Authorization check: Only managers or admins can register therapists
   if (userRole !== 'admin' && userRole !== 'manager') { 
     setError("You are not authorized to register a therapist. Only managers or admins can perform this action.");
     return;
   }

   // Basic validation for step 2 fields
   if (!therapistData.username.trim()) {
     setError("Username is required.");
     return;
   }
   if (therapistData.password !== therapistData.confirmPassword) {
     setError("Passwords do not match.");
     return;
   }
   if (!therapistData.password) {
     setError("Password is required.");
     return;
   }

   setLoading(true);
   try {
     // Removed certificate upload logic completely
     
     // Step 1: Sign up the user with Supabase Auth
     const { data: authData, error: authError } = await supabase.auth.signUp({
       email: therapistData.email,
       password: therapistData.password,
     });

     if (authError) throw authError;

     const userId = authData?.user?.id; // This is the ID of the *newly created therapist*
     if (!userId) {
       throw new Error("Failed to get user ID from authentication.");
     }

     // --- DEBUGGING START ---
     console.log("Attempting therapist details insert for new user ID:", userId);
     // This RPC call helps debug the database session's auth context
     const { data: dbSessionInfo, error: dbSessionError } = await supabase.rpc('get_auth_role_and_uid');
     if (dbSessionError) {
       console.error("Error fetching database session info via RPC:", dbSessionInfo.message);
     } else {
       console.log("Database Session auth.role():", dbSessionInfo.role);
       console.log("Database Session auth.uid():", dbSessionInfo.uid);
       console.log("Does new therapist's ID match current session's UID?", userId === dbSessionInfo.uid);
       console.log("Is current session's role 'admin'?", dbSessionInfo.role === 'admin');
       console.log("Is current session's role 'manager'?", dbSessionInfo.role === 'manager'); 
     }
     // --- DEBUGGING END ---

     // Step 2: Ensure the 'profiles' table entry exists/is updated for the newly created user
     // Changed from .update() to .upsert() to handle cases where the profile might not exist yet
     const { error: profileUpsertError } = await supabase
       .from("profiles")
       .upsert({
         id: userId, // The user's UUID from auth.signUp
         full_name: therapistData.full_name,
         email: therapistData.email,
         role: therapistData.assignedRole,

       }, { onConflict: 'id' }); // Conflict on 'id' means update if exists

     if (profileUpsertError) {
       console.error("Profiles upsert error:", profileUpsertError);
       // If profile upsert fails, sign out the user to prevent incomplete account
       await supabase.auth.signOut();
       throw profileUpsertError;
     }

     // Step 3: Insert therapist-specific details into 'therapist_details'  
     const { error: therapistInsertError } = await supabase.from("therapist_details").insert([
       {
         id: userId, // This is the ID of the newly signed-up therapist
         phone_number: therapistData.phone_number,
         gender: therapistData.gender,
         date_of_birth: therapistData.date_of_birth || null, // Set to null if empty string
         city_region: therapistData.city_region,
         area_of_specialization: therapistData.area_of_specialization || null, // Ensure it's null if empty
         years_of_experience: Number(therapistData.years_of_experience),
         // Removed license_certification_number and certificate_url from insert object
         
         // FIX: Convert comma-separated string to array, or send empty array if blank
         languages_spoken: therapistData.languages_spoken.trim() !== ''? therapistData.languages_spoken.split(',').map(lang => lang.trim()) 
         : [], // Send an empty array if the string is empty

personal_information: therapistData.personal_information,
username: therapistData.username,
},
]);

if (therapistInsertError) {
console.error("Therapist details insert error:", therapistInsertError); // Debugging line
// If therapist details insert fails, sign out the user.
// Note: Deleting the user from auth.users requires service_role key,
// which should not be exposed client-side.
await supabase.auth.signOut();
throw therapistInsertError;
}

setSuccess("Therapist registered successfully!");
setTherapistData({
full_name: "", email: "", phone_number: "", gender: "", date_of_birth: "",
city_region: "", area_of_specialization: "", years_of_experience: "",
languages_spoken: "",
personal_information: "", username: "", password: "", confirmPassword: "",
assignedRole: "therapist",
});
// Removed certificateFile state reset
setStep(1);
} catch (err) {
setError(err.message || "Error registering therapist");
} finally {
setLoading(false);
}
};

/* 
Submits the manager registration form.
* Handles user signup and data update into 'profiles' table.
*/
const handleSubmitManager = async () => {
// Authorization check: Only managers or admins can register other managers
if (userRole !== 'manager' && userRole !== 'admin') {
setError("You are not authorized to register a manager. Only managers or admins can perform this action.");
return;
}

// Basic validation for manager fields
if (!managerData.full_name.trim() || !managerData.email.trim()) {
setError("Full Name and Email are required.");
return;
}
if (!managerData.username.trim()) {
setError("Username is required.");
return;
}
if (managerData.password !== managerData.confirmPassword) {
setError("Passwords do not match.");
return;
}
if (!managerData.password) {
setError("Password is required.");
return;
}

setLoading(true);
try {
// Step 1: Sign up the user with Supabase Auth
const { data: authData, error: authError } = await supabase.auth.signUp({
email: managerData.email,
password: managerData.password,
});

if (authError) throw authError;

const userId = authData?.user?.id;
if (!userId) {
throw new Error("Failed to get user ID from authentication.");
}

// Step 2: Ensure the 'profiles' table entry exists/is updated for the newly created user
// Changed from .update() to .upsert()
const { error: profileUpsertError } = await supabase
.from("profiles")
.upsert({
id: userId, // The user's UUID from auth.signUp
full_name: managerData.full_name,
email: managerData.email,
role: managerData.assignedRole
,
// Removed date_of_birth from here as well
}, { onConflict: 'id' }); // Conflict on 'id' means update if exists

if (profileUpsertError) {
console.error("Profiles upsert error:", profileUpsertError);
await supabase.auth.signOut();
throw profileUpsertError;
}

// If you had a separate 'manager_details' table, you would insert here:
// const { error: managerDetailsInsertError } = await supabase.from("manager_details").insert([...]);
// if (managerDetailsInsertError) {
//   await supabase.auth.signOut();
//   await supabase.from("profiles").delete().eq('id', userId); // This delete is problematic client-side
//   throw managerDetailsInsertError;
// }setSuccess("Manager registered successfully!");
setManagerData({
    full_name: "", email: "", phone_number: "", gender: "", 
    city_region: "", username: "", password: "", confirmPassword: "",
    assignedRole: "manager",
  });
} catch (err) {
  setError(err.message || "Error registering manager");
} finally {
  setLoading(false);
}
};


/**
* Main form submission handler that dispatches to the correct function
* based on the currently active tab.
*/
const handleMainSubmit = async (e) => {
e.preventDefault();
setError(null);
setSuccess(null);

if (tab === "therapist") {
  await handleSubmitTherapist();
} else if (tab === "manager") {
  await handleSubmitManager();
}
};

return (
<div className="p-8 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-800 dark:to-neutral-950 rounded-3xl shadow-2xl border border-blue-200 dark:border-neutral-700 font-inter">
  <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-800 dark:text-blue-300 drop-shadow-sm">Manage Users</h2>
  <Tabs value={tab} onValueChange={(newTab) => {
    setTab(newTab);
    setStep(1); // Reset step when changing tabs
    setError(null); // Clear errors when changing tabs
    setSuccess(null); // Clear success when changing tabs
  }} className="w-full">
    <TabsList className="flex justify-center gap-4 mb-8 p-2 bg-blue-100 dark:bg-neutral-800 rounded-full shadow-inner-lg">
      {/* Add Therapist Tab Trigger */}
      <TabsTrigger
        value="therapist"
        className="px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out
                   data-[state=active]:bg-blue-600 data-[state=active]:text-blue-100 data-[state=active]:shadow-lg data-[state=active]:shadow-blue-300/50 dark:data-[state=active]:shadow-blue-700/30
                   data-[state=inactive]:bg-transparent data-[state=inactive]:text-blue-700 dark:data-[state=inactive]:text-blue-300
                   hover:data-[state=inactive]:bg-blue-200 dark:hover:data-[state=inactive]:bg-neutral-700 hover:data-[state=inactive]:text-blue-800 dark:hover:data-[state=inactive]:text-blue-200"
      >
        Add Therapist
      </TabsTrigger>
      {/* Add Manager Tab Trigger */}
      <TabsTrigger
        value="manager"
        className="px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out
                   data-[state=active]:bg-purple-600 data-[state=active]:text-purple-100 data-[state=active]:shadow-lg data-[state=active]:shadow-purple-300/50 dark:data-[state=active]:shadow-purple-700/30
                   data-[state=inactive]:bg-transparent data-[state=inactive]:text-purple-700 dark:data-[state=inactive]:text-purple-300
                   hover:data-[state=inactive]:bg-purple-200 dark:hover:data-[state=inactive]:bg-neutral-700 hover:data-[state=inactive]:text-purple-800 dark:hover:data-[state=inactive]:text-purple-200"
      >
        Add Manager
      </TabsTrigger>
    </TabsList>{/* Therapist Registration Form Content */}
        <TabsContent value="therapist">
          <form onSubmit={handleMainSubmit} className="space-y-8">
            <Card className="bg-white dark:bg-neutral-900 border border-blue-200 dark:border-neutral-700 rounded-2xl shadow-xl">
              <CardHeader className="border-b border-blue-100 dark:border-neutral-700 pb-5 pt-6 px-6">
                <CardTitle className="text-2xl font-bold text-blue-700 dark:text-blue-200">Therapist Registration - Step {step}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 p-6 md:p-8">
                {step === 1 && (
                  <>
                    <div>
                      <Label htmlFor="fullName" className="mb-2 block text-blue-700 dark:text-blue-300 font-medium text-base">Full Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="fullName"
                        name="full_name"
                        placeholder="John Doe"
                        value={therapistData.full_name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-blue-300 dark:border-neutral-600 focus:outline-none focus:ring-3 focus:ring-blue-400 dark:focus:ring-blue-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="mb-2 block text-blue-700 dark:text-blue-300 font-medium text-base">Email Address <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={therapistData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-blue-300 dark:border-neutral-600 focus:outline-none focus:ring-3 focus:ring-blue-400 dark:focus:ring-blue-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phoneNumber" className="mb-2 block text-blue-700 dark:text-blue-300 font-medium text-base">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        name="phone_number"
                        placeholder="+251912345678"
                        value={therapistData.phone_number}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-blue-300 dark:border-neutral-600 focus:outline-none focus:ring-3 focus:ring-blue-400 dark:focus:ring-blue-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender" className="mb-2 block text-blue-700 dark:text-blue-300 font-medium text-base">Gender</Label>
                      <Input
                        id="gender"
                        name="gender"
                        placeholder="Male / Female"
                        value={therapistData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-blue-300 dark:border-neutral-600 focus:outline-none focus:ring-3 focus:ring-blue-400 dark:focus:ring-blue-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"/>
                        </div>
                        <div>
                          <Label htmlFor="dateOfBirth" className="mb-2 block text-blue-700 dark:text-blue-300 font-medium text-base">Date of Birth</Label>
                          <Input
                            id="dateOfBirth"
                            type="date"
                            name="date_of_birth"
                            value={therapistData.date_of_birth}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-blue-300 dark:border-neutral-600 focus:outline-none focus:ring-3 focus:ring-blue-400 dark:focus:ring-blue-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cityRegion" className="mb-2 block text-blue-700 dark:text-blue-300 font-medium text-base">City / Region</Label>
                          <Input
                            id="cityRegion"
                            name="city_region"
                            placeholder="Addis Ababa"
                            value={therapistData.city_region}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-blue-300 dark:border-neutral-600 focus:outline-none focus:ring-3 focus:ring-blue-400 dark:focus:ring-blue-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                          />
                        </div>
                        <div>
                          <Label htmlFor="specialization" className="mb-2 block text-blue-700 dark:text-blue-300 font-medium text-base">Area of Specialization</Label>
                          <select
                            id="specialization"
                            name="area_of_specialization"
                            value={therapistData.area_of_specialization}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-blue-300 dark:border-neutral-600 focus:outline-none focus:ring-3 focus:ring-blue-400 dark:focus:ring-blue-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 appearance-none pr-8 transition-colors duration-200"
                          >
                            <option value="">Select specialization</option>
                            <option value="Speech Therapy">Speech Therapy</option>
                            <option value="ABA Therapy">ABA Therapy</option>
                            <option value="Occupational Therapy">Occupational Therapy</option>
                            <option value="Physical Therapy">Physical Therapy</option>
                            <option value="Psychology">Psychology</option>
                            <option value="Special Education">Special Education</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="yearsOfExperience" className="mb-2 block text-blue-700 dark:text-blue-300 font-medium text-base">Years of Experience</Label>
                          <Input
                            id="yearsOfExperience"
                            type="number"
                            min="0"
                            name="years_of_experience"
                            value={therapistData.years_of_experience}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-blue-300 dark:border-neutral-600 focus:outline-none focus:ring-3 focus:ring-blue-400 dark:focus:ring-blue-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                          />
                        </div>
                        {/* Removed License/Certification Number input field */}
                        {/* Removed Upload Certificate input field */}
                        <div><Label htmlFor="languagesSpoken" className="mb-2 block text-blue-700 dark:text-blue-300 font-medium text-base">Languages Spoken</Label>
                      <Input
                        id="languagesSpoken"
                        name="languages_spoken"
                        placeholder="English, Amharic, etc."
                        value={therapistData.languages_spoken}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-blue-300 dark:border-neutral-600 focus:outline-none focus:ring-3 focus:ring-blue-400 dark:focus:ring-blue-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="md:col-span-2">
                      <Label htmlFor="personalInformation" className="mb-2 block text-blue-700 dark:text-blue-300 font-medium text-base">Personal Information <span className="text-red-500">*</span></Label>
                      <Textarea
                        id="personalInformation"
                        name="personal_information"
                        placeholder="Tell us more about yourself..."
                        value={therapistData.personal_information}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full px-4 py-2.5 rounded-lg border border-blue-300 dark:border-neutral-600 focus:outline-none focus:ring-3 focus:ring-blue-400 dark:focus:ring-blue-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="username" className="mb-2 block text-blue-700 dark:text-blue-300 font-medium text-base">Username <span className="text-red-500">*</span></Label>
                      <Input
                        id="username"
                        name="username"
                        placeholder="therapist2025"
                        value={therapistData.username}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-blue-300 dark:border-neutral-600 focus:outline-none focus:ring-3 focus:ring-blue-400 dark:focus:ring-blue-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password" className="mb-2 block text-blue-700 dark:text-blue-300 font-medium text-base">Password <span className="text-red-500">*</span></Label>
                      <Input
                        id="password"
                        type="password"
                        name="password"
                        value={therapistData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-blue-300 dark:border-neutral-600 focus:outline-none focus:ring-3 focus:ring-blue-400 dark:focus:ring-blue-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword" className="mb-2 block text-blue-700 dark:text-blue-300 font-medium text-base">Confirm Password <span className="text-red-500">*</span></Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"value={therapistData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-blue-300 dark:border-neutral-600 focus:outline-none focus:ring-3 focus:ring-blue-400 dark:focus:ring-blue-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                      />
                    </div>
                  </>
                )}
              </CardContent>

              <div className="p-6 md:p-8 flex justify-between items-center border-t border-blue-100 dark:border-neutral-700">
                <div className="flex gap-4">
                  {step === 2 && (
                    <Button
                      variant="outline"
                      type="button"
                      onClick={handleBackTherapist}
                      className="px-8 py-3 rounded-full border border-blue-500 text-blue-600 dark:text-blue-300 bg-white dark:bg-neutral-700 font-semibold shadow-md hover:bg-blue-50 dark:hover:bg-neutral-600 transition-all duration-300 ease-in-out"
                    >
                      Back
                    </Button>
                  )}
                </div>

                <div className="flex flex-col items-end">
                  {error && <p className="text-red-500 text-sm mb-2 font-medium">{error}</p>}
                  {success && <p className="text-green-500 text-sm mb-2 font-medium">{success}</p>}
                  {step === 1 ? (
                    <Button
                      type="button"
                      onClick={handleNextTherapist}
                      className="px-10 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={loading}
                      className="px-10 py-3 rounded-full bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </form>
        </TabsContent>{/* Manager Registration Form Content */}
        <TabsContent value="manager">
          <form onSubmit={handleMainSubmit} className="space-y-8">
            <Card className="bg-white dark:bg-neutral-900 border border-purple-200 dark:border-neutral-700 rounded-2xl shadow-xl">
              <CardHeader className="border-b border-purple-100 dark:border-neutral-700 pb-5 pt-6 px-6">
                <CardTitle className="text-2xl font-bold text-purple-700 dark:text-purple-200">Manager Registration</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 p-6 md:p-8">
                <div>
                  <Label htmlFor="managerFullName" className="mb-2 block text-purple-700 dark:text-purple-300 font-medium text-base">Full Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="managerFullName"
                    name="full_name"
                    placeholder="Jane Doe"
                    value={managerData.full_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-purple-300 dark:border-neutral-600 focus:outline-none focus:ring-3 focus:ring-purple-400 dark:focus:ring-purple-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="managerEmail" className="mb-2 block text-purple-700 dark:text-purple-300 font-medium text-base">Email Address <span className="text-red-500">*</span></Label>
                  <Input
                    id="managerEmail"
                    type="email"
                    name="email"
                    placeholder="jane@example.com"
                    value={managerData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-purple-300 dark:border-neutral-600 focus:outline-none focus:ring-3 focus:ring-purple-400 dark:focus:ring-purple-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="managerPhoneNumber" className="mb-2 block text-purple-700 dark:text-purple-300 font-medium text-base">Phone Number</Label>
                  <Input
                    id="managerPhoneNumber"
                    name="phone_number"
                    placeholder="+251912345678"
                    value={managerData.phone_number}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-purple-300 dark:border-neutral-600 focus:outline-none focus:ring-3 focus:ring-purple-400 dark:focus:ring-purple-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="managerGender" className="mb-2 block text-purple-700 dark:text-purple-300 font-medium text-base">Gender</Label>
                  <Input
                    id="managerGender"
                    name="gender"
                    placeholder="Male / Female"
                    value={managerData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-purple-300 dark:border-neutral-600 focus:outline-none focus:ring-3 focus:ring-purple-400 dark:focus:ring-purple-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                  />
                </div>
                {/* Removed Date of Birth from here */}
                <div><Label htmlFor="managerCityRegion" className="mb-2 block text-purple-700 dark:text-purple-300 font-medium text-base">City / Region</Label>
                  <Input
                    id="managerCityRegion"
                    name="city_region"
                    placeholder="Addis Ababa"
                    value={managerData.city_region}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-purple-300 dark:border-neutral-600 focus:outline-none focus:ring-3 focus:ring-purple-400 dark:focus:ring-purple-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="managerUsername" className="mb-2 block text-purple-700 dark:text-purple-300 font-medium text-base">Username <span className="text-red-500">*</span></Label>
                  <Input
                    id="managerUsername"
                    name="username"
                    placeholder="manager2025"
                    value={managerData.username}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-purple-300 dark:border-neutral-600 focus:outline-none focus:ring-3 focus:ring-purple-400 dark:focus:ring-purple-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="managerPassword" className="mb-2 block text-purple-700 dark:text-purple-300 font-medium text-base">Password <span className="text-red-500">*</span></Label>
                  <Input
                    id="managerPassword"
                    type="password"
                    name="password"
                    value={managerData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-purple-300 dark:border-neutral-600 focus:outline-none focus:ring-3 focus:ring-purple-400 dark:focus:ring-purple-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="managerConfirmPassword" className="mb-2 block text-purple-700 dark:text-purple-300 font-medium text-base">Confirm Password <span className="text-red-500">*</span></Label>
                  <Input
                    id="managerConfirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={managerData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-purple-300 dark:border-neutral-600 focus:outline-none focus:ring-3 focus:ring-purple-400 dark:focus:ring-purple-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                  />
                </div>
              </CardContent>
              <div className="p-6 md:p-8 flex justify-end items-center border-t border-purple-100 dark:border-neutral-700">
                <div className="flex flex-col items-end">
                  {error && <p className="text-red-500 text-sm mb-2 font-medium">{error}</p>}
                  {success && <p className="text-green-500 text-sm mb-2 font-medium">{success}</p>}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="px-10 py-3 rounded-full bg-purple-600 text-white font-semibold shadow-lg hover:bg-purple-700 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </div>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}