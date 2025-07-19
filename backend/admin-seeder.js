const adminDetails = require("./models/details/admin-details.model");
const connectToMongo = require("./database/db");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // <-- 1. IMPORT BCRYPTJS

const seedData = async () => {
  try {
    await connectToMongo();

    // Clear existing admin data
    await adminDetails.deleteMany({});

    const password = "admin123";
    const employeeId = 123456;

    // --- 2. HASH THE PASSWORD ---
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const adminDetail = {
      employeeId: employeeId,
      firstName: "Sundar",
      middleName: "R",
      lastName: "Pichai",
      email: "admin@gmail.com",
      phone: "1234567890",
      profile: "Faculty_Profile_123456.jpg",
      address: "123 College Street",
      district: "College City",
      state: "State",
      pincode: "123456",
      country: "India",
      gender: "male",
      dob: new Date("1990-01-01"),
      designation: "System Administrator",
      joiningDate: new Date(),
      salary: 50000,
      status: "active",
      isSuperAdmin: true,
      emergencyContact: {
        name: "Emergency Contact",
        relationship: "Spouse",
        phone: "9876543210",
      },
      bloodGroup: "O+",
      password: hashedPassword, // <-- 3. USE THE HASHED PASSWORD
    };

    await adminDetails.create(adminDetail);

    console.log("\n=== Admin Credentials (Use these to log in) ===");
    console.log("Employee ID:", employeeId);
    console.log("Password:", password); // Log the original password for your reference
    console.log("Email:", adminDetail.email);
    console.log("==============================================\n");
    console.log("Seeding completed successfully with hashed password!");

  } catch (error) {
    console.error("Error while seeding:", error);
  } finally {
    await mongoose.connection.close();
    process.exit();
  }
};

seedData();