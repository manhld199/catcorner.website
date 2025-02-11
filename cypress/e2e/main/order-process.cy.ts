describe("Order-Process", () => {
  beforeEach(function () {
    cy.fixture("auth/loginData").then((data) => {
      this.loginData = data;
    });
  });

  it("should redirect to the home page after successful login", function () {
    cy.visit("https://catcorner-website.vercel.app/login");

    cy.get('[data-cy="login-button"]').should("be.disabled");

    const { email, password } = this.loginData.valid;
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('[data-cy="login-button"]').should("not.be.disabled").click();
    cy.get('[data-cy="login-button"]').contains("Đang xử lý...");
    cy.url().should("eq", `https://catcorner-website.vercel.app/login`);

    cy.get('[data-cy="product-item-0"]').click();
    cy.get('[data-cy="buy-now-button"]').click();

    cy.url().should("include", "/order-information");

    cy.get('input[name="userName"]').type("Nguyễn Văn A");
    cy.get('input[name="userPhone"]').type("0987654321");
    cy.get('select[name="city"]').select("Tỉnh Lào Cai", { force: true });
    cy.get('select[name="district"]').select("Huyện Bát Xát", { force: true });
    cy.get('select[name="ward"]').select("Xã A Lù", { force: true });
    cy.get('input[name="streetAddress"]').type("123 Đường ABC");
    cy.get('textarea[name="orderNote"]').type("Ghi chú cho đơn hàng.");

    cy.get('[data-cy="order-button"]').click();
    cy.wait(10000);
  });
});
