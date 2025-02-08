describe("Login", () => {
  beforeEach(function () {
    // Load dữ liệu test từ file fixture trước mỗi test
    cy.fixture("auth/loginData").then((data) => {
      this.loginData = data; // Lưu vào `this` để dùng trong các test
    });
  });

  it("should redirect to the home page after successful login", function () {
    cy.visit("/login"); // URL của trang login

    // Verify the button is disabled initially
    cy.get('[data-cy="login-button"]').should("be.disabled");

    // Sử dụng dữ liệu test từ fixture
    const { email, password } = this.loginData.valid; // Đúng tên `this.loginData`

    // Simulate filling in the form with valid data
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);

    // Verify the button becomes enabled
    cy.get('[data-cy="login-button"]').should("not.be.disabled");

    // Simulate clicking the button
    cy.get('[data-cy="login-button"]').click();

    // Verify the button shows the loading state
    cy.get('[data-cy="login-button"]').contains("Đang xử lý...");

    // Verify the redirection to the home page
    cy.url().should("eq", `${Cypress.config().baseUrl}/`); // Đảm bảo URL chính xác là `/`

    // click vào sản phẩm đầu tiên
    cy.get('[data-cy="product-item-0"]').click();

    // Click vào nút "Thêm vào giỏ hàng"
    cy.get('[data-cy="buy-now-button"]').click();

    // // Click vào nút giỏ hàng
    // cy.get('[data-cy="cart-button"]').click();

    // // Kiểm tra xem đã vào trang giỏ hàng chưa
    // cy.url().should("include", "/cart");

    // cy.get('[data-cy="order-button"]').click();

    // Kiểm tra xem đã vào trang xác nhận đặt hàng chưa
    cy.url().should("include", "/order-information");

    cy.get('input[name="userName"]').type("Nguyễn Văn A");

    cy.get('input[name="userPhone"]').type("0987654321");

    cy.get('select[name="city"]').select("Tỉnh Lào Cai", { force: true });

    cy.get('select[name="district"]').select("Huyện Bát Xát", { force: true });

    cy.get('select[name="ward"]').select("Xã A Lù", { force: true });

    cy.get('input[name="streetAddress"]').type("123 Đường ABC");
    cy.get('textarea[name="orderNote"]').type("Ghi chú cho đơn hàng.");

    cy.get('[data-cy="order-button"]').click();

    cy.intercept("POST", "/payment-api", {
      statusCode: 200,
      body: { status: "success" },
    }).as("paymentSuccess");

    // Sau khi quét mã QR hoặc thực hiện thao tác, kiểm tra kết quả.
    cy.wait("@paymentSuccess");
    cy.get(".payment-status").should("contain", "Payment Successful");
  });
});
