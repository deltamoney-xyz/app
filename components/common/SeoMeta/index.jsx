import Head from "next/head";

import { DMSEO } from "logic/constants/seo";

export default function SeoMeta({
  type,
  title,
  description,
  og,
  url,
  noindex,
  keywords,
}) {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#420FD3" />
      <meta property="og:type" content="website" />
      {DMSEO.pages.hasOwnProperty(type) ? (
        <>
          <title>{DMSEO.pages[type].title}</title>
          <meta property="og:title" content={DMSEO.pages[type].title} />
          <meta name="twitter:title" content={DMSEO.pages[type].title} />
          {DMSEO.pages[type].hasOwnProperty("description") && (
            <meta
              property="og:description"
              content={DMSEO.pages[type].description}
            />
          )}
          {DMSEO.pages[type].hasOwnProperty("description") && (
            <meta
              name="twitter:description"
              content={DMSEO.pages[type].description}
            />
          )}
          {DMSEO.pages[type].hasOwnProperty("description") && (
            <meta name="description" content={DMSEO.pages[type].description} />
          )}
          {DMSEO.pages[type].hasOwnProperty("keywords") &&
            DMSEO.pages[type].keywords !== "" && (
              <meta name="keywords" content={DMSEO.pages[type].keywords} />
            )}
          {DMSEO.pages[type].hasOwnProperty("og") ? (
            <meta
              property="og:image"
              content={DMSEO.url + DMSEO.pages[type].og}
            />
          ) : (
            <meta property="og:image" content={DMSEO.url + DMSEO.og} />
          )}
          {DMSEO.pages[type].hasOwnProperty("og") ? (
            <meta
              property="og:image:secure_url"
              content={DMSEO.url + DMSEO.pages[type].og}
            />
          ) : (
            <meta
              property="og:image:secure_url"
              content={DMSEO.url + DMSEO.og}
            />
          )}
          {DMSEO.pages[type].hasOwnProperty("og") ? (
            <meta
              name="twitter:image"
              content={DMSEO.url + DMSEO.pages[type].og}
            />
          ) : (
            <meta name="twitter:image" content={DMSEO.url + DMSEO.og} />
          )}
        </>
      ) : (
        <>
          <title>{title ? title + " | " + DMSEO.title : DMSEO.title}</title>
          <meta
            property="og:title"
            content={title ? title + " | " + DMSEO.title : DMSEO.title}
          />
          {description && (
            <>
              <meta property="og:description" content={description} />
              <meta name="twitter:description" content={description} />
              <meta name="description" content={description} />
            </>
          )}
          {keywords && (
            <>
              <meta name="keywords" content={keywords} />
            </>
          )}
          <meta property="og:image" content={og ? og : DMSEO.url + DMSEO.og} />
          <meta
            property="og:image:secure_url"
            content={og ? og : DMSEO.url + DMSEO.og}
          />
          <meta
            name="twitter:title"
            content={title ? title + " | " + DMSEO.title : DMSEO.title}
          />
          <meta name="twitter:image" content={og ? og : DMSEO.url + DMSEO.og} />
        </>
      )}

      <meta property="og:url" content={url ? url : "https://deltamoney.xyz/"} />
      <meta property="og:site_name" content={DMSEO.title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@wearedeltamoney" />
      <link rel="icon" href={DMSEO.url + DMSEO.favicon} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
        />
      )}
    </Head>
  );
}
