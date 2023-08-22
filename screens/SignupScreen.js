import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  async function signUpHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      const errorMessage = err.response.data.error.message;
      Alert.alert(
        "Authentication failed!",
        errorMessage
          ? errorMessage
          : "Could not create user. Please check your input and try again later!"
      );
      setIsAuthenticating(false);
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }
  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
