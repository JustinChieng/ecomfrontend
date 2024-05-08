import { Typography, Divider, Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  let pageTitle = "Welcome to My Store";

  if (location.pathname === "/cart") {
    pageTitle = "Cart";
  } else if (location.pathname === "/checkout") {
    pageTitle = "Checkout";
  } else if (location.pathname === "/orders") {
    pageTitle = "Orders";
  }

  return (
    <>
      <Typography
        variant="h6"
        component="div"
        sx={{
          textAlign: "center",
          marginTop: "20px",
          marginBottm: "20px",
          fontWeight: "bold",
          fontSize: "40px",
        }}
      >
        {pageTitle}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
        <Button
          style={
            {
              // color: location.pathname === "/cart" ? "white" : "inherit",
              // backgroundColor:
              //   location.pathname === "/cart" ? "#238be6" : "inherit",
            }
          }
          onClick={() => {
            navigate("/cart");
          }}
        >
          Cart
        </Button>
        <Button
          onClick={() => {
            navigate("/orders");
          }}
        >
          My Orders
        </Button>
      </Box>
      <Divider />
    </>
  );
}
