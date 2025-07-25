import { useState } from "react";
import type { FieldValues, Path, UseFormSetValue } from "react-hook-form";
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";
import type { Tag } from "react-tag-input";
import "./style.css";

type InputProps<TFieldValues extends FieldValues> = {
  setValue: UseFormSetValue<TFieldValues>;
  name: Path<TFieldValues>;
  defaultTags?: Tag[];
};

const TagsInput = <TFieldValues extends FieldValues>({
  setValue,
  name,
  defaultTags = [],
}: InputProps<TFieldValues>) => {
  const [tags, setTags] = useState<Array<Tag>>(defaultTags);

  const handleDelete = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);

    const filteredTags = newTags.map((tag) => tag.text);
    setValue(name, filteredTags as TFieldValues[typeof name], {
      shouldValidate: filteredTags.length > 0,
    });
  };

  const handleAddition = (tag: Tag) => {
    const newTags = [...tags, tag];
    setTags(newTags);

    const filteredTags = newTags.map((tag) => tag.text);

    setValue(name, filteredTags as TFieldValues[typeof name], {
      shouldValidate: true,
    });
  };

  return (
    <ReactTags
      tags={tags}
      separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      inputFieldPosition="bottom"
      maxTags={15}
      name={name}
      allowDragDrop={false}
      autoFocus={false}
      classNames={{
        tags: "tag-container",
        tagInput: "tag-input",
        tagInputField: "tag-input-field",
        tag: "tag",
        clearAll: "clear-all",
        selected: "selectedClass",
      }}
    />
  );
};

export default TagsInput;
