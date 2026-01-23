import React, { useState, useEffect } from "react";
import { Input } from "../../components/Ui/Input";
import { Button } from "../../components/Ui/Button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/Ui/Select";
import { Card, CardContent } from "../../components/Ui/Card";
import supabase from "../../lib/supabaseClient";

const regionCities = {
  "Addis Ababa": [
    "Bole",
    "Yeka",
    "Kirkos",
    "Arada",
    "Gullele",
    "Lideta",
    "Nifas Silk-Lafto",
    "Kolfe Keranio",
    "Akaki Kality",
  ],
  Afar: ["Asayita", "Dubti", "Awash", "Semera"],
  Amhara: ["Bahir Dar", "Gondar", "Debre Markos", "Dessie"],
  "Benishangul-Gumuz": ["Assosa", "Pawe", "Kurmuk"],
  "Dire Dawa": ["Dire Dawa"],
  Gambela: ["Gambela", "Itang"],
  Harari: ["Harar"],
  Oromia: ["Adama", "Jimma", "Shashamane", "Ambo", "Bishoftu"],
  Sidama: ["Hawassa"],
  Somali: ["Jijiga", "Gode", "Kebri Dahar"],
  "Southern Nations, Nationalities, and Peoples' Region (SNNPR)": [
    "Wolaita Sodo",
    "Arba Minch",
    "Hosaena",
  ],
  Tigray: ["Mekelle", "Shire", "Adigrat"],
};

