"use client";

import {
  EditorRichText,
  InputTags,
  DropZoneMultiImgs,
  DropZoneSingleImg,
  SelectDialog,
  SelectCard,
  InputDateTime,
  InputDate,
} from "@/components";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ReactNode } from "react";

const CustomFormField = ({
  form,
  fieldName,
  type,
  title,
  required = false,
  selectType = "",
  placeholder = "",
  onDelete = () => {},
  className = "",
  selectData,
  handleChange = () => {},
  disabled = false,
  checkboxValue,
}: {
  form: any;
  fieldName: string;
  type: string;
  title?: string | undefined;
  required?: boolean;
  selectType?: string;
  placeholder?: string;
  onDelete?: any;
  className?: string;
  selectData?: any;
  disabled?: boolean;
  handleChange?: () => void;
  checkboxValue?: any[];
}) => {
  let children: ({}: any) => ReactNode;

  if (type == "text-80")
    children = ({ onChange, onBlur, value }) => (
      <Input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={80}
        className={
          "dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900" +
          " " +
          className
        }
      />
    );
  else if (type == "textarea")
    children = ({ onChange, onBlur, value }) => (
      <Textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={
          "dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900" +
          " " +
          className
        }
      />
    );
  else if (type == "number")
    children = ({ onChange, onBlur, value }) => (
      <Input
        type="number"
        min={0}
        value={value ?? ""}
        onChange={(e) => onChange(Number(e.currentTarget.value))}
        onBlur={onBlur}
        placeholder={placeholder}
        className={
          "dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900" +
          " " +
          className
        }
      />
    );
  else if (type == "date")
    children = ({ onChange, onBlur, value }) => (
      <InputDate
        value={value}
        type="date"
        onChange={onChange}
        onBlur={onBlur}
        className={
          "dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900" +
          " " +
          className
        }
      />
    );
  else if (type == "datetime")
    children = ({ onChange, onBlur, value }) => (
      <InputDateTime
        value={value}
        type="datetime-local"
        onChange={onChange}
        onBlur={onBlur}
        className={
          "dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900" +
          " " +
          className
        }
      />
    );
  else if (type == "checkbox")
    children = ({ onChange, onBlur, value }) => (
      <Checkbox
        checked={value == (checkboxValue as any)[0]}
        onClick={() => {
          if (value == (checkboxValue as any)[0])
            onChange((checkboxValue as any)[1]);
          else if (value == (checkboxValue as any)[1])
            onChange((checkboxValue as any)[0]);

          handleChange();
        }}
      />
    );
  else if (type == "multi-imgs")
    children = ({ onChange, onBlur, value }) => (
      <DropZoneMultiImgs
        value={value}
        onChange={onChange}
        onDelete={onDelete}
      />
    );
  else if (type == "single-img")
    children = ({ onChange, onBlur, value }) => (
      <DropZoneSingleImg
        value={value}
        onChange={onChange}
        onDelete={onDelete}
        required={required}
      />
    );
  else if (type == "text-editor")
    children = ({ onChange, onBlur, value }) => (
      <EditorRichText content={value} onChange={onChange} />
    );
  else if (type == "select-dialog")
    children = ({ onChange, onBlur, value }) => (
      <SelectDialog
        value={value}
        onChange={(v) => {
          onChange(v);
          handleChange();
        }}
        type={selectType}
        name={selectData.name}
        isMultiChoice={selectData.isMultiChoice}
        options={selectData.options}
        disabled={disabled}
      />
    );
  else if (type == "select-card")
    children = ({ onChange, onBlur, value }) => (
      <SelectCard
        value={value}
        onChange={(v) => {
          onChange(v);
          handleChange();
        }}
        type={selectType}
        name={selectData.name}
        isMultiChoice={selectData.isMultiChoice}
        options={selectData.options}
      />
    );
  else if (type == "tags")
    children = ({ onChange, onBlur, value }) => (
      <InputTags value={value} onChange={onChange} />
    );
  else children = ({ onChange, onBlur, value }) => <></>;

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <div
            className={`flex flex-row ${
              title ? "justify-between" : "justify-center"
            } items-end gap-4`}>
            {title && (
              <FormLabel className="text-base text-zinc-950 dark:text-zinc-100 font-medium">
                {required && <span className="text-red-500">* </span>}
                {title}
              </FormLabel>
            )}
            {type != "single-img" && <FormMessage className="relative" />}
          </div>
          <FormControl>{children({ ...field })}</FormControl>
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
