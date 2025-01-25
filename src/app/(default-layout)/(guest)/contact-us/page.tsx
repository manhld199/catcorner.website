import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Biểu mẫu liên hệ */}
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="font-bold mb-4">Biểu mẫu liên hệ</h2>
        <form className="space-y-4">
          {/* Dòng đầu tiên */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block font-medium mb-1">
                Họ và tên
              </label>
              <Input
                type="text"
                id="name"
                placeholder="Nhập họ và tên"
                maxLength={50}
                className="w-full border border-gray-300 rounded-lg px-3"
              />
              <p className="text-sm text-gray-500 text-right">0/50</p>
            </div>
            <div>
              <label htmlFor="organization" className="block font-medium mb-1">
                Tổ chức
              </label>
              <Input
                type="text"
                id="organization"
                placeholder="Nhập tên tổ chức"
                maxLength={50}
                className="w-full border border-gray-300 rounded-lg px-3"
              />
              <p className="text-sm text-gray-500 text-right">0/50</p>
            </div>
          </div>

          {/* Dòng thứ hai */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block font-medium mb-1">
                Số điện thoại
              </label>
              <Input
                type="text"
                id="phone"
                placeholder="Nhập số điện thoại"
                maxLength={50}
                className="w-full border border-gray-300 rounded-lg px-3"
              />
              <p className="text-sm text-gray-500 text-right">0/50</p>
            </div>
            <div>
              <label htmlFor="email" className="block font-medium mb-1">
                Địa chỉ email
              </label>
              <Input
                type="email"
                id="email"
                placeholder="Nhập địa chỉ email"
                maxLength={50}
                className="w-full border border-gray-300 rounded-lg px-3"
              />
              <p className="text-sm text-gray-500 text-right">0/50</p>
            </div>
          </div>

          {/* Tiêu đề */}
          <div>
            <label htmlFor="subject" className="block font-medium mb-1">
              Tiêu đề
            </label>
            <Input
              type="text"
              id="subject"
              placeholder="Nhập tiêu đề"
              maxLength={100}
              className="w-full border border-gray-300 rounded-lg px-3"
            />
            <p className="text-sm text-gry-500 text-right">0/100</p>
          </div>

          {/* Nội dung */}
          <div>
            <label htmlFor="message" className="block font-medium mb-1">
              Nội dung
            </label>
            <Textarea
              id="message"
              placeholder="Nhập nội dung..."
              maxLength={200}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24"
            />
            <p className="text-sm text-gray-500 text-right">0/200</p>
          </div>

          {/* Nút gửi */}
          <button
            type="submit"
            className="bg-pri-1 text-white py-2 px-6 rounded-lg w-full hover:bg-teal-800">
            Gửi
          </button>
        </form>
      </div>

      {/* Thông tin liên hệ */}
      <div className="bg-white px-6 pt-6 pb-10 rounded-lg shadow-md h-fit">
        <h2 className="font-bold mb-4">Thông tin liên hệ</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="bg-teal-100 rounded-full p-3 mr-4">
              <Phone className="text-teal-700 w-6 h-6" />
            </div>
            <div>
              <p className="font-medium">Số điện thoại</p>
              <p className="text-gray-700">0795.849.949</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-teal-100 rounded-full p-3 mr-4">
              <Mail className="text-teal-700 w-6 h-6" />
            </div>
            <div>
              <p className="font-medium">Địa chỉ email</p>
              <p className="text-gray-700">catcorner.contact@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
