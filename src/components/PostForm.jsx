import React, { useCallback } from "react";
import { Input, RTE, Select, Button } from "../components/index";
import { useForm } from "react-hook-form";
import service from "../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
/*
(1)extra things from react-hook-form(6)
(2)setting default values which we want (related to db)
(3)(post) param
(4)slug and title  :- 
:- onInput,setValue,slugTransform=usecallback,watch((value,{name})=>{Interview Question}=useEffect
(5)content :- default values :- getValues("content")
(6)img :- accept="imgetcetc" and type="file"req :!post
(7)select :- options={["active","inactive"]}
(8)slug is nothing but url ==> post.$id*/

export default function PostForm({ post }) {
  const [register, handleSubmit, watch, getValues, setValue, control] = useForm(
    {
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    }
  );
  const navigate = useNavigate();
  const userData = useSelector((status) => status.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? service.uploadFile(data.image[0]) : null;
      if (file) {
        await service.dltFile(post.featuredImage);
      }

      const editedPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (editedPost) {
        navigate(`/post/${editedPost.$id}`);
      }
    } else {
      const file = await service.uploadFile(data.image[0]);
      if (file) {
        data.featuredImage = file.$id;
        const createPost = await service.createPost({
          ...data,
          userId: userData.$id,
        });
        if (createPost) {
          navigate(`/post/${createPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
      return () => subscription.unsubscribe();
    });
  }, [watch, setValue, slugTransform]);

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          label="Title"
          placeholder="title"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug"
          placeholder="slug"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          name="content"
          control={control}
          label="Content"
          defaultValue={getValues("content")}
        />
        <div>
          <Input
            label="FeaturedImg"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", {
              required: !post,
            })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
        </div>
        <Select
          label="Status"
          options={["Active", "Inactive"]}
          {...register("select", {
            required: true,
          })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined}>
          {post ? "Update" : "Submit"}
        </Button>
      </form>
    </div>
  );
}

