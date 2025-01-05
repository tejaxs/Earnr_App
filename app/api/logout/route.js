export async function POST(req) {
    try {
      // Clear the JWT by setting the cookie to expire immediately
      const response = new Response(JSON.stringify({ message: "Logout successful" }), { status: 200 });
  
      // Set the authToken cookie to expire immediately to log out the user
      response.headers.set(
        "Set-Cookie",
        "authToken=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0"
      );
  
      return response;
    } catch (error) {
      console.error("Error logging out:", error);
      return new Response(JSON.stringify({ message: "Failed to logout" }), { status: 500 });
    }
  }
  