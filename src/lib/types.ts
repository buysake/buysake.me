export type TimelineType = 'zenn' | 'note' | 'self';

export type TimelineItem = {
  date: Date;
  type: TimelineType;
  tags?: string[];
  link: {
    title: string;
    href: string;
  };
};

export type GroupedTimeline = Array<{
  distance: string;
  date: Date;
  items: Array<TimelineItem>;
}>;

export type ArticleMetadataJson = {
  title: string;
  date: string;
  tags?: string[];
};

export type Article = {
  title: string;
  date: Date;
  tags?: string[];
  body: string;
};

export type RssFeed = {
  pubDate: string;
  title: string;
  link: string;
};

export type AirdropItem = {
  date: Date;
  title: string;
  project: string;
  project_url: string;
  description: string;
  types: Array<'daily' | 'tech' | 'free' | 'only_gas' | 'game' | 'once'>;
  links: {
    pro_tweet_link?: string;
    pro_referral_link?: {
      url: string;
      code: string;
    };
    my_referral_link?: {
      url: string;
      code: string;
    };
    original_url?: string;
  };
};
