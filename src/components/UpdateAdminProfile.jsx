import React, { useState, useEffect } from "react";

const allLanguages = [
  "English","Hindi","Bengali","Telugu","Marathi","Tamil","Urdu","Gujarati",
  "Kannada","Odia","Malayalam","Punjabi","Assamese","Maithili","Sanskrit",
  "Kashmiri","Nepali","Sindhi","Dogri","Manipuri","Bodo","Santhali",
  "French","Spanish","German","Italian","Chinese","Japanese","Korean",
  "Russian","Arabic","Portuguese","Swahili","Turkish","Vietnamese","Dutch","Greek"
];

const allJobPositions = [
  "Professor","Associate Professor","Assistant Professor","Lecturer","Lab Assistant",
  "Researcher","Administrator","Accountant","Librarian","Counselor","Registrar",
  "Dean","Chancellor","Vice Chancellor"
];

const allGenders = ["Male", "Female", "Other"];
const allBloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const allMaritalStatus = ["Single", "Married", "Divorced", "Widowed"];

const UpdateAdminProfile = () => {
  const defaultData = {
    profilePic: "",
    employeeId: "",
    department: "",
    workplace: "",
    username: "",
    name: "",
    email: "",
    dob: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    bloodType: "",
    maritalStatus: "",
    languages: [],
    jobPositions: [],
  };

  const [formData, setFormData] = useState(defaultData);

  useEffect(() => {
    const savedAdmin = JSON.parse(localStorage.getItem("currentAdmin"));
    if (savedAdmin) {
      // Make sure arrays exist
      setFormData({
        ...defaultData,
        ...savedAdmin,
        languages: Array.isArray(savedAdmin.languages) ? savedAdmin.languages : [],
        jobPositions: Array.isArray(savedAdmin.jobPositions) ? savedAdmin.jobPositions : [],
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files, checked } = e.target;

    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => setFormData(prev => ({ ...prev, [name]: reader.result }));
      reader.readAsDataURL(files[0]);
    } else if (name === "languages" || name === "jobPositions") {
      const currentArray = formData[name] || [];
      if (checked) {
        setFormData(prev => ({ ...prev, [name]: [...currentArray, value] }));
      } else {
        setFormData(prev => ({ ...prev, [name]: currentArray.filter(item => item !== value) }));
      }
    } else if (name === "dob") {
      const birthDate = new Date(value);
      const ageDifMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDifMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      setFormData(prev => ({ ...prev, dob: value, age }));
    } else if (name === "phone") {
      const filtered = value.replace(/\D/g, "").slice(0, 10);
      setFormData(prev => ({ ...prev, phone: filtered }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("currentAdmin", JSON.stringify(formData));
    alert("Admin profile updated successfully!");
  };

  return (
    <div className="update-profile-container">
      <h1>Update Admin Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Profile Picture:
          <input type="file" name="profilePic" onChange={handleChange} />
        </label>

        <div className="row-fields">
          <div className="row-field">
            <label>
              Employee ID:
              <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} />
            </label>
          </div>
          <div className="row-field">
            <label>
              Department:
              <input type="text" name="department" value={formData.department} onChange={handleChange} />
            </label>
          </div>
          <div className="row-field">
            <label>
              Workplace:
              <input type="text" name="workplace" value={formData.workplace} onChange={handleChange} />
            </label>
          </div>
          <div className="row-field">
            <label>
              Phone:
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="10 digits max" />
            </label>
          </div>
        </div>

        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>

        <label>
          Full Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>

        <label>
          Date of Birth:
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        </label>

        <label>
          Age:
          <input type="number" name="age" value={formData.age} readOnly />
        </label>

        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            {allGenders.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </label>

        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>

        <label>
          Blood Type:
          <select name="bloodType" value={formData.bloodType} onChange={handleChange}>
            <option value="">Select Blood Type</option>
            {allBloodTypes.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </label>

        <label>
          Marital Status:
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
            <option value="">Select Marital Status</option>
            {allMaritalStatus.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </label>

        <label>
          Languages:
          <div className="languages-box">
            {(formData.languages || []).length >= 0 &&
              allLanguages.map(lang => (
                <label key={lang} className="language-item">
                  <input
                    type="checkbox"
                    name="languages"
                    value={lang}
                    checked={formData.languages.includes(lang)}
                    onChange={handleChange}
                  />
                  <span>{lang}</span>
                </label>
              ))}
          </div>
        </label>

        <label>
          Job Positions:
          <div className="languages-box">
            {(formData.jobPositions || []).length >= 0 &&
              allJobPositions.map(pos => (
                <label key={pos} className="language-item">
                  <input
                    type="checkbox"
                    name="jobPositions"
                    value={pos}
                    checked={formData.jobPositions.includes(pos)}
                    onChange={handleChange}
                  />
                  <span>{pos}</span>
                </label>
              ))}
          </div>
        </label>

        <button type="submit">Save Changes</button>
      </form>

      <style>{`
        .update-profile-container {
          max-width: 720px;
          margin: 50px auto;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          font-family: 'Roboto', sans-serif;
          background: linear-gradient(90deg, #d9f1f7, #b6e0f0, #8fd3e8, #c3eaf7);
          text-align: left;
        }

        h1 {
          text-align: center;
          color: #123c5a;
          margin-bottom: 25px;
        }

        form label {
          display: block;
          margin-bottom: 15px;
          font-weight: 500;
          color: #123c5a;
        }

        input, select {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border-radius: 8px;
          border: 1px solid #1f6f8b;
          outline: none;
          transition: 0.3s ease;
        }

        input:focus, select:focus {
          border-color: #123c5a;
          box-shadow: 0 0 0 2px rgba(31, 111, 139, 0.2);
        }

        button {
          display: block;
          margin: 20px auto 0;
          padding: 12px 25px;
          background: linear-gradient(135deg, #1f6f8b, #123c5a);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        button:hover {
          background: linear-gradient(135deg, #123c5a, #0f2e44);
          transform: translateY(-2px);
        }

        .languages-box {
          max-height: 160px;
          overflow-y: auto;
          border: 1px solid #1f6f8b;
          border-radius: 8px;
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          background: #e1f0f6;
        }

        .language-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .language-item input {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .row-fields {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 20px;
        }

        .row-field {
          flex: 1 1 45%;
        }
      `}</style>
    </div>
  );
};

export default UpdateAdminProfile;