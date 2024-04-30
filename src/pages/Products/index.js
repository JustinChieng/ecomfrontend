import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';

import { getProducts } from "../../utils/api_product";
import { getCategories } from "../../utils/api_categories";

import { Box, Divider, Typography, Container, Grid, Card, CardContent, Button, FormControl, InputLabel, MenuItem, Badge } from '@mui/material';
import Select from '@mui/material/Select';

export default function Products() {
    const [category, setCategory] = useState("all");
    const { data: rows } = useQuery({ queryKey: ['products', category], queryFn: () => getProducts(category) });
    const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: getCategories });

    return (
        <>
            <Container>
                <Typography variant="h3" style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "10px"
                }}>
                    Welcome to our store
                </Typography>
                <Divider />
                <Box style={{ marginBottom: "20px"}}>
                    <Container style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "10px",
                        paddingLeft: 0,
                        paddingRight: 0,
                        width: "100%"
                    }}>
                        <Typography variant='h5' style={{ margin: 0 }}>
                            Products
                        </Typography>
                        <Box sx={{ marginLeft: 'auto' }}>
                            <Button variant="contained" color="success" size="small">
                                Add New
                            </Button>
                        </Box>
                    </Container>


                    <Box sx={{ maxWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">All Categories</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                label="Categories"
                            >
                                <MenuItem value="all">All Categories</MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>{category}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>


                </Box>
                <Grid container spacing={2}>
                    {rows && rows.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'center', fontWeight: "bold" }}>
                                        {product.name}
                                    </Typography>
                                    
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: "20px" }}>
                                        <Typography variant="body1" style={{ backgroundColor: "lightgreen", borderRadius: "10px", paddingLeft: "20px", paddingRight: "20px" }}>
                                            ${product.price}
                                        </Typography>
                                        <Typography variant="body1" style={{ backgroundColor: "orange", borderRadius: "10px", paddingLeft: "20px", paddingRight: "20px" }}>
                                            {product.category}
                                        </Typography>
                                    </Box>
                                    <Button variant="contained" color="primary" fullWidth>
                                        Add to Cart
                                    </Button>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: "20px" }}>
                                        <Button variant="contained" color="primary" sx={{ borderRadius: "20px"}}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="error" sx={{ borderRadius: "20px"}}>
                                            Delete
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}
