"use client";

import { CompCall } from "@/types/koxy";
import {
  IconChevronDown,
  IconChevronRight,
  IconPlus,
} from "@tabler/icons-react";
import { useState } from "react";
import Select from "../tailus-ui/Select";
import Input from "../tailus-ui/Input";
import Button from "../tailus-ui/Button";
import { toast } from "sonner";
import { sampleRoute } from "@/utils/apis";
import LoadingIcon from "../tailus-ui/Loading";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export default function NewApiRoute({ saveChanges, update, api }: CompCall) {
  const [method, setMethod] = useState<Method>("GET");
  const [path, setPath] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const add = () => {
    if (loading) return;
    setLoading(true);

    try {
      if (!path) {
        toast.error("Please enter a path");
        return;
      }

      if (!method) {
        toast.error("Please select a method");
        return;
      }

      const existRoute = api.flows[path];
      if (existRoute) {
        const sameMethod = existRoute.find((route) => route.method === method);
        if (sameMethod) {
          toast.error(`Route already exists: ${method} ${path}`);
          return;
        }
      }

      const newRoute = sampleRoute(path, method, name);

      update(
        {
          type: "api",
          data: {
            flows: {
              ...(api.flows || {}),
              [path]: [...(api.flows?.[path] || []), newRoute],
            },
          },
        },
        saveChanges
      );

      toast.success(`Route created: ${method} ${path}`);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-12 flex flex-col items-center gap-2">
      <div className="max-w-md min-w-md p-6 border border-dashed rounded-xl flex flex-col gap-3 bg-gray-900/10 overflow-hidden border-white/10">
        <div
          className="w-10 h-10 p-2 flex items-center justify-center relative border rounded-xl bg-gray-900/20 relative overflow-hidden rotate-[-10deg]"
          style={{
            boxShadow: "0px 0px 50px 0px rgba(255, 255, 255, .1)",
          }}
        >
          <IconPlus size={17} />
          <IconPlus className="absolute blur-sm opacity-60" />
          <IconPlus className="absolute blur-md bottom-0 left-0" />
          <IconPlus className="absolute blur-lg opacity-20" />
        </div>
        <div className="text-sm mt-2">New API Route</div>
        <div className="text-xs opacity-60 mb-4 max-w-[70%]">
          An API route is built up of nodes connected together in a logical flow
        </div>
        <Input
          placeholder="route path (e.g. /api/hello)"
          data-shade="950"
          value={path}
          onInput={(e) => setPath(e.currentTarget.value)}
          autoFocus
        />
        <Input
          placeholder="route label (optional)"
          data-shade="950"
          value={name}
          onInput={(e) => setName(e.currentTarget.value)}
        />
        <Select.Root
          value={method}
          onValueChange={(v) => {
            setMethod(v as Method);
          }}
        >
          <Select.Trigger
            className="flex items-center gap-3 w-full min-w-64 relative rounded-lg"
            data-shade="950"
            data-rounded="large"
          >
            <Select.Value
              placeholder="Route method"
              className="min-w-full text-xs opacity-70 outline-none"
            />
            <div className="absolute top-0 right-2 h-full w-6 flex items-center justify-center">
              <IconChevronDown size={10} className="min-w-max" />
            </div>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              data-shade="925"
              intent="gray"
              variant="soft"
              className="drop-shadow"
            >
              <Select.Viewport>
                {["GET", "POST", "PUT", "DELETE"].map((method) => (
                  <Select.Item value={method} key={`method-select-${method}`}>
                    <Select.ItemIndicator className="text-white! bg-white/20 rounded-full w-2 h-2" />
                    <Select.ItemText className="text-xs">
                      {method}
                    </Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
        <Button.Root
          intent="neutral"
          className="mt-5 rounded-lg"
          style={{
            boxShadow: "0px 0px 80px 0px rgba(255, 255, 255, .1)",
          }}
          disabled={loading}
          onClick={add}
        >
          {loading && (
            <Button.Icon>
              <LoadingIcon />
            </Button.Icon>
          )}
          <Button.Label className="text-xs font-semibold">Create</Button.Label>
          {!loading && (
            <Button.Icon type="trailing">
              <IconChevronRight size={15} />
            </Button.Icon>
          )}
        </Button.Root>
      </div>
    </div>
  );
}
