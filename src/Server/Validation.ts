export const validation = {
  login: {
    email: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
  },

  register: {
    firstNameValidation: {
      required: "Firstname is required",
    },
    lastNameValidation: {
      required: "Lastname is required",
    },
    roleValidation: {
      required: "Role is required",
    },
  },

  resetPassword: {
    email: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
    otp: {
      required: "OTP is required",
      minLength: {
        value: 4,
        message: "OTP must be at least 4 characters",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
  },
};
