import axios from "axios";
import { Button } from "components/button";
import { useAuth } from "components/contexts/auth-context";
import { TopCreators } from "components/creator";
import { ImageUpload } from "components/img";
import Input from "components/input/Input";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResellPage = () => {
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState(null);
  const [oldImage, setOldImage] = useState("");
  const { userInfo } = useAuth();
  const [minPrice, setMinPrice] = useState(0);

  const { control, setValue, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      price: "",
      image: "",
      category: "",
      createby: "",
      resellby: "",
    },
  });

  const updateNFT = async (values) => {
    try {
      const response = await axios.put(`http://localhost:1337/products/${id}`, {
        Name: values.name,
        Price: values.price,
        Category: values.category,
        image: values.image,
        resellby: userInfo,
      });
      console.log(response);
      setSelectedImage(null);
      toast.success("Update NFT successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setSelectedImage(null);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:1337/products/${id}`
        );
        console.log(response.data);
        setMinPrice(response.data.Price);
        reset({
          name: response.data.Name,
          price: response.data.Price,
          category: response.data.Category,
          image: response.data.image,
        });
        setOldImage(response.data.image);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id, reset, selectedImage]);

  const handleSelectImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImage(file);
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    const response = await axios({
      method: "post",
      url: "https://api.imgbb.com/1/upload?key=ba1f1db043890d6ead7a1b777cb35cd5",
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setValue("image", `${response.data.data.url}`);
  };

  return (
    <div className="container">
      <div className="mx-auto mt-10 mb-10 text-3xl text-center">Resell NFT</div>
      <form onSubmit={handleSubmit(updateNFT)}>
        <div className="flex justify-center gap-x-10">
          <div className="flex flex-col gap-y-5 min-w-[500px]">
            <div>
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                name="name"
                control={control}
                placeholder="Enter a name of NFT"
                className="mt-2"
                required
              ></Input>
            </div>
            <div>
              <label htmlFor="price">Price (ICX)</label>
              <Input
                id="price"
                name="price"
                control={control}
                placeholder="Enter a price in ICX"
                className="mt-2"
                type="number"
                min={minPrice}
                required
              ></Input>
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <Input
                id="category"
                name="category"
                control={control}
                placeholder="Enter your category"
                className="mt-2"
                required
              ></Input>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <ImageUpload
              className="pointer-events-none"
              name="image"
              onChange={handleSelectImage}
              image={selectedImage}
              oldImage={oldImage}
            ></ImageUpload>
          </div>
        </div>

        <Button
          type="submit"
          kind="primary"
          className="mx-auto mt-10"
          width="200px"
        >
          Resell
        </Button>
      </form>
      <div className="py-10 mt-20 border-t border-t-zinc-400 border-opacity-20">
        <TopCreators></TopCreators>
      </div>
    </div>
  );
};

export default ResellPage;
