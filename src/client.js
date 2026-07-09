import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  // projectId is public (it ships in the client bundle either way), so we fall
  // back to a hardcoded value — this keeps the live site working even when the
  // REACT_APP_SANITY_PROJECT_ID env var isn't set in the Vercel build.
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID || 'ouoeyqyw',
  dataset: 'production',
  apiVersion: '2022-02-01',
  useCdn: true,
  // No token: the dataset is public-readable, and REACT_APP_* vars are inlined
  // into the browser bundle — never ship a secret (sk...) write token here.
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
