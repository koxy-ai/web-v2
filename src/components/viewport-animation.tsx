"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useAnimation,
  Variant,
  Transition,
  ForwardRefComponent,
} from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Props {
  on?: Variant;
  off?: Variant;
  children?: React.ReactNode;
  threshold?: number;
  transition?: Transition;
  once?: boolean;
  className?: string;
  id?: string;
}

export default function ViewportAnimation({
  on,
  off,
  children,
  threshold,
  once,
  className,
  ...props
}: Props) {
  const [used, setUsed] = useState<boolean>(false);

  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: threshold ?? 0.1 });

  useEffect(() => {
    if (inView && !used) {
      controls.start("on");
      if (once !== false) setUsed(true);
    } else if (!inView && !used) {
      controls.start("off");
    }
  }, [controls, inView]);

  const variants = { on: on ?? {}, off: off ?? {} };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="off"
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}