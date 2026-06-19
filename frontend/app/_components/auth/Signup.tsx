"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";

import { useState } from "react";
import LockOutlineSharpIcon from "@mui/icons-material/LockOutlineSharp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import { linkStyle } from "@/app/_const/css";

export const Signup = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  return (
    <>
      {/* {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )} */}
      <Typography variant="h4" gutterBottom>
        Create your account
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Start tracking your income, expenses, and monthly balance.{" "}
      </Typography>

      <Box component="form" onSubmit={(e) => e.preventDefault()}>
        <TextField
          fullWidth
          required
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
          }}
        />

        <TextField
          fullWidth
          required
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
          }}
        />
        <TextField
          fullWidth
          required
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
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
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    edge="end"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          // disabled={isLoading}
          sx={{
            mt: 4,
            minHeight: 50,
            borderRadius: 2.5,
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 700,
          }}
        >
          Sign up
          {/* {isLoading ? "Signing in..." : "Sign in"} */}
        </Button>

        <Typography
          align="center"
          color="text.secondary"
          variant="body2"
          sx={{ mt: 4 }}
        >
          Already have an account?
          <Link href="/auth/signin" style={{ ...linkStyle, marginLeft: 8 }}>
            Sign in
          </Link>
        </Typography>
      </Box>
    </>
  );
};
