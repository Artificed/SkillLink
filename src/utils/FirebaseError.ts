const firebaseErrorMessages: { [key: string]: string } = {
    "auth/invalid-email": "The email address is invalid. Please enter a valid email.",
    "auth/user-disabled": "This user account has been disabled. Contact support for help.",
    "auth/user-not-found": "No user found with this email address. Please sign up first.",
    "auth/wrong-password": "Incorrect password. Please try again or reset your password.",
    "auth/email-already-in-use": "This email is already in use. Try logging in instead.",
    "auth/weak-password": "Password must be at least 6 characters long.",
    "auth/operation-not-allowed": "Signing in with this provider is disabled. Contact support for help.",
    "auth/account-exists-with-different-credential": "An account already exists with the same email but different sign-in credentials.",
    "auth/credential-already-in-use": "This credential is already associated with a different account.",
    "auth/requires-recent-login": "Please log in again to complete this action for security reasons.",
    "auth/network-request-failed": "A network error occurred. Check your connection and try again.",
    "auth/too-many-requests": "Too many requests from your device. Please try again later.",
    "auth/popup-blocked": "The sign-in popup was blocked. Please allow popups and try again.",
    "auth/popup-closed-by-user": "The popup was closed before sign-in was completed. Please try again.",
    "auth/invalid-credential": "Invalid credentials. Check your email and password.",
    "auth/invalid-verification-code": "The verification code is invalid or has expired.",
    "auth/invalid-verification-id": "The verification ID is invalid or has expired.",
    "auth/invalid-custom-token": "The custom token format is incorrect. Please try again.",
    "auth/custom-token-mismatch": "The custom token corresponds to a different audience.",
    "auth/multi-factor-auth-required": "Multi-factor authentication is required. Complete additional steps.",
    "default": "An unexpected error occurred. Please try again."
  };
  
  export const getFirebaseErrorMessage = (errorCode: string): string => {
    return firebaseErrorMessages[errorCode] || firebaseErrorMessages["default"];
  };
  