"use client";
import FormButton from "@/components/button";
import FormInput from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import upLoadProduct from "./actions";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    console.log(preview);
  };
  return (
    <div>
      <form action={upLoadProduct} className="flex flex-col gap-5 p-5">
        <label
          htmlFor="photo"
          className="border-2 aspect-square items-center justify-center flex flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
          style={{ backgroundImage: `url(${preview})` }}
        >
          {preview === "" ? (
            <>
              <PhotoIcon className="w-20"></PhotoIcon>
              <div className="text-neutral-400 text-sm">Please add photo</div>
            </>
          ) : null}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          className="hidden"
        />
        <FormInput
          name="title"
          type="text"
          required
          placeholder="title"
        ></FormInput>
        <FormInput
          name="price"
          type="number"
          required
          placeholder="price"
        ></FormInput>
        <FormInput
          name="description"
          type="text"
          required
          placeholder="description"
        ></FormInput>
        <FormButton text="ADD"></FormButton>
      </form>
    </div>
  );
}
