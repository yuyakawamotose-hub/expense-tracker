"use client";

import {
  Alert,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import { linkStyle } from "@/app/_const/css";
import {
  forgetPasswordAction,
  forgetPasswordActionInitialValue,
} from "@/app/_actions/auth/forgetPassword";
import { useActionState } from "react";
import { signinPagePath } from "@/app/_const/auth";

export const ForgetPassword = () => {
  const [state, dispatchAction, isPending] = useActionState(
    forgetPasswordAction,
    forgetPasswordActionInitialValue,
  );
  return (
    <>
      {state.success && <Alert sx={{ mb: 2 }}>{state.message}</Alert>}
      <Typography variant="h4" gutterBottom>
        Forgot your password?
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Enter your email address and we&apos;ll send you a link to reset your
        password.
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
          {isPending ? "Sending ..." : "Send reset link"}
        </Button>

        <Typography
          align="center"
          color="text.secondary"
          variant="body2"
          sx={{ mt: 3 }}
        >
          Remember your password?{" "}
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
