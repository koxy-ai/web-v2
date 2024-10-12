"use client";

import { useState } from "react";
import { NodeSimpleInputProps } from "../types";

export default function StringInput({
  node,
  value,
  updateValue,
  input,
}: NodeSimpleInputProps) {
  return (
    <input
      className="min-w-0 w-full text-xs h-7 px-2 bg-gray-900/20 border rounded-md"
      placeholder={input[2].placeholder}
      value={value}
      onInput={(e) => updateValue(e.currentTarget.value)}
    />
  );
}
