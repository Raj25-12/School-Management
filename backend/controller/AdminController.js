const AdminAccount = require("../models/AdminAccount");
const bcrypt = require("bcryptjs");

const adminCreateAccount = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = String(password).trim();

    const existing = await AdminAccount.findOne({
      email: { $regex: new RegExp(`^${cleanEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }
    });

    if (existing) {
      return res.status(400).json({
        message: "Admin account with this email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(cleanPassword, 10);

    const response = await AdminAccount.create({
      email: cleanEmail,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Admin account created successfully",
      data: {
        id: response._id,
        email: response.email
      }
    });

  } catch (error) {
    console.error("CREATE ADMIN ERROR:", error);
    res.status(500).json({
      message: error.message || "Failed to create account"
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = String(password).trim();

    // Find admin by case-insensitive email
    const response = await AdminAccount.findOne({
      email: { $regex: new RegExp(`^${cleanEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }
    });

    if (!response) {
      return res.status(400).json({
        message: "Email does not exist"
      });
    }

    // Try bcrypt comparison first
    let isPasswordCorrect = false;
    try {
      isPasswordCorrect = await bcrypt.compare(cleanPassword, response.password);
    } catch (e) {
      isPasswordCorrect = false;
    }

    // Fallback: If account was created with plain text password before bcrypt was added
    if (!isPasswordCorrect && response.password === cleanPassword) {
      isPasswordCorrect = true;
      // Auto-migrate plain text password to bcrypt hash in DB
      try {
        response.password = await bcrypt.hash(cleanPassword, 10);
        await response.save();
      } catch (saveErr) {
        console.error("Auto-hash migration warning:", saveErr);
      }
    }

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Password is not correct"
      });
    }

    res.status(200).json({
      message: "Login successful",
      data: {
        id: response._id,
        email: response.email
      }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      message: error.message || "Internal server error"
    });
  }
};

module.exports = {
  adminCreateAccount,
  adminLogin
};