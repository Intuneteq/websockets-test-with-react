import axios from "axios";

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "https://productize-api.techstudio.academy";
axios.defaults.baseURL = "http://localhost:8000";

function App() {
  async function handleBtnClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    try {
      const headers = {
        Authorization:
          "Bearer 4|4mHo4qkEzPI9G58V1fSWncUmJ5nr00KlrxzBjzUJ7a13da7e",
      };

      const res = await axios.get(
        "https://productize-api/api/payments/paystack/subscribe",
        { headers, withCredentials: true }
      );

      console.log(res);

      window.location.href = res.data.authorization_url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      full_name: "Tobi Olanitori",
      email: "tobiolanitori@gmail.com",
      password: "Alicemojisola1.",
      password_confirmation: "Alicemojisola1."
    };

    try {
      const cook = await axios.get("/sanctum/csrf-cookie");

      console.log("cook >>>>>", cook);

      const res = await axios.post("/api/auth/login", { ...data });

      console.log("login", res);
    } catch (error) {
      console.log(error);
    }
  }

  async function getMe(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    try {
      const res = await axios.get("/api/users/me", { withCredentials: true});
      console.log("ME >>>>>>>>>>>>>>>>", res.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getRandom(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    try {
      const res = await axios.get("/api/auth/test");
      console.log("RANDOM >>>>>>>>>>>>>>>>", res.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function googleAuth(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    try {
      const res = await axios.get("/api/auth/oauth/redirect?provider=google");
      console.log(res);

      window.location.href = res.data.redirect_url;
    } catch (error) {
      console.log("ggogle error", error);
    }
  }
  return (
    <div>
      <button type="button" onClick={(e) => handleBtnClick(e)}>
        Click me
      </button>

      <button type="button" onClick={(e) => getMe(e)}>
        get me
      </button>

      <button type="button" onClick={(e) => googleAuth(e)}>
        login with google
      </button>

      <button type="button" onClick={(e) => getRandom(e)}>
        Get Random
      </button>

      <form onSubmit={(e) => handleLogin(e)}>
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default App;
