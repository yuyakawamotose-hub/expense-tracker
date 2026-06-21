"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useActionState, useState } from "react";
import LockOutlineSharpIcon from "@mui/icons-material/LockOutlineSharp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import { linkStyle } from "@/app/_const/css";
import { signinAction } from "@/app/_actions/auth/signin";
import {
  forgetPasswordPagePath,
  createSigninActionInitialValue,
  signupPagePath,
} from "@/app/_const/auth";

export const Signin = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const signinActionInitialValue = createSigninActionInitialValue();
  const [state, dispatchAction, isPending] = useActionState(
    signinAction,
    signinActionInitialValue,
  );

  return (
    <>
      {state.success === false && state.success && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {state.message}
        </Alert>
      )}
      <Typography variant="h4" gutterBottom>
        Welcome back
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Sign in to manage your expenses and monthly balance.
      </Typography>

      <form action={dispatchAction}>
        <TextField
          fullWidth
          name="email"
          label="Email address"
          type="text"
          margin="normal"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailSharpIcon />
                </InputAdornment>
              ),
            },
            formHelperText: {
              sx: {
                whiteSpace: "pre-line",
              },
            },
          }}
          error={state.fieldErrors.email.length > 0}
          helperText={state.fieldErrors.email.join("\n")}
        />

        <TextField
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          margin="normal"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlineSharpIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
            formHelperText: {
              sx: {
                whiteSpace: "pre-line",
              },
            },
          }}
          error={state.fieldErrors.password.length > 0}
          helperText={state.fieldErrors.password.join("\n")}
        />

        <Typography color="text.secondary" variant="body2">
          <Link
            href={forgetPasswordPagePath}
            style={{
              ...linkStyle,
              pointerEvents: isPending ? "none" : "auto",
              opacity: isPending ? 0.5 : 1,
              cursor: isPending ? "not-allowed" : "pointer",
            }}
          >
            Forgot password
          </Link>
        </Typography>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          disabled={isPending}
          sx={{
            mt: 4,
            minHeight: 50,
            borderRadius: 2.5,
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 700,
          }}
        >
          {isPending ? "Signing in..." : "Sign in"}
        </Button>

        <Typography
          align="center"
          color="text.secondary"
          variant="body2"
          sx={{ mt: 4 }}
        >
          Don&apos;t have an account?
          <Link
            href={signupPagePath}
            style={{
              ...linkStyle,
              marginLeft: 8,
              pointerEvents: isPending ? "none" : "auto",
              opacity: isPending ? 0.5 : 1,
              cursor: isPending ? "not-allowed" : "pointer",
            }}
          >
            Create an account
          </Link>
        </Typography>
      </form>
    </>
  );
};
