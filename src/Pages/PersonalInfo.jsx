import DatePickerField from "@/components/ui/datePicker";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { BiPhoneCall } from "react-icons/bi";
import { BsFolder } from "react-icons/bs";
import { FaCamera, FaTimes } from "react-icons/fa";
import { FiSearch, FiPhone } from "react-icons/fi";
import SelectField from "@/components/SelectFeild";
import VariableTypeRow from "@/components/ui/VariableTypeRow";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  className = "",
  ...props
}) => (
  <div>
    <label className="block text-gray-500 dark:text-gray-50 ds-text-xs font-semibold mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full ds-text-xs h-7.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-ds-primary focus:ring-inset rounded-sm px-4 py-1.5 ${className}`}
    />
  </div>
);

const SearchInput = ({ label, name, value, onChange, icon: Icon }) => (
  <div className="relative">
    <label className="block text-gray-500 dark:text-gray-50 ds-text-xs font-semibold mb-1">
      {label}
    </label>
    <div className="relative h-7.5">
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full h-7.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-ds-primary focus:ring-inset rounded-sm px-4 py-1.5 `}
      />
      <Icon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-white" />
    </div>
  </div>
);

const PersonalInfo = ({ onNext }) => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    // Personal Details
    image: "",
    salutation: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    nationality: "",
    dob: "",
    age: "",
    mobileNumber: "",
    email: "",

    // Family Details
    fatherName: "",
    motherName: "",
    maritalStatus: "",
    spouseName: "",
    dateOfMarriage: "",
    enterNationality: "",

    // Present Address
    presentAddress1: "",
    presentAddress2: "",
    presentCity: "",
    presentZip: "",
    presentState: "",
    presentCountry: "",
    sameAsPermanent: false,

    // Permanent Address
    permanentAddress1: "",
    permanentAddress2: "",
    permanentCity: "",
    permanentZip: "",
    permanentState: "",
    permanentCountry: "",

    // Professional Details
    employeeCode: "",
    staffId: "",
    confirmationDate: "",
    employeeType: "",
    doj: "",
    leaveTemplate: "",
    leaveAssignDate: "",
    noticeDays: "",

    // Manager Details
    l1Manager: "",
    l1ManagerName: "",
    l1ManagerEmail: "",
    l1ManagerMobile: "",
    hrManager: "",
    hrName: "",
    hrEmail: "",
    hrMobile: "",

    // Unit & Department
    unitName: "",
    department: "",
    subDepartment: "",
    grade: "",
    designation: "",
    level: "",
    location: "",
    unit: "",

    // Tax & PAN
    pan: "",
    taxRegime: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Define section order for mobile
  const mobileOrder = [
    "personal",
    "professional",
    "family",
    "manager",
    "presentAddress",
    "unitDepartment",
    "permanentAddress",
    "taxPAN",
  ];

  // Function to render section based on name
  const renderSection = (sectionName) => {
    switch (sectionName) {
      case "personal":
        return (
          <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg px-3">
            <h1 className="text-base font-semibold mb-1 text-gray-500">
              Personal Details
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 mb-2">
              <div className="bg-white  dark:bg-[#E4E6EB]/10 dark:text-white rounded-full w-30 h-30 xl:h-24 xl:w-24 flex flex-col justify-center items-center shadow relative mt-3 py-3 px-3 xl:px-0 overflow-hidden border border-gray-200 dark:border-gray-700">
                {image && (
                  <>
                    <img
                      src={image}
                      alt="Uploaded"
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-full z-0"
                    />

                    <button
                      type="button"
                      onClick={() => setImage(null)}
                      className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-1 z-10 hover:bg-red-600 transition"
                    >
                      <FaTimes size={12} />
                    </button>
                  </>
                )}

                {!image && (
                  <>
                    <FaCamera className="text-lg sm:text-md md:text-lg text-gray-500 relative mt-2 cursor-pointer" />
                    <input
                      id="fileUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="opacity-0 absolute bg-black"
                    />
                  </>
                )}
              </div>

              <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
                <SelectField
                  label="Salutation"
                  name="salutation"
                  value={formData.salutation}
                  onChange={handleChange}
                  options={[
                    { value: "", label: "Select Title" },
                    { value: "Mr", label: "Mr." },
                    { value: "Ms", label: "Ms." },
                    { value: "Mrs", label: "Mrs." },
                    { value: "Dr", label: "Dr." },
                  ]}
                />

                <InputField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />

                <InputField
                  label="Middle Name"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                />

                <InputField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <SelectField
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
              />
              <InputField
                label="Nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              />
              <DatePickerField
                label="DOB"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
              <InputField
                label="Age"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
              <InputField
                label="Mobile Number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
              <InputField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
        );

      case "professional":
        return (
          <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg px-3">
            <h1 className="text-base font-semibold mb-1 text-gray-500">
              Professional Details
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <InputField
                label="Employee Code"
                name="employeeCode"
                value={formData.employeeCode}
                onChange={handleChange}
              />
              <InputField
                label="Staff ID"
                name="staffId"
                value={formData.staffId}
                onChange={handleChange}
              />
              <InputField
                label="Confirmation Date"
                name="confirmationDate"
                value={formData.confirmationDate}
                onChange={handleChange}
              />
              <InputField
                label="Employee type"
                name="employeeType"
                value={formData.employeeType}
                onChange={handleChange}
              />
              <DatePickerField
                label="DOJ"
                type="date"
                name="doj"
                value={formData.doj}
                onChange={handleChange}
              />
              <InputField
                label="Leave Template"
                name="leaveTemplate"
                value={formData.leaveTemplate}
                onChange={handleChange}
              />
              <DatePickerField
                label="Leave Assign Date"
                type="date"
                name="leaveAssignDate"
                value={formData.leaveAssignDate}
                onChange={handleChange}
              />
              <InputField
                label="Notice Days"
                name="noticeDays"
                value={formData.noticeDays}
                onChange={handleChange}
              />
            </div>
          </div>
        );

      case "family":
        return (
          <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-2">
            <InputField
              label="Father Name"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
            />
            <InputField
              label="Mother Name"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
            />
            <InputField
              label="Martial Status"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
            />
            <InputField
              label="Spouse Now"
              name="spouseName"
              value={formData.spouseName}
              onChange={handleChange}
            />
            <InputField
              label="Date Of Marriage"
              name="dateOfMarriage"
              value={formData.dateOfMarriage}
              onChange={handleChange}
            />
            <InputField
              label="Enter Nationality"
              name="enterNationality"
              value={formData.enterNationality}
              onChange={handleChange}
            />
          </div>
        );

      case "manager":
        return (
          <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-2">
            <SearchInput
              label="L1 Manager"
              name="l1Manager"
              value={formData.l1Manager}
              onChange={handleChange}
              icon={FiSearch}
            />
            <InputField
              label="L1 Manager Name"
              name="l1ManagerName"
              value={formData.l1ManagerName}
              onChange={handleChange}
            />
            <InputField
              label="L1 Manager Email Id"
              name="l1ManagerEmail"
              value={formData.l1ManagerEmail}
              onChange={handleChange}
            />
            <SearchInput
              label="L1 Manager Mobile Number"
              name="l1ManagerMobile"
              value={formData.l1ManagerMobile}
              onChange={handleChange}
              icon={BiPhoneCall}
            />

            <SearchInput
              label="HR Manager"
              name="hrManager"
              value={formData.hrManager}
              onChange={handleChange}
              icon={FiSearch}
            />
            <InputField
              label="HR Name"
              name="hrName"
              value={formData.hrName}
              onChange={handleChange}
            />
            <InputField
              label="HR Email Id"
              name="hrEmail"
              value={formData.hrEmail}
              onChange={handleChange}
            />
            <SearchInput
              label="HR Mobile Number"
              name="hrMobile"
              value={formData.hrMobile}
              onChange={handleChange}
              icon={BiPhoneCall}
            />
          </div>
        );

      case "presentAddress":
        return (
          <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg">
            <h1 className="text-base font-semibold mb-1 text-gray-500">
              Present Address
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <InputField
                label="Address 1"
                name="presentAddress1"
                value={formData.presentAddress1}
                onChange={handleChange}
              />
              <InputField
                label="Address 2"
                name="presentAddress2"
                value={formData.presentAddress2}
                onChange={handleChange}
              />
              <SelectField
                label="City"
                name="presentCity"
                value={formData.presentCity}
                onChange={handleChange}
                options={[
                  { value: "", label: "Select City" },
                  { value: "mumbai", label: "Mumbai" },
                  { value: "delhi", label: "Delhi" },
                  { value: "bangalore", label: "Bangalore" },
                  { value: "chennai", label: "Chennai" },
                  { value: "kolkata", label: "Kolkata" },
                  { value: "hyderabad", label: "Hyderabad" },
                  { value: "pune", label: "Pune" },
                  { value: "ahmedabad", label: "Ahmedabad" },
                ]}
              />
              <InputField
                label="Enter Zip"
                name="presentZip"
                value={formData.presentZip}
                onChange={handleChange}
              />
              <SelectField
                label="State"
                name="presentState"
                value={formData.presentState}
                onChange={handleChange}
                options={[
                  { value: "", label: "Select State" },
                  { value: "maharashtra", label: "Maharashtra" },
                  { value: "delhi", label: "Delhi" },
                  { value: "karnataka", label: "Karnataka" },
                  { value: "tamil-nadu", label: "Tamil Nadu" },
                  { value: "west-bengal", label: "West Bengal" },
                  { value: "telangana", label: "Telangana" },
                  { value: "gujarat", label: "Gujarat" },
                  { value: "rajasthan", label: "Rajasthan" },
                  { value: "uttar-pradesh", label: "Uttar Pradesh" },
                  { value: "madhya-pradesh", label: "Madhya Pradesh" },
                ]}
              />
              <SelectField
                label="Country"
                name="presentCountry"
                value={formData.presentCountry}
                onChange={handleChange}
                options={[
                  { value: "", label: "Select Country" },
                  { value: "india", label: "India" },
                  { value: "united-states", label: "United States" },
                  { value: "united-kingdom", label: "United Kingdom" },
                  { value: "canada", label: "Canada" },
                  { value: "australia", label: "Australia" },
                  { value: "germany", label: "Germany" },
                  { value: "france", label: "France" },
                  { value: "japan", label: "Japan" },
                  { value: "singapore", label: "Singapore" },
                  { value: "uae", label: "United Arab Emirates" },
                ]}
              />
            </div>
            <div className="flex mt-2 gap-2">
              <VariableTypeRow
                label={
                  "Use present address as permanent address"
                }
              />
            </div>
          </div>
        );

      case "unitDepartment":
        return (
          <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-2">
            <SelectField
              label="Unit Name"
              name="unitName"
              value={formData.unitName}
              onChange={handleChange}
            >
              <option>Select All</option>
            </SelectField>
            <SelectField
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option>Select All</option>
            </SelectField>
            <SelectField
              label="Sub Department"
              name="subDepartment"
              value={formData.subDepartment}
              onChange={handleChange}
            >
              <option></option>
            </SelectField>
            <SelectField
              label="Grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
            >
              <option>Select All</option>
            </SelectField>
            <SelectField
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            >
              <option>Select All</option>
            </SelectField>
            <SelectField
              label="Level"
              name="level"
              value={formData.level}
              onChange={handleChange}
            >
              <option>Select All</option>
            </SelectField>
            <SelectField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            >
              <option>Select All</option>
            </SelectField>
            <SelectField
              label="Unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
            >
              <option>Select All</option>
            </SelectField>
          </div>
        );

      case "permanentAddress":
        return (
          <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg">
            <h1 className="text-base font-semibold mb-1 text-gray-500">
              Permanent Address
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
              <InputField
                label="Address 1"
                name="permanentAddress1"
                value={formData.permanentAddress1}
                onChange={handleChange}
              />
              <InputField
                label="Address 2"
                name="permanentAddress2"
                value={formData.permanentAddress2}
                onChange={handleChange}
              />
              <SelectField
                label="City"
                name="permanentCity"
                value={formData.permanentCity}
                onChange={handleChange}
              >
                <option value="">Select City</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
                <option value="bangalore">Bangalore</option>
                <option value="chennai">Chennai</option>
                <option value="kolkata">Kolkata</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="pune">Pune</option>
                <option value="ahmedabad">Ahmedabad</option>
              </SelectField>
              <InputField
                label="Enter Zip"
                name="permanentZip"
                value={formData.permanentZip}
                onChange={handleChange}
              />
              <SelectField
                label="State"
                name="permanentState"
                value={formData.permanentState}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="delhi">Delhi</option>
                <option value="karnataka">Karnataka</option>
                <option value="tamil-nadu">Tamil Nadu</option>
                <option value="west-bengal">West Bengal</option>
                <option value="telangana">Telangana</option>
                <option value="gujarat">Gujarat</option>
                <option value="rajasthan">Rajasthan</option>
                <option value="uttar-pradesh">Uttar Pradesh</option>
                <option value="madhya-pradesh">Madhya Pradesh</option>
              </SelectField>
              <SelectField
                label="Country"
                name="permanentCountry"
                value={formData.permanentCountry}
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                <option value="india">India</option>
                <option value="united-states">United States</option>
                <option value="united-kingdom">United Kingdom</option>
                <option value="canada">Canada</option>
                <option value="australia">Australia</option>
                <option value="germany">Germany</option>
                <option value="france">France</option>
                <option value="japan">Japan</option>
                <option value="singapore">Singapore</option>
                <option value="uae">United Arab Emirates</option>
              </SelectField>
            </div>
          </div>
        );

      case "taxPAN":
        return (
          <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <InputField
                label="PAN"
                name="pan"
                value={formData.pan}
                onChange={handleChange}
                className="p-2"
              />
              <SelectField
                label="Tax Regime"
                name="taxRegime"
                value={formData.taxRegime}
                onChange={handleChange}
                className="py-2 px-3"
              >
                <option>New Regime</option>
              </SelectField>
            </div>
            <p className="ds-text-xs mt-2 text-gray-500">
              Enter PAN in format: AAAPA1234A
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {/* Desktop Layout (2 columns) */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">
        <div className="cols-span-1 space-y-4">
          {/* Left Column Sections in desktop order */}
          {renderSection("personal")}
          {renderSection("family")}
          {renderSection("presentAddress")}
          {renderSection("permanentAddress")}
        </div>

        <div className="col-span-1 space-y-4">
          {/* Right Column Sections in desktop order */}
          {renderSection("professional")}
          {renderSection("manager")}
          {renderSection("unitDepartment")}
          {renderSection("taxPAN")}
        </div>
      </div>

      {/* Mobile Layout (single column with custom order) */}
      <div className="lg:hidden space-y-4">
        {mobileOrder.map((sectionName) => (
          <div key={sectionName} className="mb-4">
            {renderSection(sectionName)}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-row sm:flex-row justify-end w-full gap-2 mt-4">
          <button
          onClick={()=>{window.history.back()}}
          type="button"
          className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24"
        >
          Back
        </button>
        <button
          type="button"
          className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={onNext}
          className="font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24 cursor-pointer bg-ds-primary text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;
