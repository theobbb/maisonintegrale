import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: "1m8675a3",
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: false
  });

export const imageBuilder = imageUrlBuilder(client)
