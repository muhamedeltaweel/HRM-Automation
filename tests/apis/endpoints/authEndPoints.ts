import { type APIRequestContext } from "@playwright/test";

const loginEndpoint = "/web/index.php/auth/login";
const validateEndpoint = "/web/index.php/auth/validate";
const sessionCookie = "orangehrm";

async function login(request: APIRequestContext, username: string, password: string) {

  // 1- open the login page to get the CSRF token
  const loginPage = await request.get(loginEndpoint);
  const token = (await loginPage.text()).match(/:token="&quot;(.+?)&quot;"/)?.[1];

  if (!token) throw new Error("API login: CSRF token not found on the login page");

  // 2- send the credentials, OrangeHRM redirects to the dashboard on success and back to the login page on failure
  const response = await request.post(validateEndpoint, {
    form: { _token: token, username, password },
    maxRedirects: 0,
  });

  if (!response.headers()["location"]?.endsWith("/dashboard/index")) {
    throw new Error(`API login failed for user "${username}"`);
  }

  // 3- extract the session ID from the Set-Cookie header
  const setCookie = response.headersArray().find(
    (header) => header.name.toLowerCase() === "set-cookie" && header.value.startsWith(`${sessionCookie}=`)
  );
  const sessionId = setCookie?.value.split(";")[0].split("=")[1];

  if (!sessionId) throw new Error("API login: session cookie not found in the response");

  return sessionId;

}

export default { sessionCookie, login };
