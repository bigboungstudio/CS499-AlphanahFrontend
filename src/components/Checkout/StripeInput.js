import React, { useRef, useImperativeHandle, forwardRef } from "react";
const StripeInput = forwardRef(
  ({ component: Component, ...props }, inputRef) => {
    const elementRef = useRef();
    useImperativeHandle(inputRef, () => ({
      focus: () => elementRef.current.focus,
    }));
    return (
      <Component
        onReady={(element) => (elementRef.current = element)}
        {...props}
      />
    );
  }
);
export default StripeInput;
