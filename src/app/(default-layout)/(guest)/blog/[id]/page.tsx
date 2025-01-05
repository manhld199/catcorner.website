import Image from "next/image";

export default function BlogDetailPage() {
  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Nội dung bài viết */}
      <article className="lg:col-span-3 bg-white px-4 py-4 rounded-lg">
        {/* Ảnh tiêu đề */}
        <Image
          src="/imgs/test.jpg"
          alt="test Image"
          width={1200}
          height={600}
          className="rounded-lg mb-6"
        />

        {/* Tiêu đề và meta */}
        <h1 className="text-3xl font-bold mb-2">
          Tên bài viết tên bài viết tên bài viết tên bài viết
        </h1>
        <p className="text-muted-foreground mb-4">Tên tác giả - 19/09/2003</p>

        {/* Hashtags */}
        <div className="flex gap-2 mb-6">
          {["hashtag", "hashtag", "hashtag"].map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-[#FFF1D0] text-black rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* Nội dung bài viết */}
        <div className="prose lg:prose-lg">
          <h2>1. Tiêu đề 1 Tiêu đề 1 Tiêu đề 1</h2>
          <p>
            Rận mèo là loài ký sinh trên mèo, thường sống trong lông mèo. Chúng
            cắn và hút máu từ da mèo, gây ngứa ngáy và khó chịu cho thú cưng,
            khiến mèo gãi và cắn liên tục, làm rụng lông và gây tổn thương
            nghiêm trọng cho vùng da nhiễm rận. Nếu không được điều trị, mèo bị
            nhiễm rận lâu ngày có thể bị nhiễm trùng và mắc các bệnh khác như
            giun sán, ghẻ, nấm...
          </p>
          <p>
            Ngoài ra, rận mèo còn có thể truyền bệnh từ mèo này sang mèo khác,
            làm tình trạng lây lan nhanh chóng trong môi trường có nhiều mèo. Để
            bảo vệ mèo khỏi rận, việc duy trì vệ sinh cho thú cưng và môi trường
            sống là rất quan trọng.
          </p>

          {/* Hình ảnh minh họa */}
          <Image
            src="/imgs/test.jpg"
            alt="Hình minh họa"
            width={1200}
            height={600}
            className="rounded-lg my-6"
          />
          <p className="text-center italic text-gray-600">
            Mô tả hình ảnh mô tả hình ảnh mô tả hình ảnh mô tả hình ảnh mô tả
            hình ảnh
          </p>
        </div>

        {/* Bài viết liên quan */}
        <section className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Bài viết liên quan</h3>
          <ul className="list-disc list-inside">
            <li>
              <a href="#" className="text-teal-600 hover:underline font-medium">
                Bài viết 1 Bài viết 1 Bài viết 1
              </a>
            </li>
            <li>
              <a href="#" className="text-teal-600 hover:underline font-medium">
                Bài viết 2 Bài viết 2 Bài viết 2
              </a>
            </li>
            <li>
              <a href="#" className="text-teal-600 hover:underline font-medium">
                Bài viết 3 Bài viết 3 Bài viết 3
              </a>
            </li>
          </ul>
        </section>
      </article>

      {/* Sidebar */}
      <aside className="bg-white rounded-lg p-6 h-fit">
        <h2 className="text-xl font-bold mb-4">Nội dung</h2>
        <ul className="list-decimal list-inside text-gray-700 space-y-2">
          <li>
            <a href="#" className="text-teal-600 hover:underline font-medium">
              1. Tiêu đề 1 Tiêu đề 1
            </a>
            <ul className="list-decimal list-inside ml-4 text-gray-600">
              <li>
                <a
                  href="#"
                  className="text-teal-600 hover:underline font-medium">
                  1.1. Tiêu đề 2 Tiêu đề 2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-teal-600 hover:underline font-medium">
                  1.2. Tiêu đề 2 Tiêu đề 2
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" className="text-teal-600 hover:underline font-medium">
              2. Tiêu đề 2 Tiêu đề 2
            </a>
            <ul className="list-decimal list-inside ml-4 text-gray-600">
              <li>
                <a
                  href="#"
                  className="text-teal-600 hover:underline font-medium">
                  2.1. Tiêu đề 2 Tiêu đề 2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-teal-600 hover:underline font-medium">
                  2.2. Tiêu đề 2 Tiêu đề 2
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </div>
  );
}
