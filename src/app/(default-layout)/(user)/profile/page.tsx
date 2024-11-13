"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  Calendar as CalendarIcon,
  ImagePlus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, parse, isValid } from "date-fns";
import { vi } from "date-fns/locale";
import UserSidebar from "@/partials/(user)/sidebar_nav";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>();
  const [dateInput, setDateInput] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    phone_number: "",
    gender: "nam",
    date_of_birth: "",
    avatar: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!session?.user?.accessToken) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${session.user.accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        if (data.success && data.data) {
          const profile = data.data.user;
          setUserData({
            name: profile.user_name || "",
            phone_number: profile.user_phone_number || "",
            gender: profile.user_sex || "nam",
            date_of_birth: profile.user_birth_day || "",
            avatar: profile.avatar || "",
          });

          // Set date and dateInput if date_of_birth exists
          if (profile.date_of_birth) {
            const parsedDate = new Date(profile.date_of_birth);
            setDate(parsedDate);
            setDateInput(format(parsedDate, "dd/MM/yyyy"));
          }

          // Set avatar if exists
          if (profile.avatar) {
            setImage(profile.avatar);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [session]);

  const handleUpdateProfile = async () => {
    if (!session?.user?.accessToken) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userData.name,
            phone_number: userData.phone_number,
            gender: userData.gender,
            date_of_birth: date?.toISOString(),
            avatar: image,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      if (data.success) {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setDateInput(input);

    const parsedDate = parse(input, "dd/MM/yyyy", new Date());
    if (isValid(parsedDate)) {
      setDate(parsedDate);
    }
  };

  const handleCalendarSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setDateInput(format(selectedDate, "dd/MM/yyyy"));
    }
  };

  // Update form input handlers
  const handleInputChange = (field: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-[80%] container mx-auto gap-[20px] mt-20 pt-[1.25rem] pb-[3.75rem] relative z-0">
      <UserSidebar />
      <div className="w-full p-4">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="border border-border-color rounded-[8px] w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 pl-5 hover:bg-muted/50">
            <h2 className="font-bold text-center">Thông tin tài khoản</h2>
            <ChevronDown
              className={`text-pri-1 w-7 h-7 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-6 space-y-6 pt-0">
              {/* avatar */}
              <div className="flex items-center gap-4 mb-6 p-[20px] border border-border-color rounded-[8px]">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 flex-shrink-0">
                  {image ? (
                    <img
                      src={image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="filled" className="relative">
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                    <ImagePlus />
                    Thêm ảnh
                  </Button>
                  <Button
                    variant="filled_outlined"
                    onClick={() => setImage(null)}>
                    <Trash2 />
                    Xóa ảnh
                  </Button>
                </div>
              </div>

              <div className="space-y-4 p-[20px] border border-border-color rounded-[8px]">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base text-gray-600">
                    Họ tên
                  </Label>
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="text-base text-pri-1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base text-gray-600">
                    Số điện thoại
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={userData.phone_number}
                    onChange={(e) =>
                      handleInputChange("phone_number", e.target.value)
                    }
                    className="text-base text-pri-1"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-base text-gray-600">Giới tính</Label>
                  <RadioGroup
                    value={userData.gender}
                    onValueChange={(value) =>
                      handleInputChange("gender", value)
                    }
                    className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="nam"
                        id="nam"
                        className="text-pri-1"
                      />
                      <Label htmlFor="nam" className="text-base text-pri-1">
                        Nam
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="nu"
                        id="nu"
                        className="text-pri-1"
                      />
                      <Label htmlFor="nu" className="text-base text-pri-1">
                        Nữ
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="khac"
                        id="khac"
                        className="text-pri-1"
                      />
                      <Label htmlFor="khac" className="text-base text-pri-1">
                        Khác
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob" className="text-base text-gray-600">
                    Ngày sinh
                  </Label>
                  <div className="flex w-[25%]">
                    <Input
                      id="dob"
                      value={dateInput}
                      onChange={handleDateChange}
                      placeholder="dd/mm/yyyy"
                      className="rounded-r-none text-base text-pri-1"
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="rounded-l-none border-l-0">
                          <CalendarIcon className="h-4 w-4 text-pri-1" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={handleCalendarSelect}
                          initialFocus
                          locale={vi}
                          className="text-base text-pri-1"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    variant="filled"
                    className="bg-pri-7 px-7"
                    onClick={handleUpdateProfile}>
                    Cập nhật
                  </Button>
                  <Button
                    variant="filled_outlined"
                    className="border-pri-7 text-pri-7 px-7">
                    Hủy bỏ
                  </Button>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
