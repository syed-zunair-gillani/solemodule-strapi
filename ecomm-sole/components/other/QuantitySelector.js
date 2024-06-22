import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "antd";
import classNames from "classnames";

import useDebounce from "../../common/useDebound";

function QuantitySelector({
  min,
  max,
  defaultValue = 1,
  className,
  onChange,
  onDecrease,
  onIncrease,
}) {
  const firstUpdate = useRef(true);
  const [value, setValue] = useState(defaultValue);
  const deboundValue = useDebounce(value, 300);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    onChange && onChange(value);
  }, [deboundValue]);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  const decreaseValue = useCallback(() => {
    if (min && value <= min) {
      return;
    } else {
      if (value <= 1) {
        return;
      }
      onDecrease && onDecrease();
      setValue(value - 1);
    }
  }, [value]);
  const increaseValue = useCallback(() => {
    if (value >= max) {
      return;
    }
    onIncrease && onIncrease();
    setValue(value + 1);
  }, [value]);
  return (
    <div
      style={{ marginTop: "20px" }}
      className={`quantity-selector ${classNames(className)}`}
    >
      <div className="quantity-selector-number">{value}</div>
      <div className="quantity-selector-controller">
        <Button
          type="link"
          disabled={value <= min || value <= 1}
          onClick={decreaseValue}
          style={{ borderRadius: 0 }}
        >
          {/* <span ></span> */}
          <strong style={{ fontSize: "16px", color: "#242464" }}>-</strong>
        </Button>
        <Button
          style={{ borderRadius: 0 }}
          type="link"
          disabled={value >= max}
          onClick={increaseValue}
        >
          <strong style={{ fontSize: "16px", color: "#242464" }}>+</strong>
        </Button>
      </div>
    </div>
  );
}

export default React.memo(QuantitySelector);
