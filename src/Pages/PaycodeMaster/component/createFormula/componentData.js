
export const componentData = {
    Payhead: Array.from({ length: 8 }).map((_, i) => ({
        code: `A0000${i + 1}`,
        desc: ["HRA", "Transport Allowance", "Uniform Allowance", "Bonus"][i % 4],
        type: i % 2 === 0 ? "Addition" : "Deduction",
    })),

    "Department Master": [
        { code: "DEP01", desc: "Human Resource", type: "Master Field" },
        { code: "DEP02", desc: "Finance", type: "Master Field" },
    ],

    "Location Master": [
        { code: "LOC01", desc: "Bhopal", type: "Master Field" },
        { code: "LOC02", desc: "Indore", type: "Master Field" },
    ],

    "Entity Master": [
        { code: "ENT01", desc: "Main Entity", type: "Entity Field" },
    ],

    "Grade Master": [
        { code: "G1", desc: "Grade 1", type: "Grade Field" },
        { code: "G2", desc: "Grade 2", type: "Grade Field" },
    ],

    "Designation Master": [
        { code: "DES01", desc: "Developer", type: "Designation Field" },
        { code: "DES02", desc: "Manager", type: "Designation Field" },
    ],

    "Employee Field": [
        { code: "DOB", desc: "Date of Birth", type: "Employee Field" },
        { code: "DOJ", desc: "Date of Joining", type: "Employee Field" },
        { code: "TENURE", desc: "Employee Tenure (Years)", type: "Derived Field" },
    ],

    "Attendance Field": [
        { code: "WORK", desc: "Working Days", type: "Attendance Field" },
        { code: "LEAVE", desc: "Leave Count", type: "Attendance Field" },
    ],
};