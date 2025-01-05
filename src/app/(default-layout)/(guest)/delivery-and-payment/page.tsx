export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto bg-white ml:p-8 rounded-lg p-2">
      {/* Header */}
      <h1 className="text-center font-bold mb-6">Chính sách đổi trả</h1>

      {/* Introduction */}
      <p className="text-lg mb-6">
        Chúng tôi tại CatCorner cam kết mang đến cho bạn và thú cưng của bạn
        những sản phẩm chất lượng tốt nhất. Tuy nhiên, nếu bạn không hoàn toàn
        hài lòng với sản phẩm đã mua, chúng tôi sẵn sàng hỗ trợ việc đổi trả
        theo các điều khoản dưới đây.
      </p>

      {/* Điều kiện đổi trả */}
      <div className="mb-6">
        <h3 className="font-bold mb-4">1. Điều kiện đổi trả</h3>
        <ul className="list-disc list-inside text-lg ">
          <li>
            Sản phẩm phải còn nguyên vẹn, chưa qua sử dụng, và có đầy đủ tem
            nhãn.
          </li>
          <li>Đổi trả trong vòng 7 ngày kể từ ngày nhận hàng.</li>
          <li>
            Các sản phẩm khuyến mãi hoặc mua trong đợt giảm giá không được áp
            dụng chính sách đổi trả.
          </li>
        </ul>
      </div>

      {/* Quy trình đổi trả */}
      <div className="mb-6">
        <h3 className="font-bold mb-4">2. Quy trình đổi trả</h3>
        <ol className="list-decimal list-inside text-lg ">
          <li>
            Liên hệ với chúng tôi: Bạn có thể liên hệ qua email hoặc hotline để
            yêu cầu đổi trả, kèm theo mã đơn hàng và lý do đổi trả.
          </li>
          <li>
            Kiểm tra và xác nhận: Đội ngũ CatCorner sẽ kiểm tra yêu cầu của bạn
            và phản hồi trong vòng 2 ngày làm việc.
          </li>
          <li>
            Gửi lại sản phẩm: Sau khi nhận được xác nhận, bạn sẽ cần gửi lại sản
            phẩm về địa chỉ của chúng tôi. Phí vận chuyển đổi trả sẽ do khách
            hàng chi trả.
          </li>
          <li>
            Hoàn tiền hoặc đổi sản phẩm: Sau khi nhận lại sản phẩm và kiểm tra,
            chúng tôi sẽ tiến hành hoàn tiền hoặc đổi sản phẩm mới theo yêu cầu
            của bạn.
          </li>
        </ol>
      </div>

      {/* Phí đổi trả */}
      <div className="mb-6">
        <h3 className="font-bold mb-4">3. Phí đổi trả</h3>
        <ul className="list-disc list-inside text-lg ">
          <li>
            Phí đổi hàng: Miễn phí đổi hàng nếu sản phẩm bị lỗi từ nhà sản xuất.
            Nếu lý do đổi hàng là do khách hàng thay đổi ý định, phí đổi trả sẽ
            là 30.000đ.
          </li>
          <li>
            Phí hoàn trả: Trong trường hợp hoàn tiền, phí vận chuyển ban đầu sẽ
            không được hoàn lại.
          </li>
        </ul>
      </div>

      {/* Các trường hợp không chấp nhận đổi trả */}
      <div className="mb-6">
        <h3 className="font-bold mb-4">
          4. Các trường hợp không chấp nhận đổi trả
        </h3>
        <ul className="list-disc list-inside text-lg ">
          <li>Sản phẩm đã qua sử dụng hoặc hư hỏng do lỗi của khách hàng.</li>
          <li>Sản phẩm không còn tem nhãn hoặc thiếu phụ kiện đi kèm.</li>
          <li>
            Các sản phẩm thức ăn và phụ kiện chăm sóc thú cưng không thể đổi trả
            vì lý do vệ sinh.
          </li>
        </ul>
      </div>

      {/* Liên hệ hỗ trợ */}
      <div>
        <h3 className="font-bold mb-4">5. Liên hệ hỗ trợ</h3>
        <p className="text-lg ">
          Nếu bạn có bất kỳ thắc mắc nào về chính sách đổi trả của CatCorner,
          vui lòng liên hệ chúng tôi qua:
        </p>
        <ul className="list-disc list-inside text-lg ">
          <li>Email: support@catcorner.vn</li>
          <li>Hotline: 0795.849.949</li>
        </ul>
        <p className="text-lg">Chúng tôi luôn sẵn sàng hỗ trợ bạn!</p>
      </div>
    </div>
  );
}
