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
