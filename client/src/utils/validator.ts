import showToast from "./errorToasts";

export const validateEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    showToast("Email and password are required", "error");
  }

  if (password.length < 6) {
    showToast("Password must be at least 6 characters long", "error");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast("Invalid email address", "error");
  }
};
