"use client";

export function FeaturedOn() {
  return (
    <div className="w-full border-t-1 mt-24 text-center flex flex-col items-center justify-center pt-6 z-10">
      <div className="text-sm opacity-70 mb-5">
        Created by one person.. Featured on
      </div>
      <div className="w-full flex items-center justify-center gap-5">
        <a
          href="https://www.producthunt.com/posts/koxy-ai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-koxy&#0045;ai"
          target="_blank"
          className="bg-white flex items-center px-2 pr-4 font-semibold gap-2 text-gray-400 opacity-80"
          style={{
            height: "40px"
          }}
        >
          <img
            width="30"
            height="30"
            className="grayscale"
            src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/product-hunt-logo-icon.png"
          />
          ProductHunt
        </a>
        <a
          href="https://theresanaiforthat.com/ai/koxy-ai/?ref=featured&v=437568"
          target="_blank"
          rel="nofollow"
        >
          <img
            width="200"
            className="grayscale"
            src="https://media.theresanaiforthat.com/featured-on-taaft.png?width=600"
          />
        </a>

        <a href="https://topai.tools/t/koxy-ai?ref=embed">
          <img
            style={{
                width: "180px",
                height: "40px"
            }}
            className="grayscale"
            src="https://topai.tools/assets/img/topai.tools.gif"
            alt="Koxy AI Featured on topAI.tools"
          />
        </a>
      </div>
    </div>
  );
}
