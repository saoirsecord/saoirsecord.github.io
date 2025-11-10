export const onRequestOptions: PagesFunction[] = [
  async (context) => {
    let url = new URL(context.request.url);
    if (url.pathname == '/api/v1/accounts/lookup') {
      return new Response(null, { 
        "status": 200,
        "headers": {
          "Access-Control-Allow-Origin": "https://justmytoots.com",
          "Access-Control-Allow-Headers": "content-type",
          "Access-Control-Allow-Methods": "GET, OPTIONS"
        }
      }) 
    } else {
      try {
        return await context.next();
      } catch (err) {
        return new Response(`${err.message}\n${err.stack}`, { status: 500 });
      }
    }
  }
]

export const onRequestGet: PagesFunction [] = [
  async (context) => {
    let url = new URL(context.request.url);
    if (url.pathname == '/api/v1/accounts/lookup') {
      let search = decodeURIComponent(url.search);
      if (search == '?acct=@saoirsecord@saoirsecord.com') {
        return new Response(JSON.stringify({"note":"https://justmytoots.com/@saoirsecord@saoirsecord.com","fields":[]}), { status: 200 });
      } else {
        try {
          return await context.next();
        } catch (err) {
          return new Response(`${err.message}\n${err.stack}`, { status: 500 });
        }
      }
    } else {
      try {
        return await context.next();
      } catch (err) {
        return new Response(`${err.message}\n${err.stack}`, { status: 500 });
      }
    }
  }
]
