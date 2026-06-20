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
import {
  signupAction,
  signupActionInitialValue,
} from "@/app/_actions/auth/signup";
import { signinPagePath } from "@/app/_const/auth";

export const Signup = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [state, dispatchAction, isPending] = useActionState(
    signupAction,
    signupActionInitialValue,
  );
  return (
    <>
      {!state.success && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {state.message}
        </Alert>
      )}
      <Typography variant="h4" gutterBottom>
        Create your account
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Start tracking your income, expenses, and monthly balance.{" "}
      </Typography>

      <form action={dispatchAction}>
        <TextField
          fullWidth
          name="email"
          label="Email address"
          type="email"
          autoComplete="email"
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
        <TextField
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
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
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    edge="end"
                    aria-label={
                      showPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
          error={state.fieldErrors.confirmPassword.length > 0}
          helperText={state.fieldErrors.confirmPassword.join("\n")}
        />

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
          {isPending ? "Signing up..." : "Sign up"}
        </Button>

        <Typography
          align="center"
          color="text.secondary"
          variant="body2"
          sx={{ mt: 4 }}
        >
          Already have an account?
          <Link
            href={signinPagePath}
            style={{
              ...linkStyle,
              marginLeft: 8,
              pointerEvents: isPending ? "none" : "auto",
              opacity: isPending ? 0.5 : 1,
              cursor: isPending ? "not-allowed" : "pointer",
            }}
          >
            Sign in
          </Link>
        </Typography>
      </form>
    </>
  );
};
