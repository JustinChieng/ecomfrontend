import {
  Container,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import Header from "../../components/Header";
import { deleteOrder, getOrders, updateOrder } from "../../utils/api_orders";

export default function OrderPage() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { data: orderItems = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const updateOrderStatusMutation = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      enqueueSnackbar("Order status updated", {
        variant: "success",
      });
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });

  const deleteOrderMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      enqueueSnackbar("Order is Removed", {
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });

  const handleRemoveFromOrder = (_id, status) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this item from order?"
    );
    if (confirm) {
      deleteOrderMutation.mutate(_id);
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatusMutation.mutate({ id: orderId, status: newStatus });
  };

  return (
    <Container>
      <Header />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Customer</TableCell>
              <TableCell align="center">Products</TableCell>
              <TableCell align="center">Total Amount</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Payment Date</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderItems.map((item) => (
              <TableRow key={item._id}>
                <TableCell component="th" scope="row">
                  {item.customerName}
                </TableCell>
                <TableCell align="center">
                  {item.products.map((product) => (
                    <div key={product._id}>{product.name}</div>
                  ))}
                </TableCell>
                <TableCell align="center">{item.totalPrice}</TableCell>
                <TableCell align="center">
                  <Select
                    value={item.status}
                    onChange={(e) =>
                      handleStatusChange(item._id, e.target.value)
                    }
                    disabled={item.status === "pending"}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="failed">Failed</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="center">{item.paymentDate}</TableCell>
                <TableCell align="right">
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => {
                      handleRemoveFromOrder(item._id, item.status);
                    }}
                    disabled={item.status !== "pending"}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
