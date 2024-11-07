import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
export default function RTE({ defaultValue="", name, control, label }) {
  return (
    <div>
      {label && <label>{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ onField: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              menubar: true,
            }}
            onEditorChange={onChange}
          />
        )}
      ></Controller>
    </div>
  );
}

/*import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
/*
(1):-Editor is made from tiny mce , it has 3 values :- initial value(defvalue),init({{initial val,height,menubar,toolbar,plugins[]}}),and onEditorChange={onChange}
(2)how to pass this as a component to form ? :- through forwardRef hook and Controller
(3)Controller is imported from react-hook-form ,and has 3 values => name={name},control={control},render={({field:{onChange}})=(Element to be rendered!)}
control is responsible for state to form tranfer ,gives parent element Render takes CbFx
(4)params name control default value and label is passed!
(5)Now This RTE is Added in The Post Form!(add post/editPost)

export default function RTE({ defaultValue = "", name, control, label }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        name={name || "Content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onchange}
          />
        )}
      />
    </div>
  );
}
*/
