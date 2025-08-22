import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, FileText } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { toast } from "sonner";
import axios from "axios";
import { backendURL } from "@/api/auth";
import Spinner from "@/components/Spinner";

interface Product {
  name: string;
  rate: number;
  quantity: number;
}

const AddProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ name: "", quantity: "", rate: "" });
  const token = useSelector((state: RootState) => state.auth.token);
  const [subTotal, setSubTotal] = useState(0);
  const [totalWithGst, setTotalWithGst] = useState(0);
  const [invoiceId, setInvoiceId] = useState("");
  const [loading, setLoading] = useState(false);
  const invoiceIdref = useRef<string>("");

  // ✅ add product
  const addProduct = async () => {
    setLoading(true);
    const qty = parseInt(form.quantity, 10);
    const rt = parseFloat(form.rate);

    if (!form.name || isNaN(qty) || qty <= 0 || isNaN(rt) || rt <= 0) {
      toast.error("Please enter valid product details");
      return;
    }

    if (!invoiceId) {
      await generateInvoice();
    }

    const newProduct: Product = {
      name: form.name,
      quantity: qty,
      rate: rt,
    };

    try {
      const res = await axios.post(
        `${backendURL}/api/invoice/add-product`,
        { ...newProduct, invoiceId: invoiceIdref.current },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("product added:", res.data);
      setProducts((prev) => [...prev, newProduct]);
      setForm({ name: "", quantity: "", rate: "" });
      toast.success("Product added!");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  // ✅ handle input
  const handleInputChange = (field: string, value: string) => {
    // only allow digits + decimal for numeric fields
    if (field === "quantity") {
      if (/^\d*$/.test(value)) {
        setForm((prev) => ({ ...prev, [field]: value }));
      }
    } else if (field === "rate") {
      if (/^\d*\.?\d*$/.test(value)) {
        setForm((prev) => ({ ...prev, [field]: value }));
      }
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  // ✅ recalc totals
  useEffect(() => {
    const subTotal = products.reduce(
      (sum, product) => sum + product.rate * product.quantity,
      0
    );
    const gstAmount = subTotal * 0.18;
    setSubTotal(subTotal);
    setTotalWithGst(subTotal + gstAmount);
  }, [products]);

  // ✅ generate invoice id
  const generateInvoice = async () => {
    try {
      const response = await axios.post(
        `${backendURL}/api/invoice/create`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Invoice created:", response.data);
      invoiceIdref.current = response.data.invoiceId;
      setInvoiceId(response.data.invoiceId);
    } catch (error) {
      console.error("Error generating invoice:", error);
      toast.error("Failed to generate invoice");
    }
  };

  // ✅ download pdf
  const generatePDF = async () => {
    setLoading(true);
    if (!invoiceId) {
      toast.error("Please generate an invoice first, refresh");
      return;
    }
    try {
      const res = await axios.post(
        `${backendURL}/api/generate-pdf`,
        { invoiceId },
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${invoiceId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success("PDF downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#141414] text-white flex items-center justify-center 
      bg-[radial-gradient(circle_at_50%_10%,rgba(79,89,168,0.3),transparent_25%)]"
    >
      <div className="min-w-[80%] mx-auto py-2 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Add Products</h1>
          <p>This is a basic invoice generator for assignment purpose.</p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className=" space-y-2">
            <Label htmlFor="product-name">Product Name</Label>
            <Input
              id="product-name"
              placeholder="Enter product name"
              value={form.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div className=" space-y-2">
            <Label htmlFor="product-rate">Rate</Label>
            <Input
              id="product-rate"
              type="text"
              placeholder="Enter rate"
              value={form.rate}
              onChange={(e) => handleInputChange("rate", e.target.value)}
            />
          </div>

          <div className=" space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="text"
              placeholder="Enter quantity"
              value={form.quantity}
              onChange={(e) => handleInputChange("quantity", e.target.value)}
            />
          </div>
        </div>

        <div className="mb-8 flex justify-center">
          <Button
            onClick={addProduct}
            className="flex gap-2 bg-ash text-green items-center"
          >
            <Plus className="w-4 h-4" />{" "}
            {loading ? (
              <>
                Adding... <Spinner />
              </>
            ) : (
              "Add Product"
            )}
          </Button>
        </div>

        {/* Products Table */}
        <Card className="border p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-white">
                  <th className="text-left p-4 font-medium text-black">
                    Product
                  </th>
                  <th className="text-left p-4 font-medium text-black">Rate</th>
                  <th className="text-left p-4 font-medium text-black">Qty</th>
                  <th className="text-left p-4 font-medium text-black">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, index) => (
                  <tr key={index} className="border-b bg-black text-white">
                    <td className="p-4">{p.name}</td>
                    <td className="p-4">{p.rate}</td>
                    <td className="p-4">{p.quantity}</td>
                    <td className="p-4">
                      INR {(p.rate * p.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="text-white">
                  <td colSpan={3} className="p-4 text-right font-medium">
                    Sub-Total
                  </td>
                  <td className="p-4">INR {subTotal.toFixed(2)}</td>
                </tr>
                <tr className="text-white">
                  <td colSpan={3} className="p-4 text-right font-medium">
                    Incl + GST 18%
                  </td>
                  <td className="p-4">INR {totalWithGst.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <Button
            onClick={generatePDF}
            className="flex bg-ash text-green gap-2 mx-auto"
          >
            <FileText className="w-4 h-4" />
            {loading ? (
              <>
                Generating PDF... <Spinner />
              </>
            ) : (
              "Download Invoice"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
