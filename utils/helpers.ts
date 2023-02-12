interface StoryblokImageParams {
  blur?: number;
  url: string;
  height: number;
  width: number;
}

const storyblokImage = ({blur = 0, url, height, width}:StoryblokImageParams):string => {
  if (blur > 0) {
    return `${url}/m/${width}x0/filters:blur(${blur})`
  }
  return `${url}/m/${width}x${height}`;
}

export {
  storyblokImage
}