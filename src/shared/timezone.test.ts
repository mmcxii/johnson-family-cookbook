describe("timezones", () => {
  it("should always be in utc", () => {
    //* Arrange
    const date = new Date();

    //* Assert
    expect(date.getTimezoneOffset()).toBe(0);
  });
});
