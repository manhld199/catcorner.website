"use client";

// import libs
import React, {
  useState,
  useEffect,
  useMemo,
  ChangeEvent,
  useCallback,
} from "react";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// import components
import { Input } from "@/components/ui/input";

// Sử dụng các plugin
dayjs.extend(utc);
dayjs.extend(timezone);

interface CustomDateTimePickerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: any;
}

const CustomDatePicker = ({
  value,
  onChange,
  ...props
}: CustomDateTimePickerProps) => {
  const [dateTime, setDateTime] = useState<Dayjs | null>(
    value ? dayjs(value).tz("Asia/Ho_Chi_Minh") : null
  );

  useEffect(() => {
    setDateTime(value ? dayjs(value).tz("Asia/Ho_Chi_Minh") : null);
  }, [value]);

  const onValueChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setDateTime(dayjs(event.target.value || "").tz("Asia/Ho_Chi_Minh"));
      onChange(event.target.value);
    },
    [onChange]
  );

  const dateTimeDayjs = useMemo(
    () => (dateTime ? dateTime.format("YYYY-MM-DD") : ""),
    [dateTime]
  );

  return (
    <Input
      type="datetime-local"
      value={dateTimeDayjs}
      onChange={onValueChange}
      {...props}
    />
  );
};

export default CustomDatePicker;
