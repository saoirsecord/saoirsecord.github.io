import proxyflare from "@flaregun-net/proxyflare-for-pages"

const routes: Route[] = [
  {
    from: {
      pattern: "saoirsecord.com/api/v1/accounts/115509614111913017/statuses",
      alsoMatchWWWSubdomain: true,
    },
    to: { url: "https://mastodon.social/api/v1/accounts/115509614111913017/statuses" },
  }
]

export const onRequestOptions: PagesFunction[] = [
  async (context) => {
    let url = new URL(context.request.url);
    if (url.pathname.startsWith('/api/v1/accounts')) {
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
  (context) => proxyflare({
    config: {
      global: { debug: false },
      routes,
    },
  })(context),
  async (context) => {
    let url = new URL(context.request.url);
    if (url.pathname == '/api/v1/accounts/lookup') {
      let search = decodeURIComponent(url.search);
      if (search == '?acct=@saoirsecord@saoirsecord.com') {
        return new Response(JSON.stringify({
          "id": "115509614111913017",
          "display_name": "saoirse dream Discord",
          "url": "https://web.brid.gy/saoirsecord.com",
          "note": "https://justmytoots.com/@saoirsecord@saoirsecord.com",
          "avatar": "https://saoirsecord.com/logo/logo.png",
          "fields": []
        }), { status: 200 });
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
