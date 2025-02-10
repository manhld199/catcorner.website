export default function AboutUsPage() {
  return (
    <div className="container mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold">CATCORNER</h1>
        <h2 className="font-semibold">Cửa hàng vật dụng dành cho mèo</h2>
        <hr className="my-4 w-2/6 mx-auto" />
        <p className="text-xl">
          CatCorner tự hào là một trong những cửa hàng phụ kiện cho mèo lớn và
          đáng tin cậy nhất tại Sài Gòn, nơi có thể thỏa mãn niềm đam mê trong
          cuộc chơi của hàng triệu tín đồ yêu Thú cưng từ Nam ra Bắc.
        </p>
      </div>

      {/* Feature Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
        <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 text-center">
          <img
            src="/imgs/test.jpg"
            alt="Chất lượng"
            className="mx-auto mb-4 w-12 h-12"
          />
          <p className="font-bold text-lg">Chất lượng thật - Giá trị thật</p>
          <p className="text-gray-600 dark:text-gray-400">
            Số lượng sản phẩm và dịch vụ tốt nhất với đa dạng, phong phú sẽ đáp
            ứng tất cả nhu cầu mua sắm của bạn.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 text-center">
          <img
            src="/imgs/test.jpg"
            alt="Chăm sóc khách hàng"
            className="mx-auto mb-4 w-12 h-12"
          />
          <p className="font-bold text-lg">Chất lượng thật - Giá trị thật</p>
          <p className="text-gray-600 dark:text-gray-400">
            Tất cả khách hàng mua sắm tại ForCat có tổng hóa đơn mua sắm tích
            lũy từ 1000 điểm sẽ được một phần quà giá trị tương đương.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 text-center">
          <img
            src="/imgs/test.jpg"
            alt="Vận chuyển miễn phí"
            className="mx-auto mb-4 w-12 h-12"
          />
          <p className="font-bold text-lg">Chất lượng thật - Giá trị thật</p>
          <p className="text-gray-600 dark:text-gray-400">
            Miễn phí vận chuyển nội thành TP Hồ Chí Minh cho các đơn hàng từ
            399.000đ trở lên.
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="my-12">
        <h2 className="text-center font-medium">
          CatCorner - Chúng tôi là ai?
        </h2>
        <hr className="my-4 w-2/6 mx-auto" />
        <p className="text-center text-lg">
          CatCorner là điểm đến lý tưởng cho những người yêu mèo, nơi mang đến
          một thế giới rộng lớn của các vật phẩm độc đáo và chất lượng cho các
          vị thần mèo của bạn. Với mục tiêu làm hài lòng cả mèo và chủ nhân của
          chúng, chúng tôi tự hào là điểm đến đáng tin cậy để tìm kiếm mọi thứ
          từ thức ăn, đồ chơi, đến đồ dùng và phụ kiện.
        </p>
        <div className="grid grid-cols-1 gap-6 my-6">
          <img
            src="/imgs/test.jpg"
            alt="Cat 1"
            className="rounded-lg shadow-lg w-full h-[420px] object-cover"
          />
        </div>
        <p className="text-center font-light text-lg">
          Chúng tôi hiểu rõ rằng mỗi chú mèo là một cá thể độc đáo với sở thích
          và nhu cầu riêng biệt. Đó là lý do tại CatCorner, chúng tôi không chỉ
          cung cấp các sản phẩm thông thường mà còn đưa ra những lựa chọn đa
          dạng, phong phú để bạn có thể tìm thấy điều phù hợp nhất cho thú cưng
          của mình. Từ những món đồ chơi kích thích trí thông minh đến các sản
          phẩm thú vị giúp giải trí và rèn luyện sức khỏe, chúng tôi cam kết đem
          đến trải nghiệm mua sắm đáng nhớ cho bạn và mèo của bạn.
        </p>
        <div className="grid grid-cols-1 gap-6 my-6">
          <img
            src="/imgs/test.jpg"
            alt="Cat 1"
            className="rounded-lg shadow-lg w-full h-[420px] object-cover"
          />
        </div>
        <p className="text-center font-light text-lg">
          Sản phẩm tại CatCorner không chỉ đảm bảo về chất lượng mà còn mang đậm
          phong cách và sự độc đáo. Chúng tôi luôn cập nhật xu hướng mới nhất
          trong cộng đồng yêu mèo để đảm bảo bạn luôn có những sản phẩm mới nhất
          và phù hợp nhất với phong cách của bạn và thú cưng. Nếu bạn đang tìm
          kiếm một nơi đáng tin cậy để mua sắm các vật phẩm cho mèo của bạn, hãy
          ghé thăm CatCorner. Chúng tôi cam kết sẽ mang đến cho bạn trải nghiệm
          mua sắm tốt nhất, đồng thời giúp thú cưng của bạn có cuộc sống thú vị
          và hạnh phúc hơn.
        </p>
        <div className="grid grid-cols-1 gap-6 my-6">
          <img
            src="/imgs/test.jpg"
            alt="Cat 1"
            className="rounded-lg shadow-lg w-full h-[420px] object-cover"
          />
        </div>
        <p className="text-center font-light text-lg">
          Thế mạnh của chúng tôi là sự đa dạng và sáng tạo trong việc cung cấp
          các sản phẩm và dịch vụ dành cho mèo. Chúng tôi tự hào về việc có một
          đội ngũ nhân viên chuyên nghiệp và đam mê, luôn sẵn lòng tư vấn và hỗ
          trợ khách hàng trong mọi vấn đề liên quan đến việc chăm sóc và nuôi
          dưỡng mèo. Không chỉ là một cửa hàng bán lẻ thông thường, chúng tôi
          còn là một trung tâm nơi mọi người có thể tìm kiếm thông tin và kiến
          thức về mèo. Ngoài ra, chúng tôi luôn đặt mức giá cạnh tranh và cam
          kết về chất lượng sản phẩm, giúp khách hàng có được sự hài lòng cao
          nhất mỗi khi mua sắm tại CatCorner. Sự đa dạng trong sản phẩm cùng với
          dịch vụ chăm sóc khách hàng tận tình và chuyên nghiệp là những điểm
          mạnh đặc biệt của chúng tôi, giúp chúng tôi phục vụ và thu hút cộng
          đồng người yêu mèo.
        </p>
        <div className="grid grid-cols-1 gap-6 my-6">
          <img
            src="/imgs/test.jpg"
            alt="Cat 1"
            className="rounded-lg shadow-lg w-full h-[420px] object-cover"
          />
        </div>
      </div>

      {/* Core value Section */}
      <div className="my-12">
        <h2 className="text-center font-medium">Giá trị cốt lõi</h2>
        <hr className="my-4 w-2/6 mx-auto" />
        <p className="text-center text-lg">
          Vì sứ mệnh tạo nên những giá trị thương hiệu, chúng tôi đã, đang và sẽ
          luôn nỗ lực hết mình vì sự phát triển – khẳng định thương hiệu Việt,
          mang lại những giá trị lâu dài cho doanh nghiệp.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 text-center">
            <img
              src="/imgs/test.jpg"
              alt="Chất lượng"
              className="mx-auto mb-4 w-12 h-12"
            />
            <p className="font-bold text-lg">Chất lượng thật - Giá trị thật</p>
            <p className="text-gray-600 dark:text-gray-400">
              Số lượng sản phẩm và dịch vụ tốt nhất với đa dạng, phong phú sẽ
              đáp ứng tất cả nhu cầu mua sắm của bạn.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 text-center">
            <img
              src="/imgs/test.jpg"
              alt="Chăm sóc khách hàng"
              className="mx-auto mb-4 w-12 h-12"
            />
            <p className="font-bold text-lg">Chất lượng thật - Giá trị thật</p>
            <p className="text-gray-600 dark:text-gray-400">
              Tất cả khách hàng mua sắm tại ForCat có tổng hóa đơn mua sắm tích
              lũy từ 1000 điểm sẽ được một phần quà giá trị tương đương.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 text-center">
            <img
              src="/imgs/test.jpg"
              alt="Vận chuyển miễn phí"
              className="mx-auto mb-4 w-12 h-12"
            />
            <p className="font-bold text-lg">Chất lượng thật - Giá trị thật</p>
            <p className="text-gray-600 dark:text-gray-400">
              Miễn phí vận chuyển nội thành TP Hồ Chí Minh cho các đơn hàng từ
              399.000đ trở lên.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 text-center">
            <img
              src="/imgs/test.jpg"
              alt="Vận chuyển miễn phí"
              className="mx-auto mb-4 w-12 h-12"
            />
            <p className="font-bold text-lg">Chất lượng thật - Giá trị thật</p>
            <p className="text-gray-600 dark:text-gray-400">
              Miễn phí vận chuyển nội thành TP Hồ Chí Minh cho các đơn hàng từ
              399.000đ trở lên.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 text-center">
            <img
              src="/imgs/test.jpg"
              alt="Vận chuyển miễn phí"
              className="mx-auto mb-4 w-12 h-12"
            />
            <p className="font-bold text-lg">Chất lượng thật - Giá trị thật</p>
            <p className="text-gray-600 dark:text-gray-400">
              Miễn phí vận chuyển nội thành TP Hồ Chí Minh cho các đơn hàng từ
              399.000đ trở lên.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 text-center">
            <img
              src="/imgs/test.jpg"
              alt="Vận chuyển miễn phí"
              className="mx-auto mb-4 w-12 h-12"
            />
            <p className="font-bold text-lg">Chất lượng thật - Giá trị thật</p>
            <p className="text-gray-600 dark:text-gray-400">
              Miễn phí vận chuyển nội thành TP Hồ Chí Minh cho các đơn hàng từ
              399.000đ trở lên.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="my-12">
        <h2 className="text-center font-medium mb-4">Đội ngũ phát triển</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <img
              src="/imgs/test.jpg"
              alt="Lê Đức Mạnh"
              className="rounded-lg shadow-lg mb-4"
            />
            <p className="font-bold">Lê Đức Mạnh</p>
          </div>
          <div>
            <img
              src="/imgs/test.jpg"
              alt="Phan Nguyễn Hải Yến"
              className="rounded-lg shadow-lg mb-4"
            />
            <p className="font-bold">Phan Nguyễn Hải Yến</p>
          </div>
          <div>
            <img
              src="/imgs/test.jpg"
              alt="Nguyễn Thị Thùy Trinh"
              className="rounded-lg shadow-lg mb-4"
            />
            <p className="font-bold">Nguyễn Thị Thùy Trinh</p>
          </div>
        </div>
      </div>
    </div>
  );
}
