import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, FileText } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const AddProduct = () => {
  // const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "(Product name-1)", price: 5, quantity: 10 },
    { id: "2", name: "(Product name-2)", price: 2, quantity: 10 },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const addProduct = () => {
    if (!formData.name || !formData.price || !formData.quantity) {
      // toast({
      //   title: "Error",
      //   description: "Please fill in all fields",
      //   variant: "destructive",
      // });
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
    };

    setProducts([...products, newProduct]);
    setFormData({ name: "", price: "", quantity: "" });

    // toast({
    //   title: "Success",
    //   description: "Product added successfully",
    // });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const subTotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const gstAmount = subTotal * 0.18;
  const totalWithGst = subTotal + gstAmount;

  const generatePDF = () => {
    // toast({
    //   title: "PDF Generated",
    //   description: "Invoice PDF has been generated successfully",
    // });
  };

  return (
    <div
      className="min-h-screen bg-[#141414] text-white flex items-center justify-center 
  bg-[radial-gradient(circle_at_50%_10%,rgba(79,89,168,0.3),transparent_25%)]"
    >
      <div className=" min-w-[80%] mx-auto py-2 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Add Products</h1>
          <p className="text-whi">
            This is basic login page which is used for levitation assignment
            purpose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <Label
              htmlFor="product-name"
              className="text-sm font-medium mb-2 block"
            >
              Product Name
            </Label>
            <Input
              id="product-name"
              placeholder="Enter the product name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="bg-wierd border-border placeholder:text-whi"
            />
          </div>

          <div>
            <Label
              htmlFor="product-price"
              className="text-sm font-medium mb-2 block"
            >
              Product Price
            </Label>
            <Input
              id="product-price"
              placeholder="Enter the price"
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              className="bg-wierd border-border placeholder:text-whi"
            />
          </div>

          <div>
            <Label
              htmlFor="quantity"
              className="text-sm font-medium mb-2 block"
            >
              Quantity
            </Label>
            <Input
              id="quantity"
              placeholder="Enter the Qty"
              type="number"
              value={formData.quantity}
              onChange={(e) => handleInputChange("quantity", e.target.value)}
              className="bg-wierd border-border placeholder:text-whi"
            />
          </div>
        </div>

        <div className="mb-8 flex w-full items-center justify-center">
          <Button
            onClick={addProduct}
            className="flex gap-2 items-center justify-center bg-wierd text-green hover:bg-wierd/80"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>

        <Card className=" border-1 border-white p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full bg-bla">
              <thead>
                <tr className="border-b border-border bg-white">
                  <th className="text-left p-4 font-medium text-black">
                    Product name ↑
                  </th>
                  <th className="text-left p-4 font-medium text-black">
                    Price
                  </th>
                  <th className="text-left p-4 font-medium text-black">
                    Quantity ↓
                  </th>
                  <th className="text-left p-4 font-medium text-black">
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`border-b border-border bg-black`}
                  >
                    <td className="p-4 text-whi">{product.name}</td>
                    <td className="p-4 text-whi">{product.price}</td>
                    <td className="p-4 text-whi">{product.quantity}</td>
                    <td className="p-4 text-whi">
                      INR {(product.price * product.quantity).toFixed(1)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-bla border-b border-border">
                  <td
                    colSpan={3}
                    className="p-4 text-right font-medium text-whi"
                  >
                    Sub-Total
                  </td>
                  <td className="p-4 text-whi">INR {subTotal.toFixed(1)}</td>
                </tr>
                <tr className="bg-bla">
                  <td
                    colSpan={3}
                    className="p-4 text-right font-medium text-whi"
                  >
                    Incl + GST 18%
                  </td>
                  <td className="p-4 text-whi">
                    INR {totalWithGst.toFixed(1)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <Button
            onClick={generatePDF}
            className=" font-medium px-8 py-3 rounded-md flex items-center gap-2 mx-auto bg-wierd text-green hover:bg-wierd/80"
          >
            <FileText className="w-4 h-4" />
            Generate PDF Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
