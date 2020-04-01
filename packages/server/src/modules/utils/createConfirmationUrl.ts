export async function createConfirmationUrl(id: string): Promise<string> {
  return `http://localhost:3000/user/confirm/${id}`;
}
