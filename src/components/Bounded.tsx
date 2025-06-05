import {
  CSSProperties,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  forwardRef,
} from "react";
import clsx from "clsx";

type BoundedProps<T extends ElementType> = {
  as?: T;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode | ReactNode[] | null | false;
} & ComponentPropsWithRef<T>;

export const Bounded = forwardRef(
  <T extends ElementType = "section">(
    { as, className, children, ...restProps }: BoundedProps<T>,
    ref: React.Ref<Element>
  ) => {
    const Comp = as || "section";
    return (
      <Comp
        ref={ref}
        className={clsx(
          "px-6 ~py-10/16 [.header+&]:pt-44 [.header+&]:md:pt-32",
          className
        )}
        {...restProps}
      >
        <div className="mx-auto w-full max-w-6xl">{children}</div>
      </Comp>
    );
  }
);

Bounded.displayName = "Bounded";