const genderOptions = ["Male", "Female", "Other"];
const levelOptions = ["beginner", "intermediate", "advanced"];

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    region: "",
    city: "",
    language: "",
    child_full_name: "",
    child_age: "",
    child_gender: "",
    child_level: "",
    diagnosis_file: null,
    school: "",
    has_therapist: "",
    therapist_info: "",
    therapist_phone: "",
    therapist_diagnosis_file: null,
  });

  const [editingId, setEditingId] = useState(null);
  const [mode, setMode] = useState("add"); // "add" or "edit"

  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setMessage("");
    try {
      const { data, error } = await supabase
        .from('children')
        .select(`*, parents!inner(full_name, phone_number, region, city, language, therapist_info, therapist_phone, profiles!inner(email))`);
      if (error) throw error;
      setStudents(data || []);
    } catch (error) {
      setMessage('Error fetching students: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelect = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const uploadFile = async (file, folder) => {
    if (!file) return null;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;
    const { error } = await supabase.storage
      .from('documents')
      .upload(filePath, file, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (
      !form.full_name ||
      !form.email ||
      !form.phone ||
      !form.region ||
      !form.child_full_name ||
      !form.child_age ||
      !form.child_gender ||
      !form.diagnosis_file
    ) {
      setMessage("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const diagnosisFileUrl = await uploadFile(form.diagnosis_file, 'diagnosis');
      const therapistFileUrl = form.therapist_diagnosis_file 
        ? await uploadFile(form.therapist_diagnosis_file, 'therapist-diagnosis')
        : null;
      if (editingId) {
        await updateStudent(editingId, diagnosisFileUrl, therapistFileUrl);
        setMessage("Student updated successfully!");
      } else {
        await addNewStudent(diagnosisFileUrl, therapistFileUrl);
        setMessage("Student added successfully!");
      }
      resetForm();
      fetchStudents();
    } catch (error) {
      setMessage('Error saving student: ' + (error.message || error));
    } finally {
      setLoading(false);
    }
  };

  const addNewStudent = async (diagnosisFileUrl, therapistFileUrl) => {
    // Check if user exists in auth
    const { data: existingUser, error: userError } = await supabase.auth.admin.listUsers();
    if (userError) throw userError;
    let user = existingUser.users.find(u => u.email === form.email);
    if (!user) {
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: form.email,
        password: 'ChangeMe123!',
        email_confirm: true
      });
      if (createError) throw createError;
      user = newUser.user;
    }
    const userId = user.id;
    // Upsert into profiles
    const { error: profileError } = await supabase.from('profiles').upsert({
      id: userId,
      full_name: form.full_name,
      email: form.email,
      role: 'parent'
    });
    if (profileError) throw profileError;
    // Upsert into parents
    const { error: parentError } = await supabase.from('parents').upsert({
      user_id: userId,
      full_name: form.full_name,
      phone_number: form.phone,
      region: form.region,
      city: form.city || null,
      language: form.language || null,
      therapist_info: form.therapist_info || (form.has_therapist === 'Yes' ? 'Has therapist' : 'No therapist'),
      therapist_phone: form.therapist_phone || (form.has_therapist === 'Yes' ? form.phone : null),
      request_status: 'approved'
    });
    if (parentError) throw parentError;
    // Insert into children
    const { error: childError } = await supabase.from('children').insert({
      full_name: form.child_full_name,
      age: parseInt(form.child_age),
      gender: form.child_gender,
      current_school: form.school || null,
      diagnosis_summary: diagnosisFileUrl ? 'See attached file' : null,
      parent_id: userId,
      therapist_id: null,
      level: form.child_level || null,
    });
    if (childError) throw childError;
  };

  const updateStudent = async (childId, diagnosisFileUrl, therapistFileUrl) => {
    // Get the child record to find the parent
    const { data: child, error: childFetchError } = await supabase
      .from('children')
      .select('parent_id')
      .eq('id', childId)
      .single();
    if (childFetchError) throw childFetchError;
    // Update parent
    const { error: parentUpdateError } = await supabase
      .from('parents')
      .update({
        full_name: form.full_name,
        phone_number: form.phone,
        region: form.region,
        city: form.city || null,
        language: form.language || null,
        therapist_info: form.therapist_info || (form.has_therapist === 'Yes' ? 'Has therapist' : 'No therapist'),
        therapist_phone: form.therapist_phone || (form.has_therapist === 'Yes' ? form.phone : null),
      })
      .eq('user_id', child.parent_id);
    if (parentUpdateError) throw parentUpdateError;
    // Update child
    const updateData = {
      full_name: form.child_full_name,
      age: parseInt(form.child_age),
      gender: form.child_gender,
      current_school: form.school || null,
      level: form.child_level || null,
    };
    if (diagnosisFileUrl) updateData.diagnosis_file_url = diagnosisFileUrl;
    if (therapistFileUrl) updateData.therapist_diagnosis_file_url = therapistFileUrl;
    const { error: childUpdateError } = await supabase
      .from('children')
      .update(updateData)
      .eq('id', childId);
    if (childUpdateError) throw childUpdateError;
  };

  const resetForm = () => {
    setForm({
      full_name: "",
      email: "",
      phone: "",
      region: "",
      city: "",
      language: "",
      child_full_name: "",
      child_age: "",
      child_gender: "",
      child_level: "",
      diagnosis_file: null,
      school: "",
      has_therapist: "",
      therapist_info: "",
      therapist_phone: "",
      therapist_diagnosis_file: null,
    });
    setEditingId(null);
  };

  const handleAddMode = () => {
    setMode("add");
    setEditingId(null);
    resetForm();
  };

  const handleEditMode = () => {
    setMode("edit");
    setEditingId(null);
    resetForm();
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setForm({
      full_name: student.parents?.full_name || "",
      email: student.parents?.profiles?.email || "",
      phone: student.parents?.phone_number || "",
      region: student.parents?.region || "",
      city: student.parents?.city || "",
      language: student.parents?.language || "",
      child_full_name: student.full_name || "",
      child_age: student.age?.toString() || "",
      child_gender: student.gender || "",
      child_level: student.level || "",
      diagnosis_file: null,
      school: student.current_school || "",
      has_therapist: student.parents?.therapist_info === 'Has therapist' ? 'Yes' : 'No',
      therapist_info: student.parents?.therapist_info || "",
      therapist_phone: student.parents?.therapist_phone || "",
      therapist_diagnosis_file: null,
    });
    setMode("edit");
  };

  return (
    <div className="p-4 space-y-6 text-black" style={{ backgroundColor: "#eff6ff", minHeight: "100vh" }}>
      {message && (
        <div className={`p-4 rounded-md ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</div>
      )}
      <div className="flex gap-4 mb-4">
        <Button variant={mode === "add" ? "default" : "outline"} onClick={handleAddMode}>➕ Add Student</Button>
        <Button variant={mode === "edit" ? "default" : "outline"} onClick={handleEditMode}>✏️ Edit Student</Button>
      </div>
      {mode === "add" && (
        <Card style={{ backgroundColor: "#eff6ff" }}>
          <CardContent className="space-y-4 pt-6 text-black">
            <h2 className="text-xl font-semibold">Add New Student</h2>
            <h3 className="font-semibold mt-4">Parent Information</h3>
            <Input name="full_name" value={form.full_name} onChange={handleChange} placeholder="Parent's Full Name" label="Parent's Full Name" />
            <Input name="email" value={form.email} onChange={handleChange} placeholder="parent.email@example.com" label="Email" type="email" />
            <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Enter phone number" label="Phone Number" type="tel" />
            <Select value={form.region} onValueChange={(value) => handleSelect("region", value)}>
              <SelectTrigger className="text-black"><SelectValue placeholder="Select region" /></SelectTrigger>
              <SelectContent>{Object.keys(regionCities).map((region) => (<SelectItem key={region} value={region}>{region}</SelectItem>))}</SelectContent>
            </Select>
            <Select value={form.city} onValueChange={(value) => handleSelect("city", value)}>
              <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
              <SelectContent>{(regionCities[form.region] || []).map((city) => (<SelectItem key={city} value={city} className="text-black">{city}</SelectItem>))}</SelectContent>
            </Select>
            <Select value={form.language} onValueChange={(value) => handleSelect("language", value)}>
              <SelectTrigger><SelectValue placeholder="Select preferred language" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Amharic">Amharic</SelectItem>
                <SelectItem value="OROMIFA">Oromifa</SelectItem>
              </SelectContent>
            </Select>
            <h3 className="font-semibold mt-4">Child Information</h3>
            <Input name="child_full_name" value={form.child_full_name} onChange={handleChange} placeholder="Child's Full Name" label="Child's Full Name" />
            <Input name="child_age" value={form.child_age} onChange={handleChange} placeholder="Enter age (e.g., 6)" label="Age" type="number" />
            <Select value={form.child_gender} onValueChange={(value) => handleSelect("child_gender", value)}>
              <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
              <SelectContent>
                {genderOptions.map((g) => (
                  <SelectItem key={g} value={g}>{g}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={form.child_level} onValueChange={(value) => handleSelect("child_level", value)}>
              <SelectTrigger><SelectValue placeholder="Select level (optional)" /></SelectTrigger>
              <SelectContent>
                {levelOptions.map((l) => (
                  <SelectItem key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div>
              <label className="block mb-1 font-semibold flex items-center gap-2">
                📄 Diagnosis Document <span className="text-red-500">*</span>
              </label>
              <input type="file" name="diagnosis_file" accept=".pdf,.jpg,.png" onChange={handleChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              <div className="mt-1 text-sm text-gray-600 flex items-center gap-2">
                {form.diagnosis_file ? (
                  <>✅ <span>{form.diagnosis_file.name}</span></>
                ) : (
                  <>❌ <span>No file chosen</span></>
                )}
              </div>
            </div>
            <Input name="school" value={form.school} onChange={handleChange} placeholder="Current School (if any)" label="Current School" />
            <h3 className="font-semibold mt-4">Therapist Information</h3>
            <div>
              <label className="block mb-1">Do you already have a therapist?</label>
              <Select value={form.has_therapist} onValueChange={(value) => handleSelect("has_therapist", value)}>
                <SelectTrigger><SelectValue placeholder="Yes / No" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input name="therapist_info" value={form.therapist_info} onChange={handleChange} placeholder="Therapist Info (optional)" label="Therapist Info" />
            <Input name="therapist_phone" value={form.therapist_phone} onChange={handleChange} placeholder="Therapist Phone (optional)" label="Therapist Phone" />
            <div>
              <label className="block mb-1 font-semibold flex items-center gap-2">
                🩺 Upload Therapist's Diagnosis <span className="text-gray-400">(Optional)</span>
              </label>
              <input type="file" name="therapist_diagnosis_file" accept=".pdf,.jpg,.png" onChange={handleChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              <div className="mt-1 text-sm text-gray-600 flex items-center gap-2">
                {form.therapist_diagnosis_file ? (
                  <>✅ <span>{form.therapist_diagnosis_file.name}</span></>
                ) : (
                  <>❌ <span>No file chosen</span></>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleSubmit} disabled={loading}>{loading ? "Adding..." : "Add Student"}</Button>
            </div>
          </CardContent>
        </Card>
      )}
      {mode === "edit" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Student List</h2>
            {loading ? (<p>Loading students...</p>) : students.length === 0 ? (<p>No students found.</p>) : (
              students.map((student) => (
                <Card
                  key={student.id}
                  className={`p-4 text-black mb-2 cursor-pointer ${editingId === student.id ? "border-2 border-blue-500" : ""}`}
                  onClick={() => handleEdit(student)}
                >
                  <h3 className="font-medium">{student.full_name}</h3>
                  <p>Age: {student.age}</p>
                  <p>Gender: {student.gender}</p>
                  <p>Level: {student.level || "N/A"}</p>
                  <p>Parent: {student.parents?.full_name}</p>
                  <p>School: {student.current_school || "N/A"}</p>
                  <Button
                    className="mt-2"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(student);
                    }}
                  >
                    Edit
                  </Button>
                </Card>
              ))
            )}
          </div>
          {editingId && (
            <Card style={{ backgroundColor: "#eff6ff" }}>
              <CardContent className="space-y-4 pt-6 text-black">
                <h2 className="text-xl font-semibold">Edit Student</h2>
                <h3 className="font-semibold mt-4">Parent Information</h3>
                <Input name="full_name" value={form.full_name} onChange={handleChange} placeholder="Parent's Full Name" label="Parent's Full Name" />
                <Input name="email" value={form.email} onChange={handleChange} placeholder="parent.email@example.com" label="Email" type="email" />
                <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Enter phone number" label="Phone Number" type="tel" />
                <Select value={form.region} onValueChange={(value) => handleSelect("region", value)}>
                  <SelectTrigger className="text-black"><SelectValue placeholder="Select region" /></SelectTrigger>
                  <SelectContent>{Object.keys(regionCities).map((region) => (<SelectItem key={region} value={region}>{region}</SelectItem>))}</SelectContent>
                </Select>
                <Select value={form.city} onValueChange={(value) => handleSelect("city", value)}>
                  <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                  <SelectContent>{(regionCities[form.region] || []).map((city) => (<SelectItem key={city} value={city} className="text-black">{city}</SelectItem>))}</SelectContent>
                </Select>
                <Select value={form.language} onValueChange={(value) => handleSelect("language", value)}>
                  <SelectTrigger><SelectValue placeholder="Select preferred language" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Amharic">Amharic</SelectItem>
                    <SelectItem value="OROMIFA">Oromifa</SelectItem>
                  </SelectContent>
                </Select>
                <h3 className="font-semibold mt-4">Child Information</h3>
                <Input name="child_full_name" value={form.child_full_name} onChange={handleChange} placeholder="Child's Full Name" label="Child's Full Name" />
                <Input name="child_age" value={form.child_age} onChange={handleChange} placeholder="Enter age (e.g., 6)" label="Age" type="number" />
                <Select value={form.child_gender} onValueChange={(value) => handleSelect("child_gender", value)}>
                  <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                  <SelectContent>
                    {genderOptions.map((g) => (
                      <SelectItem key={g} value={g}>{g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={form.child_level} onValueChange={(value) => handleSelect("child_level", value)}>
                  <SelectTrigger><SelectValue placeholder="Select level (optional)" /></SelectTrigger>
                  <SelectContent>
                    {levelOptions.map((l) => (
                      <SelectItem key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div>
                  <label className="block mb-1 font-semibold flex items-center gap-2">
                    📄 Diagnosis Document <span className="text-red-500">*</span>
                  </label>
                  <input type="file" name="diagnosis_file" accept=".pdf,.jpg,.png" onChange={handleChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                  <div className="mt-1 text-sm text-gray-600 flex items-center gap-2">
                    {form.diagnosis_file ? (
                      <>✅ <span>{form.diagnosis_file.name}</span></>
                    ) : (
                      <>❌ <span>No file chosen</span></>
                    )}
                  </div>
                </div>
                <Input name="school" value={form.school} onChange={handleChange} placeholder="Current School (if any)" label="Current School" />
                <h3 className="font-semibold mt-4">Therapist Information</h3>
                <div>
                  <label className="block mb-1">Do you already have a therapist?</label>
                  <Select value={form.has_therapist} onValueChange={(value) => handleSelect("has_therapist", value)}>
                    <SelectTrigger><SelectValue placeholder="Yes / No" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Input name="therapist_info" value={form.therapist_info} onChange={handleChange} placeholder="Therapist Info (optional)" label="Therapist Info" />
                <Input name="therapist_phone" value={form.therapist_phone} onChange={handleChange} placeholder="Therapist Phone (optional)" label="Therapist Phone" />
                <div>
                  <label className="block mb-1 font-semibold flex items-center gap-2">
                    🩺 Upload Therapist's Diagnosis <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input type="file" name="therapist_diagnosis_file" accept=".pdf,.jpg,.png" onChange={handleChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                  <div className="mt-1 text-sm text-gray-600 flex items-center gap-2">
                    {form.therapist_diagnosis_file ? (
                      <>✅ <span>{form.therapist_diagnosis_file.name}</span></>
                    ) : (
                      <>❌ <span>No file chosen</span></>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleSubmit} disabled={loading}>{loading ? "Updating..." : "Update Student"}</Button>
                  <Button variant="outline" onClick={() => { setEditingId(null); resetForm(); }}>Cancel Edit</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
} 