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
        await fetch('https://mastodon.social/api/v1/accounts/lookup', {
          "headers": {
            "Content-Type": "application/json;charset=utf-8"
          }
        })
        .then((response) => res.json())
        .then((data) => {
          var body = data;
          if (body && body['note']) body['note'] = body['note'] + ' https://justmytoots.com/@saoirsecord@saoirsecord.com'

          return new Response(body, { "status": 200 });
        })
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
