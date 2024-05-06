import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../../utils/api_product";
import { getCategories } from "../../utils/api_categories";

import Header from "../../components/Header";
import ProductCard from "../../components/Card";

import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Select from "@mui/material/Select";

export default function Products() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  const { data: rows = [] } = useQuery({
    queryKey: ["products", category, perPage, page],
    queryFn: () => getProducts(category, perPage, page),
  });
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <>
      <Container>
        <Header />
        <Box style={{ marginBottom: "20px" }}>
          <Container
            style={{
              display: "flex",
              alignItems: "center",
              margin: "10px",
              paddingLeft: 0,
              paddingRight: 0,
              width: "100%",
            }}
          >
            <Typography variant="h5" style={{ margin: 0 }}>
              Products
            </Typography>
            <Box sx={{ marginLeft: "auto" }}>
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => {
                  navigate("/add");
                }}
              >
                Add New
              </Button>
            </Box>
          </Container>

          <Box sx={{ maxWidth: 120 }}>
            <FormControl
              sx={{ marginTop: "10px", width: "200px", marginLeft: "10px" }}
            >
              <InputLabel id="demo-simple-select-label">
                All Categories
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  // reset the page to 1
                  setPage(1);
                }}
                label="Categories"
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Grid container spacing={2}>
          {rows &&
            rows.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          {rows.length === 0 ? (
            <Grid item xs={12}>
              <Typography align="center" sx={{ padding: "10px 0" }}>
                End of List.
              </Typography>
            </Grid>
          ) : null}
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
            padding: "20px 0",
          }}
        >
          <Button
            disabled={page === 1 ? true : false}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span>Page: {page}</span>
          <Button
            disabled={rows.length === 0 ? true : false}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </Box>
      </Container>
    </>
  );
}
