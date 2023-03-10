import { Button } from "components/button";
import { ImageUpload } from "components/img";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/input/Input";
import { toast } from "react-toastify";
import { TopCreators } from "components/creator";
import { useAuth } from "components/contexts/auth-context";
import axios from "axios";
import { transfer } from "sdk/iconSDK";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import Toggle from "components/toggle/Toggle";
import { Dropdown } from "components/dropdown";

const CreatePage = () => {
	const { t } = useTranslation();


  const categories = [
    "Music",
    "Art",
    "Sport",
    "Photography",
    "Virtual Reality",
    "Video",
  ];

  const [selectedImage, setSelectedImage] = useState(null);
  const { userInfo } = useAuth();

  const { control, setValue, handleSubmit, reset, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      price: "",
      image: "",
      category: "",
      createby: "",
      public: true,
    },
  });

  const watchPublic = watch("public");

  const createNFT = async (values) => {
    console.log(values);
    const tax = (Number(values.price) * 2) / 100;
    console.log("tax", tax);


		Swal.fire(
			t("createPage.tax1"),
			`${t("createPage.tax2")} ${tax}`,
			"question",
		);

		const transferSuccess = await transfer({
			to: "hxd9852eb7b8c16d76b5135b0b5e01dcc52725e8cd",
			value: tax,
		});
		if (transferSuccess) {
			handleCreateNFT(values, tax);
		}
	};


  async function handleCreateNFT(values, tax) {
    try {
      const response = await axios.post("http://localhost:1337/products", {
        Name: values.name,
        Price: values.price,
        Category: values.category,
        image: values.image,
        public: values.public,
        createby: {
          Wallet: `${Number(userInfo.price) - tax}`,
          ...values.createby,
        },
      });
      console.log(response);
      reset({
        name: "",
        price: "",
        image: "",
        category: "",
        createby: "",
      });
      setSelectedImage(null);
      toast.success(t("createPage.succes"));
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setSelectedImage(null);
    }
  }


	useEffect(() => {
		if (!userInfo.address) return;
		async function fetchUserData() {
			setValue("createby", {
				Address: userInfo.address,
				Avatar: userInfo.avatar,
				Name: userInfo.name,
				id: userInfo.id,
			});
		}
		fetchUserData();
	}, [
		setValue,
		userInfo.address,
		userInfo.avatar,
		userInfo.id,
		userInfo.name,
		userInfo.price,
	]);

	const handleSelectImage = async (e) => {
		const file = e.target.files[0];
		if (!file) return;
		setTime(2500);
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

	const handleDeleteImage = () => {
		setSelectedImage(null);
	};

	const setTime = (time) => {
		let timerInterval;
		Swal.fire({
			title: t("createPage.time1"),
			html: `${t("createPage.time2")} <b></b> milliseconds.`,
			timer: time,
			timerProgressBar: true,
			didOpen: () => {
				Swal.showLoading();
				const b = Swal.getHtmlContainer().querySelector("b");
				timerInterval = setInterval(() => {
					b.textContent = Swal.getTimerLeft();
				}, 100);
			},
			willClose: () => {
				clearInterval(timerInterval);
			},
		}).then((result) => {
			/* Read more about handling dismissals below */
			if (result.dismiss === Swal.DismissReason.timer) {
				console.log("I was closed by the timer");
			}
		});
	};


  const [selectCategory, setSelectCategory] = useState("");
  const handleClickOption = async (item) => {
    setValue("category", item);
    setSelectCategory(item);
  };

  return (
    <div className="container">
      <div className="mx-auto mt-10 mb-10 text-3xl text-center">
        {t("createPage.title")}
      </div>
      <form onSubmit={handleSubmit(createNFT)}>
        <div className="flex flex-wrap-reverse justify-center gap-10">
					<div className="flex flex-col gap-y-5  md:min-w-[400px] min-w-[350px] lg:min-w-[500px]">
            <div>
              <label htmlFor="name">{t("name")}</label>
              <Input
                id="name"
                name="name"
                control={control}
                placeholder={t("createPage.input1")}
                className="mt-2"
                required
              ></Input>
            </div>
            <div>
              <label htmlFor="price">{t("createPage.price")}</label>
              <Input
                id="price"
                name="price"
                control={control}
                placeholder={t("createPage.input2")}
                className="mt-2"
                type="number"
                required
              ></Input>
            </div>
            <div>
              <label htmlFor="category">{t("createPage.category")}</label>
              {/* <Input
                id="category"
                name="category"
                control={control}
                placeholder={t("createPage.input3")}
                className="mt-2"
                required
              ></Input> */}
              <Dropdown>
                <Dropdown.Select
                  placeholder={`${selectCategory || t("createPage.input3")}`}
                ></Dropdown.Select>
                <Dropdown.List>
                  {categories.length > 0 &&
                    categories.map((item) => (
                      <Dropdown.Option
                        key={item}
                        onClick={() => handleClickOption(item)}
                      >
                        {item}
                      </Dropdown.Option>
                    ))}
                </Dropdown.List>
              </Dropdown>
            </div>
            <div className="flex items-center justify-start gap-x-5">
              <label htmlFor="public" className="cursor-pointer select-none">
                Public to marketplace
              </label>
              <Toggle
                id="public"
                on={watchPublic === true}
                onClick={() => {
                  setValue("public", !watchPublic);
                }}
              ></Toggle>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <ImageUpload
              name="image"
              image={selectedImage}
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              required
            ></ImageUpload>
          </div>
        </div>
        <Button
          type="submit"
          kind="primary"
          className="mx-auto mt-10"
          width="200px"
        >
          {t("createPage.createBtn")}
        </Button>
      </form>
      <div className="py-10 mt-20 border-t border-t-zinc-400 border-opacity-20">
        <TopCreators></TopCreators>
      </div>
    </div>
  );

};

export default CreatePage;
