"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Select, { StylesConfig } from "react-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

// Define the API URL
const LOCATION_URL = "https://api.vnappmob.com/api/v2";

// Fetch provinces
const fetchProvinces = async () => {
  const res = await fetch(`${LOCATION_URL}/province/`);
  const data = await res.json();
  return data.results.map((item) => ({
    value: item.province_id,
    label: item.province_name,
  }));
};

// Fetch districts by provinceId
const fetchDistricts = async (provinceId: string) => {
  const res = await fetch(`${LOCATION_URL}/province/district/${provinceId}`);
  const data = await res.json();
  return data.results.map((item) => ({
    value: item.district_id,
    label: item.district_name,
  }));
};

// Fetch wards by districtId
const fetchWards = async (districtId: string) => {
  const res = await fetch(`${LOCATION_URL}/province/ward/${districtId}`);
  const data = await res.json();
  return data.results.map((item) => ({
    value: item.ward_id,
    label: item.ward_name,
  }));
};

const customStyles: StylesConfig = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "black",
    backgroundColor: state.isSelected
      ? "#1E4646"
      : state.isFocused
        ? "#B3E0E6"
        : "white",
  }),
  control: (provided) => ({
    ...provided,
    borderColor: "#1E4646",
    "&:hover": { borderColor: "#315475" },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#315475",
  }),
};

export default function AddAddressPage() {
  const router = useRouter();
  const [isDefault, setIsDefault] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    // Fetch provinces on component load
    fetchProvinces().then(setProvinces);
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      // Fetch districts when a province is selected
      fetchDistricts(selectedProvince.value).then(setDistricts);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      // Fetch wards when a district is selected
      fetchWards(selectedDistrict.value).then(setWards);
    }
  }, [selectedDistrict]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted with: ", {
      selectedProvince,
      selectedDistrict,
      selectedWard,
    });
    router.push("/addresses");
  };

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Thêm địa chỉ mới</CardTitle>
          <CardDescription>
            Vui lòng điền đầy đủ thông tin địa chỉ của bạn
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Họ tên</Label>
              <Input id="name" placeholder="Nguyễn Văn A" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input id="phone" placeholder="0123456789" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="province">Tỉnh/Thành phố</Label>
              <Select
                options={provinces}
                styles={customStyles}
                value={selectedProvince}
                onChange={(option) => setSelectedProvince(option)}
                placeholder="Chọn tỉnh/thành phố"
                isSearchable
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">Quận/Huyện</Label>
              <Select
                options={districts}
                styles={customStyles}
                value={selectedDistrict}
                onChange={(option) => setSelectedDistrict(option)}
                placeholder="Chọn quận/huyện"
                isSearchable
                isDisabled={!selectedProvince}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ward">Phường/Xã</Label>
              <Select
                options={wards}
                styles={customStyles}
                value={selectedWard}
                onChange={(option) => setSelectedWard(option)}
                placeholder="Chọn phường/xã"
                isSearchable
                isDisabled={!selectedDistrict}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Địa chỉ cụ thể</Label>
              <Input
                id="address"
                placeholder="Số nhà, tên đường, phường/xã"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isDefault"
                checked={isDefault}
                onCheckedChange={(checked) => setIsDefault(checked as boolean)}
              />
              <Label htmlFor="isDefault">Đặt làm địa chỉ mặc định</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}>
              Hủy
            </Button>
            <Button type="submit">Lưu địa chỉ</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
