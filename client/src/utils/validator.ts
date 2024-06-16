import showToast from "./errorToasts";

type AuthEvent = "signup" | "login";

type AuthEventType = (
  email: string,
  password: string,
  event: AuthEvent
) => Promise<void>;

export const validateEmailAndPassword: AuthEventType = async (
  email: string,
  password: string,
  event = "signup"
) => {
  if (!email || !password) {
    showToast("Email and password are required", "error");
  }

  if (event !== "signup") return;

  if (password.length < 6) {
    showToast("Password must be at least 6 characters long", "error");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast("Invalid email address", "error");
  }
};
