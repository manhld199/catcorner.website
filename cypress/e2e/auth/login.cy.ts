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
  });
});
