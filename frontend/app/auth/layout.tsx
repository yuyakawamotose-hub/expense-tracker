import { Box, Paper } from "@mui/material";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          px: 2,
          py: 4,
          background:
            "radial-gradient(circle at top left, #dbeafe 0%, transparent 35%), radial-gradient(circle at bottom right, #dcfce7 0%, transparent 30%), #f8fafc",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 440,
            p: { xs: 3, sm: 5 },
            borderRadius: 5,
            border: "1px solid",
            borderColor: "rgba(148, 163, 184, 0.25)",
            boxShadow: "0 24px 60px rgba(15, 23, 42, 0.12)",
          }}
        >
          <Box
            sx={{
              width: 52,
              height: 52,
              display: "grid",
              placeItems: "center",
              mb: 3,
              borderRadius: 3,
              color: "primary.main",
              bgcolor: "primary.light",
            }}
          >
            {/* <AccountBalanceWalletRoundedIcon fontSize="large" /> */}
            icon
          </Box>

          {children}
        </Paper>
      </Box>
    </>
  );
}
