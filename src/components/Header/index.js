import { Typography, Divider, Container, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    navigate("/"); // Change the path to the desired home route
  };

  const handleCartClick = () => {
    navigate("/cart"); // Change the path to the desired cart route
  };

  return (
    <>
      {location.pathname === "/cart" ? (
        <Typography
          variant="h3"
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "10px",
          }}
        >
          Cart
        </Typography>
      ) : (
        <Typography
          variant="h3"
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "10px",
          }}
        >
          Welcome to our store
        </Typography>
      )}

      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button onClick={handleHomeClick}>Home</Button>
        <Button onClick={handleCartClick}>Cart</Button>
      </Container>

      <Divider />
    </>
  );
}
