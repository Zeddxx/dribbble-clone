"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import Image from "next/image";
import labelImage from "../../public/label.png";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import {
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Text,
  Underline,
} from "lucide-react";
import { Toggle } from "./ui/toggle";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { ToastAction } from "./ui/toast";

export default function UploadNavbar({session}) {
  // For toggling
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // For Inputs 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);

  // For text editing --->
  const [isTextStart, setIsTextStart] = useState(true);
  const [isTextCenter, setIsTextCenter] = useState(false);
  const [isTextRight, setIsTextRight] = useState(false);

  //Text Styles --->
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  // Toast notification
  const { toast } = useToast()

  // Drag and drop Image 
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading abort");
      reader.onerror = () => console.log("file error");
      reader.onload = () => {
        const binaryStr = reader.result;
        setImagePreview(binaryStr);
      };

      reader.readAsDataURL(file);
    } else {
      console.log("Please drop only one image.");
    }
  }, []);

  // Dropzone props
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Auto resize textarea
  useEffect(() => {
    const textarea = document.querySelector(".autoResize");
    const headingArea = document.querySelector(".headingArea");
    if (imagePreview) {
      textarea.addEventListener("input", autoResize, false);
      headingArea.addEventListener("input", autoResize, false);

      setIsOpen(true);
    }

    return () => {
      if (imagePreview) {
        textarea.removeEventListener("input", autoResize, false);
        headingArea.removeEventListener("input", autoResize, false);
      }
    };

    function autoResize() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    }
  }, [imagePreview]);


  // Handle send
  const handleCreate = async() => {
    setIsLoading(true);
    try {
      if(title.trim() === '' || description.trim() === '') {
        toast({
          title: 'Please enter a title or description!',
          description: 'Without the title and description you cannot create a posts so you have to fill the title and description.',
          variant: 'destructive'
        })

      }else{
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "demo-app")
  
          const res = await axios.post('https://api.cloudinary.com/v1_1/demo-one/image/upload', formData);
  
          const imageUrl = res.data.secure_url;
          // console.log(imageUrl);
        const response = await fetch('/api/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
             title: title,
             description: description ,
             image: imageUrl,          
             authorName: session.user.username,
             authorImage: session.user.image,
             userId: session.user.id,
            })
        })

        if(response.status === 401){
          toast({
            title: "Unauthorized",
            description: "You are not authorized to create post on Dribbble please login to your account!",
            variant: 'destructive',
          })
        }
  
        if(response.ok){
          toast({
            title: "Post Created Successfully",
            description: "Post was successfully created now you can see your created posts.",
            action: <ToastAction altText='Get to the Created Post'>
              <a href='/following'>Go Home</a>
            </ToastAction>
          })
        }
        if(!response.ok){
          toast({
            title: 'Error creating the post..',
            description: 'Some server error occurred while creating the post!',
            variant: 'destructive'
          })
        }
      }
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }
  return (
    <div className="flex w-full h-full">
      <div className="w-full h-full mb-8">
        <div className="w-full h-28 px-[14px] md:px-6">
          <div className="flex justify-between items-center h-[5.5rem] sticky top-0">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="rounded-full px-5"
            >
              Cancel
            </Button>

            <Button
              disabled={!title || !description || isLoading}
              variant="default"
              className="rounded-full px-6"
              onClick={handleCreate}
              isLoading={isLoading}
            >
              Continue
            </Button>

            <div className="bg-black text-gray-100 absolute right-8 top-20 w-44 hidden text-[13px] p-4 rounded-md">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta
                facere rerum id.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full px-[14px] md:px-6 mt-3 flex flex-col max-w-5xl mx-auto gap-y-2 items-center">
          {imagePreview ? (
            <div className="flex w-full">
              {/* <input maxLength={64} type="text" className="max-w-2xl mx-auto w-full outline-none py-2 text-4xl font-bold" placeholder="Give me a name"/> */}
              <Textarea
                maxLength={64}
                wrap="soft"
                rows={1}
                onChange={(event) => setTitle(event.target.value)}
                onFocus={() => setIsOpen(false)}
                // onChange={handleTextareaChange}
                className={cn(
                  "max-w-2xl headingArea placeholder:text-gray-400 mx-auto h-auto w-full outline-none resize-none p-2 text-3xl font-bold break-words"
                )}
                placeholder="Give me a name"
                value={title}
              />
            </div>
          ) : (
            <h1 className="text-2xl font-bold mb-8">
              What have you been working on?
            </h1>
          )}

          <section className="h-full w-full">
            <div
              {...getRootProps()}
              className={`${
                imagePreview
                  ? "border-none hover:outline hover:outline-offset-[14px] hover:outline-[1.6px] hover:outline-gray-100 duration-150"
                  : "border-dashed"
              } overflow-hidden cursor-pointer border-[2.3px] flex flex-col items-center justify-center gap-y-8 px-4 max-h-[730px] max-w-5xl mx-auto border-gray-300 relative before:pointer-events-none before:absolute before:-bottom-4 before:-left-1.5 before:h-1/2 before:w-[calc(100%+12px)] before:bg-gradient-to-t before:from-white before:via-transparent before:to-transparent rounded-xl h-[70vw] w-full`}
            >
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Dropped image"
                  fill
                  className="h-full w-full object-cover"
                />
              ) : (
                <>
                  <div className="w-20 relative h-20 hidden xmd:flex">
                    <Image
                      src={labelImage}
                      alt="Drag drop image png"
                      fill
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h2 className="font-normal text-gray-600 text-lg">
                    Drag and drop an image, or{" "}
                    <label
                      htmlFor="image"
                      className="relative w-fit before:absolute before:bg-purple-700 before:w-full before:h-[2.5px] before:-bottom-0.5"
                    >
                      Browse
                    </label>
                    <input {...getInputProps()} id="image" type="file" hidden />
                  </h2>
                  <p className="text-[13.9px] text-gray-500 text-center w-fit">
                    Minimum 1600px width recommended. Max 10MB each (20MB for
                    videos)
                  </p>
                  <ul
                    role="list"
                    className="list-disc max-w-3xl flex-wrap justify-center w-full mx-auto text-sm text-gray-500 flex xl:flex-row gap-y-2"
                  >
                    <li className="max-w-[18rem] w-full ">
                      High resolution images (png,jpg,gif)
                    </li>
                    <li className="max-w-[18rem] w-full ">Videos</li>
                    <li className="max-w-[18rem] w-full ">Animated gifs</li>
                    <li className="max-w-[18rem] w-full ">
                      Only upload media you own the rights to
                    </li>
                  </ul>
                </>
              )}
            </div>
          </section>
          {imagePreview && (
            <div className="relative h-[inherit] w-full flex">
              <Textarea
              rows={1}
              id='description'
              onFocus={() => setIsOpen(true)}
              onChange={(event) => setDescription(event.target.value)}
              // placeholder="Write what went into this design or add any details you'd like to mention."
              placeholder=' '
              className={cn(
                `mt-6 overflow-hidden resize-none peer autoResize border text-base py-4 px-4 outline-transparent xmd:mb-0 mb-12 hover:outline hover:outline-1 hover:outline-gray-200 duration-300 placeholder:text-gray-400 focus:ring-2 rounded-xl focus:ring-[#EF86E1]`,
                isBold && 'font-bold',
                isItalic && 'italic',
                isUnderline && 'underline',
                isTextCenter && 'text-center',
                isTextStart && 'text-start',
                isTextRight && 'text-right', 
              )}
              value={description}
            />

            <label htmlFor="description" className="px-5 py-2 pointer-events-none absolute w-fit top-8 opacity-50 peer-placeholder-shown:block hidden">
            Write what went into this design or add any details you&apos;d like to mention.
            </label>
            </div>
          )}
        </div>
      </div>
      {imagePreview && (
        <div
        className={`${
          isOpen ? "xmd:max-w-xs w-full" : "xmd:max-w-0 xmd:w-0"
        } duration-300 fixed bg-white h-14 bottom-0 inset-x-0 flex xmd:py-12 overflow-hidden shadow-2xl shadow-black xmd:h-screen xmd:sticky xmd:top-0`}
      >
        <div className="px-8 hidden xmd:block">
          <p
            onClick={() => setIsOpen(false)}
            className="text-gray-700 text-base w-fit cursor-pointer"
          >
            Close
          </p>

          <p className="mt-8 text-2xl font-bold">In progress...</p>
          <p className="mt-4 text-base text-gray-600">
            Working in this feature..
          </p>
        </div>

        <div className="xmd:hidden flex items-center justify-between w-full h-full px-4">
          <p>body</p>
          <div className="flex h-full gap-x-1 items-center">
            <Toggle onClick={() => setIsBold(!isBold)} aria-label="Toggle bold">
              <Bold className="h-4 w-4" />
            </Toggle>

            <Toggle onClick={() => setIsItalic(!isItalic)} aria-label="Toggle italic">
              <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle onClick={() => setIsUnderline(!isUnderline)} aria-label="Toggle underline">
              <Underline className="h-4 w-4" />
            </Toggle>
          </div>

          <div className="h-full flex items-center w-fit">
            {isTextStart && (
              <div onClick={() => {
                setIsTextStart(false);
                setIsTextRight(true);
                setIsTextCenter(false)
              }} className="">
                <Text className="h-5 w-5" />
              </div>
            )}
            {isTextRight && (
              <div onClick={() => {
                setIsTextStart(false);
                setIsTextRight(false);
                setIsTextCenter(true)
              }} className="">
                <AlignRight className="h-5 w-5" />
              </div>
            )}
            {isTextCenter && (
              <div onClick={() => {
                setIsTextStart(true);
                setIsTextRight(false);
                setIsTextCenter(false)
              }} className="">
                <AlignCenter className="h-5 w-5" />
              </div>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
